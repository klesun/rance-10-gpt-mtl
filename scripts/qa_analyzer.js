import fs from 'fs';
import path from 'path';

const gptOutputsDir = './gpt_outputs';
const files = fs.readdirSync(gptOutputsDir)
    .filter(f => f.endsWith('.json') && /^\d+_\d+\.json$/.test(f))
    .map(f => {
        const parts = f.replace('.json', '').split('_');
        return {
            name: f,
            start: parseInt(parts[0], 10),
            end: parseInt(parts[1], 10)
        };
    })
    .sort((a, b) => b.start - a.start); // Reverse numerical order

// Find where 231510_231570.json is
const startFileName = '231510_231570.json';
const startIndex = files.findIndex(f => f.name === startFileName);
if (startIndex === -1) {
    console.error(`Could not find starting file ${startFileName}!`);
    process.exit(1);
}

// We want to check from index 551 (startIndex) down to index 650.
// That is exactly 100 files total.
const targetFiles = files.slice(startIndex, startIndex + 100);

console.log(`Analyzing ${targetFiles.length} files, from ${targetFiles[0].name} to ${targetFiles[targetFiles.length - 1].name}...`);

const reports = [];

for (let fIdx = 0; fIdx < targetFiles.length; fIdx++) {
    const file = targetFiles[fIdx];
    const checkIdx = 551 + fIdx;
    const filePath = path.join(gptOutputsDir, file.name);
    
    let data;
    try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        console.error(`Error reading ${file.name}:`, e.message);
        continue;
    }
    
    const lines = data.output_parsed.translationLines;
    const fileReport = {
        fileIndex: checkIdx,
        fileName: file.name,
        issues: []
    };
    
    for (let i = 0; i < lines.length; i++) {
        const curr = lines[i];
        const jp = curr.originalJapaneseLine || "";
        const en = curr.translatedEnglishLine || "";
        const lineNum = curr.lineNumber;
        
        // 1. Empty line omission check
        if (jp.trim() !== "" && en.trim() === "") {
            fileReport.issues.push({
                type: 'EMPTY_LINE',
                lineNum,
                jp,
                en,
                reason: 'English translation is empty while Japanese contains actual text.'
            });
        }
        
        // 2. First-person narrative pronoun drift (I, my, me, we, us, our in narration)
        const isDialogue = jp.includes('「') || jp.includes('『') || jp.includes('」') || jp.includes('』') || jp.startsWith('（') || jp.startsWith('(');
        if (!isDialogue && jp.trim() !== "") {
            const firstPersonRegex = /\b(I|my|me|we|us|our)\b/i;
            const matches = en.match(firstPersonRegex);
            if (matches) {
                // Ignore obvious false positives (like nested quotes in english)
                if (!en.includes('"I ') && !en.includes('"my') && !en.includes('"me')) {
                    fileReport.issues.push({
                        type: 'PRONOUN_DRIFT',
                        lineNum,
                        jp,
                        en,
                        reason: `Narration line uses first-person pronoun '${matches[0]}'.`
                    });
                }
            }
        }
        
        // 3. Reset gender check (Reset is female)
        if (en.toLowerCase().includes('reset') || jp.includes('リセット')) {
            const malePronounRegex = /\b(he|his|him|himself)\b/i;
            const matches = en.match(malePronounRegex);
            if (matches) {
                fileReport.issues.push({
                    type: 'RESET_GENDER',
                    lineNum,
                    jp,
                    en,
                    reason: `Line refers to Reset but uses masculine pronoun '${matches[0]}'.`
                });
            }
            if (en.toLowerCase().includes('mr. reset')) {
                fileReport.issues.push({
                    type: 'RESET_GENDER',
                    lineNum,
                    jp,
                    en,
                    reason: `Line refers to Reset but uses masculine title 'Mr. Reset'.`
                });
            }
        }
        
        // 4. Arms gender check (Arms is female)
        if (en.toLowerCase().includes('arms') || jp.includes('アームズ')) {
            const malePronounRegex = /\b(he|his|him|himself)\b/i;
            const matches = en.match(malePronounRegex);
            if (matches) {
                fileReport.issues.push({
                    type: 'ARMS_GENDER',
                    lineNum,
                    jp,
                    en,
                    reason: `Line refers to Arms but uses masculine pronoun '${matches[0]}'.`
                });
            }
        }
        
        // 5. Miracle/Millky gender check (Miracle is female)
        if (en.toLowerCase().includes('miracle') || en.toLowerCase().includes('millky') || jp.includes('ミラクル') || jp.includes('ミルキー')) {
            const malePronounRegex = /\b(he|his|him|himself)\b/i;
            const matches = en.match(malePronounRegex);
            if (matches) {
                fileReport.issues.push({
                    type: 'MIRACLE_GENDER',
                    lineNum,
                    jp,
                    en,
                    reason: `Line refers to Miracle/Millky but uses masculine pronoun '${matches[0]}'.`
                });
            }
        }
    }
    
    // 6. Split sentence casing check
    for (let i = 0; i < lines.length - 1; i++) {
        const curr = lines[i];
        const next = lines[i+1];
        const jp1 = curr.originalJapaneseLine || "";
        const en1 = curr.translatedEnglishLine || "";
        const jp2 = next.originalJapaneseLine || "";
        const en2 = next.translatedEnglishLine || "";
        
        const endsWithPunctuation = /[。！？」』]$/.test(jp1.trim());
        if (!endsWithPunctuation && jp1.trim() !== "" && jp2.trim() !== "") {
            // Check if second line of English starts with a capital letter
            const firstChar = en2.trim().charAt(0);
            if (firstChar >= 'A' && firstChar <= 'Z') {
                // Ignore if it's a quote opening
                if (!en2.trim().startsWith('"') && !en2.trim().startsWith('\'')) {
                    fileReport.issues.push({
                        type: 'SPLIT_CAPITALIZATION',
                        lineNum: next.lineNumber,
                        jp: jp1 + ' / ' + jp2,
                        en: en1 + ' / ' + en2,
                        reason: `Split sentence line ${next.lineNumber} starts with capitalized letter '${firstChar}' when previous line lacks sentence ending punctuation.`
                    });
                }
            }
        }
    }
    
    if (fileReport.issues.length > 0) {
        reports.push(fileReport);
    }
}

console.log(`Analysis complete! Found potential issues in ${reports.length} out of ${targetFiles.length} files.\n`);

fs.writeFileSync('scripts/qa_analysis_report_551_650.json', JSON.stringify(reports, null, 2));

console.log("Report generated successfully!");
