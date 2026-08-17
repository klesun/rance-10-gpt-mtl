/**
 * How the patch already translates a word, straight out of its own dialogue.
 *
 *   node scripts/lookup_term.js 魔軍 使徒 番裏の砦
 *   node scripts/lookup_term.js --limit=6 滅号作戦
 *   node scripts/lookup_term.js --variant=grok 魔軍
 *
 * Prints the Japanese line and the English the variant renders for it, a few
 * per term. The two dumps line up by m[] number -- the same numbering the
 * translation is written against -- so pairing them is just reading both.
 *
 * This is for translating anything the dialogue has already named: places,
 * ranks, operations, the words a caption has to agree with. The name tables
 * settle characters (glossaries/mistranslated_names.json,
 * glossaries/card_name_glossary.tsv); this
 * settles everything else, and settles it against what a player has already
 * read rather than against a fresh guess. 滅号作戦 is Operation Extermination
 * here, 永久牢 the Eternal Prison, 番裏の砦 Fort Banura -- none of which is
 * what you would have invented.
 */
import * as fs from "fs/promises";
import {AIN_TXT} from "../modules/AinFiles.js";
import {regeneratedTxt, variantName} from "../modules/Variants.js";

const args = process.argv.slice(2);
const limitFlag = args.find(arg => arg.startsWith("--limit="));
const limit = limitFlag ? Number(limitFlag.slice("--limit=".length)) : 3;
const terms = args.filter(arg => !arg.startsWith("--"));

if (!terms.length) {
    console.error("Nothing to look up. Give it a word or two: node scripts/lookup_term.js 魔軍");
    process.exit(1);
}

/** The m[] lines of a dump, by number. */
const readMessages = async (file) => {
    const messages = new Map();
    for (const line of (await fs.readFile(file, "utf-8")).split(/\r?\n/)) {
        const match = line.match(/^;?m\[(\d+)]\s*=\s*"(.*)"$/);
        if (match && !messages.has(+match[1])) {
            messages.set(+match[1], match[2]);
        }
    }
    return messages;
};

const japanese = await readMessages(AIN_TXT);
const english = await readMessages(regeneratedTxt(variantName()));

for (const term of terms) {
    console.log(`=== ${term} ===`);
    let shown = 0;
    for (const [number, line] of japanese) {
        if (!line.includes(term) || !english.has(number)) {
            continue;
        }
        console.log(`  ${line}`);
        console.log(`  -> ${english.get(number)}`);
        if (++shown >= limit) {
            break;
        }
    }
    if (!shown) {
        console.log("  (the dialogue never says it)");
    }
}
