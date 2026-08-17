/**
 * Which translation of the dialogue to build.
 *
 * A variant is data, not code: a directory under variants/ holding the text --
 * either the two translation corpora or a finished dialogue.ain.txt -- and, if
 * it insists on spelling a name its own way, a mistranslated_names.json layered
 * over the shared one. Everything else -- the cherry-picked system strings, the
 * wrapping and the name repairs -- is the same whichever variant is selected,
 * so adding a translation is adding a folder.
 *
 * The game directory holds one Rance10.ain, so a build installs one variant;
 * switching is re-running the build with a different name.
 */
import * as fs from "fs";
import * as path from "path";
import {BUILD, ROOT} from "./Env.js";

const VARIANTS_DIR = path.join(ROOT, "variants");
export const DEFAULT_VARIANT = "gpt";

export const listVariants = () => fs.readdirSync(VARIANTS_DIR, {withFileTypes: true})
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

/**
 * Both --variant=grok and --variant grok, since npm run passes them through
 * either way and neither spelling is the wrong guess to make.
 */
const fromArgv = (argv) => {
    const index = argv.findIndex(arg => arg === "--variant" || arg.startsWith("--variant="));
    if (index < 0) {
        return undefined;
    }
    const arg = argv[index];
    return arg.includes("=") ? arg.slice(arg.indexOf("=") + 1) : argv[index + 1];
};

/**
 * The flag beats TRANSLATION_VARIANT in .env, which beats the default -- so
 * .env names the one you build most and the flag is for the exception.
 */
export const variantName = () => {
    const name = fromArgv(process.argv.slice(2)) || process.env.TRANSLATION_VARIANT || DEFAULT_VARIANT;
    const available = listVariants();
    if (!available.includes(name)) {
        throw new Error(`There is no "${name}" translation variant. variants/ holds: ${available.join(", ")}.`);
    }
    return name;
};

export const variantDir = (name) => path.join(VARIANTS_DIR, name);

/**
 * A translation does not have to arrive as a corpus of chunks. One that was
 * written straight into the file alice-tools applies -- m[<line>] = "<text>",
 * the v1.04 line numbers already -- is a variant too, and this is where the
 * build looks for it. If the file is there it is the variant's text and the
 * two chunk folders are not read; the rest of the pipeline does not change.
 */
export const variantPatch = (name) => path.join(variantDir(name), "dialogue.ain.txt");

export const hasPatch = (name) => fs.existsSync(variantPatch(name));

/**
 * For the scripts that read or write the chunk files themselves, which have
 * nothing to work with in a variant that arrived as a finished patch. Naming
 * the reason beats the ENOENT they would otherwise die of.
 */
export const corpusDir = (name) => {
    if (hasPatch(name)) {
        throw new Error(`The "${name}" translation variant is a finished patch, ${variantPatch(name)},`
            + ` rather than a corpus of chunk files. This script works on the chunks.`);
    }
    return variantDir(name);
};

/**
 * One patch file per variant rather than one regenerated.ain.txt: switching
 * variants should not leave you looking at the other one's text, and a failed
 * generation should not pass off a stale file as the build you asked for.
 *
 * Absolute, like every other path a module hands out, so that which directory
 * the build was started from is not one of the things that can go wrong. The
 * one caller that needs it relative -- alice-tools, which is handed the game's
 * own .ain the same way -- says so with path.relative.
 */
export const regeneratedTxt = (name) => path.join(BUILD, `regenerated.${name}.ain.txt`);
