import {OPENAI_API_KEY} from "./openai_api_key.js";
import {OpenAI} from "openai";
import fs from "fs/promises";

const openAiClient = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const outputSchema = {
    "name": "Japanese lines translation to English",
    "type": "object",
    "additionalProperties": false,
    "required": [
        "translationLines",
    ],
    "properties": {
        "translationLines": {
            "type": "array",
            "description": "Array of objects, each representing a line from the input",
            "items": {
                "type": "object",
                "additionalProperties": false,
                "required": ["lineNumber", "originalJapaneseLine", "translatedEnglishLine"],
                "properties": {
                    "lineNumber": {
                        "type": "integer",
                        "description": "1-based",
                        "nullable": false,
                    },
                    "originalJapaneseLine": {
                        "type": "string",
                        "description": "The original line in Japanese exactly as it was in the input",
                        "nullable": false
                    },
                    "translatedEnglishLine": {
                        "type": "string",
                        "description": "The original line translated to English",
                        "nullable": false
                    },
                },
            },
        },
    }
};

export const translateNextChunk = async (inputMessages, chunkStart, chunkSize) => {
    const chunk = inputMessages.slice(chunkStart, chunkStart + chunkSize);

    const startMs = Date.now();
    const inputLines = chunk.map(lr => lr.originalJapaneseLine.trim() || "...");
    console.log("____ trying to translate following _________");
    console.log(inputLines.map((line, i) => String(i).padStart(3, " ") + ". " + line).join("\n"))

    const PROMPT = `Translate every single line from Japanese to English according to the supplied schema. There are exactly ${chunk.length} lines. The text is from the game Rance X by Alicesoft.`;

    const output = await openAiClient.responses.parse({
        // model: "gpt-4o",
        // model: "gpt-4o-mini",
        model: "gpt-4.1-mini",
        // temperature: 0,
        input: [
            { role: "system", content: PROMPT },
            { role: "user", content: [{
                text: inputLines.join("\n"),
                type: 'input_text',
            }] }
        ],
        text: {
            format: { name: "TranslationJSONOutput", type: "json_schema", schema: outputSchema },
        },
    });
    console.log("Chunk translated in " + ((Date.now() - startMs) / 1000).toFixed(1) + " seconds");

    if (!output.output_parsed) {
        console.error("__________ FAILED AT " + chunkStart);
        console.error(chunk);
        console.error("__________ FAILED FOR REAL");
        console.log(JSON.stringify(output, null, 4));
        throw new Error("Fuking bot");
    }

    if (output.output_parsed.translationLines?.length !== chunk.length) {
        console.error("__________ UNEXPECTED NUMBER OF LINES: " + output.output_parsed.translationLines?.length + " AT " + chunkStart);
        const filePath = "./gpt_outputs_wrong_lines/" + chunkStart + "_" + (chunkStart + chunkSize) + ".json";
        await fs.writeFile(filePath, JSON.stringify(output, null, 4), "utf-8");
        throw new Error("Fuking bot");
    }

    for (let i = 0; i < output.output_parsed.translationLines.length; ++i) {
        output.output_parsed.translationLines[i].lineNumber = chunk[i].lineNumber;
    }

    return output;
};