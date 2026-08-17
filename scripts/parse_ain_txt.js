import fs from "fs/promises";
import parseAin from "../modules/AinTxtParser.js";
import {AIN_JSON, AIN_TXT} from "../modules/AinFiles.js";

const ainTxt = await fs.readFile(AIN_TXT, "utf-8");

const { parsed, unparsed } = parseAin(ainTxt);

// the s[] lines sometimes also store some displayed text (user interface mostly),
// but some of the text in s[] are internal constant names, not free form text, so
// only selected few s[] lines should be touched, exclusively by cherry-picking
const messageLines = parsed.filter(lr => lr.lineKind === "m");
const outputJson = "[\n" + messageLines.map(ml => JSON.stringify(ml)).join(",\n") + "\n]";

await fs.writeFile(AIN_JSON, outputJson, "utf-8");
