import * as fs from "fs/promises";

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

const output = allLineRecords
    .map(lr => `m[${lr.lineNumber}] = ${JSON.stringify(lr.translatedEnglishLine)}`)
    .join("\n");

await fs.writeFile("regenerated.ain.txt", output, "utf-8");