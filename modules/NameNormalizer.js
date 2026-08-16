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

export const readSharedNameTable = async () => readTable(path.join(ROOT, "mistranslated_names.json"));

export const readNameTable = async (variantDir) => {
    const table = layer(
        await readSharedNameTable(),
        await readOptionalTable(path.join(variantDir, "mistranslated_names.json")),
    );
    table.forEach(char => char.knownMistranslations.sort((a, b) => b.length - a.length));
    return table;
};

const KATAKANA = /[゠-ヿ]/;

/**
 * The same table read as a check rather than a repair, for the hand-written
 * glossaries -- enemy_info_glossary.tsv, race_name_glossary.tsv -- which the
 * repair pass above cannot help with.
 *
 * It cannot because it swaps a *known* misspelling for the right one, and what
 * a person writing a glossary produces is a plausible new one: ハニー came out
 * as "Honey", which is not the listed "honey" and so would have gone through
 * untouched and unmentioned. Absence of the canonical spelling is the signal
 * worth having, and there are few enough entries to say it out loud and let
 * somebody decide.
 *
 * A katakana name only counts when it is not part of a longer run of katakana.
 * Without that, リア is in バリア, レイ is in ブレイク and フル is in
 * フルスペック, and three complaints out of five are noise -- which is how a
 * warning stops being read.
 *
 * The shared table only: these files are not dialogue, and a variant's
 * overrides are its dialogue's business.
 */
export const createNameChecker = async () => {
    const table = (await readSharedNameTable()).filter(record => record.shortNameJpn.length >= 2);

    const names = (japanese) => table.filter(record => {
        const name = record.shortNameJpn;
        for (let at = japanese.indexOf(name); at >= 0; at = japanese.indexOf(name, at + 1)) {
            const before = japanese[at - 1];
            const after = japanese[at + name.length];
            const glued = KATAKANA.test(name)
                && ((before && KATAKANA.test(before)) || (after && KATAKANA.test(after)));
            if (!glued) {
                return true;
            }
        }
        return false;
    });

    return (japanese, english) => names(japanese)
        .filter(record => !english.toLowerCase().includes(record.shortNameEng.toLowerCase()))
        .map(record => `${japanese} is ${record.shortNameJpn}, which the game calls`
            + ` "${record.shortNameEng}" -- ${JSON.stringify(english)}`);
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
