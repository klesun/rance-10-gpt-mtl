# The `grok` dialogue translation

A second translation of the whole script, made in
[the fork](https://github.com/IdOnThAvEaUsE69/rance-10-gpt-mtl-fork) by putting
the Japanese through Grok five hundred lines at a time and pasting the English
back. It sits here in the shape the `gpt` one has -- a corpus of chunk files,
one record per line, with the Japanese beside the English -- so the same tools
and the same habits work on it. Build it with `node scripts/ain.js
--variant=grok`; see
[docs/translation-variants.md](../../docs/translation-variants.md) for the rest
of the selection.

## Where the text came from

There was never a corpus under it. The fork translated straight into the
finished patch -- the file alice-tools applies, `m[<line>] = "<text>"` against
the v1.04 numbering, 269299 lines, which is the script -- and never kept the
chunks, so that file is what this folder was built from. It was never committed
anywhere either; it sat in the fork's working copy as `regenerated.ain.txt`.

It is its own translation, not the `gpt` one edited. Of the lines both variants
render, 251687 differ and 17924 come out word for word the same, which is about
what two independent machine translations of the same short lines will collide
on. Against the fork's own untranslated dump, 252022 lines differ.

What the fork kept under this name was something else again: a corpus its README
described as this repository's own text reworked through Grok and Gemini chats.
That was wrong twice over. The two folders were a copy of this repository's `gpt`
corpus as of commit 9ec77de -- the git trees match ours byte for byte, and the
fork has no commit of its own touching either -- so the variant was the default
translation under a second name, and the differences that README counted were
this repository's own later edits to `gpt`.

## How the corpus was built

A one-shot script, from `variants/gpt` and the fork's patch. It is not in the
repository on purpose: running it again would overwrite by hand whatever hand
editing had been done since, which is the only reason the folder is here. What
it did, in full:

- copied both chunk folders of `variants/gpt`, file for file, and left
  everything except the English untouched -- the line numbers, the Japanese,
  the API response the chunk came in (`id`, `created_at`, `model`, `usage`), the
  formatting and the line endings. A diff of `variants/gpt/<file>.json` against
  `variants/grok/<file>.json` shows translation lines and nothing else;
- replaced `translatedEnglishLine` with the grok text wherever the patch names
  that line -- 274913 of the 275312 records it copied. The number it looks the
  line up by is the v1.04 one, mapping the v1.00 numbering of `gpt_outputs/`
  forward the same way a build does, and the text goes in the way the build
  reads a patch: unescaped, and with the fork's own line breaks flattened back
  into spaces so our wrapping decides them. Those breaks were where the fork's
  build wrapped, against a font and a margin this repository does not share, and
  about ten thousand of them were wide enough for our message window to clip;
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

A quarter of the lines open with a full-width space. That is not a break but an
indent, sitting the continuation of a quote under the 「 that opened it, and the
wrapping keeps it -- here and in every variant, which is a rule this text is
simply the first to lean on.

Two names the fork's chunking cut in half are repaired in the records
themselves: 49 lines had `ケイブリス` as "Caveリス", six had `リス様` as "Lordリス"
or a bare "リス" -- katakana in the middle of an English sentence, both of them.
While this text was a patch they could only be swapped at build time, by a
`mistranslated_names.json` in this folder layered over the shared name table.
A corpus is somewhere to write the answer down instead, so the file is gone and
the folder now asks the shared table for nothing. One of the 49 is m[182204],
which no build-time repair could have reached: it read "Lord Caveリスの body"
and the Japanese naming him is the line before it, which is the echo drift
described below. Every other name this translation already spells the way the
cards do.

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
  line -- it is the one line the fork's patch names that this repository has no
  Japanese for -- so its `originalJapaneseLine` is empty, which is what the
  build makes of it either way.

The file names are left alone. They are offsets from the translation run that
wrote them and have drifted from the line numbers inside by a few dozen
already; renaming four thousand files to keep an arithmetic nobody reads would
be a worse trade than a file holding sixty-one records under a name that says
sixty.

## The Japanese beside a line is the model's echo

It is what the model sent back rather than the line from the dump, and the two
drifted apart in 5886 of the 275312 records, usually by a line. That costs
nothing except the name repairs, which fire when the Japanese beside a line
names a character the English spells wrong -- so nine lines out of 269617 get a
different repair here than they got from the patch this folder was built from.

Where the echo names somebody the dump line does not, a repair fires that the
patch build never made: m[34206] and m[50505] "demon army" to "Monster Army",
m[145767] and m[145771] Kesselink to Kesselring, m[145785] Kaibris to Kayblis.
Where it is the other way round, the repair is the one that does not happen:
m[185452], m[185462] and m[185475] keep Serakloras where the patch printed
Serachrolas, m[185484] keeps Howse Nurse where it printed Housesnurse. Five and
four, and that was the whole cost of the move.

## It is grok's text, not a better one

The half-cut names above are the only thing corrected here so far, and the
translation is rough in three ways worth knowing before editing it.

It keeps the Japanese punctuation, 「」 on 183008 lines, which reads as a
deliberate choice rather than a leftover -- the `gpt` variant uses quotation
marks instead.

Around sixty lines still hold kana or kanji after the build normalises what it
can. Half of those are `・` used as a separator, "M・M・Rune", which the `gpt`
text does too; the rest are a word the translation walked past, `幻獣` for a
phantom beast being the one that recurs. One line, m[145787], is untranslated
outright.

1796 lines come out empty, and mostly that is deliberate: where a sentence is
split over two lines in the Japanese, this translation tends to put all of it on
the first and leave the second blank, which is 1459 of them.

This is the folder to fix them in.
