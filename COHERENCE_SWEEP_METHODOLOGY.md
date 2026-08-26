# Coherence & Grammar Sweep - Methodology

**Last Updated:** 2026-08-06 (condensed)

Progress/results live in `Files_Check.md` (authoritative log — always check its tail before
resuming, don't trust any file count mentioned here). This file is process rules only.

## Binding rules

**1. Never touch quote-mark characters, for any reason.** Do not add, remove, reposition, or
"correct" any quote-mark-like character in `translatedEnglishLine` — including fixing a garbled
glyph (e.g. stray „) to a straight `"`, and including "restoring" a quote you dropped by accident
mid-edit (a net-neutral-looking quote restore was rejected on sight by the user: "DO NOT ADD THESE
\", NO SLASH OR QUOTE FIXES LIKE THIS!"). Missing/extra/mismatched quotes are out of scope even
when they span a whole file. If a genuine content fix (duplication, misattribution) would require
touching text adjacent to a quote mark: (a) construct the edit so the quote's presence/position is
byte-identical in old_string and new_string, verified before submitting, or (b) if that can't be
done cleanly, leave it unfixed and flag it in `Files_Check.md` instead of risking it.

**2. "Legitimate compression" (one line of a split pair empty) must be found, not manufactured.**
When fixing a front-loaded-duplication pair, redistribute content onto whichever line actually
lacks it — trim the line with erroneous extra content, keep the other non-empty. Only leave a line
empty if that emptiness was *already present* before you touched the file today (the JP for that
line has genuinely nothing left to say after a correct redistribution). Never resolve a duplication
by actively deleting content to create a new empty line.

**3. Single-line internal grammar is a separate check from cross-line coherence.** It's easy to
narrow the sweep into only scanning for the "named" patterns below (duplication, POV breaks,
misattribution) and let a line pass merely for "sounding fluent." Every line — not just lines in a
suspicious split — needs its own grammar pass: pronoun/number agreement, verb tense, preposition/
article choice, idiomaticity. A user-requested re-audit of a file already marked "clean" found 2
plain single-line grammar errors in under a minute (mismatched "let's" + singular possessive;
unidiomatic "in relaxation"). "No errors found" is not earned by ruling out duplication/POV/
misattribution alone.

**4. Self-audit checkpoint, self-triggered, every ~15-20 files.** Re-verify 2 of the most
recently-cleared "no errors" files via a genuinely fresh full read of the *entire* file (all
translationLines, not a truncated prefix — a check that structurally can't see most of the file
will always report it clean). Log the result as one line in `Files_Check.md` (held up, or found+
fixed). This is not optional busywork — every prior instance of skipping/narrowing it has hidden
real misses that only surfaced when the user asked directly.

**5. Reread this file before checking each new file/batch**, and state that you're doing so. It
alone doesn't renew vigilance (rereading unchanging text doesn't inject fresh attention) — the
per-file evidence citation (rule 6) and self-audits (rule 4) are what actually do that.

**6. Every verdict — clean or fixed — must name the specific lines/splits actually checked**,
e.g. "no errors (checked splits at 40766-67, 40784-85)." A bare "no errors" claim is indistinguishable
from a skipped check from the outside, and has historically correlated with missed errors. 

## Error taxonomy (actively scan for each of these on every file)

- **Front-loaded duplication** — a JP sentence splits across lines N/N+1; English crams the full
  meaning into N, leaving N+1 to redundantly restate it (or sit empty when compression isn't
  legitimate — see rule 2). Tell: read line N's English alone — if it already sounds like a
  complete sentence rather than a clause needing N+1 to finish it, check whether N+1's JP is doing
  real work or just re-saying what N already said.
- **Cross-line content misattribution** — the subject+verb content belonging to N+1's JP gets
  written as a complete sentence on line N instead, leaving N+1 holding only N's fragment. Tell:
  does line N's English name an actor/verb that doesn't appear anywhere in N's own JP, but does
  appear in N+1's JP? Can cascade across many consecutive lines, not just a pair — check the whole
  run if one instance is found nearby.
- **POV breaks** — narration outside quotes/parentheses switches from the established 3rd-person
  to unmarked 1st-person.
- **Pronoun/agency reversal** — JP passive (Xが…された) mistranslated into English active voice
  with the wrong subject acting, or a self-referential construction flipped into 3rd-person about
  someone else. Reads fluently, so it's easy to miss — explicitly identify grammatical subject vs.
  object in the JP and verify the English preserves it.
- **Meaning reversal** — a negation or inclusion/exclusion gets flipped (e.g. "didn't bother to
  deny" mistranslated as "hastily denied"). Cross-check against surrounding lines that depend on
  the correct polarity — a reversal often creates a direct logical contradiction a few lines later.
- **Speaker-attribution errors** — two consecutive lines both reading as assent from what's implied
  to be the same speaker is a red flag; check whether the first is actually the other speaker's line.
- **Whitespace artifacts** — leading/trailing regular, full-width (U+3000), or non-breaking
  (U+00A0) space before ordinary dialogue continuation lines (convention: no leading space).
  Check with a raw Python/repr read — the Read tool's rendering can visually normalize artifacts
  that are really there in the file (`\xa0` has shown up disguised as plain-looking indentation).
  **Bracket-caption leading-space count is explicitly OUT OF SCOPE (user call, 2026-08-11):** an
  earlier version of this rule required "exactly 2 regular spaces before bracket captions"
  (`  <Sound!>`) and treated a caption with 0 or a different count of leading spaces as an
  artifact to fix. The user flagged this as noise, not a real error — do not add/remove/count
  leading spaces on bracket-caption lines (`<Sound!>`-style) at all, regardless of what the JP
  source's own leading spacing looks like.
  **Systematic monologue/dialogue-block indentation is also OUT OF SCOPE when it 1:1-mirrors the
  JP (user call, 2026-08-12):** distinguish a scattered, inconsistent leading-space *artifact*
  (still in scope — fix it) from a *deliberate* indentation convention where every continuation
  line's English leading space corresponds exactly to a leading full-width space (`　`) on
  that same line's JP, applied consistently across a whole multi-line monologue/dialogue block
  (first line of the block unindented, matching JP). First seen in `163180_163240.json`'s
  Lexington internal-monologue scene (~27 lines, 100% JP-correspondence). When the pattern is
  that systematic and JP-matched, leave it alone — don't strip it.
- **Data corruption** — literal JSON syntax leaking into a content string, OR raw Japanese
  characters (commonly the katakana/hiragana prolonged-sound mark ー, codepoint 0x30fc) leaking
  into English text as a stand-in for elongation — seen inside bracket captions specifically
  (e.g. `<slide slideーー>`), which are easy to under-check since the whitespace-convention pass
  only looks at leading spaces, not the caption's own content. Verify any suspicious symbol's
  actual codepoint before concluding it's corruption (an em dash can look like mojibake in a
  misconfigured terminal without being corrupted in the file); fix confirmed ー-leaks by
  re-rendering the elongation in English (letter repetition or dashes).
- **Plain single-line grammar** — see binding rule 3. Missing/incomplete translations, garbled
  text, tense inconsistencies, singular/plural mismatches, ambiguous referents, unclear idioms,
  illogical responses given context.

## Out of scope (do not fix inline, flag only if noticed in passing)

- Title/honorific inconsistency (総統, 魔人/魔王, etc.) — do not go looking for it.
- Name-spelling variants (e.g. "Elshil" vs "Elsill") — handled only via the separate
  `mistranslated_names.json` process (CLAUDE.md Task type 1). Only use the correct name as a
  gender/pronoun cross-check.
- Any quotation-mark/punctuation-only formatting quirk — see binding rule 1.

## What NOT to flag as an error

Intentional character voice, sarcasm/dismissiveness, poetic/stylized breaks, personality-specific
speech patterns. Don't over-correct awkward-but-functional phrasing that reads fine in context —
distinguish true errors (unintelligible, broken grammar, wrong meaning) from mere stylistic
awkwardness. If genuinely unsure after checking context, flag it rather than silently fixing or
silently dismissing it.

## Process notes

- **Minimize each edit, then re-read the result.** When trimming a duplication, only remove the
  erroneous content from the line that has too much — don't also reword the line that was already
  correct. After a content-swap fix, re-read both resulting lines together as one sentence to
  confirm neither is left dangling.
- **When constructing a dangling-clause/completing-clause split**, avoid weak prepositions that
  garden-path the reader (e.g. "Subject, from X," misreads as describing origin) and avoid
  overlong noun phrases before the verb arrives. Prefer a light verb on the dangling line, or a
  connector that unambiguously anticipates a verb to come.
- **Re-read from disk, not memory**, before editing a file whose content you're recalling from
  earlier in the conversation — content and line numbers from a different file can get conflated,
  especially between files with similar tropes/scenes. A Read the harness reports as a no-op
  ("file unchanged") is not a substitute for verifying the exact line you're about to edit.
- **Do not fabricate time-spent or mechanically fill out Y/N checklists as theater** — there's no
  reliable way to measure elapsed minutes, and doing so in the past has meant fabricating the
  numbers. Real evidence of rigor is citing specific lines/splits checked (rule 6), not a timer.
- **Token-saving measures (process-only, don't reduce QA depth):** skip the JSON header (`id`/
  `created_at`/`model`/`usage`, lines 1-17) via Read `offset`; batch `Files_Check.md` writes every
  ~10 files (flush immediately at overlap-file pairs or session end) rather than one Edit per
  file — every fix is still applied to its `gpt_outputs/*.json` file immediately upon being found,
  regardless of when the log entry is flushed; Edit calls can match on the minimal unique
  `translatedEnglishLine` snippet rather than the full surrounding JSON block.
- **Chunk sizes are inconsistent** (alternates between 50- and 60-line files unpredictably) and
  occasional true overlap points exist (two independently-generated files sharing a start line —
  the "active" chain connects to the next sequential filename; the orphan is a separate file that
  still needs its own independent review since wording differs between generations). Verify the
  next filename with `ls`/grep when a straight arithmetic Read fails or an overlap is suspected.
  - Only give the errors fixed. Do not summarize the content of what was read as that is not helpful.
