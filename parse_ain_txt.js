import fs from "fs/promises";

const ainTxt = await fs.readFile("./Rance10.ain.txt", "utf-8");
const lines = ainTxt.split("\n");

const unparsed = [];
const parsed = [];

function unquote(quoted) {
    return JSON.parse(quoted.replace(/\t/g, "\\t"));
}

for (const line of lines) {
    if (!line.trim()) {
        continue;
    }
    const match = line.match(/^;([ms])\[(\d+)]\s*=\s*(".*")$/);
    if (match) {
        const [, lineKind, lineNumber, quotedText] = match;
        if (quotedText.includes("%")) {
            // ;s[2259] = "*	%s = %f\n"
            // apparently this text may use variables
            unparsed.push(line);
            continue;
        }
        const text = unquote(quotedText);
        parsed.push({ lineKind, lineNumber, text });
    } else {
        unparsed.push(line);
    }
}

// the s[] lines sometimes also store some displayed text (user interface mostly),
// but some of the text in s[] are internal constant names, not free form text, so
// only selected few s[] lines should be touched, exclusively by cherry-picking
const messageLines = parsed.filter(lr => lr.lineKind === "m");
const outputJson = "[\n" + messageLines.map(ml => JSON.stringify(ml)).join(",\n") + "\n]";

await fs.writeFile("./Rance10.ain.json", outputJson, "utf-8");