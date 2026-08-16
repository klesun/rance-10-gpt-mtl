/**
 * Which translation of the dialogue to build.
 *
 * A variant is data, not code: a directory under variants/ holding the two
 * translation corpora and, if it insists on spelling a name its own way, a
 * mistranslated_names.json layered over the shared one. Everything else -- the
 * v1.00 to v1.04 line mapping, the cherry-picked system strings, the wrapping
 * and the name repairs -- is the same whichever variant is selected, so adding
 * a translation is adding a folder.
 *
 * The game directory holds one Rance10.ain, so a build installs one variant;
 * switching is re-running the build with a different name.
 */
import * as fs from "fs";
import * as path from "path";
import {ROOT} from "./Env.js";

const VARIANTS_DIR = path.join(ROOT, "variants");
const DEFAULT_VARIANT = "gpt";

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
 * One patch file per variant rather than one regenerated.ain.txt: switching
 * variants should not leave you looking at the other one's text, and a failed
 * generation should not pass off a stale file as the build you asked for.
 */
export const regeneratedTxt = (name) => `regenerated.${name}.ain.txt`;
