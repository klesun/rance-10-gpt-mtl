# The synopsis screen

`あらすじモード` is the recap the game offers when you pick an event you have
already seen: seven dotted rows summarising it, a **Play Event** button, and an
**OK** that skips the scene. Its text is four and a half thousand short
captions, and all of them are English now.

```
npm run regenerate-ex          # builds them into Rance10EX.ex
```

## Where the text is

`Rance10EX_v1_04/37_あらすじデータ.x`, a tree of one node per event:

```
２２１／２／ラングバウ到着 = {
    ００ = "｜−−−−−−−−｜−−−−−−−−−｜",
    ０１ = "ラング・バウに到着",
    ０２ = "",
    ０３ = "まずは寝る",
    ...
```

Two things in there are not text.

**The node name is a key.** The scenario calls `Scenes::RunSummary` with it and
`SummaryInformation@Ids::get` looks the event up by it, so it stays Japanese
whatever happens to the rows. Translating it would lose the event, not rename
it.

**Field ００ is never printed.** `SummaryData@Desc::get` loops `i` from 0 to 9
and formats `あらすじデータ.<node>.%02D` with `i + 1`, so `０１` through `１０`
are read and `００` is not. Every `００` in the file holds the same thing --
`｜−−−−−−−−｜−−−−−−−−−｜`, with its marks at 1, 10 and 20. It is the width ruler
the designers worked against, and it agrees with the placeholder the layout
carries for `TextDesc` in `Rance10Pact_v1_04/Game/Adv/SceneSummary.pactex.x`:
seven lines of twenty full-width characters, about 280 pixels by
`getTextWidth`, roughly 38 latin letters. Nothing wraps -- each field is its own
row -- so an overlong line runs off the panel rather than folding onto the next,
which is why the width is checked rather than fixed up.

## The English lives in a glossary, not in the table

`summary_glossary.tsv`, keyed by the Japanese, two columns. The table's 6414
filled fields are 4465 distinct phrases -- `戦闘開始` alone opens 85 events --
so keying by phrase translates each one once by construction rather than by
remembering to.

That key is also why **the build never writes English into the table**.
`renderSummaryTable` in `modules/SummaryLines.js` returns the rendered text and
`scripts/ex.js` copies the whole `Rance10EX_v1_04` tree to a temporary
directory, drops the rendered table in, and builds from the copy. Writing in
place would work exactly once: the second run would find no Japanese to look up
and quietly produce a table with no English in it. Seven megabytes of text is a
moment to copy, and the file under version control stays as the game shipped it.

A phrase with no English is left as it is rather than blanked, so a partly
translated glossary gives a partly English panel and shows at a glance what is
still to do.

## Working on it

```
node scripts/extract_summary_lines.js   # refresh the glossary from the table
node scripts/summary_chunk.js 300       # next batch as a prompt for a chat
node scripts/summary_chunk.js 300 --context   # ...or with the event, to translate here
node scripts/summary_merge.js           # read the answer back in
node scripts/lookup_term.js 魔軍         # how the patch already translates a word
```

Every one of them merges rather than overwrites: English already in the file
survives, a phrase the game no longer has keeps its English at the end of the
file under a heading, and `summary_merge.js` leaves an already-translated row
alone unless `--force`. Nothing typed by hand is lost by running any of them
again.

`summary_merge.js` reports two things worth acting on: rows too wide for the
panel, and rows where the English does not spell a name the way
`mistranslated_names.json` does. The second report is noisy by design -- around
308 of the 4458 rows trip it, nearly all because a caption twenty characters
wide cannot hold `Agireda Kosabusshi Zonna Abona` and says `Agireda`. What it is
for is the other kind of hit: a *different* spelling of the same name. Where the
canonical name does not fit, the card's short form is the right fallback --
`generate_card_names.js` refuses `Masamune` -> `Dokuganryuu Masamune` as a wrap
rather than a respelling, so the short form is a spelling the game itself
displays.

Anything that is not a character -- places, ranks, operations -- comes from
`scripts/lookup_term.js`, which pairs the Japanese dump with the variant's
rendered text by `m[]` number and shows how the dialogue already says it.
`滅号作戦` is Operation Extermination, `永久牢` the Eternal Prison, `番裏の砦`
Fort Banura; none of those is what a translator would invent unprompted.

## What is still Japanese on that screen

The caption beside the panel, `このイベントをスキップします`, and the
`あらすじモード` title are not text at all. They are painted into
`シス／あらすじ／ベース.ajp`, entry 0 of `Rance10CG4.afa`. The string is in no
text container at all: not in the `.ain`'s 15953 strings or 269678 messages, not
in the `.ex`, not in any of the 220 pactex layouts, and not in a byte scan of
the game directory in CP932, UTF-8 or UTF-16.

Translating it means editing the image, and `Rance10CG4.afa` is in no build
command here -- it would need its own manifest and the same back-up-first care
`README.md` describes for `Rance10CG2.afa`.
