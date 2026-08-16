# The `grok` dialogue translation

Imported from https://github.com/IdOnThAvEaUsE69/rance-10-gpt-mtl-fork, a fork
of this repository, at commit e8863f4 of its `card-name-localization` branch.
Build it with `node scripts/ain.js --variant=grok`; see
[docs/translation-variants.md](../../docs/translation-variants.md) for the rest
of the selection.

## What it actually is

Not a second machine translation: the response metadata is the same run that
produced [the gpt variant](../gpt/README.md) -- the same 4890 chunks, the same
line numbers, the same models and the same October 2025 dates. What the fork
did was rework the English on top of it, through the Grok and Gemini chats its
own tooling drives, which is where the name comes from.

The reworking is broad rather than deep: 4362 of the 4890 chunks carry at least
one line worded differently, some 26000 lines in all, of which around 2200 are
a rewritten sentence and the rest a name spelled another way. The fork also
merges and splits lines more freely, so a line can be empty here and carry the
whole sentence one line up.

Which is to say the coverage is not complete. Going over the whole script was
the intent, but a passage the rework never reached simply stays as the gpt
translation left it, and that is most of them: nine lines in ten read word for
word the same, and 528 chunks are identical end to end. So dialogue that reads
exactly like the default variant is not something gone wrong with the import --
it is dialogue that never got a pass of its own.

## What changed on the way in

The fork stores whole raw API responses, 250 MB of which the build reads five
fields, so they were pruned to the shape the `gpt` corpus uses -- 64 MB. Every
one of the 275312 lines was read back and compared against the fork's copy
afterwards; nothing else was touched.

Names are the one thing this variant does not get to keep. The corpus writes
Rance as "Lance", Sanakia as "Sarnakia" and Pi-R as "Piarl", and the shared
`mistranslated_names.json` turns all three back at build time -- the card
plates and the EX data are shared between variants and spell them the first
way, so a build that kept the fork's spelling would contradict its own cards.
