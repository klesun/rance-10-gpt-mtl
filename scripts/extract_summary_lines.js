/**
 * Collect the phrases あらすじモード still shows in Japanese into
 * summary_glossary.tsv, for somebody to write the English against.
 *
 *   node scripts/extract_summary_lines.js
 *
 * Rarely run -- a new game version, or a hand edit to
 * Rance10EX_v1_04/37_あらすじデータ.x -- which is why it is not in
 * package.json, the way scripts/parse_ain_txt.js is not. Running it after
 * hand-editing the glossary is harmless and reports what is wrong with it.
 *
 * It merges rather than overwrites: a phrase already carrying English keeps it,
 * and a phrase the game no longer has keeps it too, at the end of the file
 * under a heading. Nothing that was typed by hand is ever dropped by a re-run,
 * which is the whole reason this writes the file instead of leaving it to
 * paste columns around.
 */
import {
    readSummaryGlossary,
    readSummaryLines,
    reportSummaryGlossary,
    writeSummaryGlossary,
} from "../modules/SummaryLines.js";

const lines = await readSummaryLines();
const glossary = await readSummaryGlossary();
const written = await writeSummaryGlossary(lines, glossary);

console.log(reportSummaryGlossary(written, lines).join("\n"));
