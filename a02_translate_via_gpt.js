import { OpenAI } from "openai";
import { promises as fs } from "fs";

const inputJson = await fs.readFile("./Rance10.ain.json", "utf8");
const inputMessages = JSON.parse(inputJson);

const openAiClient = new OpenAI({
    apiKey: "[REDACTED]",
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

const PROMPT = `Translate every single line from Japanese to English according to the supplied schema. The text is from the game Rance X by Alicesoft.`;

// const chunkSize = 50;
const chunkSize = 60;

const outputs = [];

// skipped for now: 66870 - 128000
// fetched out of sequence: 128000 - 136060

for (let chunkStart = 66870; chunkStart < inputMessages.length; chunkStart += chunkSize) {
    const chunk = inputMessages.slice(chunkStart, chunkStart + chunkSize);
    console.log("Processing lines after " + chunkStart)

    const startMs = Date.now();
    const output = await openAiClient.responses.parse({
        // model: "gpt-4o",
        // model: "gpt-4o-mini",
        model: "gpt-4.1-mini",
        // temperature: 0,
        input: [
            { role: "system", content: PROMPT },
            { role: "user", content: [{
                text: JSON.stringify(chunk),
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

    const pageFileName = String(chunkStart).padStart(6, "0") + "_" + String(chunkStart + chunkSize).padStart(6, "0") + ".json";
    await fs.writeFile("./gpt_outputs/" + pageFileName, JSON.stringify(output), "utf8");

    if (output.output_parsed.translationLines?.length !== chunk.length) {
        console.error("__________ UNEXPECTED NUMBER OF LINES: " + output.output_parsed.translationLines?.length + " AT " + chunkStart);
        throw new Error("Fuking bot");
    }
}
