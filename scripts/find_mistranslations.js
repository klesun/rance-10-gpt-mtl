import * as fs from "fs/promises";
import * as path from "path";
import {ROOT} from "../modules/Env.js";
import {readNameTable} from "../modules/NameNormalizer.js";
import {corpusDir, variantName} from "../modules/Variants.js";

// Reported against the same table and corpus a build of this variant would
// use, so what it finds is what the build would leave misspelled.
const VARIANT_ROOT = corpusDir(variantName());
const mistranslated_names = await readNameTable(VARIANT_ROOT);

const ROOT_FOLDER_PATH = path.join(VARIANT_ROOT, "gpt_outputs");

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

const getSentenceNames = (sentence) => {
    const matches = sentence.matchAll(/[^^.!?] ?([A-Z][\w-]+(?:\s+[A-Z][\w-]+)*)/g);
    return [...matches].map(m => m[1])
};

const charToSentencedToCount = {};

for (const chunkFile of chunkFiles) {
    const json = await fs.readFile(ROOT_FOLDER_PATH + "/" + chunkFile.fileName, "utf-8");
    let data;
    try {
        data = JSON.parse(json);
    } catch (error) {
        error.message += " - while reading " + chunkFile.fileName;
        throw error;
    }
    for (const lineRecord of data.output_parsed.translationLines) {
        for (const nameRecord of mistranslated_names) {
            if (!lineRecord.originalJapaneseLine.includes(nameRecord.shortNameJpn)) {
                continue;
            }
            const sentence = lineRecord.translatedEnglishLine;
            const shortNameEng = nameRecord.shortNameEng;
            if (sentence.includes(shortNameEng) || shortNameEng === "Hanny" && sentence.toLowerCase().includes("hannies")) {
                continue;
            }
            const alreadyRecorded = nameRecord.knownMistranslations.some(mistranslation => {
                return sentence.includes(mistranslation);
            }) || shortNameEng === "Lia" && sentence.includes("ria");
            const sentenceNames = getSentenceNames(lineRecord.translatedEnglishLine);
            if (!alreadyRecorded) {
                charToSentencedToCount[shortNameEng] = charToSentencedToCount[shortNameEng] ?? {};
                for (const sentenceName of sentenceNames) {
                    charToSentencedToCount[shortNameEng][sentenceName] = charToSentencedToCount[shortNameEng][sentenceName] ?? 0;
                    ++charToSentencedToCount[shortNameEng][sentenceName];
                }
                if (shortNameEng !== 'Kou' &&
                    shortNameEng !== 'Lia' &&
                    shortNameEng !== 'Lei' &&
                    shortNameEng !== 'Am' &&
                    shortNameEng !== 'Root' &&
                    shortNameEng !== 'Rance' &&
                    shortNameEng !== 'Ms. Crook' &&
                    sentenceNames.length > 0 &&
                    shortNameEng !== "Sioux"
                ) {
                    console.log("Missing name in translation: " + lineRecord.lineNumber + " - " + shortNameEng + " | " + sentenceNames.join(",") + " | " + lineRecord.translatedEnglishLine);
                }
            }
        }
    }
}

const getCharOccurrences = (sentencedToCount) => {
    return Object
        .values(sentencedToCount)
        .reduce((a,b) => a + b, 0);
};

const getSortedMistranslations = (sentencedToCount) => {
    return Object
        .entries(sentencedToCount)
        .sort((a,b) => b[1] - a[1])
        .map(a => a[0]);
};

const charEntries = Object.entries(charToSentencedToCount)
    .sort((a,b) => getCharOccurrences(b[1]) - getCharOccurrences(a[1]));

charEntries.forEach(entry => entry[1] = getSortedMistranslations(entry[1]))

// Every spelling this found, per character, commonest first -- the console
// output above is the same thing filtered down to what is worth reading. Not
// read by anything; it is here to be looked at when deciding what belongs in
// mistranslated_names.json.
await fs.writeFile(path.join(ROOT, "mistranslation_candidates.json"), JSON.stringify(charEntries), "utf-8");
