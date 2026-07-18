# Rance Series — Character Gender Reference

Sources: AliceSoft Wiki (individual `Sex:` fields), VNDB (all 12 canon games).
Purpose: fixing gender pronoun errors in `/gpt_outputs/` and `/gpt_outputs_v104/` JSON translations.

---

## ⚠ OPERATIONAL RULES — READ THIS FIRST AFTER EVERY COMPRESSION

**1. NO SCRIPTS, NO SOFTWARE.**
The user explicitly forbade any automation: "YOU ARE NOT ALLOWED TO WRITE ANY SCRIPTS", "DON'T USE ANY SOFTWARE". Use only the Read and Edit tools directly on each JSON file.

**2. READ MANUALLY, WITH CONTEXT.**
Each line is a continuation of the story from the previous line. You must keep that context to correctly identify pronoun errors (who is speaking, who is being spoken about).

**3. PRIMARY GOAL = PRONOUN ERRORS.**
Fix gender pronouns (he/she, him/her, his/hers) and also person/speaker mixups (you/me, she/you) when clearly wrong. Always check this reference file before fixing any pronoun.

**4. SECONDARY GOAL = WRONG CHARACTER NAME SPELLINGS.**
GPT sometimes mistranslates names. Fix these when spotted: e.g. "Kular" → "Kalar", "Lance" → "Rance", "Kululuku" → "Crook". Name spelling standard = VNDB / MiraHeze wiki.

**5. DO NOT REFORMAT LINES.**
Do not remove or add leading spaces, do not change punctuation or formatting. Only fix the translation content. "I asked you to correct the translation, not to reformat lines."

**6. DO NOT STOP.**
Process every file in `gpt_outputs/` sequentially, then every file in `gpt_outputs_v104/`. Do not wait for user confirmation between files.

**7. UPDATE THIS FILE.**
After significant progress, update the Task Progress section. This file is the source of truth for character genders — do NOT infer genders from translation context. Only update the character list if the user explicitly tells you a character's gender.

**8. READ THIS FILE AFTER EVERY COMPRESSION.**
After each context compression event, the first thing you must do is read this file to restore your operational context.

---

## ⚠ PAST MISTAKES — DO NOT REPEAT

| What I did wrong | Why it was wrong | Rule |
|---|---|---|
| Changed Galtia "his belly" → "her belly" based on context alone | Galtia is MALE per reference. Context made him seem female. | Always check this file before touching any pronoun. |
| Changed "Root Ari" → "Root Ali" | VNDB/MiraHeze standard is "Root Ari". Never alter name spelling without checking VNDB. | Name standard = VNDB/MiraHeze. |
| Changed "Crook" → "Krukk" | "Crook Mofus" IS the VNDB name for クルックー. It was already correct. | Don't "fix" names that are already at VNDB standard. |
| Removed leading spaces from translation lines | User: "I asked you to correct the translation, not to reformat lines." | Never touch formatting — only fix translation content. |
| Added/changed spacing within lines | User: "why are you butchering spaces?" | Same — no formatting changes, only content. |
| Fixing pronoun without consulting this file | Led to wrong Galtia fix. User: "use the fucking REFERENCE FILE." | Read this file before every pronoun change. |
| Inferring character gender from translation context | This file is the source of truth. Never "learn" genders from the text — only correct text based on this file. | Trust the reference, not the narrative. |
| "Fixing" a two-line split by rewriting both lines into an unnatural form | User: "don't butcher the lines." Split fixes must sound natural — if the result is awkward, leave the original as-is. | Only split lines when the result reads naturally. When in doubt, leave the original GPT translation. |
| Not reading this file after context compaction | CLAUDE.md is loaded in context automatically — there is no excuse for skipping the mandatory startup reads. | After every compaction: read this file and all memory files BEFORE editing anything. |
| Not recording user corrections and commands in this file | User explicitly said to record corrections here so they are not forgotten. | Add every user correction and command to this Past Mistakes table immediately. |
| Describing edits by listing what changed, without saying why | User: "don't comment on what you do, comment why you do that." Stating the reason (wrong pronoun, name standard, etc.) is what matters — the diff already shows what changed. | Always explain the reason for a change, not just the before/after. |
| Splitting a line by leaving the second line without a subject ("took out a single sheet of paper.") | English needs a subject in each standalone sentence. The first attempt "Maris, from a drawer stuffed with documents," / "took out..." has no subject on line 2. | When splitting across two lines, ensure each line is grammatically self-contained OR the second line is a clear continuation with a conjunction like "and". |
| Adding movement/action that isn't in the Japanese ("Maris went to a drawer...") | マリスは書類が詰まった引き出しから、 says nothing about walking or going anywhere — just "from a drawer". Adding verbs not in the source is mistranslation. | Only translate what is actually in the Japanese. Don't infer implied actions. |
| Attempting to split merged sentences across two lines | User: "don't mess with splitting sentences, you suck at it." Every attempt has produced awkward or wrong English. | Do NOT split sentences. If GPT merged two Japanese lines into one English line and left the second empty, leave it as-is. Only fix pronouns, name spellings, and clear logical/content errors. |

---

## ⚠ Special Cases

| Character | Note |
|---|---|
| **Uesugi Kenshin** | Historical male — **FEMALE** in Rance universe. Biggest GPT error source. |
| **Lexington** | Male soul in female body — use **he/him** throughout |
| **Kesselring** | Originally male (Kalar), undergoes sex change — female after the change |
| **RedEye** | Genderless — avoid gendered pronouns |
| **Hanny** (generic) | Both sexes exist in the Hanny race |
| **Magic the Gandhi** | Name doesn't signal gender — **FEMALE** |
| **Sanakia Drelshkaf** | Uses ボク pronoun in Japanese (tomboy) — **FEMALE** |
| **Babolat** | Looks like could be female — **MALE** |
| **Caesar** | Golem guardian, Roman name — **MALE** |
| **Juno** | Roman goddess name — **MALE** in Rance |
| **Pi-R** | Young-looking — **MALE** |
| **Lei** | Delinquent-type dark lord — **MALE** |
| **Galtia** | Friendly, food-loving dark lord — **MALE** |
| **Warg** | Harsh name — **FEMALE** |
| **Mi Lordring** | Bishop of AL Church — **MALE** |
| **Chochoman Public** | Zeth Four Lord — **MALE** |
| **LeMay** | Monster Army General, named after historical figure — **MALE** (wiki confirmed). GPT may write "Lady LeMay" — fix to "Lord LeMay". |
| **Kola** (Cola) | Male, but a big reveal at line ~21996 — use "Kola" or "the angel" before the reveal to avoid exposing gender. After reveal: he/him. |
| **Yutin Fulz** | Copandon's secretary — **Hermaphrodite** (wiki: "Sex Hermaphrodite"). Use they/them or avoid gendered pronouns. |

---

## Master Alphabetical List

| Character | Japanese | Gender | Game(s) |
|---|---|---|---|
| 3G | 3G | Male | RX |
| Abert Safety | アベルト・セフティ | Male | RQ |
| Aegis Kalar | イージス・カラー | Female | RX |
| Agireda | アギレダ | Female | RX |
| Aizel | アイゼル | ? | RVI |
| Aki Del | アキ・デル | Female | RVI |
| Akashi Kazemaru | 明石 風丸 | Male | SR |
| Alefgard | アレフガルド | Male | RX |
| Alex Valse | アレックス・ヴァルス | Male | RVI RX |
| Alexander | アレキサンダー | Male | RIII RX |
| Alfra Ray | アルフラ・レイ | Female | RQ |
| Alicia | アリシア | Female | RI R01 |
| Alkanese Rize | アルカネーゼ・ライズ | Female | RX |
| Am Yisael | アム・イスエル | Female | RX |
| Amitos Armitage | アミトス・アミテージ | Female | RX |
| Anasel Caspora | アナセル・カスポーラ | Female | RX |
| Andelmille | アンデルミィル | Female | RQ |
| Anise Sawatari | アニス・沢渡 | Female | RX |
| Anokia Moemoe Slin | アノキア・モエモエ・スリン | Female | RQ |
| Aoi | あおい | Female | RX |
| Apostle Alcarria | 使徒 アルカリア | Female | RX |
| Apostle Atlanta | 使徒 アトランタ | Female | RX |
| Apostle Aurora | 使徒 オーロラ | Female | RX |
| Apostle Barbara | 使徒 バーバラ | Female | RX |
| Apostle Elsill | 使徒 エルシール | Female | RX |
| Apostle Garnet | 使徒 ガーネット | Female | RX |
| Apostle Gigai | 使徒 戯骸 | Male | RX |
| Apostle Juno | 使徒 ジュノー | Male | RX |
| Apostle Kaen Shoshi | 使徒 火炎書士 | Female | RX |
| Apostle Kanayo | 使徒 加奈代 | Female | RX |
| Apostle Kaybnyan | ケイブニャン | Female | RX |
| Apostle Kaybwan | ケイブワン | Female | RX |
| Apostle Lilim | 使徒 リリム | Female | RX |
| Apostle Paleloa | 使徒 パレロア | Female | RX |
| Apostle Sapphire | 使徒 サファイア | Female | RX |
| Apostle Sharon | 使徒 シャロン | Female | RX |
| Apostle Topaz | 使徒 トパーズ | Female | RX |
| Apostle Yuki | 使徒 ユキ | Female | RX |
| Arcy Julietta | アーシー・ジュリエッタ | Female | RX |
| Arios Theoman | アリオス テオマン | Male | RQ RX |
| Aristoles Calm | アリストレス・カーム | Male | RQ |
| Arlcoate Marius | アールコート・マリウス | Female | RX |
| Arms Arc | アームズ・アーク | Female | RX |
| Asakura Yoshikage | 朝倉 義景 | Male | SR RX |
| Asakura Yuki | 朝倉 雪 | Male | SR |
| Asuka Cadmium | アスカ・カドミュウム | Female | RX |
| Atago McCart / Atago Macatt | アタゴ・マカット | Female | RX |
| Aten Gnu | アテン・ヌー | Female | RQ |
| Athena 2.0 | あてな2号 | Female | RX |
| Babolat | バボラ | Male | RVI RX |
| Barres Province | バレス・プロヴァンス | Male | RIII RX |
| Battling Centers | バッティング・センターズ | Male | RX |
| Bashou Matio |  | Male | SR |
| Bernard Seramite | バーナード・セラミテ | Male | RX |
| Bintan Destra | ビンタン・デストラー | ? | RIII |
| Bird Lithfie | バード・リスフィ | Male | RQ RX |
| Biscuitta Berns / Biscuitta Burns | ビスケッタ・ベルンズ | Female | RX |
| Black Swan | ブラックスワン | Female | RIX |
| Bitch Golch | ビッチ・ゴルチ | Male | RQ |
| Bobza Flanders | ボブザ・フランダース | Male | RQ |
| British | ブリティシュ | Male | RX |
| Caesar | シーザー | Male | RX |
| Café Artful | カフェ・アートフル | Female | RX |
| Caloria Cricket | カロリア・クリケット | Female | RX |
| Camilla | カミーラ | Female | RVI RX |
| Captain Vanilla | キャプテン バニラ | Female | SR |
| Carolie Mate / Calory Mate | キャロリ・メイト | Female | RX |
| Cecil Carna | セシル・カーナ | Female | RX |
| Cessna Benville | セスナ・ベンビール | Female | RQ |
| Cetina Favo | セティナ・ファーボ | Female | R5D |
| Chaka Cadmium |  | ? | RX |
| Chaos | カオス | Male | R01 RX |
| Chisa Gode | チサ・ゴード | Female | RQ |
| Chizuko Yamada / Yamada Chizuko | 山田 千鶴子 | Female | RVI RX |
| Chochoman Public | チョチョマン・パブリック | Male | RX |
| Colin Coccolin | コリン・コッコリン | Female | RQ |
| Convert Tax | コンバート・タックス | Male | RX |
| Copandon Dott | コパンドン・ドット | Female | RIV RX |
| Cordoba Burn | コルドバ・バーン | Male | RIII RX |
| Crane | クレイン | Female | RX |
| Cream Ganoblade | クリーム・ガノブレード | Female | RX |
| Crook Mofus | クルックー・モフス | Female | RX |
| Cutie Band | キューティ・バンド | Female | SR |
| Cynthia | シンシア | ? | RIII |
| Daidouji Komatsu | 大道寺 小松 | Female | SR |
| Daniel Safety | ダニエル・セフティ | Male | RQ |
| Dark Rance | ダークランス | Male | RVI RQ RX |
| Dark Wings (Freya faction) | — | RX |
| Dens Blau | デンズ・ブラウ | Male | RQ |
| Dio Calmis | ディオ・カルミス | Male | RQ |
| Dokuganryuu Masamune | 独眼流 政宗 | Male | SR RX |
| Dolhan Cricket | ドルハン・クリケット | Male | RQ |
| Don Doessky | ドン・ドエススキー | Male | RX |
| Eleanor Ran | エレノア・ラン | Female | RIII RX |
| Elena Flower | エレナ・フラワー | Female | RX |
| Elena L.R. | エレナ・エルアール | Female | RIV |
| Elizabeth Lacock | エリザベス・レイコック | Female | RQ |
| Emi Alphorne | エミ・アルフォーヌ | Female | RQ |
| Erina | エリナ | Female | SR |
| Eropicha Nyanko | エロピチャ・ニャンコ | Female | RX |
| Ex Banquet | エクス・バンケット | Male | RX |
| Feliss | フェリス | Female | RVI RQ RX |
| Fletcher Modell | フレッチャー・モーデル | Female | RQ |
| Foot Rot | フット・ロット | Male | R5D |
| Freak Paraffin | フリーク・パラフィン | Male | RQ |
| Freoncoise | フロンソワーズ | Female | RIII |
| Freya Idun | フレイア・イズン | Female | RX |
| Frostvine | フロストバイン | Female | RX |
| Full Kalar | フル・カラー | Female | RX |
| Galtia | ガルティア | Male | RVI RX |
| Gazel Gode | ガイゼル・ゴード | Male | RQ |
| Gengorou Shinoda | 篠田源五郎 | Male | RX |
| Genri | 言裏 | Male | RVI |
| Gon | ゴン | Male | SR |
| Haini Gold | ハイニ・ゴール | Female | RQ |
| Hanny | ハニー | Both | All |
| Hanny King | ハニー・キング | Male | RX |
| Hara Aki | 原 阿樹 | Female | SR |
| Hara Shouji | 原 昌示 | Female | SR |
| Haurein Province | ハウレーン・プロヴァンス | Female | RX |
| Hecate | ヘケート | Female | RQ RX |
| Heidi Pankrau | ハイジ・パンクラウ | Female | RX |
| Henderson Dauntless | ヘンダーソン・ドーントレス | Male | RQ |
| Hibachi | 火鉢 | ? | SR |
| Hikari Mi Blanc | ヒカリ・ミ・ブラン | Female | RQ |
| Ho Raga | ホ・ラガ | Male | RX |
| Holy Katana Nikkou / Nikkou | 聖刀日光 | Female | SR RX |
| Horikawa Nami | 堀川 奈美 | Female | SR |
| Hornet | ホーネット | Female | RVI RX |
| Houjou Souun | 北条 早雲 | Male | SR RX |
| Houjou Susu |  | Female | RX (spoiler) |
| Hubert Lipton | ヒューバート・リプトン | Male | RIII RIX RX |
| Hunty Kalar | ハンティ・カラー | Female | RQ RX |
| Imagawa Anko | 今川 あんこ | Female | SR |
| Imagawa Yoshimoto | 今川 義元 | Male | SR |
| Inukai | 犬飼 | Male | SR |
| Io Ishtar | イオ・イシュタル | Female | RIX RX |
| Isis | イシス | Male | RQ |
| Jaro Jasrack | ジャロ・ジャスラック | ? | R5D |
| Jean Gangvang II | ジャン・ギャンバン二世 | Male | RQ |
| Jericho Colon | イェリコ・コロン | Female | RQ |
| Johnny | じょにぃ | Male | R5D |
| Julia Lindum | ジュリア・リンダム | Female | RX |
| Kabachahn the Lightning | カバッハーン・ザ・ライトニング | Male | RX |
| Kana Seihajuu Oosaka | カーナ・セイハジュウ・オオサカ | Female | SR |
| Kaoru Quincy Kagura | カオル・クインシー・神楽 | Female | RX |
| Kapalla Uche | カパーラ・ウーチ | Male | RQ |
| Karl Ojizan | カール・オジザン | Male | RQ |
| Karma Atranger | カーマ・アトランジャー | Female | RQ |
| Kasumi K. Kasumi | カスミ K. 香澄 | Female | RX |
| Katyusha Bosch | カチューシャ・ボッシュ | Female | RX |
| Kawanoe Mine | 川之江 美禰 | Female | SR |
| Kawanoe Yuzuru | 川之江 譲 | Male | SR |
| Kayblis | ケイブリス | Male | RVI RX |
| Keith Gold | キース・ゴールド | Male | RQ RX |
| Kentou Kanami | 見当 かなみ | Female | R01 RX |
| Kesselring | ケッセルリンク | Male→Female | RX (sex change) |
| Ketchuk Bangor | ケチャック・バンゴー | Male | RIII |
| Kibako | キバ子 | Female | RX |
| Kii | 紀伊 | Female | RX |
| Kikkawa Kiku | 吉川 きく | Female | SR RX |
| Kimchi Drive | キムチ・ドライブ | Female | RX |
| King Dragon | キング・ドラゴン | Male | RQ |
| Kinggeorge Violae | キングジョージ・アバレー | Female | RQ |
| Kinkaid Brambla | キンケード・ブランブラ | Male | RX |
| Kisara Copley | キサラ・コプリ | Female | RQ |
| Kite | カイト | Male | RQ |
| Klean Bew | クリン・ビゥ | Female | RX |
| Kobayakawa Chinu | 小早川 ちぬ | Female | SR RX |
| Kola (Cola) | コーラ | Male | RX |
| Kousaka Yoshikage | 高坂 義風 | Male | SR |
| Koushuuin Hazuki | 甲州院 葉月 | Female | SR |
| Krutche Muffin | クルーチェ・マフィン | Female | RX |
| Kurobe | 黒部 | Male | SR RX |
| Kurohime | 黒姫 | Female | SR |
| Kurusu Miki | 来水 美樹 | Female | SR RX |
| La Hawzel | ラ・ハウゼル | Female | RX |
| La Saizel | ラ・サイゼル | Female | RX |
| La Vaswald | ラ・バスワルド | Female | RX |
| Lark Pikespeak | ラーク・パイクスピーク | Male | RQ |
| Launea |  | ? | RX |
| LeMay | ルメイ | Male | RX |
| Lei | レイ | Male | RX |
| Leila Grecni | レイラ・グレクニー | Female | R01 RX |
| Lelyukov Berkov | レリューコフ・バーコフ | Male | RIX |
| Leopard Maara | レオパルド マーラ | Female | SR |
| Lexington | **Male** (female body) | RX |
| Lia Parapara Leazas | リア・パラパラ・リーザス | Female | R01 RX |
| Lil Avenger | 復讐ちゃん | Female | RQ |
| Lola Indus | ローラ・インダス | Female | RQ |
| Louis Quitowack | ルイス・キートワック | ? | RIV |
| Lucy Julietta | ルーシー・ジュリエッタ | Female | RX |
| Magic the Gandhi | マジック・ザ・ガンジー | Female | RVI RX |
| Mai | マイ | Female | SR |
| Maitrea Meishin | マイトレイア・メイシアン | ? | RIII |
| Makibano Meg | 牧場野 メグ | Female | SR |
| Makutsudou Nobuhiko | 魔窟堂 野武彦 | ? | SR |
| Maria Custard | マリア・カスタード | Female | RIII RX |
| Maris Amaryllis | マリス・アマリリス | Female | RX |
| Martina Curry | マルチナ・カレー | Female | RX |
| Mary Ann | メアリー・アン | Female | RX |
| Masou Shizuka / Shizuka Masou | 魔想 志津香 | Female | RIII RX |
| Masuzoe | ますぞゑ | Male | RX |
| Matilda Mateuri | マチルダ・マテウリ | Female | SR |
| Medusa | メディウサ | Female | RVI RX |
| Megadeath Moromi | メガデス・モロミ | Female | SR RX |
| Mekill Depa L'Zile | ミーキル・デパ・ラジール | Female | RQ |
| Melfeis Promenade | メルフェイス・プロムナード | Female | RX |
| Menad Shisei | メナド・シセイ | Female | R01 RX |
| Merim Tser | メリム・ツェール | Female | RX |
| Mercy Julietta | マーシー・ジュリエッタ | Female | RX |
| Merci Archa | メルシィ・アーチャ | Male | RQ |
| Mi Lordring | ミ・ロードリング | Male | RX |
| Mikan | ミカン | Female | RX |
| Mill Yorks / Milli Yorks | ミル・ヨークス | Female | RIII RX |
| Millie Lincle | ミリー・リンクル | Female | RQ |
| Mineva Margaret | ミネバ・マーガレット | Female | RIX RX |
| Miracle Tou / Miracle Tor | ミラクル・トー | Female | RX |
| Modern Kalar | モダン・カラー | Female | RX |
| Moganda | モガンダ | Male | RQ |
| Morita Ai | 森田 愛 | ? | SR |
| Mouri Motonari | 毛利 元就 | Male | SR RX |
| Mouri Teru | 毛利 てる | Female | SR RX |
| Murala | ムララ | Male | RQ |
| Mysteria Tou | ミステリア・トー | Female | RX |
| Nagi su Ragarl | ナギ・ス・ラガール | Female | RIII RX |
| Nanjou Ran | 南条 蘭 | Female | SR |
| Naoe Ai | 直江 愛 | Female | SR RX |
| Natori | 名取 | Female | SR |
| Nay Wrong | ネイ ヲロング | Female | RQ |
| Necai Sys | ネカイ・シス | Female | R5D |
| Nelson Server | ネルソン・サーバー | Male | RX |
| Nero Chapet VII | ネロ・チャペット7世 | Male | RIII |
| Nikkou / Holy Katana Nikkou | 日光 | Female | SR RX |
| Nimitz Leak | ニミッツ リーク | Female | RX |
| Noah Sailing | ノア・セーリング | Female | RX |
| Nogiku | 野菊 | Female | SR RX |
| Noir | ノワール | Female | SR RX |
| Nopperabo |  | Female | SR |
| Nos | ノス | Male | RQ |
| Nunuhara Cabbage | ヌヌハラ・キャベツ | ? | RX |
| Oama Motohide | オアマ・モトヒーデ | Male | SR |
| Oda Kou | 織田 香 | Female | SR RX |
| Oda Nobunaga | 織田 信長 | Male | SR |
| Ogawa Kentarou | 小川 健太郎 | Male | SR RX |
| Ogier Lott Stein | オーギル・ロット・シュタイン | Male | RQ |
| Okita Nozomi | 沖田 のぞみ | Female | SR |
| Omachi | お町 | Female | SR RX |
| Onoha Mespos | オノハ・メスポス | Female | RX |
| Orime | 折女 | Female | SR RX |
| Oruore the 3rd | オルオレ・ザ・サード | Male | RX |
| Ouka Toki | 凰火 朱鷺 | ? | SR |
| Pamela Helman | パメラ・ヘルマン | Female | RIII RIX |
| Papaya Server | パパイア・サーバー | Female | RX |
| Papdimus Scirsabun (Papademas Shirusven) | — | Male | RX |
| Parsley Rig Zeth | パセリ・リグ・ゼス | Female | RX |
| Pastel Kalar | パステル・カラー | Female | RX |
| Patricia Bacon |  | Female | RX |
| Patton Misnarge / Patton Helman | パットン・ミスナルジ | Male | RIII RIX RX |
| Peruelé Kalette | ペルエレ・カレット | Female | RX |
| Pervert Mouse | 変態ネズミ | ? | RQ |
| Pi-R | パイアール | Male | RX |
| Pigu Geliciam | ピグ・ギリシアム | Female | RX |
| Pitten Chao | ピッテン・チャオ | Male | RX |
| Pizarro | — | ? | RX |
| Pluepet | プルーペット | Male | RX |
| Poron Chao | ポロン・チャオ | Male | RX |
| Potauf Tokrev | ポートフ・トカレフ | Male | RIX |
| Prima Hononoman | プリマ・ホノノマン | Female | RX |
| Pulptenks Flanders | パルプテンクス・フランダース | Female | RQ |
| Quelplan | クエルプラン | Female | RX |
| Radon Alphorne | ラドン・アルフォーヌ | Male | RQ |
| Ragishss Cryhausen | ラギシス クライハウゼン | Male | RVI RX |
| Ragnarokarc Super Gandhi | ラグナロックアーク・スーパー・ガンジー | Male | RVI RX |
| Ralga Succubus | ラルガ・サッキュバス | Female | RQ |
| Rance | ランス | Male | All |
| Ranmaru | 乱丸 | Female | SR |
| Ratchet Luncheon | ラチェット・ランチョン | Male | RQ |
| Rebecca Copley | レベッカ・コプリ | Female | RQ |
| RedEye | レッドアイ | Genderless | RX |
| Reincock | ラインコック | Male | RQ |
| Replica Misly | レプリカ・ミスリー | Female | RQ |
| Reset Kalar | リセット・カラー | Female | RX |
| Richelle von do Kosusu | リクチェル・フォン・ド・コースス | Female | RX |
| Rick Addison | リック・アディスン | Male | R01 RX |
| Rizna Lanfbitt | リズナ・ランフビット | Female | RVI RX |
| Rocky Bank | ロッキー・バンク | Male | RX |
| Rodney Rodney | ロドネー・ロドネー | Male | RQ |
| Rolex Gadras | ロレックス・ガドラス | Male | RIII RIX RX |
| Rona Kestina | ロナ・ケスチナ | Female | RX |
| Root Ari |  | Female | RX |
| Rose Card | ロゼ・カド | Female | RQ |
| Rovert Landstar | ロバート・ランドスター | Male | RQ |
| Ruberan Tser | ルーベラン・ツェール | Female | RIX RX |
| Russian Kalette | ルシアン・カレット | Female | RIII |
| Sachiko Centers | サチコ・センターズ | Female | RX |
| Saias Crown | サイアス・クラウン | Male | RX |
| Sakura Kalar | サクラ・カラー | Female | RX |
| Sakamoto Ryouma | 坂本 龍馬 | Female | SR |
| Samar Happiness | サマール・ハッピネス | Male | RQ |
| Samezan |  | ? | RX |
| Samson Maximov | サムソン・マキシモフ | Male | RIX |
| Sanada Tourin | 真田 透琳 | Male | RX |
| Sanakia Drelshkaf | サーナキア・ドレルシュカフ | Female | RQ RX |
| Satella | サテラ | Female | RVI RX |
| Saya Friday | サヤ・フライディ | Female | RIII |
| Seigan | 性眼 | Male | SR |
| Sel Catchgolf | セル・カーチゴルフ | Female | RX |
| Senhime / Tokugawa Sen | 徳川千 | Female | SR RX |
| Sepia Landstarr | セピア・ランドスター | Male | RQ |
| Seyadatara | セヤダタラ | Female | RQ |
| Shariela Aries | シャリエラ・アリエス | Female | RX |
| Sheila Helman | シーラ・ヘルマン | Female | RIX RX |
| Shichisei | 七星 | Male | SR |
| Shibata Katsuie | 柴田 勝家 | Male | SR |
| Shimazu Yoshihisa | 島津 ヨシヒサ | Male | SR |
| Sieg | ジーク | Male | RVI |
| Silbarrel Silbarella | シルバレル・シルバレラ | Female | RX |
| Silky Littleraisin | シルキィ リトルレーズン | Female | RX |
| Sill Plain | シィル・プライン | Female | All |
| Sioux / Sioux Province | スー・プロヴァンス | Female | RX |
| Starlevel The Great | スターレベル様 | Male | RQ |
| Stessel Romanov | ステッセル・ロマノフ | Male | RIX |
| Stroganoff | ストロガノフ | Male | RX |
| Suzume | 鈴女 | Female | RQ RX |
| System Goddess | システム神 | Female | RX |
| Takeda Shingen | 武田 信玄 | Male | SR |
| Takega Satsu | 岳画 殺 | Female | SR |
| Tamanegi | タマネギ | Male | SR |
| Tama | タマ | Female | RX |
| Tamagushi Fuuka | 玉籤 風華 | Female | SR |
| Tanegashima Shigehiko | 種子島 重彦 | Male | SR |
| Tenmabashi Alice | 天満橋 ありす | Female | SR |
| Thalgo |  | ? | RX |
| Thoma Lipton | トーマ・リプトン | Male | RIII RIX RX |
| Tilde Sharp | チルディ・シャープ | Female | RX |
| Tokugawa Ieyasu / Tokugawa Sen | 徳川 家康 | Male/Female | SR=Male; RX=Female (Sen) |
| Tolstoy Batou | トルストイ・バトー | ? | RIX |
| Toppos | トッポス | Male | RX |
| Uesugi Katsuko | 上杉 勝子 | Female | SR RX |
| Uesugi Kenshin | **Female** | SR RX |
| Uesugi Torako | 上杉 虎子 | Female | SR RX |
| Unga Sayori | 運河 さより | Male | SR |
| Urza Pranaice | ウルザ・プラナアイス | Female | RVI RX |
| Uspira Shintou | ウスピラ・真冬 | Female | RX |
| Varen | ファーレン | Female | RX |
| Vivid Kalar | ビビッド・カラー | Female | RX |
| Warg | ワーグ | Female | RX |
| Wayoso Benville | ワヨソ・ベンビール | Female | RQ |
| Wichita Skate | ウィチタ・スケート | Female | RX |
| Willis Fujisaki | ウィリス・藤崎 | Female | RX |
| Wrench Luncheon | レンチ・ランチョン | Female | RQ |
| Wuu | ウー | Male | SR |
| Yamada Chizuko / Chizuko Yamada | 山田 千鶴子 | Female | RVI RX |
| Yamanaka Kojika | 山中 子鹿 | Female | SR |
| Yamamoto Isoroku | 山本 五十六 | Female | SR RX |
| Yamisagi / Dark Heron | 闇鷺 | Female | RX |
| Yoshikawa Machiko | 芳川 真知子 | Female | SR |
| Yoshikawa Kyouko | 芳川 今日子 | ? | SR |
| Youko | 洋子 | Female | SR |
| Yuki Del | ユキ・デル | Female | RIV |
| Yukichi | 諭吉 | Male | RX |
| Yulang Mirage | ユラン・ミラージユ | Female | RQ |
| Yutin Fulz | ユーティン・フルズ | Hermaphrodite | RX |
| Yuzuhara Yuzumi | 柚原 柚美 | Female | SR RX |
| Yvette Cheria | イベット・チェリア | Female | RQ |
| Zedong | ツォトン | Male | RX |
| Zima Bakasko | ジーマ・バカスコ | Female | RQ |
| Zulki Crown | ズルキ・クラウン | Male | RX |

---

## Game Abbreviations
- R01 = Rance 01, R02 = Rance 02, RIII = Rance 03, RIV = Rance IV
- R41 = Rance 4.1, R42 = Rance 4.2, R5D = Rance 5D, RVI = Rance VI
- SR = Sengoku Rance, RQ = Rance Quest, RIX = Rance IX, RX = Rance X

---

## Task Progress
- [x] Build character gender reference
- [ ] Scan gpt_outputs/ for gender errors and fix
  - General review (names, pronouns, some reformatting — user later said no reformatting) done through ~007020
  - Pronoun-focused review done through ~008220 (008220_008280.json was mid-read when interrupted)
  - Pronoun-focused review done through 009000 (009000_009060.json is next)
  - Key fixes made: Lucy (7038-39), Arcy (7242), Arlcoate (7823), Galtia (7886), Lei (8066-8082), Pi-R (8378, 8391), Willis (8913, 8922, 8931)
  - Reverted: Galtia "his belly" wrongly changed to "her belly" (7707) — reverted
  - Reverted: "Crook" wrongly changed to "Krukk" in 006720_006780.json line 6764 — reverted
  - Reverted: "Root Ari" wrongly changed to "Root Ali" — reverted
- [ ] Scan gpt_outputs_v104/ for gender errors and fix
