import fs from 'fs';

const filePath = 'gpt_outputs/246050_246110.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const lines = data.output_parsed.translationLines;

// Apply pronoun fixes and split fixes
lines.forEach(line => {
    if (line.lineNumber === 245992) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace('Lord Fiend Warg', 'Fiend Warg');
    }
    if (line.lineNumber === 246006) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace("he's famous", "she's famous");
    }
    if (line.lineNumber === 246007) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace("He even said", "She even said");
    }
    if (line.lineNumber === 246009) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace("asked him", "asked her");
    }
    if (line.lineNumber === 246010) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace("he readily", "she readily");
    }
    if (line.lineNumber === 246011) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace("threaten him", "threaten her");
    }
    if (line.lineNumber === 246016) {
        line.translatedEnglishLine = "\"Indeed, the only one capable of controlling that Fiend Warg";
    }
    if (line.lineNumber === 246017) {
        line.translatedEnglishLine = "in the entire world";
    }
    if (line.lineNumber === 246018) {
        line.translatedEnglishLine = "is probably Kayblis-sama.\"";
    }
    if (line.lineNumber === 246020) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace("he is truly", "she is truly");
    }
    if (line.lineNumber === 246021) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace("he’s the weakest", "she’s the weakest");
    }
    if (line.lineNumber === 246022) {
        line.translatedEnglishLine = line.translatedEnglishLine.replace("he’s the most", "she’s the most");
    }
    if (line.lineNumber === 246028) {
        line.translatedEnglishLine = "\"Heh heh heh, against her as an opponent,";
    }
    if (line.lineNumber === 246029) {
        line.translatedEnglishLine = "imagining humanity panicking...";
    }
    if (line.lineNumber === 246030) {
        line.translatedEnglishLine = "pfft, I can't help but laugh!\"";
    }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
console.log("Successfully modified 246050_246110.json");
