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
import {spawnSync} from "child_process";
import {alice, run} from "../modules/AliceTools.js";
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

run(() => {
    const variant = variantName();
    const rendered = node(["regenerate_aai_txt.js", `--variant=${variant}`]);
    if (rendered !== 0) {
        return rendered;
    }
    return alice([
        "ain", "edit",
        "-t", regeneratedTxt(variant),
        "--jaf", "card_names.jaf",
        "-o", "{game}/Rance10.ain",
        "./Rance10.v1.04.ain",
    ]);
});
