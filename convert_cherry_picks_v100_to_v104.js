import parseAin from "./modules/AinTxtParser.js";
import fs from "fs/promises";

const getV104LineNumber = (v100LineRecord, v104LineRecords) => {
    return v104LineRecords.find(lr => (
        lr.originalJapaneseLine === v100LineRecord.originalJapaneseLine &&
        Math.abs(lr.lineNumber - v100LineRecord.lineNumber) < 500
    ));
};

// language=file-reference
const v104AinTxt = await fs.readFile("./Rance10.v1.04.ain.txt", "utf-8");
// language=file-reference
const v100AinTxt = await fs.readFile("./Rance10.v1.00.ain.txt", "utf-8");
// language=file-reference
const v100CherryAinTxt = await fs.readFile("./system_cherry_picks.v1.00.ain.txt", "utf-8");

const v104LineRecords = parseAin(v104AinTxt).parsed.filter(lr => lr.lineKind === "s");
const v100LineRecords = parseAin(v100AinTxt).parsed.filter(lr => lr.lineKind === "s");
const v100CherryLineRecords = parseAin(v100CherryAinTxt).parsed;

const lines = [];
for (const v100CherryLineRecord of v100CherryLineRecords) {
    const v100LineRecord = v100LineRecords.find(lr => lr.lineNumber === v100CherryLineRecord.lineNumber);
    const v104LineRecord = getV104LineNumber(v100LineRecord, v104LineRecords);
    lines.push(`s[${v104LineRecord.lineNumber}] = ${JSON.stringify(v100CherryLineRecord.originalJapaneseLine)}`);
    console.log(JSON.stringify(v100CherryLineRecord));
    console.log(JSON.stringify(v100LineRecord));
    console.log(JSON.stringify(v104LineRecord));
    console.log();
}


await fs.writeFile("./system_cherry_picks.v1.04.ain.txt", lines.join("\n") + "\n", "utf-8");