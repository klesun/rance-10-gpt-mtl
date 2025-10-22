import * as fs from "fs/promises";

// language=file-reference
const mistranslated_names_str = await fs.readFile("./mistranslated_names.json", "utf-8");
const mistranslated_names = JSON.parse(mistranslated_names_str);

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

const getSentenceNames = (sentence) => {
    const matches = sentence.matchAll(/[^^.!?] ([A-Z]\w+(?:\s+[A-Z]\w+)*)/g);
    return [...matches].map(m => m[1])
};

const charToSentencedToCount = {};

for (const chunkFile of chunkFiles) {
    const json = await fs.readFile(ROOT_FOLDER_PATH + "/" + chunkFile.fileName, "utf-8");
    const data = JSON.parse(json);
    for (const lineRecord of data.output_parsed.translationLines) {
        for (const nameRecord of mistranslated_names) {
            if (!lineRecord.originalJapaneseLine.includes(nameRecord.shortNameJpn)) {
                continue;
            }
            const sentence = lineRecord.translatedEnglishLine;
            const shortNameEng = nameRecord.shortNameEng;
            if (sentence.includes(shortNameEng)) {
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
                console.log("Missing name in translation: " + lineRecord.translatedEnglishLine.split(/\s+/)[0] + " | " + shortNameEng);
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

await fs.writeFile("./zalupa.json", JSON.stringify(charEntries), "utf-8");
