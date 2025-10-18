import * as fs from "fs/promises";
import { createCanvas } from 'canvas';

const canvas = createCanvas(200, 50);
const ctx = canvas.getContext('2d');

ctx.font = '14px Meiryo';

const CHAR_WIDTH_CACHE = new Map();
const getCharWidth = (char) => {
    const fromCache = CHAR_WIDTH_CACHE.get(char);
    if (fromCache !== undefined) {
        return fromCache;
    }
    const width = ctx.measureText(char).width;
    CHAR_WIDTH_CACHE.set(char, width);
    return width;
};

const getTextWidth = (text) => {
    return text.split("")
        .map(getCharWidth)
        .reduce((a,b) => a + b, 0);
};

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
const MAX_LINE_WIDTH = getTextWidth(LONGEST_LINE);
const shouldWrap = (text) => {
    if (text.includes("\n")) {
        return false; // already wrapped
    }
    return getTextWidth(text) > MAX_LINE_WIDTH;
};

const wrap = (text) => {
    const words = text.split(/\s+/);
    // assuming that all words are of same length...
    const middleWordIndex = Math.floor(words.length / 2);
    if (middleWordIndex === 0) {
        // single long word - wrap by character
        const middleCharIndex = Math.floor(text.length / 2);
        return text.slice(0, middleCharIndex) + "\n" + text.slice(middleCharIndex);
    } else {
        return words.slice(0, middleWordIndex).join(" ") + "\n" + words.slice(middleWordIndex).join(" ");
    }
};

const removeUnicode = text => {
    return text.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/’/g, "'")
        .replace(/—/g, "-")
        .replace(/”/g, "\"")
        .replace(/„/g, "\"")
        .replace(/“/g, "\"")
        .replace(/‽/g, "!?")
        .replace(/…/g, "...")
        .replace(/ /g, " ")
        .replace(/ /g, " ")
        .replace(/―/g, "-")
        .replace(/ー/g, "~")
        .replace(/–/g, "-")
        .replace(/ズ/g, "")
        ;
};

const output = allLineRecords
    .map(lr => {
        let text = removeUnicode(lr.translatedEnglishLine);
        // if (text.match(/[^\x00-\x7F♪☆○Σ]/)) {
        //     throw new Error("Got unicode characters, please remove: " + text + " at " + lr.lineNumber);
        // }
        if (shouldWrap(text)) {
            text = wrap(text);
        }
        return `m[${lr.lineNumber}] = ${JSON.stringify(text)}`;
    })
    .join("\n") + sysTranslations + "\n";

await fs.writeFile("regenerated.ain.txt", output, "utf-8");