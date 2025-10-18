import * as fs from "fs/promises";
import {replaceUnicode, wrapAt} from "./modules/TextNormalization";


const sysTranslations = await fs.readFile("./system_cherry_picks.ain.txt", "utf-8");

const ROOT_FOLDER_PATH = "./gpt_outputs";

const chunkFileNames = await fs.readdir(ROOT_FOLDER_PATH);
const chunkFiles = chunkFileNames
    .map(fileName => {
        const [, startLineNumber, endLineNumber] = fileName.match(/^(\d+)_(\d+)\.json$/);
        return {
            fileName,
            startLineNumber: Number(startLineNumber),
            endLineNumber: Number(endLineNumber),
        };
    })
    .sort((a,b) => a.startLineNumber - b.startLineNumber);

const allLineRecords = [];

for (const chunkFile of chunkFiles) {
    const json = await fs.readFile(ROOT_FOLDER_PATH + "/" + chunkFile.fileName, "utf-8");
    const data = JSON.parse(json);
    allLineRecords.push(...data.output_parsed.translationLines);
}
const LONGEST_LINE = "“More importantly, what we should discuss now is how the other";

const output = allLineRecords
    .map(lr => {
        let text = replaceUnicode(lr.translatedEnglishLine);
        // if (text.match(/[^\x00-\x7F♪☆○Σ]/)) {
        //     throw new Error("Got unicode characters, please remove: " + text + " at " + lr.lineNumber);
        // }
        text = wrapAt(text, LONGEST_LINE);
        return `m[${lr.lineNumber}] = ${JSON.stringify(text)}`;
    })
    .join("\n") + sysTranslations + "\n";

await fs.writeFile("regenerated.ain.txt", output, "utf-8");