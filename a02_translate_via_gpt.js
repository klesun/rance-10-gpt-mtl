import { promises as fs } from "fs";
import * as path from "path";
import {translateNextChunk} from "./modules/OpenAiTranslator.js";
import {corpusDir, variantName} from "./modules/Variants.js";

// Freshly translated chunks belong to the variant being worked on, the same
// one --variant selects for a build.
const OUTPUT_DIR = path.join(corpusDir(variantName()), "gpt_outputs_v104");

// language=file-reference
const inputJson = await fs.readFile("./unmapped.ain.json", "utf8");
const inputMessages = JSON.parse(inputJson);

let chunkStart = 0;
while (chunkStart < inputMessages.length) {
    console.log("Processing lines after " + chunkStart);
    const output =
        (await translateNextChunk(inputMessages, chunkStart, 60).catch(() => null)) ??
        (await translateNextChunk(inputMessages, chunkStart, 50));
    const chunkSize = output.output_parsed.translationLines.length;
    const pageFileName = String(chunkStart).padStart(6, "0") + "_" + String(chunkStart + chunkSize).padStart(6, "0") + ".json";
    await fs.writeFile(path.join(OUTPUT_DIR, pageFileName), JSON.stringify(output, null, 4), "utf8");
    chunkStart += chunkSize;
}
