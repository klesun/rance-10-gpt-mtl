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

const PROMPT = `Please, translate following lines from Japanese to English according to the supplied schema. The text is from the game Rance X by Alicesoft.`;

const chunkSize = 200;

const outputs = [];

for (let chunkStart = 0; chunkStart < inputMessages.length; chunkStart += chunkSize) {
    const chunk = inputMessages.slice(chunkStart, chunkStart + chunkSize);
    console.log("Processing lines after " + chunkStart)

    const output = await openAiClient.responses.parse({
        model: "gpt-4o",
        // temperature: 0,
        input: [
            { role: "system", content: PROMPT },
            { role: "user", content: [{
                text: chunk.map(m => m.text).join("\n"),
                type: 'input_text',
            }] }
        ],
        text: {
            format: { name: "TranslationJSONOutput", type: "json_schema", schema: outputSchema },
        },
    });

    if (!output.output_parsed) {
        console.error("__________ FAILED AT " + chunkStart);
        console.error(chunk);
        console.error("__________ FAILED FOR REAL");
        console.log(JSON.stringify(output, null, 4));
        throw new Error("Fuking bot");
    }

    outputs.push(output);
	
	// debug
	if (chunkStart > 1000) {
		break;
	}
}

await fs.writeFile("zhopa123.json", JSON.stringify(outputs), "utf8");
