/**
 * Turn the m[] lines of the ain.txt dump into the JSON scripts/regenerate_aai_txt.js
 * reads.
 *
 *   node scripts/parse_ain_txt.js
 *
 * Rarely run -- only a new game version needs it, which is why it is not in
 * package.json -- and that is exactly why it checks itself before writing. See
 * the guard below.
 */
import fs from "fs/promises";
import parseAin from "../modules/AinTxtParser.js";
import {AIN_JSON, AIN_TXT} from "../modules/AinFiles.js";

/**
 * How many records the output file already holds, or null if it is not there.
 *
 * Counted from the newlines rather than by parsing 30 MB of JSON, which the
 * shape below makes exact: one record per line, "[" and "]" on their own.
 */
const recordsAlreadyThere = async (file) => {
    try {
        const text = await fs.readFile(file, "utf-8");
        return text.split("\n").length - 2;
    } catch (error) {
        if (error.code === "ENOENT") {
            return null;
        }
        throw error;
    }
};

const ainTxt = await fs.readFile(AIN_TXT, "utf-8");

const { parsed, unparsed } = parseAin(ainTxt);

// the s[] lines sometimes also store some displayed text (user interface mostly),
// but some of the text in s[] are internal constant names, not free form text, so
// only selected few s[] lines should be touched, exclusively by cherry-picking
const messageLines = parsed.filter(lr => lr.lineKind === "m");
const outputJson = "[\n" + messageLines.map(ml => JSON.stringify(ml)).join(",\n") + "\n]";

/*
 * Refuse to shrink the file instead of truncating it.
 *
 * Nothing above fails loudly. A parse that matches no line at all still yields
 * a well-formed empty array, and writing it replaces the 30 MB the build reads
 * with four bytes, silently and with exit code 0. That is not hypothetical: the
 * parser split on "\n" alone, so on a checkout with core.autocrlf=true every
 * line kept a trailing \r, the anchored match never fired, and the file went to
 * "[]" -- recoverable only because it is under version control.
 *
 * The count of what is already there is the only yardstick that does not go
 * stale, so a real drop -- a new game version with fewer messages -- is a
 * deleted file away.
 */
const before = await recordsAlreadyThere(AIN_JSON);
if (before !== null && messageLines.length < before * 0.9) {
    console.error(`Parsed ${messageLines.length} m[] lines, but ${AIN_JSON} already holds ${before}.`);
    console.error(`${unparsed.length} of the dump's ${parsed.length + unparsed.length} lines did not match --`
        + " if that is most of them, the dump is not what the parser expects.");
    console.error("Nothing written. Delete the file first if the drop is real.");
    process.exit(1);
}

await fs.writeFile(AIN_JSON, outputJson, "utf-8");