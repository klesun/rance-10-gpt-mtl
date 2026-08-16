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
        .replace(/ /g, " ")
        .replace(/―/g, "-")
        .replace(/ー/g, "~")
        .replace(/–/g, "-")
        // Not the numeral: a translation that leaves a dash in Japanese reaches
        // for whichever character looked like one, and 一 is the one that keeps
        // turning up mid-sentence -- "As Carolly walked一".
        .replace(/一/g, "-")
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

const WRAP_SAFETY_MARGIN = 0.9;

const wrap = (text, maxLengthRef) => {
    const maxWidth = getTextWidth(maxLengthRef) * WRAP_SAFETY_MARGIN;
    // A line that opens with a full-width space keeps it. That space is an
    // indent rather than a gap between words -- it sits the continuation of a
    // quote under the bracket that opened it -- and splitting on whitespace
    // would drop it on exactly the long lines that get wrapped, leaving those
    // alone flush against the window edge while their neighbours are indented.
    // An ASCII space in the same place is not that, and stays spacing.
    const indent = text.match(/^　*/)[0];
    const words = text.slice(indent.length).split(/\s+/);
    const wrappedLines = [""];
    let widthUsed = getTextWidth(indent);
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
    wrappedLines[0] = indent + wrappedLines[0];
    return wrappedLines.join("\n");
};

export const wrapAt = (text, maxLengthRef) => {
    if (text.includes("\n")) {
        return text; // already wrapped
    }
    if (getTextWidth(text) <= getTextWidth(maxLengthRef) * WRAP_SAFETY_MARGIN) {
        return text;
    }
    return wrap(text, maxLengthRef);
};