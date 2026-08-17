# Working on this repository

An English patch for Rance 10. The game's text lives in `Rance10.ain`,
`Rance10EX.ex` and `Rance10Pact.afa`; the build renders a patch out of the files
here and hands it to [alice-tools](https://github.com/nunuhara/alice-tools).
`README.md` has the commands, `docs/` has the write-ups.

`game/ain/` holds the game's own `Rance10.v1.04.ain` and the dumps taken from
it. Nothing in there is edited by hand and no build writes to it; reach those
files through `modules/AinFiles.js` rather than by spelling the path, so the
next game version is one edit.

What is written rather than dumped is sorted by what it is, and every one of
these is edited by hand:

| Folder | Holds |
|---|---|
| `glossaries/` | the English, keyed by the Japanese — the tables below, and the two the enemy panel and the synopsis screen read |
| `patches/` | what alice-tools is handed directly: the cherry-picked system strings, and `card_names.jaf` |
| `variants/` | one folder per translation of the dialogue |
| `archives/` | one folder per game archive we patch — `Rance10EX.ex`, and the three `.afa` — plus the manifests that pack two of them |
| `scripts/`, `modules/` | every entry point, and the code behind them |

`archives/` is the game's own data with our edits over it, which is why it is
not under `game/`: those four trees are written into, and `game/` is the copy
nothing touches.

Everything a build writes goes to `build/`, which is gitignored whole and safe
to delete: the rendered patch, the generated `race_names.jaf`, the `pactex`
staging directory, the reports. Write there through `BUILD` in
`modules/Env.js`, and call `ensureBuild()` first — a fresh checkout has no such
directory, and neither `fs.writeFile` nor alice-tools will make one.

A path is a constant in a module — `SUMMARY_GLOSSARY`, `RACE_GLOSSARY`, `AIN` —
so moving a file again is one edit rather than a grep. Nothing reads a path
relative to the working directory: scripts run from anywhere, and the two
version-stamped tables the build extracts from the `.ain`
(`enemy_info_lines.v1.04.tsv`, `race_names.v1.04.tsv`) are still at the root
because they are neither hand-written nor the game's own.

```
npm run regenerate-ain          # the main build: dialogue + system text + the .jaf patches
npm run regenerate-ex           # skill and character descriptions
npm run regenerate-pack         # the UI archive
```

The rest of this file is the handful of rules that are expensive to break, and
the reasoning behind each, because each one was learned by breaking it.

## Names come from the tables, never from you

Before writing any English proper noun — a character, a place, a race, a
faction — look it up:

| File | Holds |
|---|---|
| `glossaries/mistranslated_names.json` | the canonical spelling, plus the wrong ones seen before |
| `glossaries/card_name_glossary.tsv` | the same for everything that appears in a card Id |
| `glossaries/character_genders.md` | who is which gender, for pronouns |

`ハニー` is a **Hanny**, not a Honey, and `ハニ子` is **Haniko**. Both went in as
"Honey" anyway — as a race, as an enemy status line, and twice in
`patches/system_cherry_picks.v1.04.ain.txt` — while all three tables above had said
otherwise the whole time. The repair pass in `modules/NameNormalizer.js` did not
catch it, because that pass swaps a *known* misspelling for the right one and a
fresh plausible spelling is not on the list.

So `createNameChecker` in the same module reads the table the other way round —
it reports where the Japanese names somebody and the English does not spell them
the canonical way — and both hand-written glossaries go through it as the build
renders them. It does **not** run over `patches/system_cherry_picks.v1.04.ain.txt`,
which has around 205 lines it would complain about (`魔軍` as "demon army" where
the table says Monster Army, `魔人` as "Demon" where it says Fiend). Those are a
separate job.

## A string slot is shared by everything that pushes it

`s[4018]` is the race `モンスター`, and it is also what
`Party::OrganizationIdFromString` runs `String.Contains` against. Translating it
turns every monster card into a black rectangle — the note recording that has
been in `patches/system_cherry_picks.v1.04.ain.txt` for years.

Before translating an `s[N]`, find out what else pushes it:

```
alice ain dump -C --no-macros -o code.jam game/ain/Rance10.v1.04.ain   # operands are slot numbers
```

then look for every `S_PUSH 0x<slot>` and read what surrounds it.
`scripts/extract_enemy_info.js` does exactly this and drops anything shared, so
copy its shape rather than inventing one.

**If the string is shared but the thing displaying it is display-only, patch the
function instead of the string.** That is what `patches/card_names.jaf` does for card
names and what the generated `build/race_names.jaf` does for races: the strings keep
their Japanese, so nothing that compares text notices, and `super()` gives a
fallback that can only ever produce the original Japanese. See
`docs/race-names.md`.

## Some Japanese is data wearing the clothes of text

- A card's `Id` and a character's `識別名` are the keys a save file stores rank
  and event progress under. Translating them makes every rank read back as zero
  while the display still looks right. `docs/card-name-localization.md`.
- Buff names are quoted back as text inside the battle AI's condition strings —
  `敵支援＜d熱狂＞` — so renaming a buff means finding the conditions too.
- An enemy's code name (`m55宝箱だんご`) is a key; its display name is not. They
  sit next to each other in the dump.

## Check the callers before patching a display function

`表示規模` looks exactly like `表示種族` and sits a few lines from it, and it has
**no callers at all** — the scale beside BOSS is two literals
`EnemyInformationView@SetParam` writes itself. `表示地域`'s one caller feeds a
debug log. Patching either would compile, apply, and change nothing anybody
sees.

## One source per string

alice-tools applies the **last** assignment it reads and says nothing about the
earlier ones, so a duplicate `s[N]` is invisible until you go looking. The
enemy status lines had picked up 25 conflicting pairs that way, one of which had
been showing the wrong number for who knows how long.

Keep translations in a glossary keyed by **the Japanese**, not by slot: the slot
numbers belong to one build of one version, and a line the game repeats then
gets translated once because there is nowhere to write it twice.
`docs/enemy-status-lines.md`.

## Verify against the built `.ain`, not against the patch

A patch that renders is not a patch that applied. Build, then read the result
back:

```
alice ain dump -t -o built.txt <built>.ain     # strings and messages
alice ain dump -c -o built.code <built>.ain    # code, for .jaf overrides
```

Build into a scratch directory rather than the real one while testing. A
`GAME_DIR` already in the environment wins over the one in `.env`, so setting it
for the one command is enough — `GAME_DIR=/tmp/whatever node scripts/ain.js` in
bash, `$env:GAME_DIR = "C:\tmp\whatever"; node scripts/ain.js` in PowerShell,
which has no inline prefix form. Worth the extra step: the game directory holds
one `Rance10.ain`, and installing the default variant over somebody's
`grok` silently switches the whole script. `docs/translation-variants.md`
says what a variant is and how the `--variant` flag gets eaten by PowerShell.

## Panel and layout widths are in the `.pactex`

Text does not wrap by itself. When translating something that has to fit,
find the part in `archives/Rance10Pact_v1_04/` and read the placeholder the layout
carries for it — that is the designer's own statement of the width. Measure
against it with `getTextWidth` from `modules/TextNormalization.js` and warn
rather than truncate.

## Repository language

Everything committed here — code comments, `docs/`, commit messages, this file —
is written in English, whatever language the conversation is in.
