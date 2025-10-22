import * as fs from "fs/promises";
import {replaceUnicode, wrapAt} from "./modules/TextNormalization.js";


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

// language=file-reference
const mistranslated_names_str = await fs.readFile("./mistranslated_names.json", "utf-8");
const mistranslated_names = JSON.parse(mistranslated_names_str);
mistranslated_names.forEach(char => char.knownMistranslations.sort((a,b) => b.length - a.length));

const normalizeNames = (lineRecord) => {
    let sentence = lineRecord.translatedEnglishLine;
    for (const nameRecord of mistranslated_names) {
        if (!lineRecord.originalJapaneseLine.includes(nameRecord.shortNameJpn)) {
            continue;
        }
        const shortNameEng = nameRecord.shortNameEng;
        if (sentence.includes(shortNameEng)) {
            continue;
        }
        for (const mistranslation of nameRecord.knownMistranslations) {
            const beforeUpdate = sentence;
            sentence = sentence.replaceAll(mistranslation, shortNameEng);
            if (beforeUpdate !== sentence) {
                if (lineRecord.lineNumber === 130051) {
                    console.log("Replace: ", beforeUpdate, mistranslation, sentence);
                }
            }
        }
    }
    return sentence;
};

const output = allLineRecords
    .map(lr => {
        let text = normalizeNames(lr);
        text = replaceUnicode(text);
        // if (text.match(/[^\x00-\x7F♪☆○Σ]/)) {
        //     throw new Error("Got unicode characters, please remove: " + text + " at " + lr.lineNumber);
        // }
        text = wrapAt(text, LONGEST_LINE);
        return `m[${lr.lineNumber}] = ${JSON.stringify(text)}`;
    })
    .join("\n") + sysTranslations + "\n";

await fs.writeFile("regenerated.ain.txt", output, "utf-8");