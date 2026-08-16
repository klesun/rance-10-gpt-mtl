# The `grok` dialogue translation

A second translation of the whole script, made in
[the fork](https://github.com/IdOnThAvEaUsE69/rance-10-gpt-mtl-fork) by putting
the Japanese through Grok five hundred lines at a time and pasting the English
back. Build it with `node scripts/ain.js --variant=grok`; see
[docs/translation-variants.md](../../docs/translation-variants.md) for the rest
of the selection.

## Why it is one file

There is no corpus under it. The fork translated straight into the finished
patch -- the file alice-tools applies, `m[<line>] = "<text>"` against the v1.04
numbering -- and never kept the chunks, so `dialogue.ain.txt` here is that file,
copied unchanged. It is 269299 lines, which is the script.

It is its own translation, not the `gpt` one edited. Of the lines both variants
render, 251687 differ and 17924 come out word for word the same, which is about
what two independent machine translations of the same short lines will collide
on. Against the fork's own untranslated dump, 252022 lines differ.

## What used to be in this folder

A corpus, described by its README as this repository's own text reworked through
Grok and Gemini chats. That was wrong twice over. The two folders were a copy of
this repository's `gpt` corpus as of commit 9ec77de -- the git trees match ours
byte for byte, and the fork has no commit of its own touching either -- so the
variant was the default translation under a second name, and the differences the
old README counted were this repository's own later edits to `gpt`.

## What the build does to it

Nothing that is not done to every variant, plus two things this text asks for.

Its line breaks are dropped and redone. They are where the fork's build decided
to wrap, against a font and a margin this repository does not share, and about
ten thousand of its lines carried a break wide enough for our message window to
clip -- so the text is re-wrapped like any other. The full-width space that
opens a quarter of the lines is not a break but an indent, sitting the
continuation of a quote under the 「 that opened it, and wrapping keeps it.

It also names 318 lines fewer than the game has, and a line no variant names
stays Japanese in the game. Nearly all of them are one run, m[21708] to
m[22007] -- a scene of three hundred lines the translation simply never reached
-- so those come from the `gpt` variant underneath. Nothing else does.

Names need almost no repair: this translation already spells Rance and Sanakia
the way the cards do. What it does leave half-done is a name the fork's chunking
cut in two, `ケイブリス` arriving as "Caveリス" in some fifty lines and `リス様` as
"Lordリス" in a handful; `mistranslated_names.json` here turns those into Kayblis
and Lord Lis, and that is all this variant asks the shared table to change.

## Where it is rough

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
