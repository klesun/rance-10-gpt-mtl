/**
 * Build Rance10.ain from one of the dialogue variants.
 *
 *   npm run regenerate-ain                      # the variant .env names, or gpt
 *   npm run regenerate-ain -- --variant=grok
 *
 * Rendering the patch and applying it are two steps, and they used to be a &&
 * chain in package.json -- which cannot take the flag: npm appends whatever
 * follows `--` to the *end* of the chain, so --variant would reach alice-tools
 * rather than the generator that needs it. One entry point reads it once.
 */
import * as fs from "fs/promises";
import * as path from "path";
import {spawnSync} from "child_process";
import {alice, run} from "../modules/AliceTools.js";
import {ROOT} from "../modules/Env.js";
import {RACE_JAF, renderRaceNamesJaf} from "../modules/RaceNames.js";
import {regeneratedTxt, variantName} from "../modules/Variants.js";

/**
 * A child process rather than an import: the generator holds both ain.json
 * dumps in memory, some hundreds of megabytes, and this way that is released
 * before alice-tools starts.
 */
const node = (args) => {
    const result = spawnSync(process.execPath, args, {stdio: "inherit"});
    if (result.error) {
        throw result.error;
    }
    return result.status ?? 1;
};

/**
 * The race names are a patch to a function rather than to a string, so they
 * arrive as a second .jaf, and that one is generated -- from
 * race_name_glossary.tsv, by modules/RaceNames.js. Written here rather than by
 * the dialogue generator because it is not dialogue and does not vary by
 * variant; alice-tools takes as many --jaf as it is given.
 */
const renderRaceNames = async () => {
    const rendered = await renderRaceNamesJaf();
    await fs.writeFile(RACE_JAF, rendered.text, "utf-8");
    console.log(`Translated ${rendered.report}`);
    for (const english of rendered.overlong) {
        console.warn(`  too wide for the enemy status panel: ${JSON.stringify(english)}`);
    }
    for (const complaint of rendered.misnamed) {
        console.warn(`  ${complaint}`);
    }
    for (const japanese of rendered.stale) {
        console.warn(`  the game has no race called ${JSON.stringify(japanese)}`);
    }
};

run(async () => {
    const variant = variantName();
    const rendered = node(["regenerate_aai_txt.js", `--variant=${variant}`]);
    if (rendered !== 0) {
        return rendered;
    }
    await renderRaceNames();
    return alice([
        "ain", "edit",
        "-t", regeneratedTxt(variant),
        "--jaf", "card_names.jaf",
        "--jaf", path.relative(ROOT, RACE_JAF),
        "-o", "{game}/Rance10.ain",
        "./Rance10.v1.04.ain",
    ]);
});
