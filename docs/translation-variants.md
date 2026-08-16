# Keeping more than one translation of the dialogue

The dialogue can be translated more than once, and the build takes whichever
translation you ask for. `variants/` holds them; `gpt` is the default, the
translation this repository has always shipped.

```
npm run regenerate-ain                      # the variant .env names, or gpt
npm run regenerate-ain -- --variant=<name>  # another one, just this once
```

`TRANSLATION_VARIANT` in `.env` sets the one you build most; the flag overrides
it. The game directory holds a single `Rance10.ain`, so a build installs one
variant and switching means running the build again.

## What a variant is

A directory under `variants/`, holding nothing but data:

```
variants/gpt/gpt_outputs/           the v1.00 translation, one JSON per chunk of lines
variants/gpt/gpt_outputs_v104/      the same for lines v1.04 added
variants/gpt/mistranslated_names.json   optional, see below
```

Everything else is shared and stays at the repository root, because it is not
what the two translations disagree about:

- `Rance10.v1.00.ain.json` and `Rance10.v1.04.ain.json` map a line number in
  the older dump onto the same line in the current game;
- `system_cherry_picks.v1.04.ain.txt` is menu and UI text (`s[...]` entries),
  hand-fixed and appended last so it wins over everything;
- `modules/TextNormalization.js` decides where lines wrap, and it is not a
  matter of taste: the wrap budget carries a safety margin because text that
  overshoots is clipped by the message window rather than wrapped;
- `card_names.jaf`, `Rance10EX_v1_04`, `Rance10Pact_v1_04` and the image folders
  are not dialogue at all.

So there is one pipeline, not one per variant. Adding a third translation is
adding a folder with the two corpora in it — the format is what
`a02_translate_via_gpt.js` writes, an object with `output_parsed.translationLines`
holding `{lineNumber, originalJapaneseLine, translatedEnglishLine}`.

## Names are shared, unless a variant insists

`mistranslated_names.json` at the root is not translation text. It is a repair
pass: where the Japanese names a character and the English does not spell them
the canonical way, the known misspelling is replaced. The same file names the
characters on the card plates through `generate_card_names.js`, so it has to be
shared — a variant that renamed people in its dialogue alone would contradict
the cards its own build installs. A translation that spells a name its own way
therefore builds with the shared spelling; what a variant gets to differ in is
the wording.

If a variant does need its own answer, put a `mistranslated_names.json` next to
its corpora with just the entries it disagrees about. It is layered over the
shared table by Japanese name: the canonical spelling is taken from the
variant, and the known misspellings of both are merged, so a variant never has
to restate the whole list.

## Build products

`regenerated.<variant>.ain.txt` and `unmapped.ain.json` are generated and
gitignored. The patch file is named per variant on purpose — switching
variants should not leave you reading the other one's text, and a generation
that fails should not pass off a stale file as the build you asked for.
