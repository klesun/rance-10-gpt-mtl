# The `gpt` dialogue translation

The translation this repository has shipped from the beginning, and the one
`npm run regenerate-ain` builds unless you ask for another. See
[docs/translation-variants.md](../../docs/translation-variants.md) for how
variants are selected and what they are allowed to differ in.

## Where the two folders come from

`gpt_outputs/` is keyed by line numbers of the v1.00 dump of the game, which
the build maps onto the same lines in v1.04; `gpt_outputs_v104/` covers the
lines v1.04 added, which have no v1.00 counterpart to map from. That is why
there are two: not two passes over the same text, but two numbering schemes.
`a02_translate_via_gpt.js` writes the second folder, feeding on the
`unmapped.ain.json` the generator leaves behind.

A file is one API response, kept for its `output_parsed.translationLines` and
pruned to the few fields worth keeping around them. Together they hold 275312
line records over 268850 distinct line numbers -- a number can appear more than
once, and the last record for it is the one that reaches the game, since the
patch assigns them in order.

The responses are dated between 14 and 27 October 2025: 4885 chunks from
`gpt-4.1-mini-2025-04-14` and five from `gpt-4.1-nano-2025-04-14`.

## It is not what the model returned

The text has been corrected by hand ever since -- names, genders, pronouns,
whole lines -- and `git log -- variants/gpt` is where that work is. Editing a
chunk file in place is the normal way to fix a line; nothing regenerates these
folders.

One stretch of that work wrote itself down: a line-by-line sweep of
`gpt_outputs_v104/` over twelve sessions in July 2026, logged file by file in
[coherence-sweep-log.md](coherence-sweep-log.md). The method it settled on, and
the error types it kept finding, are in
[docs/coherence-sweep.md](../../docs/coherence-sweep.md). Neither is a live
process -- both are a record of one pass, and the pass did not finish: the log
runs to `004730_004790.json`, 42 of the 85 files in that folder, and the log of
the sweep over `gpt_outputs/` was never committed at all.

Character names get repaired once more at build time from the shared
`mistranslated_names.json` at the repository root, so a misspelling that
appears throughout is better fixed there than chunk by chunk.
