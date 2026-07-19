
import fs from "fs/promises";

const __dirname = "./modules";

// language=file-reference
const mistranslated_names_str = await fs.readFile(__dirname + "/" + "../mistranslated_names.json", "utf-8");
const mistranslated_names = JSON.parse(mistranslated_names_str);
mistranslated_names.forEach(char => char.knownMistranslations.sort((a,b) => b.length - a.length));

export const normalizeNames = (lineRecord) => {
    let sentence = lineRecord.translatedEnglishLine;
    for (const nameRecord of mistranslated_names) {
        if (!lineRecord.originalJapaneseLine.includes(nameRecord.shortNameJpn)) {
            continue;
        }
        const shortNameEng = nameRecord.shortNameEng;
        if (sentence.includes(shortNameEng)) {
            continue;
        }
        for (const mistranslation of [...nameRecord.knownMistranslations].sort((a,b) => b.length - a.length)) {
            const beforeUpdate = sentence;
            sentence = sentence.replaceAll(mistranslation, shortNameEng);
            if (beforeUpdate !== sentence) {
                break;
            }
        }
    }
    return sentence;
};