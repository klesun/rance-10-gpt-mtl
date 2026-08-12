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

// Find where 246110_246170.json is
const startIndex = files.findIndex(f => f.name === '246110_246170.json');
if (startIndex === -1) {
    console.error("Could not find starting file!");
    process.exit(1);
}

const targetFiles = files.slice(startIndex, startIndex + 100);
console.log(`Found ${targetFiles.length} files starting from ${files[startIndex].name}:`);
targetFiles.forEach((f, idx) => {
    console.log(`${idx + 1}: ${f.name}`);
});
