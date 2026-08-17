/**
 * The enemy status lines -- the four hints under an enemy's stats in battle.
 *
 * They are string literals rather than dialogue, so translating one is
 * assigning to its string slot, and the same slot serves every enemy pushing
 * that text. Two files hold this between them:
 *
 *   enemy_info_lines.v1.04.tsv   which slots they are, found in the code by
 *                                scripts/extract_enemy_info.js
 *   glossaries/enemy_info_glossary.tsv      the English, written against the Japanese
 *
 * Keying the English by the Japanese rather than by slot number is what keeps
 * the two apart: the numbers belong to one build of one version of the game,
 * the text does not, and a line the game repeats is translated once by
 * construction rather than by remembering to. This module joins them.
 */
import * as fs from "fs/promises";
import * as path from "path";
import {ROOT} from "./Env.js";
import {createNameChecker} from "./NameNormalizer.js";
import {getTextWidth} from "./TextNormalization.js";

export const ENEMY_INFO_GLOBALS = ["◆敵情報１", "◆敵情報２", "◆敵情報３", "◆敵情報４"];

export const ENEMY_INFO_LINES = path.join(ROOT, "enemy_info_lines.v1.04.tsv");
export const ENEMY_INFO_GLOSSARY = path.join(ROOT, "glossaries", "enemy_info_glossary.tsv");

/**
 * What the panel fits on one line: the placeholder text the layout carries for
 * it, in Rance10Pact_v1_04/Game/Battle/EnemyInformationView.pactex.x, which is
 * four lines of twenty full-width characters. The four lines are separate
 * globals, so nothing wraps between them -- an overlong line runs off the
 * panel rather than folding onto the next one, which is why this is checked
 * rather than fixed up.
 */
const LONGEST_LINE = "１２３４５６７８９ａ１２３４５６７８９ａ";

/** Every s[] in an ain.txt dump, by slot. */
export const readAinStrings = async (ainTxtPath) => {
    const text = await fs.readFile(ainTxtPath, "utf-8");
    const strings = new Map();
    for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^;?s\[(\d+)]\s*=\s*(".*")$/);
        if (!match) {
            continue;
        }
        // alice-tools writes a tab and a newline as themselves inside the
        // quotes, which JSON will not read back.
        const quoted = match[2].replace(/[\x00-\x1f]/g, char =>
            "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0"));
        if (!strings.has(+match[1])) {
            strings.set(+match[1], JSON.parse(quoted));
        }
    }
    return strings;
};

const readTsv = async (filePath) => {
    const text = await fs.readFile(filePath, "utf-8");
    return text.split(/\r?\n/)
        .filter(line => line.trim() && !line.startsWith("#"))
        .map(line => line.split("\t"));
};

export const readEnemyInfoLines = async () => {
    const rows = await readTsv(ENEMY_INFO_LINES);
    return rows.map(([slot, japanese, uses]) => ({
        slot: Number(slot),
        japanese: JSON.parse(japanese),
        uses: Number(uses),
    }));
};

export const readEnemyInfoGlossary = async () => {
    const rows = await readTsv(ENEMY_INFO_GLOSSARY);
    return new Map(rows.map(([japanese, english]) => [japanese, english ?? ""]));
};

/**
 * The s[] assignments to append to the patch alice-tools applies, plus what to
 * say about them.
 *
 * A line with no English is left out rather than blanked: the panel then shows
 * the Japanese, which is the same thing it showed before this file existed and
 * tells you at a glance what is still to do. A line too wide for the panel is
 * reported and still written -- it is legible, just untidy, and stopping a
 * whole build over one of them helps nobody.
 */
export const renderEnemyInfo = async () => {
    const lines = await readEnemyInfoLines();
    const glossary = await readEnemyInfoGlossary();
    const checkNames = await createNameChecker();
    const budget = getTextWidth(LONGEST_LINE);

    const output = [];
    const overlong = [];
    const misnamed = [];
    let untranslated = 0;
    for (const {slot, japanese} of lines) {
        const english = glossary.get(japanese);
        if (!english) {
            ++untranslated;
            continue;
        }
        if (getTextWidth(english) > budget) {
            overlong.push(english);
        }
        misnamed.push(...checkNames(japanese, english));
        output.push(`s[${slot}] = ${JSON.stringify(english)}`);
    }

    const known = new Set(lines.map(line => line.japanese));
    const stale = [...glossary.keys()].filter(japanese => !known.has(japanese));

    return {
        text: output.join("\n"),
        report: `${output.length} of ${lines.length} enemy status lines`
            + (untranslated ? `, ${untranslated} still Japanese` : "")
            + (overlong.length ? `, ${overlong.length} too wide for the panel` : "")
            + (misnamed.length ? `, ${misnamed.length} spelling a name their own way` : "")
            + (stale.length ? `, ${stale.length} glossary entries the game no longer has` : ""),
        overlong,
        misnamed,
        stale,
    };
};
