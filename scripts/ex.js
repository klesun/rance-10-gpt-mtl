/**
 * Build Rance10EX.ex -- the skill and character descriptions, the quests, and
 * the synopsis screen.
 *
 *   npm run regenerate-ex
 *
 * Everything in Rance10EX_v1_04 is translated in the file itself and needs no
 * step before the build. The synopsis table is the exception: its English lives
 * in glossaries/summary_glossary.tsv, keyed by the Japanese, so it has to be written in on
 * the way past.
 *
 * On the way past and not into the file, because the key is the Japanese. A
 * table with the English written over it would match nothing the next time, so
 * the build renders it into a copy of the whole source tree -- seven megabytes
 * of text, a moment to copy -- and hands alice-tools the copy. What is under
 * version control stays as the game shipped it, and the translation stays in
 * one place. modules/SummaryLines.js has the rest of the reasoning.
 */
import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";
import {alice, run} from "../modules/AliceTools.js";
import {ROOT} from "../modules/Env.js";
import {SUMMARY_DATA, renderSummaryTable} from "../modules/SummaryLines.js";

const EX_DIR = path.join(ROOT, "Rance10EX_v1_04");

run(async () => {
    const rendered = await renderSummaryTable();
    console.log(`Translated ${rendered.report}`);
    for (const english of rendered.overlong) {
        console.warn(`  too wide for the synopsis panel: ${english}`);
    }

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "rance10-ex-"));
    try {
        await fs.cp(EX_DIR, tempDir, {recursive: true});
        await fs.writeFile(path.join(tempDir, path.basename(SUMMARY_DATA)), rendered.text, "utf-8");
        return alice(["ex", "build", "-o", "{game}/Rance10EX.ex", path.join(tempDir, "main.x")]);
    } finally {
        await fs.rm(tempDir, {recursive: true, force: true});
    }
});
