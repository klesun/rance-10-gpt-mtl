import fs from 'fs';
import path from 'path';
import { getCandidates } from './sweep_helper.js';

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

// Find where 246110_246170.json is
const startIndex = files.findIndex(f => f.name === '246110_246170.json');
if (startIndex === -1) {
    console.error("Could not find starting file!");
    process.exit(1);
}

const targetFiles = files.slice(startIndex, startIndex + 100);

const summary = {};

for (const file of targetFiles) {
    const filePath = path.join(gptOutputsDir, file.name);
    try {
        const candidates = getCandidates(filePath);
        summary[file.name] = candidates;
    } catch (e) {
        console.error(`Error reading ${file.name}:`, e.message);
    }
}

fs.writeFileSync('scripts/split_summary.json', JSON.stringify(summary, null, 2));
console.log(`Successfully generated split summary for ${targetFiles.length} files under scripts/split_summary.json`);
