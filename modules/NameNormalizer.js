/**
 * Repairing how the translation spells character names.
 *
 * mistranslated_names.json is not translation text but a repair pass run at
 * build time: where the Japanese line names a character and the English does
 * not spell them the canonical way, a known misspelling is swapped out. The
 * table is shared by every variant on purpose -- generate_card_names.js reads
 * the same file for the card plates, so a variant that renamed people in its
 * dialogue alone would disagree with the cards its own build installs.
 *
 * A variant that wants to disagree anyway can put a mistranslated_names.json
 * next to its corpora. It is layered over the shared table by Japanese name,
 * so it only has to state what it wants different.
 */
import fs from "fs/promises";
import * as path from "path";
import {ROOT} from "./Env.js";

const readTable = async (filePath) => JSON.parse(await fs.readFile(filePath, "utf-8"));

const readOptionalTable = async (filePath) => {
    try {
        return await readTable(filePath);
    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
};

/**
 * Overriding a name keeps the misspellings the shared table already knows --
 * they are the same wrong spellings whichever name you consider right, and a
 * variant should not have to copy the list to change the answer.
 *
 * The shared table gives a couple of Japanese names two entries -- クルックー is
 * both "Crook" and "Ms. Crook" -- so an override applies to every entry under
 * that name rather than collapsing them into one, which would quietly drop a
 * repair the build has always made.
 */
const layer = (shared, overrides) => {
    const overrideFor = new Map(overrides.map(record => [record.shortNameJpn, record]));
    const layered = shared.map(record => {
        const override = overrideFor.get(record.shortNameJpn);
        return !override ? record : {
            ...record,
            ...override,
            knownMistranslations: [...new Set([
                ...record.knownMistranslations,
                ...override.knownMistranslations ?? [],
            ])],
        };
    });
    const alreadyNamed = new Set(shared.map(record => record.shortNameJpn));
    return [...layered, ...overrides.filter(record => !alreadyNamed.has(record.shortNameJpn))];
};

export const readNameTable = async (variantDir) => {
    const table = layer(
        await readTable(path.join(ROOT, "mistranslated_names.json")),
        await readOptionalTable(path.join(variantDir, "mistranslated_names.json")),
    );
    table.forEach(char => char.knownMistranslations.sort((a, b) => b.length - a.length));
    return table;
};

export const createNameNormalizer = async (variantDir) => {
    const mistranslated_names = await readNameTable(variantDir);

    return (lineRecord) => {
        let sentence = lineRecord.translatedEnglishLine;
        for (const nameRecord of mistranslated_names) {
            if (!lineRecord.originalJapaneseLine.includes(nameRecord.shortNameJpn)) {
                continue;
            }
            const shortNameEng = nameRecord.shortNameEng;
            if (sentence.includes(shortNameEng)) {
                continue;
            }
            for (const mistranslation of nameRecord.knownMistranslations) {
                const beforeUpdate = sentence;
                sentence = sentence.replaceAll(mistranslation, shortNameEng);
                if (beforeUpdate !== sentence) {
                    break;
                }
            }
        }
        return sentence;
    };
};
