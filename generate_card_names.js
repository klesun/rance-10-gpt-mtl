/**
 * Fill 識別名情報 with the English names the display accessors read.
 *
 * card_names.jaf points Character@Name::get at 識別名情報.<識別名>.英名 and
 * PlayerCard@ViewName::get at 識別名情報.カード英名.<Id>.英名. This builds both.
 *
 *   英名 inside each existing node   the character's *full* name, for the
 *                                    combat log, read out of the standing
 *                                    portrait nameplates and joined out of
 *                                    カード情報's フルネーム where they have none.
 *
 *   カード英名, one new sibling node  the card plate's label: the *short* name
 *                                    plus a translated affix, because the plate
 *                                    clips text centred without scaling it.
 *
 * Node names are never touched. They are the keys under which saves store rank
 * and event state, so translating one detaches the game from its own saved
 * state -- ranks read back as zero while the display still looks correct.
 * Adding leaves inside a node is safe; the only new name is the カード英名
 * sibling, which nothing enumerates.
 *
 * Rewrites Rance10EX_v1_04/41_識別名情報.x in place and is idempotent: anything
 * a previous run added is stripped before the new content goes in, and the
 * script asserts that stripping its own output reproduces the stripped input.
 *
 * Usage:
 *   node generate_card_names.js              # rewrite the tree
 *   node generate_card_names.js --dry-run    # report only
 */
import * as fs from "fs/promises";
import {width} from "./modules/EastAsianWidth.js";

const EX_DIR = "Rance10EX_v1_04";
const GLOSSARY_PATH = "card_name_glossary.tsv";
const DIALOGUE_NAMES_PATH = "mistranslated_names.json";

/**
 * The plate clips text centred and does not scale it, so an overlong label
 * loses its "Lv" prefix *and* its tail at once: "Lv36 Zeth Male Wizard Corps"
 * renders as "36 Zeth Male Wizard Cor". The widest Japanese label in the game
 * is 22 half-width units and the plate was drawn for that.
 */
const MAX_WIDTH = 22;

/**
 * mistranslated_names.json is how the dialogue spells a character, and a plate
 * should read the way the text does -- but only when the disagreement is about
 * *spelling*. That map is written for prose, where a character is introduced by
 * their full name, so a good half of it carries a surname or an honorific the
 * plate has no room for and no use for: the plate is short name plus affix, and
 * "Lv37 Agireda Kosabusshi Zonna Abona" is 35 units against a budget of 22.
 *
 * So an entry that merely wraps the glossary's name in more words is refused --
 * "Eleanor" -> "Eleanor Ran", "Masamune" -> "Dokuganryuu Masamune", "Crook" ->
 * "Ms. Crook" -- and only a genuinely different spelling is taken, "Saizel" ->
 * "Seizel", "Girl Ban" -> "Galban". Whole words on either end, so "Caroli" ->
 * "Carolie" still counts as a respelling.
 *
 * This also subsumes what used to be a hand-written exception list: an entry
 * that drops a modifier telling two cards apart, "Young Nagi" -> "Nagi", is a
 * wrap seen from the other side and is refused for the same reason.
 */
const wordsOf = (name) => name.split(/[^\p{L}\p{N}]+/u).filter(Boolean);

const wrapsName = (a, b) => {
    const [inner, outer] = wordsOf(a).length <= wordsOf(b).length
        ? [wordsOf(a), wordsOf(b)]
        : [wordsOf(b), wordsOf(a)];
    if (inner.length === 0 || inner.length === outer.length) {
        return false;
    }
    const key = inner.join(" ");
    return outer.slice(0, inner.length).join(" ") === key
        || outer.slice(outer.length - inner.length).join(" ") === key;
};

/**
 * Applied in order, and only while the label is still over budget, so short
 * names keep their full wording.
 */
const SHORTEN = [
    ["Complete Set of Cooking Utensils", "Cooking Utensils"],
    ["Speak-No-Evil Monkey Golden Statue", "Speak-No-Evil Statue"],
    ["New Year's Dream Treasure Ship", "Dream Treasure Ship"],
    ["How to Care for a Chihuahua", "Chihuahua Care"],
    ["Declaration of Independence", "Independence Decl."],
    ["Guide to Intermediate Magic", "Interm. Magic Guide"],
    ["Complete Works of Medicine", "Medicine Compendium"],
    ["Three-stage Rocket Engine", "Rocket Engine"],
    ["Crown of Resistance Alelu", "Alelu Crown"],
    ["Royal Family History Book", "Royal History Book"],
    ["Blue Shrine Maiden Plaque", "Blue Miko Plaque"],
    ["Beastification Technique", "Beast Technique"],
    ["Mighty-armed Rabble", "Mighty Rabble"],
    ["Female Wizard Corps", "F. Wizard"],
    ["Male Wizard Corps", "M. Wizard"],
    ["Rance Castle Knight", "Castle Knight"],
    ["Next-Gen Monster of", "Next-Gen"],
    ["Legendary Arms:", "Arms:"],
    ["Extreme Monster", "Ultra"],
    ["High-Grade Tape Measure", "Tape Measure"],
    ["Monster General's Girl", "General's Girl"],
    // Rank titles: keep the rank, lose the words around it
    ["1st-Class Goddess", "Goddess 1"],
    ["2nd-Class Goddess", "Goddess 2"],
    ["11th Class Goddess", "Goddess 11"],
    ["High Level Goddess", "Hi-Lv Goddess"],
    ["3rd-Class Devil", "Devil 3"],
    ["1st-Class Devil", "Devil 1"],
    ["4th-Class God", "God 4"],
    // Source-game markers on the crossover Rance cards
    ["(Daiteikoku)", "(DT)"],
    ["(Kichikuou)", "(KK)"],
    ["(Daiakuji)", "(DA)"],
    ["Mysterious Merchant", "Merchant"],
    ["Former Youkai King", "Ex-Youkai King"],
    ["Greening Disease", "Greening"],
    ["Treasured Sword", "Treasure Sword"],
    ["Exclusive Maid", "Excl. Maid"],
    ["Superintendent", "Manager"],
    ["Grand Marshal", "Marshal"],
    ["Fated Woman", "Fated"],
    ["Poppins ", "Pop. "],
    ["Mass-Produced", "M-P"],
    ["Generalissimo", "Gen."],
    ["Guardian Spirit", "Guardian"],
    ["Princess ", "Pr. "],
    ["-kun", ""],
    ["Knight", "Kn."],
    ["ALICE Statuette", "ALICE Statue"],
    ["Golden Statue", "Statue"],
    ["Holy Girl ", "Holy "],
    ["(Restricted)", "(Ltd)"],
    ["(Small)", "(S)"],
    ["(Large)", "(L)"],
    ["Corps", "Corp"],
    ["Monster ", "Mon. "],
    ["Apostle ", "Ap. "],
    ["Dark Lord ", "DL "],
];

/** <japanese affix pattern> -> <english template> */
const AFFIX = new Map([
    ["{}", "{}"],
    ["全裸 {}", "Naked {}"],
    ["魔物 {}", "Monster {}"],
    ["使徒 {}", "Apostle {}"],
    ["魔人 {}", "Dark Lord {}"],
    ["絶魔物 {}", "Extreme Monster {}"],
    ["{}＋", "{} +"],
    ["運命の女 {}", "Fated Woman {}"],
    ["タイニー {}", "Tiny {}"],
    ["大将軍 {}", "Generalissimo {}"],
    ["ポピンズ {}", "Poppins {}"],
    ["壊れた {}", "Broken {}"],
    ["英霊 {}", "Heroic Spirit {}"],
    ["都市長 {}", "Mayor {}"],
    ["妖怪 {}", "Youkai {}"],
    ["ホルス {}", "Horus {}"],
    ["聖女 {}", "Holy Girl {}"],
    ["魔女 {}", "Witch {}"],
    ["憑依 {}", "Possession {}"],
    ["穴奴隷 {}", "Hole Slave {}"],
    ["酒乱 {}", "Drunk {}"],
    ["スーパー {}", "Super {}"],
    ["闘神 {}", "Toushin {}"],
    ["レベル神 {}", "Level Goddess {}"],
    ["勇者 {}", "Hero {}"],
    ["１級神 {}", "1st-Class Goddess {}"],
    ["２級神 {}", "2nd-Class Goddess {}"],
    ["４級神 {}", "4th-Class God {}"],
    ["１１級神 {}", "11th Class Goddess {}"],
    ["３級魔神 {}", "3rd-Class Devil {}"],
    ["１級魔神 {}", "1st-Class Devil {}"],
    ["医者 {}", "Doctor {}"],
    ["執事 {}", "Butler {}"],
    ["王様 {}", "King {}"],
    ["皇帝 {}", "Emperor {}"],
    ["パンダ {}", "Panda {}"],
    ["専属メイド {}", "Exclusive Maid {}"],
    ["囚われ {}", "Prisoner {}"],
    ["人間 {}", "Human {}"],
    ["お手伝い {}", "Helper {}"],
    ["発情期 {}", "Breeding Season {}"],
    ["危ない {}", "Risque {}"],
    ["緑化病 {}", "Greening Disease {}"],
    ["野生児 {}", "Wild Child {}"],
    ["巨大 {}", "Giant {}"],
    ["濃厚 {}", "Passionate {}"],
    ["チュパ {}", "Chupa {}"],
    ["特上贄 {}", "Sacrificial {}"],
    ["黒歴史 {}", "Dark History {}"],
    ["山賊 {}", "Bandit {}"],
    ["処女山賊 {}", "Virgin Bandit {}"],
    ["処女 {}", "Virgin {}"],
    ["覚醒 {}", "Awakened {}"],
    ["大富豪 {}", "Wealthy {}"],
    ["工場長 {}", "Foreman {}"],
    ["大人化 {}", "Adultified {}"],
    ["大人 {}", "Adult {}"],
    ["文豪 {}", "Maestro {}"],
    ["管理人 {}", "Superintendent {}"],
    ["妖怪王 {}", "Youkai King {}"],
    ["元妖怪王 {}", "Former Youkai King {}"],
    ["霊体 {}", "Spirit {}"],
    ["謎商人 {}", "Mysterious Merchant {}"],
    ["魔物隊長 {}", "Monster C.O. {}"],
    ["未魔王 {}", "Future Demon King {}"],
    ["魔王 {}", "Demon King {}"],
    ["恋人 {}", "Lover {}"],
    ["敏感魔人 {}", "Sensitive Dark Lord {}"],
    ["悪魔 {}", "Devil {}"],
    ["レベル屋 {}", "Level Shop {}"],
    ["ハイレベル神 {}", "High Level Goddess {}"],
    ["幼女 {}", "Little Girl {}"],
    ["裸族王 {}", "Nudist King {}"],
    ["堕天使 {}", "Fallen Angel {}"],
    ["大元帥 {}", "Grand Marshal {}"],
    ["骸骨王 {}", "Skeleton King {}"],
    ["泥姫 {}", "Mud Princess {}"],
    ["超人 {}", "Superhuman {}"],
    ["村人 {}", "Villager {}"],
    ["{}(制限)", "{} (Restricted)"],
    ["{} 1/2", "{} 1/2"],
    ["{} 1/4", "{} 1/4"],
    ["{} 1/8", "{} 1/8"],
    ["{} 1/16", "{} 1/16"],
    ["熟女 {}", "Mature {}"],
    ["少女 {}", "Maiden {}"],
    ["帝 {}", "Empress {}"],
    ["聖刀 {}", "Holy Blade {}"],
    ["挑戦者 {}", "Challenger {}"],
    ["魔王{}(制限)", "Demon King {} (Restricted)"],
    ["花屋 {}", "Florist {}"],
    ["超{}", "Super {}"],
    ["王様 {}(鬼)", "King {} (Kichikuou)"],
    ["皇帝 {}(宇)", "Emperor {} (Daiteikoku)"],
    ["パンダ {}(悪)", "Panda {} (Daiakuji)"],
]);

/** Sengoku surnames glued straight onto the given name. Order matters. */
const SURNAME = new Map([
    ["上杉", "Uesugi"], ["毛利", "Mouri"], ["吉川", "Kikkawa"],
    ["小早川", "Kobayakawa"], ["直江", "Naoe"], ["朝倉", "Asakura"],
    ["柚原", "Yuzuhara"], ["北条", "Houjou"], ["山本", "Yamamoto"],
    ["真田", "Sanada"], ["普通の", "Regular "],
]);

const CARD_ROW = /^\s*\{\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"/;
// depth-agnostic: the tree nests deeper in places, so never pin the indent
const FULLNAME = /^\s*フルネーム\s*=\s*"(.*)"\s*,?\s*$/;
// A card Id is quoted only when it has to be -- 238 of the 906 nodes in
// カード情報 are bare words. Matching only the quoted ones does not just lose
// them, it corrupts their neighbours: the フルネーム under an unrecognised node
// is attributed to the last node that *was* recognised, which is how
// "ポピンズ 東芝王子" ends up holding ハンティ's name. Card nodes all sit exactly
// one tab in, and pinning that indent is what keeps the now-optional quotes
// from also matching a leaf.
const ID_NODE = /^\t("?)([^\t]+?)\1\s*=\s*\{\s*$/;
const INFO_NODE = /^\t"?([^"\t=]+?)"?\s*=\s*\{/;
const EIMEI_LEAF = /^\t\t英名 = "/;
const LV = /^Lv(\p{Nd}+|\?\?) \{\}$/u;
const R_TAG = /^(.*\{\})\((R\p{Nd})\)$/u;
const CARD_NAMES_NODE = "\tカード英名 = {";

/**
 * Read a game text file. The encoding is only reported as having a BOM when one
 * is actually there -- a decoder handles BOM-less input happily, and echoing a
 * BOM back on write makes alice-tools refuse the file.
 */
const readText = async (path) => {
    const raw = await fs.readFile(path);
    const bom = raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf;
    const body = bom ? raw.subarray(3) : raw;
    for (const encoding of ["utf-8", "shift_jis"]) {
        try {
            return {text: new TextDecoder(encoding, {fatal: true}).decode(body), encoding, bom};
        } catch {
            // not this one, try the next
        }
    }
    throw new Error("cannot decode " + path);
};

const writeText = async (path, text, {encoding, bom}) => {
    if (encoding !== "utf-8") {
        throw new Error(`refusing to write ${path} back as ${encoding}: only utf-8 is supported`);
    }
    await fs.writeFile(path, (bom ? "﻿" : "") + text, "utf-8");
};

/**
 * Split on "\n" only. String.prototype.split does not break on \x0b, \x0c,
 * U+0085 or U+2028 the way Python's splitlines() does, which is what we want on
 * game data -- those bytes are content, not line breaks.
 */
const splitLines = (text) => text.split("\n");

/** True for the placeholder values フルネーム uses instead of a real name. */
const isDigits = (text) => text.length > 0 && [...text].every(char => /\p{Nd}/u.test(char));

/**
 * The .x format has no escape for a quote inside a string, so a name carrying
 * one would produce a file alice-tools cannot parse. Nothing in the data does
 * today; fail loudly rather than emit something broken if that ever changes.
 */
const quoted = (text) => {
    if (text.includes("\"") || text.includes("\\")) {
        throw new Error(`cannot put ${JSON.stringify(text)} in a .x string literal`);
    }
    return `"${text}"`;
};

/** Compare by code point, the way Python orders strings. */
const compareCodePoints = (a, b) => {
    const ca = [...a];
    const cb = [...b];
    for (let i = 0; i < Math.min(ca.length, cb.length); ++i) {
        const diff = ca[i].codePointAt(0) - cb[i].codePointAt(0);
        if (diff !== 0) {
            return diff;
        }
    }
    return ca.length - cb.length;
};

const shorten = (name) => {
    for (const [needle, replacement] of SHORTEN) {
        if (width(name) <= MAX_WIDTH) {
            break;
        }
        if (name.includes(needle)) {
            name = name.split(needle).join(replacement);
        }
    }
    return name;
};

const translateAffix = (pattern) => {
    const exact = AFFIX.get(pattern);
    if (exact !== undefined) {
        return exact;
    }
    const lv = LV.exec(pattern);
    if (lv) {
        return `Lv${lv[1]} {}`;
    }
    // "(R1)".."(R9)" mark the Rance 01-09 era variants -- keep the tag,
    // translate whatever prefix carries it
    const rTag = R_TAG.exec(pattern);
    if (rTag) {
        const head = translateAffix(rTag[1]);
        return head === null ? null : `${head} (${rTag[2]})`;
    }
    // "<prefix> <surname>{}"  e.g.  "Lv35 上杉{}" / "全裸 毛利{}"
    for (const [ja, en] of SURNAME) {
        if (pattern.endsWith(ja + "{}")) {
            const head = pattern.slice(0, -(ja + "{}").length);
            const headEn = head ? translateAffix(head + "{}") : "{}";
            if (headEn === null) {
                return null;
            }
            const joiner = en.endsWith(" ") ? "" : " ";
            return headEn.split("{}").join(`${en}${joiner}{}`);
        }
    }
    return null;
};

/**
 * shortNameJpn -> shortNameEng, the spelling the dialogue uses.
 *
 * Two names are listed twice, and the second entry is not a better spelling of
 * the first -- it is a narrower repair. クルックー appears as "Crook" against 44
 * garbled romanisations, then again as "Ms. Crook" against exactly one, "Mr.
 * Crook": that row exists to fix an honorific's gender in prose, not to rename
 * the character. Reading the file in order lets the later row win, which is
 * wrong for a name lookup, and the wrap rule below is what catches it.
 */
const loadDialogueNames = async () => {
    const records = JSON.parse(await fs.readFile(DIALOGUE_NAMES_PATH, "utf-8"));
    return new Map(records.map(record => [record.shortNameJpn, record.shortNameEng]));
};

/**
 * 名前 -> English, plus aliases with 子供/少女/女 and trailing digits stripped
 * from BOTH sides so 子供志津香 ("Young Shizuka") also answers to 志津香.
 */
const loadGlossary = async (dialogueNames) => {
    const {text} = await readText(GLOSSARY_PATH);
    const base = new Map();
    const alias = new Map();
    const overrides = [];
    const refused = [];
    const original = new Map();
    for (const rawLine of splitLines(text)) {
        const line = rawLine.replace(/\r$/, "");
        if (!line.trim() || line.startsWith("#")) {
            continue;
        }
        const parts = line.split("\t");
        if (parts.length < 2 || !parts[1].trim()) {
            continue;
        }
        const ja = parts[0];
        const glossaryEn = parts[1].trim();
        original.set(ja, glossaryEn);
        const dialogueEn = dialogueNames.get(ja);
        let en = glossaryEn;
        if (dialogueEn !== undefined && dialogueEn !== glossaryEn) {
            if (wrapsName(glossaryEn, dialogueEn)) {
                refused.push({ja, kept: glossaryEn, wrapped: dialogueEn});
            } else {
                overrides.push({ja, from: glossaryEn, to: dialogueEn});
                en = dialogueEn;
            }
        }
        base.set(ja, en);

        let shortJa = ja;
        let shortEn = en;
        for (const [preJa, preEn] of [["子供", "Young "], ["少女", "Maiden "], ["女", "Female "]]) {
            if (shortJa.startsWith(preJa) && shortEn.startsWith(preEn)) {
                shortJa = shortJa.slice(preJa.length);
                shortEn = shortEn.slice(preEn.length);
            }
        }
        for (const [sufJa, sufEn] of [["大", " (Large)"], ["小", " (Small)"]]) {
            if (shortJa.endsWith(sufJa) && shortEn.endsWith(sufEn)) {
                shortJa = shortJa.slice(0, -sufJa.length);
                shortEn = shortEn.slice(0, -sufEn.length);
            }
        }
        const trailingDigit = /^(.*?)([０-９2-9])$/.exec(shortJa);
        if (trailingDigit && /^(.*?) \p{Nd}$/u.test(shortEn)) {
            shortJa = trailingDigit[1];
            shortEn = shortEn.replace(/ \p{Nd}$/u, "");
        }
        if (shortJa && !base.has(shortJa) && !alias.has(shortJa)) {
            alias.set(shortJa, shortEn);
        }
    }
    return {base, alias, overrides, refused, original};
};

/**
 * An override that hands two different glossary keys the same English name
 * makes their cards indistinguishable. Worth saying out loud rather than
 * silently folding them together.
 */
const findCollapses = (overrides, base, original) => {
    const collapses = [];
    for (const override of overrides) {
        const clashes = [...base]
            .filter(([ja, en]) => ja !== override.ja && en === override.to)
            .map(([ja]) => ja);
        const clashedBefore = [...original]
            .some(([ja, en]) => ja !== override.ja && en === override.from);
        if (clashes.length > 0 && !clashedBefore) {
            collapses.push({...override, clashes});
        }
    }
    return collapses;
};

/** Id -> 識別名, in card table order. */
const readCards = async (exDir) => {
    const {text, encoding} = await readText(`${exDir}/8_カードデータ.x`);
    const cards = new Map();
    for (const line of splitLines(text)) {
        const row = CARD_ROW.exec(line);
        if (row) {
            cards.set(row[1], row[2]);
        }
    }
    return {cards, encoding};
};

/** Id -> フルネーム. */
const readFullNames = async (exDir) => {
    const {text, encoding} = await readText(`${exDir}/9_カード情報.x`);
    const fullNames = new Map();
    let current = null;
    for (const rawLine of splitLines(text)) {
        const line = rawLine.replace(/\r$/, "");
        const node = ID_NODE.exec(line);
        if (node) {
            current = node[2];
            continue;
        }
        const full = FULLNAME.exec(line);
        if (full && current) {
            fullNames.set(current, full[1]);
        }
    }
    return {fullNames, encoding};
};

/**
 * 識別名 -> English name, from the ADV nameplates.
 *
 * 立ち絵名札マッピング情報 keys a name by "<識別名>／<pose>", and every base name
 * in it agrees with itself, so the first row of a character wins. This table is
 * the repository's most carefully kept English namelist -- 1016 characters
 * against the 356 カード情報 can name -- and its Sengoku names are in the order
 * the rest of the translation uses, 上杉謙信 as "Uesugi Kenshin" rather than
 * カード情報's "Kenshin Uesugi".
 */
const readNameplates = async (exDir) => {
    const {text, encoding} = await readText(`${exDir}/48_立ち絵名札マッピング情報.x`);
    const plates = new Map();
    for (const line of splitLines(text)) {
        const row = CARD_ROW.exec(line);
        if (row) {
            const ident = row[1].split("／")[0];
            if (ident && row[2] && !plates.has(ident)) {
                plates.set(ident, row[2]);
            }
        }
    }
    return {plates, encoding};
};

/**
 * 識別名 -> the name the combat log should show: the nameplate where there is
 * one, otherwise the フルネーム most of the character's cards agree on.
 */
const buildIdentityNames = (cards, fullNames, plates) => {
    const votes = new Map();
    for (const [cardId, ident] of cards) {
        const full = fullNames.get(cardId);
        if (!full || full === "ｘｘｘ" || isDigits(full)) {
            continue;
        }
        if (!votes.has(ident)) {
            votes.set(ident, new Map());
        }
        const counter = votes.get(ident);
        counter.set(full, (counter.get(full) ?? 0) + 1);
    }
    // majority first; on a tie prefer the shorter (base) form, then by code
    // point so the result is deterministic
    const pick = counter => [...counter]
        .sort(([nameA, countA], [nameB, countB]) => (countB - countA)
            || ([...nameA].length - [...nameB].length)
            || compareCodePoints(nameA, nameB))[0][0];
    const voted = new Map([...votes].map(([ident, counter]) => [ident, pick(counter)]));

    const names = new Map();
    const fromCards = [];
    const disagreements = [];
    for (const ident of new Set([...plates.keys(), ...voted.keys()])) {
        const plate = plates.get(ident);
        const card = voted.get(ident);
        names.set(ident, plate ?? card);
        if (plate === undefined) {
            fromCards.push(ident);
        } else if (card !== undefined && card !== plate) {
            disagreements.push([ident, card, plate]);
        }
    }
    // only worth reporting where the two disagree; a conflict inside カード情報
    // that the nameplate settles anyway is noise
    const conflicts = [...votes]
        .filter(([ident, counter]) => counter.size > 1 && !plates.has(ident));
    return {names, conflicts, fromCards, disagreements};
};

/** Card Id -> plate label. */
const buildCardLabels = (cards, lookup) => {
    const keys = [...lookup.keys()]
        .map((key, index) => ({key, index}))
        .sort((a, b) => ([...b.key].length - [...a.key].length) || (a.index - b.index))
        .map(entry => entry.key);
    const labels = new Map();
    const skipped = new Map();
    const skip = reason => skipped.set(reason, (skipped.get(reason) ?? 0) + 1);

    for (const [cardId, ident] of cards) {
        if (cardId.includes("＜エール")) {
            skip("chapter-2 protagonist (handled by the game)");
            continue;
        }
        // Try candidates longest-first and keep the first whose leftover affix
        // is translatable. A name can sit inside a longer one -- セル inside
        // ケッセルリンク, セスナ inside ハウセスナース -- and the bogus match is
        // exactly the one that leaves an affix no rule can translate.
        const candidates = (ident && cardId.includes(ident) ? [ident] : [])
            .concat(keys.filter(key => cardId.includes(key) && key !== ident));
        if (candidates.length === 0) {
            skip("no character name found in Id");
            continue;
        }
        let lastPattern = null;
        let matched = false;
        for (const hit of candidates) {
            const pattern = cardId.replace(hit, "{}");
            lastPattern = pattern;
            const template = translateAffix(pattern);
            if (template !== null) {
                labels.set(cardId, shorten(template.split("{}").join(lookup.get(hit))));
                matched = true;
                break;
            }
        }
        if (!matched) {
            skip(`untranslated affix: ${lastPattern}`);
        }
    }
    return {labels, skipped};
};

/** Remove everything a previous run of this script added. */
const stripGenerated = (lines) => {
    const start = lines.findIndex(line => line.replace(/\r$/, "") === CARD_NAMES_NODE);
    if (start !== -1) {
        // The node closes with "\t}," -- its children close with "\t\t},", so
        // the indent has to be part of the match, not stripped away.
        const end = lines.findIndex((line, index) => index > start && line.replace(/\r$/, "") === "\t},");
        if (end === -1) {
            throw new Error("found a カード英名 node with no closing brace");
        }
        lines = lines.slice(0, start).concat(lines.slice(end + 1));
    }
    return lines.filter((line, index) => !(index > 0
        && EIMEI_LEAF.test(line)
        && INFO_NODE.test(lines[index - 1])));
};

const main = async () => {
    const dryRun = process.argv.includes("--dry-run");

    const dialogueNames = await loadDialogueNames();
    const {base, alias, overrides, refused, original} = await loadGlossary(dialogueNames);
    const {cards, encoding: cardsEncoding} = await readCards(EX_DIR);
    const {fullNames, encoding: infoEncoding} = await readFullNames(EX_DIR);
    const {plates, encoding: plateEncoding} = await readNameplates(EX_DIR);

    console.log(`カードデータ : ${cards.size} cards (${cardsEncoding})`);
    console.log(`カード情報   : ${fullNames.size} nodes with フルネーム (${infoEncoding})`);
    console.log(`名札マッピング: ${plates.size} characters (${plateEncoding})`);
    console.log(`glossary     : ${base.size} names, ${alias.size} aliases`);
    console.log(`  respelled from ${DIALOGUE_NAMES_PATH}: ${overrides.length}`);
    for (const {ja, from, to} of overrides) {
        console.log(`    ${ja}: ${JSON.stringify(from)} -> ${JSON.stringify(to)}`);
    }
    console.log(`  kept short against ${DIALOGUE_NAMES_PATH}: ${refused.length}`);
    for (const {ja, kept, wrapped} of refused) {
        console.log(`    ${ja}: ${JSON.stringify(kept)} (not ${JSON.stringify(wrapped)})`);
    }
    for (const {ja, to, clashes} of findCollapses(overrides, base, original)) {
        console.log(`  WARNING ${ja} -> ${JSON.stringify(to)} now collides with ${clashes.join(", ")}`);
    }

    const {names, conflicts, fromCards, disagreements} = buildIdentityNames(cards, fullNames, plates);
    console.log(`\njoined       : ${names.size} 識別名 have an English name`);
    console.log(`  ${names.size - fromCards.length} from 名札マッピング, ${fromCards.length} from カード情報`);
    console.log(`  nameplate differs from フルネーム in ${disagreements.length} of them`);
    console.log(`conflicts    : ${conflicts.length}`);
    for (const [ident, counter] of conflicts) {
        const tally = [...counter].map(([name, count]) => `${name}: ${count}`).join(", ");
        console.log(`    ${ident}: {${tally}}  ->  ${JSON.stringify(names.get(ident))}`);
    }

    const lookup = new Map(alias);
    for (const [ja, en] of base) {
        lookup.set(ja, en);
    }
    const {labels, skipped} = buildCardLabels(cards, lookup);
    console.log(`\nnamed        : ${labels.size} card labels`);
    console.log(`skipped      : ${[...skipped.values()].reduce((a, b) => a + b, 0)}`);
    for (const [reason, count] of [...skipped].sort(([, a], [, b]) => b - a)) {
        console.log(`    ${String(count).padStart(4)}  ${reason}`);
    }
    const over = [...labels].filter(([, label]) => width(label) > MAX_WIDTH);
    console.log(`\nstill wider than ${MAX_WIDTH} units: ${over.length}`);
    for (const [cardId, label] of over) {
        console.log(`  ${width(label)}  ${JSON.stringify(label)}   (was ${JSON.stringify(cardId)})`);
    }

    const identPath = `${EX_DIR}/41_識別名情報.x`;
    const {text, encoding, bom} = await readText(identPath);
    const stripped = stripGenerated(splitLines(text));

    // Decide the line ending from the whole file, not from its last line: the
    // closing "};" usually has no terminator at all, which would silently pick
    // LF and leave the file with mixed endings.
    const crlf = (text.match(/\r\n/g) ?? []).length;
    const lf = (text.match(/\n/g) ?? []).length;
    const carriage = crlf > lf - crlf ? "\r" : "";

    const out = [];
    let injected = 0;
    const missing = [];
    const untranslated = [];
    for (const line of stripped) {
        out.push(line);
        const node = INFO_NODE.exec(line);
        if (!node) {
            continue;
        }
        const english = names.get(node[1].trim());
        if (english === undefined) {
            missing.push(node[1].trim());
            continue;
        }
        // An entry that is still Japanese renders the same as no entry at all,
        // but silently -- say it out loud so it can be fixed at the source.
        if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(english)) {
            untranslated.push(`${node[1].trim()} -> ${english}`);
        }
        out.push(`\t\t英名 = ${quoted(english)},${carriage}`);
        ++injected;
    }

    const close = out.reduce((last, line, index) => line.replace(/\s+$/, "") === "};" ? index : last, -1);
    if (close === -1) {
        throw new Error(`${identPath} has no closing "};"`);
    }
    const block = [`${CARD_NAMES_NODE}${carriage}`];
    for (const [cardId, english] of labels) {
        block.push(`\t\t${quoted(cardId)} = {${carriage}`);
        block.push(`\t\t\t英名 = ${quoted(english)},${carriage}`);
        block.push(`\t\t},${carriage}`);
    }
    block.push(`\t},${carriage}`);
    const rewritten = out.slice(0, close).concat(block, out.slice(close));

    // Identity round-trip: stripping our own output has to reproduce exactly
    // what we started from. Catches a stripper that misses what the injector
    // writes, which is how re-running ends up duplicating entries.
    const restripped = stripGenerated(rewritten);
    if (restripped.length !== stripped.length || restripped.some((line, i) => line !== stripped[i])) {
        throw new Error("generated output does not strip back to its input -- the rewrite is not idempotent");
    }

    console.log(`\n識別名情報   : ${injected} 英名 injected, ${missing.length} nodes without a mapping`);
    console.log(`               ${missing.slice(0, 12).join(", ")}`);
    if (untranslated.length > 0) {
        console.log(`               ${untranslated.length} still Japanese: ${untranslated.join(", ")}`);
    }

    if (dryRun) {
        console.log("\n(dry run -- omit --dry-run to write)");
        return;
    }
    await writeText(identPath, rewritten.join("\n"), {encoding, bom});
    console.log(`\nWROTE ${identPath}`);
};

await main();
