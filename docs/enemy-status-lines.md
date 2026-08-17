# The enemy status lines

Clicking an enemy in battle opens a panel with its race, its scale, whether it
can be captured or stolen from, and four lines of free text underneath saying
what the fight will do to you — `3.6.9ラウンド　大技`, `自軍.燃え→大技`,
`とにかく倒せ`. Those four lines are what this is about.

```
npm run regenerate-enemy-info   # only after the .ain changes
npm run regenerate-ain          # the build; reads the two files below
```

| File | What it is |
|---|---|
| `enemy_info_lines.v1.04.tsv` | which string slots hold the lines — generated |
| `glossaries/enemy_info_glossary.tsv` | the English, keyed by the Japanese — hand-written |

## Why they need finding rather than translating

They are not dialogue, so they are not among the `m[]` lines every other page
here is about. They are string literals, assigned to four globals — `◆敵情報１`
through `◆敵情報４` — from inside `Ｔ敵本体生成` and `Ｔアルゴリズム`, two
functions that between them define every enemy in the game. `Ｔ敵本体情報` reads
the globals back out for the panel.

In the `ain.txt` dump that means they sit in one unbroken run of some 2700 `s[]`
lines, in among every enemy's code name, display name and AI preset:

```
;s[13508] = "レッドスライム"
;s[13088] = "戦闘／中ボス"
;s[13509] = "すら"
;s[13510] = "　すら"
;s[13511] = "　　すら"
;s[13512] = "とにかく倒せ"
;s[13513] = "m55宝箱だんご"
```

Nothing there says which four of those the panel shows, and picking wrong is not
a typo but a broken lookup: `m55宝箱だんご` is a key. The code does say, though,
and always in the same shape:

```
PUSHGLOBALPAGE / PUSH <◆敵情報N> / REF / S_PUSH <string slot> / S_ASSIGN
```

So `scripts/extract_enemy_info.js` dumps the code section
(`alice ain dump -C`), walks it for that shape, and writes down the slots it
found. In v1.04 that is 670 assignments over 239 slots — about 2500 characters
of Japanese in total, which is why this is a small job once you can see it.

## Slots shared with something else

A string slot is shared by every site pushing that text. Six of the slots
assigned to these globals are also pushed somewhere else, so translating one
would change something other than this panel, and the scan leaves them out:

| Slot | Text | Also |
|---|---|---|
| `s[0]` | the empty string | everywhere |
| `s[2686]` | `"　"` | everywhere |
| `s[12400]` | `デセラレーター` | `Ｔ支援状態生成` |
| `s[12668]` | `炎無効` | `Ｔ支援状態生成` |
| `s[12670]` | `氷無効` | `Ｔ支援状態生成` |
| `s[12708]` | `制限装甲` | `Ｔ支援状態生成` |

The first two are blank lines here and spacing everywhere else. The other four
are buff names, and buff names are quoted back as text in the condition strings
the battle AI is written in — `敵支援＜d熱狂＞` — so renaming one is a thing to
do deliberately, with the conditions, rather than as a side effect of
translating a hint. (`s[12668]` and `s[12670]` are translated by
`patches/system_cherry_picks.v1.04.ain.txt` anyway, from before any of this; that is not
an endorsement, it is where they already were.)

The check is in the scan rather than in a list, so it keeps being made about
whatever a later version of the game adds.

## Why the English is keyed by the Japanese

`glossaries/enemy_info_glossary.tsv` is `japanese <TAB> english`, and the slot numbers
appear only in the generated file. Two reasons.

The numbers belong to one build of one version; the text does not. Re-running
the extraction against a different `.ain` renumbers the left-hand file and
leaves the glossary alone.

And the game repeats itself: `5.10.15ラウンド　大技` is five different enemies,
`★フルスペック★` is ten, `重装甲　装甲破壊等で除去可` is fourteen. Keyed by
slot, that was five chances to write five different English lines, and the file
this replaced had taken most of them — `Rounds 5.10.15: Special Move` and
`5,10,15 turns special` were both in it, along with two spellings of round 10
and one line that had picked up the wrong number entirely (`5の倍数ラウンド`,
every fifth round, was showing as `Every 3rd Round`). alice-tools applies the
last assignment it reads and says nothing, so the losing half was invisible.
Keyed by the Japanese, a repeated line is translated once because there is
nowhere to write it twice.

## Width

The panel is `Desc` in
`archives/Rance10Pact_v1_04/Game/Battle/EnemyInformationView.pactex.x`, and the
placeholder text the layout carries for it is four lines of twenty full-width
characters. The four lines are separate globals, so nothing wraps between them:
a line too long for the panel runs off it rather than folding onto the next.

The build measures each line against that placeholder and names the ones that
overhang. It does not shorten them and does not stop — the wording is a
judgement call and an overhanging line is still legible — so a warning here is
an invitation to rewrite the entry, not a broken build.

## Adding to it

Untranslated lines are left out of the patch rather than blanked, so the panel
shows the Japanese, which is what it showed before any of this existed. To
translate one, put it in the glossary; there is nothing else to update.

Names are checked against `glossaries/mistranslated_names.json` as the glossary is
rendered, and the build says so when a line names somebody and the English does
not spell them the way the rest of the patch does. That check exists because
`ハニー` went in as "Honey" here and as a race, and the repair pass in
`modules/NameNormalizer.js` could not help: it swaps a *known* misspelling for
the right one, and "Honey" was a new one — the table lists "honey".

The terms follow the ones already in `archives/Rance10EX_v1_04`, so that a hint here and
a card description read the same way: 異常 is a Debuff, 支援 a Buff, 遠隔
Ranged, コンボ a Combo, 大技 a Special Move. One thing to know while reading the
Japanese: 敵 in these lines is the enemy the panel is describing, not the enemy
of the enemy, so `敵HP50%以下` is its own HP and `自軍` is your side.
