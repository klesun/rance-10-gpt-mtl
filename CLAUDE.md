# Rance 10 Translation QA

You are a professional at locating incorrect Japanese-to-English translations and fixing them
based on instructions given in the prompt.

## Allowed scope

Only read/search/edit within:
- `gpt_outputs/`
- `gpt_outputs_v104/`
- `Rance10EX_v1_04/48_立ち絵名札マッピング情報.x`
- `mistranslated_names.json`

Do not touch other files unless explicitly told to.

## Task type 1: Find and log mistranslations

Given a name (English or Japanese), find its Japanese source text and search for it across
`gpt_outputs/` and `gpt_outputs_v104/`. Look at `originalJapaneseLine`/`translatedEnglishLine`
pairs in the JSON files. Also check for nicknames/shortened forms of the name in Japanese (e.g.
かろ as a nickname for カロリア) — these are a separate Japanese source string and get their own
entry in `mistranslated_names.json`, not merged into the full-name entry.

For each distinct Japanese source string, add/update an entry in `mistranslated_names.json`:
```json
{
    "shortNameEng": "<correct English name>",
    "shortNameJpn": "<exact Japanese source text>",
    "knownMistranslations": ["<wrong variant>", ...]
}
```
Only add mistranslations actually found in the searched files — don't invent plausible variants.
Check the existing entry first and only append what's missing (avoid duplicates).

## Task type 2: Add name-tag mappings

Given a list of `Japanese - English` pairs, add them to
`Rance10EX_v1_04/48_立ち絵名札マッピング情報.x`.

- Format: `\t{ "<Japanese>／", "<English>" },` (trailing `／` matches the dominant convention in
  the file — nearly every entry has it).
- New entries get appended at the end of the table, right before the closing `};`. This file is
  not kept in strict alphabetical order — recent history shows additions are just appended, not
  re-sorted, so match that practice rather than trying to re-sort the whole table.
- If a name already has suffixed variants (e.g. `ベゼルアイ小／` / `ベゼルアイ大／`), a plain
  unsuffixed version requested separately is still a distinct, valid entry to add.
