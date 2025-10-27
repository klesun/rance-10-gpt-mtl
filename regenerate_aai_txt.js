import * as fs from "fs/promises";
import {replaceUnicode, wrapAt} from "./modules/TextNormalization.js";


const v100AinJson = await fs.readFile("./Rance10.v1.00.ain.json", "utf-8");
const v100AinData = JSON.parse(v100AinJson);

const v104AinJson = await fs.readFile("./Rance10.v1.04.ain.json", "utf-8");
const v104AinData = JSON.parse(v104AinJson);

const mapLineNumbers = (v100AinData, v104AinData) => {
    let v100Offset = 0;
    let v104LastMappedOffset = -1;
    const mapping = new Map();
    done:
    while (v100Offset < v100AinData.length) {
        for (let v104Offset = v104LastMappedOffset + 1; v104Offset < v104AinData.length; ++v104Offset) {
            const v100Record = v100AinData[v100Offset];
            const v104Record = v104AinData[v104Offset];
            if (v100Record.originalJapaneseLine === v104Record.originalJapaneseLine) {
                mapping.set(+v100Record.lineNumber, +v104Record.lineNumber);
                ++v100Offset;
                v104LastMappedOffset = v104Offset;
                if (v100Offset === v100AinData.length) {
                    break done;
                }
            }
        }
        ++v100Offset;
    }
    const mapped = new Set(mapping.values());
    const unmapped = v104AinData.filter(rec => !mapped.has(+rec.lineNumber));
    return [mapping, unmapped];
};

const [v100ToV104, unmapped] = mapLineNumbers(v100AinData, v104AinData);

await fs.writeFile("unmapped.ain.json", JSON.stringify(unmapped, null, 4), "utf-8");

const ROOT_FOLDER_PATH_V1_00 = "./gpt_outputs";
const ROOT_FOLDER_PATH_V1_04 = "./gpt_outputs_v104";

const readTranslations = async (folderPath) => {
    const chunkFileNames = await fs.readdir(folderPath);
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
        const json = await fs.readFile(folderPath + "/" + chunkFile.fileName, "utf-8");
        const data = JSON.parse(json);
        allLineRecords.push(...data.output_parsed.translationLines);
    }

    return allLineRecords;
};

const allLineRecordsV100 = await readTranslations(ROOT_FOLDER_PATH_V1_00);
const allLineRecordsV104 = await readTranslations(ROOT_FOLDER_PATH_V1_04);

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

const output = allLineRecordsV100
    .flatMap(lr => {
        const v104LineNumber = v100ToV104.get(+lr.lineNumber);
        if (!v104LineNumber) {
            return [];
        } else {
            return { ...lr, lineNumber: v104LineNumber };
        }
    })
    .concat(allLineRecordsV104)
    .flatMap(lr => {
        let text = normalizeNames(lr);
        text = replaceUnicode(text);
        // if (text.match(/[^\x00-\x7F♪☆○Σ]/)) {
        //     throw new Error("Got unicode characters, please remove: " + text + " at " + lr.lineNumber);
        // }
        text = wrapAt(text, LONGEST_LINE);
        return [`m[${lr.lineNumber}] = ${JSON.stringify(text)}`];
    })
    .join("\n") + "\n";

await fs.writeFile("regenerated.ain.txt", output, "utf-8");
