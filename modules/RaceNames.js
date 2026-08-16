/**
 * The race on the enemy status panel -- the 種族：%s line above BOSS.
 *
 * The label is a cherry-picked string like any other. The word after it is not:
 * an enemy's race is an int, ▲種族, and 表示種族 turns it into one of nineteen
 * words. Translating those nineteen strings where they sit is what this exists
 * to avoid, because six of them are also something else somewhere:
 *
 *   モンスター       Party::OrganizationIdFromString runs String.Contains on it,
 *                    so it is half of how a faction is parsed out of a name.
 *                    system_cherry_picks.v1.04.ain.txt has carried a DO NOT
 *                    CHANGE on it for years -- translating it turns every
 *                    monster card into a black rectangle.
 *   人類             returned by SituationGauge@GetColorString, paired with 魔軍,
 *                    which is a name being used to choose a colour.
 *   女の子モンスター  the speaker's nameplate in ●台詞Ａ, five times.
 *   魔物兵           an enemy's own ▲名前 in Ｔ敵本体生成, and a nameplate.
 *   魔法生物         an enemy's own ▲名前.
 *   −−−−             表示地域's blank as well as this one's.
 *
 * The last four of those are display and could be translated; the first two
 * cannot, and モンスター is the commonest race in the game, so translating
 * around it leaves the panel reading "Race: モンスター" most of the time.
 *
 * 表示種族 itself has no such problem. It is display and nothing else -- two
 * callers, EnemyInformationView@SetParam, which does "種族：%s" % 表示種族(...),
 * and TadaFunc::GetEnemyTypeString, a one-line wrapper over it -- so overriding
 * the function says the words in English while every string keeps its Japanese,
 * and nothing that compares text notices. This renders that override.
 *
 * 表示規模 and 表示地域 sit beside it in the dump and are written the same way,
 * and neither is worth this treatment: 表示規模 has no callers at all -- the
 * scale beside BOSS is two literals EnemyInformationView@SetParam writes itself
 * -- and 表示地域's one caller puts its result in a debug log. docs/race-names.md
 * has the details.
 */
import * as fs from "fs/promises";
import * as path from "path";
import {ROOT} from "./Env.js";
import {getTextWidth} from "./TextNormalization.js";

export const RACE_FUNCTION = "表示種族";

export const RACE_NAMES = path.join(ROOT, "race_names.v1.04.tsv");
export const RACE_GLOSSARY = path.join(ROOT, "race_name_glossary.tsv");

/** Generated, so gitignored, and written next to the patch the build applies. */
export const RACE_JAF = path.join(ROOT, "race_names.jaf");

/**
 * What the race line fits.
 *
 * It has the width of the panel to itself, the same as the four hint lines
 * lower down, and the placeholder the layout carries for those --
 * twenty full-width characters, in
 * Rance10Pact_v1_04/Game/Battle/EnemyInformationView.pactex.x -- is that width
 * written down. But the race is set in 36 where the hints are set in 26, so the
 * same width buys fewer characters, and the label is printed in front of it.
 */
const PANEL_LINE = "１２３４５６７８９ａ１２３４５６７８９ａ";
const HINT_FONT = 26;
const RACE_FONT = 36;

/** As system_cherry_picks.v1.04.ain.txt translates 種族：%s. */
const LABEL = "Race：";

const readTsv = async (filePath) => {
    const text = await fs.readFile(filePath, "utf-8");
    return text.split(/\r?\n/)
        .filter(line => line.trim() && !line.startsWith("#"))
        .map(line => line.split("\t"));
};

export const readRaceNames = async () => {
    const rows = await readTsv(RACE_NAMES);
    return rows.map(([number, japanese]) => ({number: Number(number), japanese: JSON.parse(japanese)}));
};

export const readRaceGlossary = async () => {
    const rows = await readTsv(RACE_GLOSSARY);
    return new Map(rows.map(([japanese, english]) => [japanese, english ?? ""]));
};

/**
 * The .jaf to hand alice-tools, and what to say about it.
 *
 * A race with no English is left out, so it falls through to super() and the
 * panel prints the Japanese -- the same thing it printed before this existed.
 * The compiler has no switch, so this is the chain of compares the game's own
 * function is written as.
 */
export const renderRaceNamesJaf = async () => {
    const races = await readRaceNames();
    const glossary = await readRaceGlossary();
    const budget = getTextWidth(PANEL_LINE) * HINT_FONT / RACE_FONT;

    const cases = [];
    const overlong = [];
    let untranslated = 0;
    for (const {number, japanese} of races) {
        const english = glossary.get(japanese);
        if (!english) {
            ++untranslated;
            continue;
        }
        if (getTextWidth(LABEL + english) > budget) {
            overlong.push(english);
        }
        cases.push([`\tif (aa == ${number}) return ${JSON.stringify(english)};`, japanese.trim()]);
    }
    // The Japanese each line answers to, in a column, so that reading the
    // generated file against the glossary is reading down rather than across.
    const column = Math.max(0, ...cases.map(([code]) => code.length)) + 2;
    const body = cases.map(([code, japanese]) => code.padEnd(column) + `// ${japanese}`);

    const known = new Set(races.map(race => race.japanese));
    const stale = [...glossary.keys()].filter(japanese => !known.has(japanese));

    const text = [
        "/*",
        " * The race on the enemy status panel, in English.",
        " *",
        " * GENERATED by the build from race_name_glossary.tsv -- edit that, not this.",
        " * modules/RaceNames.js says why this is an override rather than nineteen",
        " * translated strings, and docs/race-names.md has the whole of it.",
        " *",
        " * super() is the original function, so a race left out of the glossary comes",
        " * back in Japanese rather than blank.",
        " */",
        `override string ${RACE_FUNCTION}(int aa)`,
        "{",
        ...body,
        "\treturn super(aa);",
        "}",
        "",
    ].join("\n");

    return {
        text,
        report: `${body.length} of ${races.length} races`
            + (untranslated ? `, ${untranslated} still Japanese` : "")
            + (overlong.length ? `, ${overlong.length} too wide for the panel` : "")
            + (stale.length ? `, ${stale.length} glossary entries the game no longer has` : ""),
        overlong,
        stale,
    };
};
