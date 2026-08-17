/**
 * The synopsis lines -- the rows あらすじモード prints for one event.
 *
 * They live in Rance10EX_v1_04/37_あらすじデータ.x as a tree of one node per
 * event, each node holding numbered fields:
 *
 *     ２２１／２／ラングバウ到着 = {
 *         ００ = "｜−−−−−−−−｜−−−−−−−−−｜",
 *         ０１ = "ラング・バウに到着",
 *         ０２ = "",
 *         ０３ = "まずは寝る",
 *         ...
 *
 * The node name is a key -- SceneSummary looks the event up by it, and
 * SummaryData@Desc::get then reads あらすじデータ.<node>.%02D -- so it stays
 * Japanese whatever happens to the text. The fields are display-only: their
 * only reader is the TextDesc part of Game/Adv/SceneSummary.pactex.
 *
 * Two files hold the translation between them, the way the enemy status lines
 * do (see modules/EnemyInfo.js):
 *
 *   37_あらすじデータ.x    the game's own table, which the English is written into
 *   summary_glossary.tsv   the English, written against the Japanese
 *
 * Keyed by the Japanese rather than by node and field: 6414 filled fields are
 * 4465 distinct phrases, "戦闘開始" alone appearing 85 times, and a phrase the
 * game repeats should be translated once rather than once per event.
 */
import * as fs from "fs/promises";
import * as path from "path";
import {ROOT} from "./Env.js";
import {createNameChecker} from "./NameNormalizer.js";
import {getTextWidth} from "./TextNormalization.js";

/** The game's own table. Written into by the build, never by hand. */
export const SUMMARY_DATA = path.join(ROOT, "Rance10EX_v1_04", "37_あらすじデータ.x");

/** The English for it. Hand-written; this is the file to edit. */
export const SUMMARY_GLOSSARY = path.join(ROOT, "summary_glossary.tsv");

/**
 * What one row fits: the placeholder the layout carries for TextDesc in
 * Rance10Pact_v1_04/Game/Adv/SceneSummary.pactex.x, which is seven lines of
 * twenty full-width characters.
 *
 * The designers left the same measure in the data itself -- field ００ of most
 * nodes is a ruler, "｜−−−−−−−−｜−−−−−−−−−｜", with its marks at 1, 10 and 20.
 * Nothing wraps: each field is its own row, so an overlong one runs off the
 * panel rather than folding onto the next, which is why this is checked rather
 * than fixed up.
 */
export const LONGEST_LINE = "１２３４５６７８９０１２３４５６７８９０";

/**
 * The fields the game actually prints.
 *
 * SummaryData@Desc::get loops i from 0 to 9 and formats "%s.%s.%02D" with
 * i + 1, so ０１ through １０ are read and ００ -- the width ruler above, and
 * the only thing ever found in it -- is not. Translating ００ would be work
 * nobody can see.
 */
const DISPLAYED_FIELD = /^(0[1-9]|10)$/;

const toAscii = (fullWidth) => fullWidth.replace(/[０-９]/g, char =>
    String.fromCharCode(char.charCodeAt(0) - "０".charCodeAt(0) + "0".charCodeAt(0)));

/** Kana or kanji: what is left is separators and text already in English. */
const JAPANESE = /[぀-ヿ㐀-䶿一-鿿]/;

/**
 * Every displayed phrase in the table, in the order the file has them, with the
 * events each one appears in.
 *
 * File order is narrative order, which is the order to translate in: "まずは寝る"
 * means something once you have read the line above it.
 */
export const readSummaryLines = async () => {
    const text = await fs.readFile(SUMMARY_DATA, "utf-8");
    const lines = new Map();
    let node = null;
    for (const line of text.split(/\r?\n/)) {
        const nodeMatch = line.match(/^\t(\S.*?) = \{$/);
        if (nodeMatch) {
            node = nodeMatch[1];
            continue;
        }
        const fieldMatch = line.match(/^\t\t(\S+) = "([^"]*)",$/);
        if (!fieldMatch || !DISPLAYED_FIELD.test(toAscii(fieldMatch[1]))) {
            continue;
        }
        const japanese = fieldMatch[2];
        if (!japanese || !JAPANESE.test(japanese)) {
            continue;
        }
        if (!lines.has(japanese)) {
            lines.set(japanese, {japanese, nodes: []});
        }
        lines.get(japanese).nodes.push(node);
    }
    if (!lines.size) {
        throw new Error(`No synopsis lines in ${SUMMARY_DATA}. Either the file is not the tree`
            + " of numbered fields it used to be, or it is not there at all.");
    }
    return [...lines.values()];
};

/** The English by the Japanese, blank second column included. */
export const readSummaryGlossary = async () => {
    let text;
    try {
        text = await fs.readFile(SUMMARY_GLOSSARY, "utf-8");
    } catch (error) {
        if (error.code === "ENOENT") {
            return new Map();
        }
        throw error;
    }
    return new Map(text.split(/\r?\n/)
        .filter(line => line.trim() && !line.startsWith("#"))
        .map(line => line.split("\t"))
        .map(([japanese, english]) => [japanese, (english ?? "").trim()]));
};

const HEADER = [
    "# The English for the synopsis lines -- the rows あらすじモード prints when you",
    "# pick an event you have already seen. Hand-written; this is the file to edit.",
    "#",
    "# Columns: the Japanese <TAB> the English.",
    "#",
    "# The Japanese column is filled in by scripts/extract_summary_lines.js, which",
    "# reads Rance10EX_v1_04/37_あらすじデータ.x and keeps whatever English is",
    "# already here. A line left blank stays Japanese in game.",
    "#",
    "# Keyed by the Japanese rather than by event, because the same phrase serves",
    "# many events -- 戦闘開始 opens 85 of them -- and should be translated once.",
    "# The order is the order the game's own table has, which is the order the",
    "# story happens in: a line reads differently once you have read the one above.",
    "#",
    `# One row fits about twenty full-width characters (${LONGEST_LINE}),`,
    "# which is both the placeholder in Game/Adv/SceneSummary.pactex and the ruler",
    "# the designers left in field ００ of the table. Nothing wraps, so a longer",
    "# line runs off the panel; the scripts below report which ones do.",
    "#",
    "# Translating a chunk at a time: scripts/summary_chunk.js prints the next",
    "# untranslated rows as a prompt, scripts/summary_merge.js reads the reply back",
    "# in. Nothing applies this file to the game yet -- the English still has to be",
    "# written into 37_あらすじデータ.x, which is what npm run regenerate-ex builds.",
    "",
].join("\n");

const STALE_HEADING = [
    "",
    "# --- Phrases the game's table no longer has ---------------------------------",
    "# Kept because somebody wrote the English, not because anything reads them.",
    "# Delete a row once you are sure the phrase is gone for good rather than",
    "# reworded upstream.",
    "",
].join("\n");

/**
 * Write the glossary back, and say what is in it.
 *
 * Every row of the game's table, in its order, plus -- under a heading -- the
 * translated phrases the table no longer has. Nothing typed by hand is dropped
 * by a rewrite, which is what makes it safe to run either script as often as
 * you like.
 */
export const writeSummaryGlossary = async (lines, glossary) => {
    const checkNames = await createNameChecker();
    const budget = getTextWidth(LONGEST_LINE);

    const rows = [];
    const overlong = [];
    const misnamed = [];
    let translated = 0;
    for (const {japanese} of lines) {
        const english = glossary.get(japanese) ?? "";
        if (english) {
            ++translated;
            if (getTextWidth(english) > budget) {
                overlong.push(`${japanese} -> ${english}`);
            }
            misnamed.push(...checkNames(japanese, english));
        }
        rows.push(`${japanese}\t${english}`);
    }

    const known = new Set(lines.map(line => line.japanese));
    const stale = [...glossary].filter(([japanese, english]) => english && !known.has(japanese));

    await fs.writeFile(SUMMARY_GLOSSARY, HEADER + rows.join("\n") + "\n"
        + (stale.length ? STALE_HEADING + stale.map(row => row.join("\t")).join("\n") + "\n" : ""),
        "utf-8");

    return {translated, overlong, misnamed, stale};
};

/** What writeSummaryGlossary found, as lines to print. */
export const reportSummaryGlossary = ({translated, overlong, misnamed, stale}, lines) => {
    const report = [`${translated} of ${lines.length} phrases have English`
        + ` -> ${path.relative(ROOT, SUMMARY_GLOSSARY)}`];
    report.push(...misnamed.map(complaint => `  ${complaint}`));
    if (overlong.length) {
        report.push(`  ${overlong.length} too wide for the panel:`);
        report.push(...overlong.slice(0, 5).map(row => `    ${row}`));
    }
    if (stale.length) {
        report.push(`  ${stale.length} translated phrases the game's table no longer has,`
            + " kept at the end of the file");
    }
    return report;
};
