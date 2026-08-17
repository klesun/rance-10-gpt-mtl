/**
 * Pack Rance10Pact.afa, the archive holding the UI translations.
 *
 * `ar pack` takes its destination from the manifest rather than the command
 * line, so the manifest cannot be machine-independent the way an -o flag can.
 * The committed one carries a {game} placeholder and is rendered to a
 * gitignored copy right before the tool reads it.
 *
 * The manifest's columns are src_dir,src_fmt,dst_dir,dst_fmt (see
 * README-alice-ar.md in an alice-tools release): every .x under
 * Rance10Pact_v1_04 is compiled to a .pactex under `pactex`, and *that*
 * directory is what goes into the archive. So `pactex` is an output directory,
 * and alice-tools does not create it -- only the subdirectories below it, which
 * it does handle. It holds nothing but build products, so it is not in the
 * repository, and without the mkdir below a fresh checkout fails with
 *
 *     ERROR: line 2: "pactex" is not a directory
 *
 * Also note that alice-tools 0.9.1 does not understand #BATCHPACK at all
 * ("Invalid manifest type") -- this needs 0.13.0, which is what ALICE_EXE_PACK
 * is for.
 */
import * as fs from "fs";
import * as path from "path";
import {alice, gameDir, run} from "../modules/AliceTools.js";
import {ROOT} from "../modules/Env.js";

const TEMPLATE = "Rance10Pact_manifest.txt";
const RENDERED = "Rance10Pact_manifest.local.txt";
const STAGING = "pactex";

run(() => {
    const template = fs.readFileSync(path.join(ROOT, TEMPLATE), "utf-8");
    // The manifest quotes its path C-style, so every backslash in it is doubled.
    const rendered = template.replaceAll("{game}", gameDir().replaceAll("\\", "\\\\"));
    fs.writeFileSync(path.join(ROOT, RENDERED), rendered, "utf-8");
    fs.mkdirSync(path.join(ROOT, STAGING), {recursive: true});
    // The manifest names its sources relative to itself, so alice-tools is
    // given the name rather than the path, and reads it from ROOT like the
    // rest -- see modules/AliceTools.js.
    return alice(["ar", "pack", RENDERED], process.env.ALICE_EXE_PACK || undefined);
});
