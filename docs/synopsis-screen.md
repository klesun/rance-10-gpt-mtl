# The synopsis screen

`あらすじモード` is the recap the game offers when you pick an event you have
already seen: seven dotted rows summarising it, a **Play Event** button, and an
**OK** that skips the scene. Its text is four and a half thousand short
captions, and all of them are English now.

```
npm run regenerate-ex          # builds them into Rance10EX.ex
```

## Where the text is

`Rance10EX_v1_04/37_あらすじデータ.x`, a tree of one node per event:

```
２２１／２／ラングバウ到着 = {
    ００ = "｜−−−−−−−−｜−−−−−−−−−｜",
    ０１ = "ラング・バウに到着",
    ０２ = "",
    ０３ = "まずは寝る",
    ...
```

Two things in there are not text.

**The node name is a key.** The scenario calls `Scenes::RunSummary` with it and
`SummaryInformation@Ids::get` looks the event up by it, so it stays Japanese
whatever happens to the rows. Translating it would lose the event, not rename
it.

**Field ００ is never printed.** `SummaryData@Desc::get` loops `i` from 0 to 9
and formats `あらすじデータ.<node>.%02D` with `i + 1`, so `０１` through `１０`
are read and `００` is not. Every `００` in the file holds the same thing --
`｜−−−−−−−−｜−−−−−−−−−｜`, with its marks at 1, 10 and 20. It is the width ruler
the designers worked against, and it agrees with the placeholder the layout
carries for `TextDesc` in `Rance10Pact_v1_04/Game/Adv/SceneSummary.pactex.x`:
seven lines of twenty full-width characters, about 280 pixels by
`getTextWidth`, roughly 38 latin letters. Nothing wraps -- each field is its own
row -- so an overlong line runs off the panel rather than folding onto the next,
which is why the width is checked rather than fixed up.

## The English lives in a glossary, not in the table

`summary_glossary.tsv`, keyed by the Japanese, two columns. The table's 6414
filled fields are 4465 distinct phrases -- `戦闘開始` alone opens 85 events --
so keying by phrase translates each one once by construction rather than by
remembering to.

That key is also why **the build never writes English into the table**.
`renderSummaryTable` in `modules/SummaryLines.js` returns the rendered text and
`scripts/ex.js` copies the whole `Rance10EX_v1_04` tree to a temporary
directory, drops the rendered table in, and builds from the copy. Writing in
place would work exactly once: the second run would find no Japanese to look up
and quietly produce a table with no English in it. Seven megabytes of text is a
moment to copy, and the file under version control stays as the game shipped it.

A phrase with no English is left as it is rather than blanked, so a partly
translated glossary gives a partly English panel and shows at a glance what is
still to do.

## Working on it

```
node scripts/extract_summary_lines.js   # refresh the glossary from the table
node scripts/summary_chunk.js 300       # next batch as a prompt for a chat
node scripts/summary_chunk.js 300 --context   # ...or with the event, to translate here
node scripts/summary_merge.js           # read the answer back in
node scripts/lookup_term.js 魔軍         # how the patch already translates a word
```

Every one of them merges rather than overwrites: English already in the file
survives, a phrase the game no longer has keeps its English at the end of the
file under a heading, and `summary_merge.js` leaves an already-translated row
alone unless `--force`. Nothing typed by hand is lost by running any of them
again.

`summary_merge.js` reports two things worth acting on: rows too wide for the
panel, and rows where the English does not spell a name the way
`mistranslated_names.json` does. The second report is noisy by design -- around
308 of the 4458 rows trip it, nearly all because a caption twenty characters
wide cannot hold `Agireda Kosabusshi Zonna Abona` and says `Agireda`. What it is
for is the other kind of hit: a *different* spelling of the same name. Where the
canonical name does not fit, the card's short form is the right fallback --
`generate_card_names.js` refuses `Masamune` -> `Dokuganryuu Masamune` as a wrap
rather than a respelling, so the short form is a spelling the game itself
displays.

Anything that is not a character -- places, ranks, operations -- comes from
`scripts/lookup_term.js`, which pairs the Japanese dump with the variant's
rendered text by `m[]` number and shows how the dialogue already says it.
`滅号作戦` is Operation Extermination, `永久牢` the Eternal Prison, `番裏の砦`
Fort Banura; none of those is what a translator would invent unprompted.

## The terms the 4458 rows settled on

`lookup_term.js` answers for a word the dialogue already used. A good part of
the synopsis is words it never did -- operations, fortresses, the map, the
machines -- and each of those was decided once, in a batch of three hundred,
and then had to hold for a screen nobody reads in one sitting. So the decisions
are written down here, where the next row can be checked against them rather
than deciding them a second time.

Names of people are **not** in this list. They come from
`mistranslated_names.json` and `card_name_glossary.tsv`, and `summary_merge.js`
reports a row that spells one some other way.

Every term below is what `summary_glossary.tsv` holds today. Where the
canonical form did not fit twenty characters the row carries a short one --
`聖櫃` is "the Ark" in four rows out of five, `闘神大会` "Fighting God tourney"
-- so a term reading back shortened is the panel's width, not a disagreement.

**The Monster Army.** 魔軍 Monster Army, 魔人 Fiend, 魔王 Demon King, 使徒
apostle, 大将軍 Great General, 魔物大元帥 Grand Marshal, 魔物将軍 Monster
General, 魔物隊長 monster captain, 魔人討伐隊 the Fiend slayers, 魔物界 the demon
world, 器兵 automaton, 穴奴隷 hole slave.

**Who stands against it.** 勇者 hero, 主人公 protagonist -- a different word,
fixed by the caption `※主人公＝男` -- 英霊 heroic spirit, 聖女モンスター Holy Gal
Monster, 妖怪 youkai, 妖怪王 Youkai King, 鬼 oni, 調教師 trainer.

**Heaven.** 天界 Heaven, 神々の国 the Land of the Gods, １級神 First-Class God,
レベル神 Level God, 魂管理局 the Soul Bureau, 神魔法 divine magic, 闘神 War God,
闘将 Tousho (聖骸闘将 Holy Corpse Tousho), 聖櫃 the Sacred Ark, 闘神都市 Fighting
God City, 闘神大会 Fighting God tournament.

**Sides and institutions.** 聖魔教団 the Holy Magic Sect and 聖魔教団の遺産 the
Sect's legacy, ＡＬ教 the AL Church, ＤＸの会 the DX Association, 自由都市連合 the
Free Cities Alliance, 紫軍 the Purple Army, 魔法軍 the Magic Army, 赤軍 the Red
Army, 参謀本部 General Staff HQ, 総統 Supreme Commander, 法王特典 papal
privilege, 闇社会 the underworld, 保育園 daycare.

**Powers and afflictions.** 魔血魂 Magic Blood Soul, 魔王システム Demon King
System, 満ち潮 high tide, 逡巡モード Hesitation Mode, 刹那モード Instant Mode,
恐瘴気 miasma of terror, 白色破壊光線 White Destruction Ray, 魔封印結界 Magic
Sealing Barrier, 絶対服従魔法 absolute obedience magic, チュパ病 Chupa Disease,
才能限界値 talent cap, 攻撃限界点 attack limit, 異界 the otherworld, 異界ゲート
Otherworld Gate, サイバーワールド the Cyber World.

**The war.** 滅号作戦 Operation Extermination, ダウンフォール作戦 Operation
Downfall, 人破壊爆弾 human destruction bomb, 特別焼却師団 Special Incineration
Corps, 衛星兵器 the satellite weapon, 電磁パルスの杖 the EMP staff, 永久牢 the
Eternal Prison, マジノライン Maginot Line, 番裏の砦 Fort Banura, ニクラス砦 Fort
Niklas, マンガン砦 Mangan Fort, ランス砦 Rance Fort.

**The map.** 死国 Shikoku, 川中島 Kawanakajima, セキガハラ Sekigahara, なんば
Namba, 中之島 Nakanoshima, 天満橋 Tenmabashi Bridge, 翔竜山 Mount Shoryu, スルメ山
Mount Surume, ベズドグ山 Mount Bezdog, ツングース高地 Tungus Plateau, キナニ砂漠
Kinani Desert, カラーの森 Kalar Forest, ニカニカ平原 Nikanika Plain, ワシントン花畑
Washington Flower Field, へっぽこ街道 the Hapoko Road, ルッコンフード洞窟
Rukkonfood Cave, 悪魔回廊 the Demon Corridor, カクテル迷宮 the Cocktail Labyrinth,
マルグリッド迷宮 the Marguerite Labyrinth, 離れ宮島 Detached Miyajima, シャングリラ
Shangri-La, アメージング城 Amazing Castle, ラグナロックアーク Ragnarok Arc,
ハイパービル Hyperville, リプ商店街 Lip Shopping District, ハニーインザスカイ Hanny
in the Sky, Ｍランド M-Land, アイスフレーム Ice Flame, ローレングラード Laurengrad,
トランシルバニア Transylvania, ジフテリア Diphteria, テニアン Tinian, ラボリ Labori,
ラングバウ Rangbau, アペムンタ村 Apemunta village, ペンシルカウ Pencilcow,
シーウィード Sieweed, にぽぽ Nipopo, 異界ポリポリワン the otherworld Polipoliwan,
アレルギー超大国 the Allergy superpower, アニャガス王国 the Kingdom of Anyagas,
パランチョ王国 the Kingdom of Parancho, and the free cities ゴア Goa, カスタム
Custom, オク Oku, リッチ Rich, カーソン Carson, スケール Scale. The five trees are
ミダラナツリー Midarana Tree, ブルトンツリー Burton Tree, タンザモンザツリー
Tanzamonza Tree, サイサイツリー Saisai Tree, ビューティツリー Beauty Tree.

**Things and beasts.** チューリップ３号 Tulip No.3, ブレイブ号 the Brave, サンセット号
the Sunset, あてな２号 Athena 2.0, ＩＰボディ IP body, ノートンガツ Notongatsu,
大規模モルルン Massive Morurun, デラックスブック the Deluxe Book, 究極お神籤 the
ultimate fortune box, ガールズショー the Girls Show, 幸福タイム Happy Time,
宝箱だんご chest dango, ゴールデンハニー Golden Hanny, リターンデーモン Return
Demon, ホフホフ Hofhoph, 幸福きゃんきゃん Lucky Can Can -- that last one from
`card_name_glossary.tsv`, because the dialogue has it as both Happy Kyankyan and
Happiness Kyankyan and the card is the spelling the game itself displays.

The glossary ends in an unbroken run of 144 `◯◯裸イベント` rows, one per
character, and every one of them is `X nude event`.

A caption that opens with `※` keeps it: 114 rows do, because it is the game's
own mark for a condition rather than a word. `※要◯◯　内容若干変化` becomes
`※Needs X - slight changes`, `※条件　◯◯` `※Condition: X`, `※処理　◯◯`
`※Handling: X`. Nothing else full-width survives: a leading `・` is dropped,
`・・` becomes `...` or a dash, `←Ｎｅｗ！` becomes `<-New!`. What makes the rule
enforceable at all is that `summary_merge.js` refuses a row still carrying kana
or kanji outright -- full-width punctuation is outside those blocks and gets
through, so it is on the translator.

The coarse register is the patch's, not softened for the panel: `※エロＣＧ`
※Erotic CG, `抱く` beds, `犯す` and `陵辱` rapes and violates, `ヤリ殺す` fucks to
death, `青姦` rutting in the open, `大乱交祭` the Great Orgy Festival. All 4458
rows are in one voice; a row translated more politely than its neighbours reads
as a different hand rather than as tact.

## What is still Japanese on that screen

The caption beside the panel, `このイベントをスキップします`, and the
`あらすじモード` title are not text at all. They are painted into
`シス／あらすじ／ベース.ajp`, entry 0 of `Rance10CG4.afa`. The string is in no
text container at all: not in the `.ain`'s 15953 strings or 269678 messages, not
in the `.ex`, not in any of the 220 pactex layouts, and not in a byte scan of
the game directory in CP932, UTF-8 or UTF-16.

Translating it means editing the image, and `Rance10CG4.afa` is in no build
command here -- it would need its own manifest and the same back-up-first care
`README.md` describes for `Rance10CG2.afa`.
