import {createCanvas} from "canvas";


export const replaceUnicode = text => {
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

const wrap = (text, maxLengthRef) => {
    const maxWidth = getTextWidth(maxLengthRef);
    const words = text.split(/\s+/);
    const wrappedLines = [""];
    let widthUsed = 0;
    for (const word of words) {
        let space = wrappedLines[wrappedLines.length - 1] !== "" ? " " : "";
        const spaceWidth = getTextWidth(space);
        const wordWidth = getTextWidth(word);
        if (widthUsed + spaceWidth + wordWidth <= maxWidth) {
            wrappedLines[wrappedLines.length - 1] += space + word;
            widthUsed += spaceWidth + wordWidth;
        } else {
            wrappedLines.push(word);
            widthUsed = wordWidth;
        }
    }
    return wrappedLines.join("\n");
};

export const wrapAt = (text, maxLengthRef) => {
    if (text.includes("\n")) {
        return text; // already wrapped
    }
    if (getTextWidth(text) <= getTextWidth(maxLengthRef)) {
        return text;
    }
    return wrap(text, maxLengthRef);
};