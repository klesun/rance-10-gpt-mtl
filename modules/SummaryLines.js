/**
 * The synopsis lines -- the rows あらすじモード prints for one event.
 *
 * They live in archives/Rance10EX_v1_04/37_あらすじデータ.x as a tree of one node per
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
 *   glossaries/summary_glossary.tsv   the English, written against the Japanese
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
export const SUMMARY_DATA = path.join(ROOT, "archives", "Rance10EX_v1_04", "37_あらすじデータ.x");

/** The English for it. Hand-written; this is the file to edit. */
export const SUMMARY_GLOSSARY = path.join(ROOT, "glossaries", "summary_glossary.tsv");

/**
 * The two scratch files a batch passes through: the prompt scripts/summary_chunk.js
 * writes, and the reply scripts/summary_merge.js reads back if given no path.
 *
 * In local/, which is gitignored, because a batch in flight is nobody else's
 * business and the glossary is where the result belongs.
 */
export const CHUNK_FILE = path.join(ROOT, "local", "summary_chunk.txt");
export const REPLY_FILE = path.join(ROOT, "local", "summary_reply.txt");

/**
 * What one row fits: the placeholder the layout carries for TextDesc in
 * archives/Rance10Pact_v1_04/Game/Adv/SceneSummary.pactex.x, which is seven lines of
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
    "# reads archives/Rance10EX_v1_04/37_あらすじデータ.x and keeps whatever English is",
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

/**
 * The game's table with the English written into it, as text to build from.
 *
 * Returned rather than written back over 37_あらすじデータ.x, and that is the
 * whole design: the glossary is keyed by the Japanese, so a table that had its
 * Japanese replaced would match nothing on the next build. Writing in place
 * would work exactly once, and the second run would quietly produce a table
 * with no English in it at all. scripts/ex.js builds from a copy instead, and
 * the file under version control stays as the game shipped it.
 *
 * Field ００ is left alone with everything else the loop does not read -- see
 * DISPLAYED_FIELD -- so the width ruler the designers worked against stays
 * where the next person to measure a line will find it.
 */
export const renderSummaryTable = async () => {
    const source = await fs.readFile(SUMMARY_DATA, "utf-8");
    const glossary = await readSummaryGlossary();
    const budget = getTextWidth(LONGEST_LINE);

    const overlong = [];
    let translated = 0;
    let untranslated = 0;
    // Line ends are left to the replacement: $ sits before the \r of a CRLF
    // file, so the endings this file arrives with are the endings it leaves
    // with, whatever the checkout did to them.
    const text = source.replace(/^(\t\t)(\S+)( = ")([^"]*)(",)$/gm,
        (line, indent, field, between, japanese, tail) => {
            if (!DISPLAYED_FIELD.test(toAscii(field)) || !japanese) {
                return line;
            }
            const english = glossary.get(japanese);
            if (!english) {
                if (JAPANESE.test(japanese)) {
                    ++untranslated;
                }
                return line;
            }
            ++translated;
            if (getTextWidth(english) > budget) {
                overlong.push(`${japanese} -> ${english}`);
            }
            return indent + field + between + english + tail;
        });

    return {
        text,
        overlong,
        report: `${translated} synopsis fields`
            + (untranslated ? `, ${untranslated} still Japanese` : "")
            + (overlong.length ? `, ${overlong.length} too wide for the panel` : ""),
    };
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
