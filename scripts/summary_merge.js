/**
 * Read a chat's answer to scripts/summary_chunk.js back into
 * summary_glossary.tsv.
 *
 *   node scripts/summary_merge.js local/reply.txt
 *   node scripts/summary_merge.js local/reply.txt --force
 *   node scripts/summary_chunk.js | ... | node scripts/summary_merge.js
 *
 * Takes the reply exactly as it comes -- code fence, stray "Here you go:",
 * "12. " instead of "12<TAB>", the Japanese echoed back before the English --
 * and reports every line it could not place rather than guessing. Rows that
 * already carry English are left alone unless --force says otherwise, so
 * re-merging an old reply cannot undo a hand correction.
 *
 * A row is matched by the number, never by position, so a refused or dropped
 * line costs that line and nothing after it.
 */
import * as fs from "fs/promises";
import {
    readSummaryGlossary,
    readSummaryLines,
    reportSummaryGlossary,
    writeSummaryGlossary,
} from "../modules/SummaryLines.js";

const JAPANESE = /[぀-ヿ㐀-䶿一-鿿]/;

const readStdin = async () => {
    const chunks = [];
    for await (const chunk of process.stdin) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf-8");
};

const force = process.argv.includes("--force");
const file = process.argv.slice(2).find(arg => !arg.startsWith("--"));
const reply = file ? await fs.readFile(file, "utf-8") : await readStdin();

const lines = await readSummaryLines();
const glossary = await readSummaryGlossary();

const applied = [];
const skipped = [];
for (const line of reply.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("```")) {
        continue;
    }
    // The number, then whatever the model used to part it from the text.
    const match = line.match(/^\s*(\d+)\s*[\t.):\]-]?\s*(.+)$/);
    const row = match && lines[Number(match[1]) - 1];
    if (!row) {
        skipped.push(`no row of the glossary has that number -- ${JSON.stringify(line)}`);
        continue;
    }
    // A tab inside the English would make a third column nothing reads, and the
    // Japanese echoed back in front of it is the model being helpful.
    let english = match[2].replaceAll("\t", " ").trim();
    if (english.startsWith(row.japanese)) {
        english = english.slice(row.japanese.length).trim();
    }
    if (!english) {
        skipped.push(`nothing but the Japanese back -- ${row.japanese}`);
        continue;
    }
    if (JAPANESE.test(english)) {
        skipped.push(`came back in Japanese -- ${row.japanese} -> ${english}`);
        continue;
    }
    const before = glossary.get(row.japanese);
    if (before && before !== english && !force) {
        skipped.push(`already translated, left alone -- ${row.japanese} -> ${before}`
            + ` (the reply says ${english})`);
        continue;
    }
    glossary.set(row.japanese, english);
    applied.push(row.japanese);
}

if (!applied.length && !force) {
    console.error("Nothing to apply: no line of the reply looked like <number> <english>.");
    process.exit(1);
}

const written = await writeSummaryGlossary(lines, glossary);

console.log(`Applied ${applied.length} phrases; ${reportSummaryGlossary(written, lines).join("\n")}`);
for (const complaint of skipped) {
    console.log(`  skipped: ${complaint}`);
}
