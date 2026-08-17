/**
 * Find the enemy status lines -- the four hints under an enemy's stats in
 * battle -- and write down which string slots hold them.
 *
 *   npm run regenerate-enemy-info
 *
 * These are not messages, so they are not in the m[] dialogue; they are string
 * literals assigned to four globals, ◆敵情報１..４, from inside two enormous
 * functions that also hold every enemy's code name and AI preset. In the
 * ain.txt dump they sit in one undifferentiated run of some 2700 s[] lines --
 * "m55グリーンスライム" next to "とにかく倒せ" -- so there is no way to pick
 * them out by reading. The code says which is which:
 *
 *     PUSHGLOBALPAGE / PUSH <◆敵情報N> / REF / S_PUSH <string> / S_ASSIGN
 *
 * So this dumps the code section, walks it for that shape, and writes the
 * slots it found to enemy_info_lines.v1.04.tsv. That file is the input to the
 * build, which means the search runs when the .ain changes rather than on
 * every build -- the same arrangement scripts/generate_card_names.js has.
 *
 * A string slot is shared by every site pushing that text, so translating one
 * that is also a key or an id elsewhere would break the lookup rather than the
 * display. Two of them are: the empty string and a lone full-width space, both
 * used as blank lines here and as everything else everywhere else. The scan
 * counts each slot's other uses and leaves anything shared out, so this stays
 * true of whatever a future version adds.
 */
import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";
import * as readline from "readline";
import {createReadStream} from "fs";
import {AIN, AIN_TXT} from "../modules/AinFiles.js";
import {alice, run} from "../modules/AliceTools.js";
import {ROOT} from "../modules/Env.js";
import {ENEMY_INFO_GLOBALS, ENEMY_INFO_LINES, readAinStrings} from "../modules/EnemyInfo.js";

/**
 * Which globals ◆敵情報１..４ are, rather than the four numbers they happen to
 * be in v1.04. The globals dump is a few hundred lines and costs nothing, and
 * a renumbering should move the scan rather than silently empty it.
 */
const readGlobals = async (dumpPath) => {
    const text = await fs.readFile(dumpPath, "utf-8");
    const found = new Map();
    for (const line of text.split(/\r?\n/)) {
        const match = line.match(/^\/\* (0x[0-9a-fA-F]+) \*\/\s+string (\S+);$/);
        if (match && ENEMY_INFO_GLOBALS.includes(match[2])) {
            found.set(Number(match[1]), match[2]);
        }
    }
    const missing = ENEMY_INFO_GLOBALS.filter(name => ![...found.values()].includes(name));
    if (missing.length) {
        throw new Error(`${missing.join(", ")} is not a string global in ${AIN}.`
            + ` The enemy status lines are somewhere else in this version.`);
    }
    return found;
};

/**
 * Every S_PUSH in the code section, split by whether it is one of the four
 * assignments or some other use of the same slot.
 */
const scanCode = async (dumpPath, globals) => {
    const assigned = new Map();   // string slot -> how many of the four globals it is assigned to
    const otherUses = new Map();  // string slot -> how many times it is pushed anywhere else
    const window = [];
    const input = createReadStream(dumpPath);
    for await (const line of readline.createInterface({input, crlfDelay: Infinity})) {
        const match = line.match(/^0x[0-9A-F]+:\s+(.*)$/);
        if (!match) {
            continue;
        }
        const instruction = match[1].trim();
        window.push(instruction);
        if (window.length > 4) {
            window.shift();
        }
        const pushed = instruction.match(/^S_PUSH 0x([0-9a-f]+)$/);
        if (!pushed) {
            continue;
        }
        const slot = parseInt(pushed[1], 16);
        const global = window[1]?.match(/^PUSH 0x([0-9a-f]+)$/);
        const isEnemyInfo = window.length === 4
            && window[0] === "PUSHGLOBALPAGE"
            && window[2] === "REF"
            && global
            && globals.has(parseInt(global[1], 16));
        const counts = isEnemyInfo ? assigned : otherUses;
        counts.set(slot, (counts.get(slot) ?? 0) + 1);
    }
    return [assigned, otherUses];
};

run(async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "rance10-enemy-info-"));
    const globalsDump = path.join(tempDir, "globals.txt");
    const codeDump = path.join(tempDir, "code.jam");
    try {
        for (const args of [["-g", "-o", globalsDump], ["-C", "--no-macros", "-o", codeDump]]) {
            const status = alice(["ain", "dump", ...args, AIN]);
            if (status !== 0) {
                return status;
            }
        }
        const globals = await readGlobals(globalsDump);
        const [assigned, otherUses] = await scanCode(codeDump, globals);
        const strings = await readAinStrings(AIN_TXT);

        const shared = [...assigned.keys()].filter(slot => otherUses.has(slot));
        const rows = [...assigned.keys()]
            .filter(slot => !otherUses.has(slot))
            .sort((a, b) => a - b)
            .map(slot => `${slot}\t${JSON.stringify(strings.get(slot))}\t${assigned.get(slot)}`);

        const header = [
            "# The string slots holding the enemy status lines, the four hints under an",
            "# enemy's stats in battle. Generated by scripts/extract_enemy_info.js -- edit",
            "# glossaries/enemy_info_glossary.tsv to change the English, not this file.",
            "#",
            "# Columns: string slot <TAB> the Japanese, JSON-quoted <TAB> how many enemies use it.",
            `# ${ENEMY_INFO_GLOBALS.join(", ")} = globals ${[...globals.keys()].join(", ")}.`,
            `# ${shared.length} more slots are assigned here and used elsewhere too, so translating`,
            "# them would change something other than this panel. They are left out:"
                + ` ${shared.map(slot => `s[${slot}] = ${JSON.stringify(strings.get(slot) ?? "")}`).join(", ")}.`,
            "",
        ].join("\n");
        await fs.writeFile(ENEMY_INFO_LINES, header + rows.join("\n") + "\n", "utf-8");

        const total = [...assigned.values()].reduce((a, b) => a + b, 0);
        console.log(`Found ${rows.length} enemy status lines in ${total} assignments`
            + ` -> ${path.relative(ROOT, ENEMY_INFO_LINES)}`);
        return 0;
    } finally {
        await fs.rm(tempDir, {recursive: true, force: true});
    }
});
