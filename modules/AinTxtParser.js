
function unquote(quoted) {
    return JSON.parse(quoted.replace(/\t/g, "\\t"));
}

export default function parseAin(ainTxt) {
    const unparsed = [];
    const parsed = [];

    const lines = ainTxt.split("\n");
    for (const line of lines) {
        if (!line.trim()) {
            continue;
        }
        const match = line.match(/^(;|)([ms])\[(\d+)]\s*=\s*(".*")$/);
        if (match) {
            const [, commented, lineKind, lineNumber, quotedText] = match;
            const originalJapaneseLine = unquote(quotedText);
            parsed.push({ lineKind, lineNumber, commented: !!commented, originalJapaneseLine });
        } else {
            unparsed.push(line);
        }
    }

    return { parsed, unparsed };
}