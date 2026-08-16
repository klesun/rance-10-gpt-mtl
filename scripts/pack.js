/**
 * Pack Rance10Pact.afa, the archive holding the UI translations.
 *
 * `ar pack` takes its destination from the manifest rather than the command
 * line, so the manifest cannot be machine-independent the way an -o flag can.
 * The committed one carries a {game} placeholder and is rendered to a
 * gitignored copy right before the tool reads it.
 */
import * as fs from "fs";
import {alice, gameDir, run} from "../modules/AliceTools.js";

const TEMPLATE = "Rance10Pact_manifest.txt";
const RENDERED = "Rance10Pact_manifest.local.txt";

run(() => {
    const template = fs.readFileSync(TEMPLATE, "utf-8");
    // The manifest quotes its path C-style, so every backslash in it is doubled.
    const rendered = template.replaceAll("{game}", gameDir().replaceAll("\\", "\\\\"));
    fs.writeFileSync(RENDERED, rendered, "utf-8");
    return alice(["ar", "pack", RENDERED], process.env.ALICE_EXE_PACK || undefined);
});
