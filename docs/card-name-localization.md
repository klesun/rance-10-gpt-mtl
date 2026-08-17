# Localizing card and character names without breaking saves

Notes from an investigation into why translating the card table reset every
character's rank, and how English names were added without touching a single
save key. Everything here was verified against Rance X v1.04 data and a real
save file; the numbers come from that session.

## The short version

Two strings in `カードデータ` look like labels but are actually **save keys**:

| Column | Also used as | Never translate it |
|---|---|---|
| `Id` (e.g. `Lv40 クルックー`) | key into `カード情報`, deck/collection state | yes |
| `識別名` (e.g. `クルックー`) | node name in the `識別名情報` ex-tree | yes |

Translating either one silently detaches the game from its own saved state.
The working approach is to leave both Japanese and patch the **display
accessors** in `Rance10.ain` to read an English string from a sibling leaf in
the ex-tree, keeping the raw value as the fallback default.

## Why the failure looks so confusing

Translating `識別名` produces a very misleading symptom: English names appear
correctly in the combat log, but every character's rank reads as zero.

The reason is that two different stores are keyed off the same string, and only
one of them is static:

- `CharacterCollection` is rebuilt **at runtime** from the card table on every
  launch. Translate the column and both its keys and its lookups become
  English, so it stays perfectly self-consistent — hence the correct display.
- The `識別名情報` tree is **static data** in `Rance10EX.ex`, and its node names
  stay Japanese. Runtime lookups now miss it entirely, so rank and event state
  come back empty.

Nothing is lost when this happens. The old entries are still in the save; the
game simply cannot find them any more. Reverting the column restores
everything.

## Save file format (`.asd`)

Saves live in `%USERPROFILE%\Documents\AliceSoft\ランス１０\SaveData`.

```
offset  size  meaning
0       2     magic "GD"
2       2     version (observed 01 01)
4       4     uint32 LE, size of the decompressed payload
8       ...   zlib stream
```

The payload begins with `rance10\0`. Inside, it is a **string-addressed
variable store**: keys are plain NUL-terminated cp932 with no length prefix,
packed back to back. Round-tripping through Python `zlib` reproduces the file
byte for byte, so saves are fully readable and rebuildable.

Two behaviours matter:

- **Unknown keys pass through untouched.** The game loads the whole map, keeps
  entries it does not recognise, and writes them all back. That is why a save
  written by a patched build still opens correctly in an unpatched one.
- **Missing keys are created on demand.** A patched build simply adds
  `識別名情報.<English name>` entries next to the Japanese ones, which is how a
  save ends up carrying two parallel sets of data.

## Which keys are built from `識別名`

Only two families are composed at runtime, both via `sprintf`-style formats in
`Rance10.ain`:

```
識別名情報.%s
識別名情報.%s.イベント
識別名情報.%s.ランクアップ%D
識別名情報.%s.裸イベント          (two sites)
```

Everything else that embeds a character name in a save — `友情深根１`,
`ちぬ／参戦`, `アタゴ／キャライベントＡ`, `クルックー裁判`, `飛べランス城` — is a
**literal hardcoded in the scenario**, not composed from the column. Those are
unaffected by translating the data table.

The way to confirm this on any future change: make a save before and after,
decompress both, and diff the string tables. A patched session that only adds
`識別名情報.*` keys proves the blast radius.

Note that `飛べランス城` contains `ランス` as part of a **place** name. Any
tooling that rewrites save keys by substring will corrupt it.

## The relevant functions in `Rance10.ain`

Function numbers are from the v1.04 dump; verify them after any game update.

| Function | # | Reads | Role |
|---|---|---|---|
| `Character@Name::get` / `#1` | 27959 / 27960 | `Character@Id` (27932 / 27933) | name shown in the combat log |
| `PlayerCard@ViewName::get` / `#1` | 28089 / 28090 | `PlayerCard@Id` (28086 / 28087) | label drawn on the card plate |
| `PlayerCard@CharacterId::get` / `#1` | 28095 / 28096 | column `識別名` | identity, **not** a label |
| `PlayerCard@Profile::get` | 28143 | builds `カード情報.<Id>` | card detail screen |
| `PlayerCardProfile@FullName::get` | 28219 | `<key>.フルネーム` | full name, already English |

`CharacterId` has around 45 call sites and almost all of them are identity
uses — lookup caches, party selection, rank-up targeting, portrait resolution
(`PlayerCard::ResolveStandName`). Do not repoint it at a translated string.
Patch the two display accessors instead; `ViewName` alone covers all five card
render sites (`CardConstructProcessCacheFront@CreateName`,
`CardConstructorFrontCard::Create` twice, and the two back-face constructors).

The `::get#1` twins are dead. Nothing in the code section pushes 27960 or
28090, while 27959 has two call sites and 28089 has the five render sites. An
earlier version of this patch changed all four; only two of them mattered.

Both accessors already special-case the chapter 2 protagonist: `Character@Name`
compares against `エール２`, `ViewName` looks for the `＜エール＞` token and
substitutes `PlayerCard::GetChapter2PlayerName()`. Leave those branches alone —
that name is chosen by the player at runtime.

## The patch shape

Wrap each accessor in an `override` that reads the tree and falls back to what
the original returned. That is the whole of [`patches/card_names.jaf`](../card_names.jaf):

```
override string PlayerCard@ViewName::get(void)
{
	string id = super();
	return EX_String("識別名情報.カード英名." + id + ".英名", id, 0);
}
```

`EX_String(path, default, flag)` — path, default value, then a flag. For tables
rather than trees the equivalent is
`EX_SA2String(table, rowKey, column, default, flag)`.

Passing the original string as the default is what makes this safe: a missing
or empty entry reproduces the unpatched behaviour exactly, so the worst
possible outcome is a Japanese name rather than a crash. It also lets the code
patch be built and tested independently of the data.

`super()` is what keeps the chapter 2 protagonist working without
reimplementing it. `alice-tools` moves the original body to a fresh function
index and points the override's `super()` at it, so the `エール２` comparison
and the `＜エール..＞` regex substitution still run untouched. Their result
then goes through the same lookup, misses — those cards are deliberately absent
from `カード英名` — and comes back as the default, which is exactly what the
original returned.

Writing the body by hand instead is possible for `Character@Name`, whose
backing field `m_id` is a plain member reachable as `this.m_id`. It is not
possible for `PlayerCard@ViewName`: its Id lives in a compiler-generated member
literally named `<Id>`, and the .jaf parser has no syntax that reaches it.
`super()` sidesteps the question and is the better shape anyway.

### Why not a .jam

The repository could feed alice-tools bytecode instead, and the first version
of this patch did. Both routes are worse:

- **A partial .jam does not work at all.** `ain edit -c` *replaces* the CODE
  section rather than merging into it. Assembling a file holding just the four
  patched functions drops the output from 10.5 MB to 7.7 MB — everything not
  mentioned is gone.

- **A full .jam works but corrupts the text pipeline.** Round-tripping the
  whole 57 MB dump reproduces an equivalent .ain (`ain compare` reports a
  match, and the string and message tables come back byte for byte), but the
  assembler resolves every `S_PUSH` literal back to an index by *value*.
  Translation collapses distinct Japanese strings into identical English ones —
  a dozen different lines all become "Thank you." — so roughly 164 call sites
  come back pointing at a shared index. The strings still render correctly, but
  `s[8489]` no longer addresses what `regenerated.ain.txt` thinks it does, and
  the next text edit writes to the wrong places.

`--jaf` has neither problem. It appends: three new strings at the end of the
table, no messages touched, no existing index moved. That is why it composes
with `-t` in a single invocation.

## Where the English strings live

`識別名情報` gains a leaf inside each existing node, plus one new sibling node
for per-card labels:

```
tree 識別名情報 = {
	クルックー = {
		英名 = "Crook Mofus",
		キャライベント１ = ...
	},
	カード英名 = {
		"全裸 クルックー" = {
			英名 = "Naked Crook",
		},
	},
}
```

**Node names are never touched** — they are the save keys. Adding leaves inside
them is safe and verified. Adding the one new sibling node is a slightly
larger assumption: the tree is only ever read by exact path in those five
`sprintf` sites, so an extra child should be inert, but nothing was found that
enumerates it either way.

Quoted node names are required for anything containing spaces or brackets, and
the nested `"<key>" = { 英名 = "..." }` shape mirrors what `カード情報` already
does, so it relies on no untested syntax.

That the names survive is easy to check without launching anything: build the
`.ex`, dump it back with `alice ex dump --split`, and confirm the node is still
there. Confirming the *keys* survive is the check that matters, and it is just
as cheap — the node names of the generated tree must be the 316 of the vanilla
tree, in order, plus `カード英名` and nothing else, and the `Id`/`識別名`
columns of `8_カードデータ.x` must still match vanilla row for row.

## Choosing the English text

Two different registers are needed, and the game already makes this
distinction:

- **Character name** (combat log) — the full name, taken from
  `48_立ち絵名札マッピング情報.x`, the table that already names every standing
  portrait in English. Its rows are keyed `<識別名>／<pose>`, so the join is a
  split on `／`.
- **Card label** (the plate) — the *short* name plus a translated affix. The
  Japanese labels do exactly this: `全裸 シィル`, `運命の女 パステル`. Using the
  full name here yields `Naked Crook Mofus` and overflows the plate.

The nameplates are the better source of the two on offer: 1016 characters
against the 356 the card table can name, and their names are in the order the
rest of the translation uses — `Uesugi Kenshin`, where `カード情報` says
`Kenshin Uesugi`.
The two disagree about 95 times, and letting the combat log contradict the
nameplate over the same character is the one outcome worth ruling out.

`カード情報.<Id>.フルネーム` is still the fallback for the 63 identities the
nameplate table does not cover, joined to `識別名` through the card table's `Id`
mapping. Where several cards sharing one `識別名` disagree on `フルネーム`, take
the majority; on an exact tie prefer the shorter, base form, otherwise
`あてな２号` inherits `Mass-produced Athena No. 2` from its own variant. Skip
placeholder values (`ｘｘｘ`) and joke ones (digit strings).

Both sources track the translation for free. The short names cannot: they are
keyed off the Japanese `識別名`, which is why
[`glossaries/card_name_glossary.tsv`](../card_name_glossary.tsv) exists. To keep a plate
spelling a name the way the script does, `glossaries/mistranslated_names.json` — the map
`scripts/regenerate_aai_txt.js` already uses to normalise dialogue — overrides the
glossary's english column wherever the two disagree.

Not blindly, though. That map is written for **prose**, where a character is
introduced by their full name, and the plate has room for neither the surname
nor the honorific: 35 of its entries would put `Lv37 Agireda Kosabusshi Zonna
Abona` on a plate drawn for 22 units. So an entry is taken only when it is a
**respelling** — `Saizel` → `Seizel`, `Girl Ban` → `Galban` — and refused when
it merely wraps the glossary's name in more words, on either end:

| kept | refused |
|---|---|
| `Calory` → `Carolie` | `Eleanor` → `Eleanor Ran` |
| `Sultan` → `Sorutoan` | `Masamune` → `Dokuganryuu Masamune` |
| `Frostvine` → `Frostbain` | `Crook` → `Ms. Crook` |

Today that takes 10 and refuses 25. The comparison is by whole words, so
`Caroli` → `Carolie` still counts as a respelling rather than a wrap.

The rule replaced a hand-written exception list, which it happens to subsume:
`子供ナギ` is "Nagi" in the map, and taking that would make the child and the
adult cards read identically where the glossary's "Young Nagi" does not — a
wrap seen from the other side. It also settles `日光刀`, which the map spells
"Nikkou", the same as `日光`; keeping the glossary's "Nikkou Blade" avoids the
collision instead of merely reporting it. The generator still warns whenever an
override newly hands two glossary keys the same English name, since nothing
guarantees the next one will be caught by the wrap rule.

The glossary is only ever overridden, never extended. The dialogue map holds 72
names the glossary does not, but they are places, factions and alternate
spellings rather than card subjects — and one of them, `魔人`, is an *affix*.
Adding it as a character name would put it in the substring scan competing with
the `魔人 {}` rule.

### Label width budget

The plate **clips text centred** and does not scale it. An overlong label loses
its `Lv` prefix *and* its tail at the same time, so `Lv36 Zeth Male Wizard
Corps` renders as `36 Zeth Male Wizard Cor`.

The widest Japanese label in the game is **22 half-width units** (kana and
kanji count as two, ASCII as one), and the plate was drawn for that. Compress
only labels that exceed it, so short ones keep their full wording.
`TextPartsStretcher::Adjust` exists in the codebase but is not used by the card
constructor.

## Building it

Three moving parts, in this order:

```bash
npm run regenerate-card-names   # rewrite 41_識別名情報.x from the card tables
npm run regenerate-ex           # build Rance10EX.ex, which carries the names
npm run regenerate-ain          # build Rance10.ain, which carries the patch
```

The first step is only needed when its inputs change — `8_カードデータ.x`,
`9_カード情報.x`, `48_立ち絵名札マッピング情報.x`, `glossaries/card_name_glossary.tsv` or
`glossaries/mistranslated_names.json`. Its output is committed like every other translated
`.x` file, so a plain build does not need it. Pass `--dry-run` to see the report
without writing.

Read the report rather than only its exit status. It says how many names came
from each source, which dialogue spellings it took and which it refused as too
long for a plate, and it lists any `英名` that came out still Japanese — that
last one renders exactly like no entry at all, so nothing else would notice.

`regenerate-ain` gained one flag and nothing else:

```
alice ain edit -t regenerated.ain.txt --jaf patches/card_names.jaf -o <game>/Rance10.ain game/ain/Rance10.v1.04.ain
```

Order inside that command does not matter, because the two edits are
independent: `-t` writes strings by index and `--jaf` only appends. Chaining
two invocations works identically.

That independence is worth re-checking rather than trusting, and it is cheap:
build once with `-t` alone and once with both, then `alice ain dump -s` and
`-m` on each. The message table must come back byte for byte and the string
table must agree up to its old length, with the `--jaf` literals — `識別名情報.`,
`.英名`, `識別名情報.カード英名.` — appended past it. Running both together does
print `Duplicate string in string table` a few dozen times; that is the
translated string table being hashed for lookup, and it happens with any `.jaf`
whatsoever, not because of this one.

`modules/EastAsianWidth.js` holds the W+F ranges of UAX #11, generated once so
the label budget agrees with the Python tooling the names were worked out in.
To move it to a newer Unicode, regenerate the table with:

```python
import unicodedata

ranges, start = [], None
for cp in range(0x110000):
    wide = unicodedata.east_asian_width(chr(cp)) in ("W", "F")
    if wide and start is None:
        start = cp
    elif not wide and start is not None:
        ranges.append((start, cp - 1))
        start = None
if start is not None:
    ranges.append((start, 0x10FFFF))
print("\n".join("\t[0x%04X, 0x%04X]," % r for r in ranges))
```

Then cross-check it: collect every code point that occurs in the card tables
and the glossary, and assert `isWide` agrees with `east_asian_width` on each
one. A wrong table does not crash, it just silently mis-measures a label.

## Traps worth remembering

**A node name in a `.x` file is quoted only when it has to be.** `カード情報`
holds 906 cards and 238 of them — every Id without a space, `ハンティ`,
`あてな２号`, `キャンテル` — are written bare. A reader that matches only
`"<name>" = {` does not merely skip them: the `フルネーム` that follows an
unrecognised node is credited to the last node that *was* recognised, so
`ポピンズ 東芝王子` silently ends up holding `ハンティ`'s name. That one mistake
put a wrong English name on 13 characters and left 23 more with none, and every
one of them still looked like a plausible name. Accept both spellings and pin
the indent instead — `alice ex dump` writes card nodes exactly one tab in.

The same asymmetry shows up on the way out: `alice ex build` accepts quotes
around any name and `alice ex dump` writes them back only where they are
needed, so a rebuilt file will not compare equal to the one that produced it.
Ignore quoting when diffing a round trip, or the real differences drown.

**A character name can sit inside a longer one.** `セル` (Sel) occurs within
`ケッセルリンク`, `セスナ` (Cessna) within `ハウセスナース`, `ランス` within
`ダークランス`. Any longest-match-wins scan will produce silent nonsense. The
reliable guard is to try candidates longest-first and keep the first one whose
leftover affix is translatable — a bogus match always leaves behind a fragment
no rule can handle.

**Never let `utf-8-sig` name your codec.** It decodes BOM-less input perfectly
happily, so a naive detector reports `utf-8-sig` for a file that has no BOM,
and writing it back prepends one. alice-tools then refuses to parse the file.
Detect the BOM from the raw bytes, keep it out of the codec, and re-attach
exactly what was there.

**Do not use `str.splitlines()` on game data.** It also breaks on `\x0b`,
`\x0c`, U+2028 and U+0085. Split on `\n` only, and assert that rejoining
reproduces the input.

**The `.x` files use CRLF, and the closing `};` has no terminator.** Deriving
the line ending from that last line silently yields `\n` and leaves the file
with mixed endings. Count over the whole file instead.

**Verify with an identity round-trip.** Running a rewrite tool with an empty
mapping must reproduce the source file byte for byte. Compare hashes — it
catches BOM, line-ending and splitter bugs in one step. A generator that
rewrites a file in place needs the same property against itself: stripping its
own output has to reproduce the stripped input, or a second run duplicates
everything the first one added.

**A translated marker stops being a marker.** `カード情報` gives the chapter 2
protagonist the full name `＜エール＞・モフス`, and
`PlayerCardProfile@FullName::get` runs `String.Replace(name, "＜エール＞", ...)`
over it before returning. Rendering those brackets as ASCII `<Aile>` reads fine
and quietly breaks the substitution — the needle no longer matches, so the
screen shows the marker instead of the player's name. The same shape appears in
`ViewName`, which looks for `＜エール` and regex-replaces `＜エール..＞`. Grep
for full-width brackets before translating anything that contains them.

## Verification checklist

After any change of this kind, three signals in order:

1. The build succeeds — the assembler accepted the edit.
2. **An existing save still shows correct ranks.** This is the important one.
   No key changed, so they must be intact. If they are zero, revert.
3. Names render in English.

If 1 and 2 pass but 3 does not, the build is fine and only the data read
failed — look at the tree, not the code.

Signal 2 is the expensive one to test, so it is worth narrowing it first. The
static half of the claim — that no key changed — can be checked in a second
against the vanilla `.ex` (see *Where the English strings live*), and if that
fails there is no point launching the game at all. What it cannot prove is that
nothing composes a key at runtime out of a string we did move, which is what
the save diff is for: make a save before and after, decompress both, and
compare the string tables. A patched session that only adds `識別名情報.*`
keys proves the blast radius.
