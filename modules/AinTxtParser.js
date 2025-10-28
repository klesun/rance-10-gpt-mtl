
function unquote(quoted) {
    return JSON.parse(quoted.replace(/\t/g, "\\t"));
}

/**
 * @param {string} ainTxt = `
 * ; activity::detail::CActivity@LoadActivity
 * ;s[8] = "アクティビティの読み込みに失敗しました【%s】"
 * ;m[63840] = "荒々しくハイパー兵器を捻り込んだ。"
 * `
 * @return {{
 *     unparsed: string[],
 *     parsed: {
 *         lineKind: "m" | "s",
 *         lineNumber: number,
 *         commented: boolean,
 *         originalJapaneseLine: "「なーーーーにを上から見下ろしてるかーーー！」" | string,
 *     }[],
 * }}
 */
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
            parsed.push({ lineKind, lineNumber: +lineNumber, commented: !!commented, originalJapaneseLine });
        } else {
            unparsed.push(line);
        }
    }

    return { parsed, unparsed };
}