# Keeping more than one translation of the dialogue

The repository carries two English translations of the game's dialogue, a
folder each, and builds whichever one you ask for:

| Variant | What it is |
|---|---|
| `gpt` | the default, the translation this repository has always shipped |
| `grok` | a second translation of the whole script, made in [the fork](https://github.com/IdOnThAvEaUsE69/rance-10-gpt-mtl-fork) by putting the Japanese through Grok |

Each folder under `variants/` carries a README saying where its text came from
and what has been done to it since.

```
npm run regenerate-ain                # the variant .env names, or gpt
node scripts/ain.js --variant=grok    # this one, just this once
```

`TRANSLATION_VARIANT` in `.env` sets the one you build most; the flag overrides
it. The game directory holds a single `Rance10.ain`, so a build installs one
variant and switching means running the build again. Whichever way you choose,
the build says which variant it rendered before it writes anything — worth a
glance, because there is one way to get this wrong quietly:

`npm run regenerate-ain -- --variant=grok` is the npm spelling and it works in
cmd.exe and in bash, but **PowerShell eats the bare `--`**, so npm never sees
the flag and you get the default variant with no complaint. In PowerShell,
call `node scripts/ain.js --variant=grok` — or quote it, `npm run
regenerate-ain '--' --variant=grok`.

## What a variant is

A directory under `variants/`, holding nothing but data, in one of two shapes.
A corpus, which is what a translation run through the API leaves behind:

```
variants/gpt/gpt_outputs/           the v1.00 translation, one JSON per chunk of lines
variants/gpt/gpt_outputs_v104/      the same for lines v1.04 added
variants/gpt/mistranslated_names.json   optional, see below
```

Or a finished patch, which is what a translation done by hand in a chat window
leaves behind -- there was never a corpus, only the file being pasted into:

```
variants/<name>/dialogue.ain.txt      m[<line>] = "<text>", the v1.04 numbering already
variants/<name>/mistranslated_names.json   optional, the same as above
```

Nothing here is in that shape at the moment -- `grok` arrived that way and was
moved into a corpus -- but the build still reads it, and it is the cheaper way
to bring a translation in.

`dialogue.ain.txt` decides which it is: if the file is there the two folders are
not read, and neither is the v1.00 to v1.04 mapping, because a patch is written
against the numbering the game already uses. Two things follow from a patch
naming only the lines it has an opinion about. A line it skips would play in
Japanese, so the default variant is rendered underneath and shows through the
gaps -- the build says how many lines that was. And its own line breaks are
dropped and re-wrapped here, since they were measured against whatever window
the other build had in mind.

The shape is not a property of the translation, only of how it arrived, and a
patch can be moved into the other one. That is what happened to `grok`: what
the folder holds is the `gpt` corpus with the grok text written over it, line
number for line number, so the Grok translation can be corrected the way this
repository has always corrected `gpt` -- a chunk file at a time, with the
Japanese next to the English and `scripts/find_mistranslations.js` able to read
it. Its
README says what the move cost, which is nine lines out of 269617 rendering
differently from the patch it was made from.

Everything else is shared and lives outside `variants/`, because it is not what
the translations disagree about:

- `game/ain/Rance10.v1.00.ain.json` and `game/ain/Rance10.v1.04.ain.json` map a
  line number in the older dump onto the same line in the current game;
- `patches/system_cherry_picks.v1.04.ain.txt` is menu and UI text (`s[...]` entries),
  hand-fixed and appended last so it wins over everything;
- `modules/TextNormalization.js` decides where lines wrap, and it is not a
  matter of taste: the wrap budget carries a safety margin because text that
  overshoots is clipped by the message window rather than wrapped. A line that
  opens with a full-width space keeps it through the wrap, since that is an
  indent sitting the continuation of a quote under the 「 that opened it and not
  a gap between words;
- `patches/card_names.jaf`, `archives/Rance10EX_v1_04`, `archives/Rance10Pact_v1_04` and the image folders
  are not dialogue at all.

So there is one pipeline, not one per variant. Adding a third translation is
adding a folder: either a `dialogue.ain.txt`, or the two corpora in the format
`scripts/translate_chunks.js` writes, an object with
`output_parsed.translationLines` holding
`{lineNumber, originalJapaneseLine, translatedEnglishLine}`.

## Names are shared, unless a variant insists

`glossaries/mistranslated_names.json` is not translation text. It is a repair
pass: where the Japanese names a character and the English does not spell them
the canonical way, the known misspelling is replaced. The same file names the
characters on the card plates through `scripts/generate_card_names.js`, so it
has to be shared — a variant that renamed people in its dialogue alone would contradict
the cards its own build installs. Two translations of the same script get a name
wrong in different ways, and the table has to know both spellings; what the two
are allowed to differ in is the wording.

If a variant does need its own answer, put a `mistranslated_names.json` next to
its text with just the entries it disagrees about. It is layered over the
shared table by Japanese name: the canonical spelling is taken from the
variant, and the known misspellings of both are merged, so a variant never has
to restate the whole list. Nothing uses it at the moment. `grok` did, for the
two names its own translation run chopped in half, until those were written out
of its records: a defect in the text belongs in the text, and the overlay was
holding the place only for as long as that text was a patch nobody could edit.

## Build products

`build/regenerated.<variant>.ain.txt` and `build/unmapped.ain.json` are
generated, and `build/` is gitignored whole. The patch file is named per
variant on purpose — switching
variants should not leave you reading the other one's text, and a generation
that fails should not pass off a stale file as the build you asked for.
