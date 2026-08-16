/**
 * Pack Rance10Pact.afa, the archive holding the UI translations.
 *
 * `ar pack` takes its destination from the manifest rather than the command
 * line, so the manifest cannot be machine-independent the way an -o flag can.
 * The committed one carries a {game} placeholder and is rendered to a
 * gitignored copy right before the tool reads it.
 *
 * KNOWN BROKEN. Running this fails with
 *
 *     ERROR: line 2: "pactex" is not a directory
 *
 * and has since long before the manifest was turned into a template. The
 * manifest's columns are src_dir,src_fmt,dst_dir,dst_fmt (see README-alice-ar.md
 * in an alice-tools release): every .x under Rance10Pact_v1_04 is compiled to a
 * .pactex under `pactex`, and *that* directory is what goes into the archive.
 * So `pactex` is an output directory, and alice-tools does not create it --
 * only the subdirectories below it, which it does handle. It holds nothing but
 * build products, so it has never been in the repository, and the command has
 * no way to work from a fresh checkout.
 *
 * Creating the directory here before the tool runs is confirmed to get all 220
 * files converted; what remains is to check the archive it then writes against
 * the one already installed. Also note that alice-tools 0.9.1 does not
 * understand #BATCHPACK at all ("Invalid manifest type") -- this needs 0.13.0,
 * which is what ALICE_EXE_PACK is for.
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
