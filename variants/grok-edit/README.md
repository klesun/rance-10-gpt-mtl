# The `grok-edit` dialogue translation

The Grok translation of the script, in the shape the `gpt` one has: a corpus of
chunk files, one record per line, rather than the single finished patch the
fork left behind. The text is grok's; what changes is that there is somewhere
to edit it. Build it with `node scripts/ain.js --variant=grok-edit`; see
[docs/translation-variants.md](../../docs/translation-variants.md) for the rest
of the selection.

## Why it exists

`variants/grok` is one file of 269299 lines, already wrapped and already in the
v1.04 numbering, with no Japanese beside the English. Correcting a line there
means finding it by number and reading the game to find out what it was
supposed to say. The `gpt` corpus keeps the Japanese next to every line and
splits the script into files of sixty, which is what the hand-editing this
repository has always done to `gpt` needs, and what `find_mistranslations.js`
reads. This folder is that corpus with grok's English in it, so the same tools
and the same habits work on the Grok text.

The two are meant to stay separate. `variants/grok` is the import, kept as it
arrived; this is the copy being edited.

## How it was built

A one-shot script, from `variants/gpt` and `variants/grok/dialogue.ain.txt`. It
is not in the repository on purpose: running it again would overwrite by hand
whatever hand editing had been done since, which is the only reason the folder
is here. What it did, in full:

- copied both chunk folders of `variants/gpt`, file for file, and left
  everything except the English untouched -- the line numbers, the Japanese,
  the API response the chunk came in (`id`, `created_at`, `model`, `usage`), the
  formatting and the line endings. A diff of `variants/gpt/<file>.json` against
  `variants/grok-edit/<file>.json` shows translation lines and nothing else;
- replaced `translatedEnglishLine` with the grok text wherever the patch names
  that line -- 274913 of the 275312 records it copied. The number it looks the
  line up by is the v1.04 one, mapping the v1.00 numbering of `gpt_outputs/`
  forward the same way a build does, and the text goes in the way the build
  reads a patch: unescaped, and with the fork's own line breaks flattened back
  into spaces so our wrapping decides them;
- marked the other 399 records `"source": "gpt"`. The build ignores the field;
  it is there so that a line being edited says whose it is. 318 of them are
  lines the patch never names and the game would otherwise play in Japanese --
  nearly all one scene, m[21708] to m[22007] -- and the remaining 81 are
  records under v1.00 numbers that no longer exist in v1.04, which no variant
  ever reaches;
- added the 62 records the patch has and the corpus did not (see below).

That leaves 4806 + 85 files and 275374 records, which cover all 269617 lines
the game plays -- a number can carry more than one record, and the last of them
is the one that reaches the game, the same as in `gpt`. There are 78 more
numbers here that no longer exist in v1.04 and are read by nothing.

`mistranslated_names.json` is copied from `variants/grok`
unchanged: this is grok's English, so it carries the two names the fork's
chunking cut in half, `Caveリス` and `Lordリス`.

## The 62 records that were not there

A chunk file is named for a range and its records are in order, so a line that
was missing goes back where that leaves room for it:

- **`gpt_outputs/224440_224500.json` is a new file.** Lines 224382 to 224441
  (v1.00) are a whole chunk of the original translation run that never came
  back: the file names jump from `224380_224440.json` straight to
  `224500_224560.json`, and the sixty lines fill exactly the slot that skips.
  It is the one file here with no API response around it, because there was no
  response;
- **line 184791 (v1.00) goes to the head of `gpt_outputs/184850_184910.json`.**
  That chunk answered with sixty lines starting at 184792, one past the line
  its window opened on, so the line it dropped goes back to the front of it;
- **m[185445] goes into `gpt_outputs_v104/000720_000780.json`,** in ascending
  order between 180603 and 188837. Neither dump of the game describes that
  line -- it is the one line the grok patch names that this repository has no
  Japanese for -- so its `originalJapaneseLine` is empty, which is what the
  build makes of it either way.

The file names are left alone. They are offsets from the translation run that
wrote them and have drifted from the line numbers inside by a few dozen
already; renaming four thousand files to keep an arithmetic nobody reads would
be a worse trade than a file holding sixty-one records under a name that says
sixty.

## What it renders

The same text as `variants/grok`, to nine lines out of 269617. Both go through
the same wrapping and the same name repairs, and both fill the same 318 lines
from `gpt` underneath, so the two builds agree everywhere else.

The nine are the name repairs disagreeing, and they disagree because they read
different Japanese. A repair fires when the Japanese beside a line names a
character the English spells wrong -- and the Japanese in these chunk files is
what the model echoed back rather than the dump, which drifted apart in 5886 of
the 275312 records, usually by a line. Where the echo names somebody the dump
line does not, this variant repairs a name the `grok` build leaves alone
(m[34206] and m[50505] "demon army" to "Monster Army", m[145767] and m[145771]
Kesselink to Kesselring, m[145785] Kaibris to Kayblis); where it is the other
way round, the repair is the one that does not happen (m[185452], m[185462] and
m[185475] keep Serakloras where `grok` prints Serachrolas, m[185484] keeps
Howse Nurse where `grok` prints Housesnurse). Five and four.

## It is grok's text, not a better one

Nothing here has been corrected yet. Everything the `grok` README says about
where that translation is rough is true of this folder as well -- the Japanese
punctuation it keeps, the sixty-odd lines that still hold kana, the 1796 empty
lines. This is the folder to fix them in.
