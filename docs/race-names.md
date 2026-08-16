# The race on the enemy status panel

The enemy status panel opens with `種族：植物` — Race: Plant. The label is a
cherry-picked string like any other; the word after it is not, and this is why.

```
npm run regenerate-race-names   # only after the .ain changes
npm run regenerate-ain          # the build; generates race_names.jaf and applies it
```

| File | What it is |
|---|---|
| `race_names.v1.04.tsv` | which number is which race — generated |
| `race_name_glossary.tsv` | the English, keyed by the Japanese — hand-written |
| `race_names.jaf` | the override the build compiles — generated, gitignored |

## Why not translate the nineteen strings

An enemy's race is an int, `▲種族`, and `表示種族` turns it into a word. Six of
those nineteen words are also something else somewhere, and a string slot is
shared by every site pushing that text, so translating one changes all of them:

| Word | Also | Safe? |
|---|---|---|
| `モンスター` | `Party::OrganizationIdFromString` runs `String.Contains` on it | **no, it is half of a parse** |
| `人類` | returned by `SituationGauge@GetColorString`, paired with `魔軍` | **no, a name choosing a colour** |
| `女の子モンスター` | the speaker's nameplate in `●台詞Ａ`, five times | display |
| `魔物兵` | an enemy's own `▲名前` in `Ｔ敵本体生成`, and a nameplate | display |
| `魔法生物` | an enemy's own `▲名前` | display |
| `−−−−` | `表示地域`'s blank as well as this one's | display |

`system_cherry_picks.v1.04.ain.txt` has carried a `DO NOT CHANGE` on
`モンスター` for years, with the symptom written next to it: every monster card
turns into a black rectangle. That is the first row of the table, found the hard
way.

Leaving those two in Japanese and translating the rest would be safe and would
also be worse than doing nothing, because `モンスター` is the commonest race in
the game — the panel would read `Race: モンスター` most of the time and English
the rest.

## What is patched instead

`表示種族` is display and nothing else. It has two callers:
`EnemyInformationView@SetParam`, which does `"種族：%s" % 表示種族(...)`, and
`TadaFunc::GetEnemyTypeString`, a one-line wrapper over it. Nothing compares its
result to anything.

So the build overrides the function and every string keeps its Japanese:

```
override string 表示種族(int aa)
{
	if (aa == 1) return "Honey";       // ハニー
	if (aa == 2) return "Plant";       // 植物
	...
	return super(aa);
}
```

`super()` is the original function, so a race missing from the glossary comes
back in Japanese — the same fallback `card_names.jaf` gets from `EX_String`'s
default, and for the same reason: the worst case should be a Japanese word, not
a crash. alice-tools takes as many `--jaf` as it is given, so this is a second
one alongside `card_names.jaf` rather than an addition to it.

The compiler has no `switch`, so the override is the chain of compares the
game's own function is written as.

## The numbers

The race ints are nowhere but in that chain of compares, so
`scripts/extract_race_names.js` reads them out of the code dump — the same
approach `scripts/extract_enemy_info.js` takes, and for the same reason. There
are nineteen, running 1 to 21 with 7 and 8 unused; anything else falls through
to `−−−−`.

The English is `race_name_glossary.tsv`, keyed by the Japanese, so re-running
the extraction against another version renumbers the generated file and leaves
the glossary alone. Note that the Japanese keys carry the padding spaces the
game pads them to — `"ハニー　"`, `"植物　　"` — because that is what the
function actually returns.

The ranks follow the dialogue rather than being invented here: 魔人 is a Fiend,
魔王 a Demon King, 使徒 an Apostle, 亜人 a Demi-human. 魔物兵 is the Monster
Soldier that `enemy_info_glossary.tsv` already calls it.

## Width

The race line has the panel's width to itself, the same as the four hint lines
lower down, but it is set in 36 where those are set in 26, so the same width
buys fewer characters. The build measures `Race：` plus each name against that
and names anything that overhangs. Nothing does at present; the longest is
`Monster Soldier`.

## The rest of the panel

`表示種族` has two neighbours in the dump, `表示規模` and `表示地域`, written in
the same shape and sitting a few lines away, and they look like the same job
again. They are not, and it is worth writing down why so that nobody re-derives
it:

`表示規模` — `小数`/`部隊`/`大軍` — **has no callers at all.** It is dead code.
The scale beside BOSS is written by `EnemyInformationView@SetParam` itself, out
of two literals of its own, `小規模部隊` and `大規模部隊`, which nothing else
pushes; they are ordinary cherry-picks in
`system_cherry_picks.v1.04.ain.txt`. Overriding `表示規模` would compile, apply,
and change nothing on screen.

`表示地域` has exactly one caller, `Ｔ武将計算`, which puts its result into
`LOG_TADA` — a debug log, next to `　Ｔ武将計算　` and `　フラグ＝`. No player
sees it.

So the panel is finished without either of them. If a third one of these ever is
worth doing, the scan in `scripts/extract_race_names.js` takes the function to
read as an argument, so it would be the same scan and another glossary — but
check the callers first.
