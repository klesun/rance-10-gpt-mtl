/**
 * Render one dialogue variant into the ain.txt patch alice-tools applies.
 *
 * Which variant is the only thing this takes from the command line; see
 * modules/Variants.js. Everything else here -- the line mapping between the
 * two game versions, the cherry-picked system strings, the wrapping -- is the
 * same whichever translation is being built.
 */
import * as fs from "fs/promises";
import * as path from "path";
import {AIN_JSON, AIN_V100_JSON} from "./modules/AinFiles.js";
import {replaceUnicode, wrapAt} from "./modules/TextNormalization.js";
import {renderEnemyInfo} from "./modules/EnemyInfo.js";
import {createNameNormalizer} from "./modules/NameNormalizer.js";
import {DEFAULT_VARIANT, hasPatch, regeneratedTxt, variantDir, variantName, variantPatch} from "./modules/Variants.js";

// Naming a variant that is not there is a typo to fix, not a stack trace to
// read -- the same courtesy scripts/ain.js gets from AliceTools' run().
let variant;
try {
    variant = variantName();
} catch (error) {
    console.error(error.message);
    process.exit(1);
}

const variantRoot = variantDir(variant);
const normalizeNames = await createNameNormalizer(variantRoot);

const v100AinJson = await fs.readFile(AIN_V100_JSON, "utf-8");
const v100AinData = JSON.parse(v100AinJson);

const v104AinJson = await fs.readFile(AIN_JSON, "utf-8");
const v104AinData = JSON.parse(v104AinJson);

const cherryPicksTxt = await fs.readFile("./system_cherry_picks.v1.04.ain.txt", "utf-8");

// Generated rather than cherry-picked: which string slots these are was found
// in the code by scripts/extract_enemy_info.js, and the English is keyed by the
// Japanese in enemy_info_glossary.tsv. See modules/EnemyInfo.js.
const enemyInfo = await renderEnemyInfo();

const mapLineNumbers = (v100AinData, v104AinData) => {
    let v100Offset = 0;
    let v104LastMappedOffset = -1;
    const mapping = new Map();
    done:
    while (v100Offset < v100AinData.length) {
        for (let v104Offset = v104LastMappedOffset + 1; v104Offset < v104AinData.length; ++v104Offset) {
            const v100Record = v100AinData[v100Offset];
            const v104Record = v104AinData[v104Offset];
            if (v100Record.originalJapaneseLine === v104Record.originalJapaneseLine) {
                mapping.set(+v100Record.lineNumber, +v104Record.lineNumber);
                ++v100Offset;
                v104LastMappedOffset = v104Offset;
                if (v100Offset === v100AinData.length) {
                    break done;
                }
            }
        }
        ++v100Offset;
    }
    const mapped = new Set(mapping.values());
    const unmapped = v104AinData.filter(rec => !mapped.has(+rec.lineNumber));
    return [mapping, unmapped];
};

const [v100ToV104, unmapped] = mapLineNumbers(v100AinData, v104AinData);

await fs.writeFile("unmapped.ain.json", JSON.stringify(unmapped, null, 4), "utf-8");

const readTranslations = async (folderPath) => {
    const chunkFileNames = await fs.readdir(folderPath);
    const chunkFiles = chunkFileNames
        .map(fileName => {
            const [, startLineNumber, endLineNumber] = fileName.match(/^(\d+)_(\d+)\.json$/);
            return {
                fileName,
                startLineNumber: Number(startLineNumber),
                endLineNumber: Number(endLineNumber),
            };
        })
        .sort((a,b) => a.startLineNumber - b.startLineNumber);

    const allLineRecords = [];

    for (const chunkFile of chunkFiles) {
        const json = await fs.readFile(folderPath + "/" + chunkFile.fileName, "utf-8");
        let data;
        try {
            data = JSON.parse(json);
        } catch (error) {
            error.message += 'At file ' + chunkFile.fileName;
            throw error;
        }
        allLineRecords.push(...data.output_parsed.translationLines);
    }

    return allLineRecords;
};

/**
 * A corpus is written against the v1.00 line numbers, plus a second folder for
 * the lines v1.04 added, so reading one is also moving it onto the numbering
 * the game being patched uses.
 */
const readCorpus = async (root) => {
    const allLineRecordsV100 = await readTranslations(path.join(root, "gpt_outputs"));
    const allLineRecordsV104 = await readTranslations(path.join(root, "gpt_outputs_v104"));
    return allLineRecordsV100
        .flatMap(lr => {
            const v104LineNumber = v100ToV104.get(+lr.lineNumber);
            if (!v104LineNumber) {
                return [];
            } else {
                return { ...lr, lineNumber: v104LineNumber };
            }
        })
        .concat(allLineRecordsV104);
};

const japaneseByLineNumber = new Map(v104AinData.map(rec => [+rec.lineNumber, rec.originalJapaneseLine]));

/**
 * alice-tools escapes an ain.txt the way JSON does, except that it also lets a
 * lone backslash through -- there was one "「--No,\」" in the patch the grok
 * variant was imported from. An escape nothing recognises gives up the
 * backslash and keeps the character rather than failing a whole build over one
 * line.
 */
const unescapePatch = (body) => body.replaceAll(/\\(.)/g, (_, char) =>
    char === "n" ? "\n" : char === "t" ? "\t" : char === "r" ? "\r" : char);

/**
 * A variant written as a finished patch. Its numbers are the game's already,
 * so nothing is mapped; what it does need is the Japanese each number stands
 * for, which the name repairs read to decide whether a line names a character.
 *
 * The line breaks in it are dropped on the way in. They are where the fork's
 * own build decided to wrap, measured against a font and a margin this
 * repository does not share, and leaving them would keep the ones that
 * overshoot our message window -- so the text goes through the same wrapping
 * every other line does.
 */
const readPatch = async (filePath) => {
    const text = await fs.readFile(filePath, "utf-8");
    const records = new Map();
    let undescribed = 0;
    for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^m\[(\d+)]\s*=\s*"(.*)"$/);
        if (!match) {
            continue;
        }
        const lineNumber = Number(match[1]);
        // The dumps here hold the dialogue rather than every message the game
        // has -- there was a line in the imported grok patch they do not
        // describe, and the game does have that slot. So the line goes through
        // with nothing to say what it translates, which only costs it the name
        // repairs, and alice-tools stays the one that decides a slot does not
        // exist.
        const originalJapaneseLine = japaneseByLineNumber.get(lineNumber);
        if (originalJapaneseLine === undefined) {
            ++undescribed;
        }
        records.set(lineNumber, {
            lineNumber,
            originalJapaneseLine: originalJapaneseLine ?? "",
            translatedEnglishLine: unescapePatch(match[2]).replaceAll(/ *\n */g, " "),
        });
    }
    return [records, undescribed];
};

/**
 * A patch names the lines it has an opinion about and no others, and a line it
 * skips would play in Japanese -- the patch the grok variant was imported from
 * missed a scene of 300 lines that way. So the default variant is rendered
 * underneath it and shows through the gaps; the variant's own README says which
 * lines those are.
 */
const readVariant = async (name) => {
    if (!hasPatch(name)) {
        return [await readCorpus(variantDir(name)), ""];
    }
    const [patched, undescribed] = await readPatch(variantPatch(name));
    const beneath = name === DEFAULT_VARIANT ? [] : await readCorpus(variantDir(DEFAULT_VARIANT));
    const lineRecords = new Map(beneath.map(lr => [+lr.lineNumber, lr]));
    const filledIn = [...lineRecords.keys()].filter(lineNumber => !patched.has(lineNumber)).length;
    for (const [lineNumber, lineRecord] of patched) {
        lineRecords.set(lineNumber, lineRecord);
    }
    return [
        [...lineRecords.values()].sort((a, b) => +a.lineNumber - +b.lineNumber),
        `${patched.size} lines of its own`
        + (filledIn ? `, ${filledIn} left to "${DEFAULT_VARIANT}"` : "")
        + (undescribed ? `, ${undescribed} the v1.04 dump does not describe` : ""),
    ];
};

const [allLineRecords, howItWasBuilt] = await readVariant(variant);

const LONGEST_LINE = "“More importantly, what we should discuss now is how the other";

const output = allLineRecords
    .flatMap(lr => {
        let text = normalizeNames(lr);
        text = replaceUnicode(text);
        // if (text.match(/[^\x00-\x7F♪☆○Σ]/)) {
        //     throw new Error("Got unicode characters, please remove: " + text + " at " + lr.lineNumber);
        // }
        text = wrapAt(text, LONGEST_LINE);
        return [`m[${lr.lineNumber}] = ${JSON.stringify(text)}`];
    })
    // The cherry-picks are a file of their own and start on a line of their
    // own. Without the break they land on the end of the last assignment --
    // m[269677] = "..."; note: "r" character is apparently interpreted... --
    // which has only ever worked because the line they open with is a comment.
    .join("\n") + "\n" + cherryPicksTxt + "\n" + enemyInfo.text + "\n";

await fs.writeFile(regeneratedTxt(variant), output, "utf-8");

console.log(`Rendered the "${variant}" dialogue variant into ${regeneratedTxt(variant)}`
    + (howItWasBuilt ? ` -- ${howItWasBuilt}` : ""));
console.log(`Translated ${enemyInfo.report}`);
// Worth saying out loud, not worth stopping for: the panel does not wrap, so an
// overlong line runs off it rather than folding, and a glossary entry the game
// no longer has is text nothing will ever show.
for (const english of enemyInfo.overlong) {
    console.warn(`  too wide for the enemy status panel: ${JSON.stringify(english)}`);
}
for (const complaint of enemyInfo.misnamed) {
    console.warn(`  ${complaint}`);
}
for (const japanese of enemyInfo.stale) {
    console.warn(`  no enemy status line says ${JSON.stringify(japanese)} any more`);
}
