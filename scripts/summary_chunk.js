/**
 * Print the next batch of untranslated synopsis lines as a prompt to paste into
 * a chat, numbered so scripts/summary_merge.js can read the answer back.
 *
 *   node scripts/summary_chunk.js               # the next 150 still in Japanese
 *   node scripts/summary_chunk.js 80           # ...or as many as you say
 *   node scripts/summary_chunk.js --from=2000   # start at that row instead
 *
 * On Windows, `node scripts/summary_chunk.js 80 | clip` puts it straight on the
 * clipboard: the prompt goes to stdout and the "rows N to M" note to stderr, so
 * piping does not carry the note along.
 *
 * The numbers are positions in summary_glossary.tsv, and they are what makes
 * the round trip safe. Answering with the English alone would be a few hundred
 * tokens cheaper per batch and would silently shift every later line the moment
 * the model dropped one; with the numbers, a dropped or refused line is a gap
 * that merges as a gap. They stay valid as long as the game's table does, so a
 * batch can be answered days later or out of order.
 *
 * The names are quoted into the prompt rather than left to the model: the one
 * failure this whole repository is arranged around is a plausible new spelling
 * of a name (CLAUDE.md, "Names come from the tables"), and a name it never saw
 * spelled is a name it will spell its own way. Only the ones this batch
 * mentions, to keep the prompt short.
 */
import {createNameFinder} from "../modules/NameNormalizer.js";
import {readSummaryGlossary, readSummaryLines} from "../modules/SummaryLines.js";

/**
 * A count, however it was written: --size=80, --size 80, or a bare 80, since
 * the batch size is the one thing worth changing per run and typing the flag
 * for it every time is friction with no payoff.
 */
const args = process.argv.slice(2);

const fail = (message) => {
    console.error(message);
    process.exit(1);
};

const count = (value, name) => {
    const number = Number(value);
    if (!Number.isInteger(number) || number < 1) {
        fail(`${name} wants a whole number of rows, not ${JSON.stringify(value ?? "")}`);
    }
    return number;
};

const flag = (name, fallback) => {
    const inline = args.find(arg => arg.startsWith(`--${name}=`));
    if (inline) {
        return count(inline.slice(name.length + 3), `--${name}`);
    }
    const at = args.indexOf(`--${name}`);
    return at < 0 ? fallback : count(args[at + 1], `--${name}`);
};

const bare = args.filter((arg, at) => !arg.startsWith("--") && !/^--(size|from)$/.test(args[at - 1] ?? ""));
if (bare.length > 1) {
    fail(`Only one batch size, but ${bare.length} were given: ${bare.join(", ")}`);
}

const size = bare.length ? count(bare[0], "the batch size") : flag("size", 150);
const from = flag("from", 1);

const lines = await readSummaryLines();
const glossary = await readSummaryGlossary();

const pending = lines
    .map((line, index) => ({...line, number: index + 1}))
    .filter(line => line.number >= from && !glossary.get(line.japanese))
    .slice(0, size);

if (!pending.length) {
    console.error(from > 1
        ? `Nothing left untranslated from row ${from} on.`
        : "Every phrase already has English.");
    process.exit(0);
}

const findNames = await createNameFinder();
const names = new Map();
for (const {japanese} of pending) {
    for (const record of findNames(japanese)) {
        names.set(record.shortNameJpn, record.shortNameEng);
    }
}

const prompt = [
    "Translate these lines into English. They are captions on the event summary",
    "screen of the game Rance 10 -- each one labels a scene, none is a sentence.",
    "",
    "Answer with one fenced code block and nothing else in it: the number I gave,",
    "a tab, the English. Same order, one line each, no Japanese, no commentary.",
    "",
    "- At most 38 characters a line. Shorter is better; the panel does not wrap.",
    "- No trailing period.",
    "- Keep a leading ※ or a leading full-width space exactly where it is.",
    "- Some lines are crude or sexual. Translate them plainly rather than softening",
    "  them. If you will not translate one, leave its number out -- do not renumber.",
    ...(names.size ? [
        "- These are names. Spell them exactly this way:",
        ...[...names].map(([japanese, english]) => `  ${japanese} = ${english}`),
    ] : []),
    "",
    ...pending.map(({number, japanese}) => `${number}\t${japanese}`),
].join("\n");

console.log(prompt);
console.error(`Rows ${pending[0].number} to ${pending[pending.length - 1].number}`
    + ` of ${lines.length}, ${pending.length} phrases.`
    + " Save the reply to a file and run: node scripts/summary_merge.js <file>");
