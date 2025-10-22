import { OpenAI } from "openai";
import { promises as fs } from "fs";
import {OPENAI_API_KEY} from "../modules/openai_api_key";
import {translateNextChunk} from "../modules/OpenAiTranslator";

const inputJson = await fs.readFile("./Rance10.ain.json", "utf8");
const inputMessages = JSON.parse(inputJson);

let chunkStart = 151930;
while (chunkStart < inputMessages.length) {
    console.log("Processing lines after " + chunkStart);
    const output =
        (await translateNextChunk(inputMessages, chunkStart, 60).catch(() => null)) ??
        (await translateNextChunk(inputMessages, chunkStart, 50));
    const chunkSize = output.output_parsed.translationLines.length;
    const pageFileName = String(chunkStart).padStart(6, "0") + "_" + String(chunkStart + chunkSize).padStart(6, "0") + ".json";
    await fs.writeFile("./gpt_outputs/" + pageFileName, JSON.stringify(output), "utf8");
    chunkStart += chunkSize;
}
