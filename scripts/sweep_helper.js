import fs from 'fs';

export function getCandidates(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const lines = data.output_parsed.translationLines;
    const candidates = [];
    
    for (let i = 0; i < lines.length - 1; i++) {
        const curr = lines[i];
        const next = lines[i+1];
        
        // Check for split lines: Japanese line doesn't end with sentence-ending punctuation
        const jp = curr.originalJapaneseLine;
        const hasPunctuation = /[。！？」』]$/.test(jp.trim());
        
        if (!hasPunctuation) {
            candidates.push({
                lineNum1: curr.lineNumber,
                jp1: curr.originalJapaneseLine,
                en1: curr.translatedEnglishLine,
                lineNum2: next.lineNumber,
                jp2: next.originalJapaneseLine,
                en2: next.translatedEnglishLine
            });
        }
    }
    
    return candidates;
}
