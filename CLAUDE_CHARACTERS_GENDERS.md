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

**8. READ THIS FILE AND ALL USER MESSAGES AFTER EVERY COMPRESSION.**
After each context compression event: (1) read this file; (2) read back everything the user wrote in the compressed portion — their corrections, commands, and feedback — and internalize them. If you find user instructions not yet recorded here, add them to the Past Mistakes table immediately. The compaction summary may miss specific corrections the user gave you mid-session.

**9. DO NOT REMOVE TRANSLATOR'S NOTES.**
Translator's notes in brackets — e.g., `[slang implying getting a bit aroused or flustered]` — must be preserved exactly as-is. User: "don't remove such notes, they have value." Never delete, replace, or move them.

**10. WHEN NARRATING A FIX, STATE THE REASON — NOT THE ACTION.**
Before each edit, write one sentence explaining WHY the change is needed (e.g. "Hornet is Female per reference", "GPT hallucinated 'Hawzell' for Hawzel", "Peruele is Female per character list"). Do NOT write what the diff already shows (e.g. "Changing X → Y"). The user: "don't comment on what you do, comment why you do that."

**11. ONLY CHANGE `translatedEnglishLine` VALUES — NEVER TOUCH FILE STRUCTURE.**
The only permitted change to any gpt_outputs JSON file is the text content of a `translatedEnglishLine` value. Never alter file encoding, line endings, indentation, field order, or any other structural aspect of the file. Specifically: **never use PowerShell `WriteAllText`, `Set-Content`, `Out-File`, or any other tool that rewrites the whole file** — this writes UTF-8 WITH BOM and corrupts the file format. The **Edit tool is the only permitted way to change file content**. If the Edit tool cannot match a string (e.g. due to special characters), leave that line alone — do NOT use any workaround that touches file structure.

**12. ALWAYS CHECK THIS FILE BEFORE FIXING ANY PRONOUN.**
Never fix a pronoun based on translation context alone. This file is the source of truth for character genders. User: "use the fucking REFERENCE FILE." If a character is not in this list, do not change their pronoun.

**13. NAME STANDARD = VNDB / MiraHeze. NEVER ALTER A NAME THAT IS ALREADY CORRECT.**
Do not change name spellings without checking VNDB. Do not "fix" names already at VNDB standard. Also check `mistranslated_names.json` when fixing name spellings — e.g. "Jiphtheria" is itself wrong; the correct form is "Diphteria".

**14. DO NOT SPLIT SENTENCES ACROSS TWO LINES.**
User: "don't mess with splitting sentences, you suck at it." If GPT merged two Japanese lines into one English translation and left the second line empty, leave it as-is. Do NOT split or redistribute content between lines.

**15. WRITE EVERY USER COMMAND INTO THIS FILE IMMEDIATELY.**
User: "I told you to write all commands I give you into the reference file." Add every instruction or correction here before continuing with any other work.

**16. EXPLAIN EACH CHANGE INDIVIDUALLY — ONE SENTENCE PER EDIT.**
User: "leave the explanation of the change for each individual change line." Do not batch multiple change explanations into one sentence. Write the reason immediately before each Edit call.

**17. VALIDATE JSON AFTER EVERY EDIT.**
User: "use json validation software to validate json file validity after your changes to every file." Run PowerShell `[System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8) | ConvertFrom-Json` after every Edit. Must use explicit UTF-8 encoding — default `Get-Content` garbles Japanese. If validation fails, fix immediately before moving on.

**18. ONLY FIX UNAMBIGUOUS ERRORS — NEVER CHALLENGE PHRASING CHOICES.**
User: "your goal is to fix UNAMBIGUOUS LOGICAL MISTAKES, not challenge vaguity of phrasing choices in the original translation." Only fix: wrong pronoun for a known character, wrong character name spelling. Never flag or alter phrasing that is merely suboptimal.

**19. DO NOT USE SOFTWARE TO INVESTIGATE PAST CHANGES.**
User: "don't fucking use ANY software". To check what you changed in a file, read the `.jsonl` transcript. Never run git diff, git log, git show, grep, or any other tool for this purpose.

**20. CHECK KANA CAREFULLY — ヴ (V) ≠ ビ (B).**
ヴィッチ = "Vitch" (derived from "witch"); ビッチ = "bitch". Always check the Japanese kana before assuming a romanization. Also: do not replace `...` with `---`.

**21. DO NOT TREAT COMMON JAPANESE LOANWORDS AS CHARACTER NAMES.**
マジック in context means "magic" (the concept), not the character "Magic the Gandhi". Only capitalize when the character is actually being addressed or named.

**22. PRONOUN CHECK IS PRIMARY — DO NOT DO SEPARATE NAME-SWEEP PASSES.**
User: "your main goal is the pronouns check — you were not supposed to do any extra actions specifically for name spelling corrections." Fix a name only when noticed incidentally during contextual reading. Never do a standalone replace_all name-correction pass.

**23. GUARANTEE CONTEXTUAL REVIEW OF EVERY FILE.**
Every file must be fully Read before any edits. A replace_all without a prior contextual Read does not count as a review. If you cannot confirm a file was properly reviewed, re-read it.

**24. DO NOT ASK THE USER QUESTIONS ANSWERABLE FROM THE FILES.**
User: "don't ask me such question, you have all the means necessary to answer it yourself." Check this file, the JSONL transcript, and the JSON files first. Only ask if genuinely impossible to determine otherwise.

**25. FIX GPT MISSPELLINGS OF KNOWN NAMES WHEN SPOTTED.**
- "Seel" / "Shiru" → "Sill" (シィル = Sill Plain)
- シーラ = "Sheila" (not "Seel", "Shiela", "Shiru", or confused with Sill)
- "Kaybliss" → "Kayblis"; "Howzel"/"Hauzel"/"Hawzell" → "Hawzel"
- Always check the character list in this file for the correct spelling.

**26. INCLUDE FULL CURLY-QUOTE PAIR IN EDIT TOOL STRINGS.**
When editing inside a curly-quoted dialogue string (`"…"`), the old_string must include the closing `"` (U+201D) and the new_string must replicate it. Verify both opening `"` and closing `"` are present after the edit.

**27. DO NOT COMMIT WITHOUT EXPLICIT USER AUTHORIZATION.**
Never run `git commit` on your own initiative. Make all file edits freely, but do not commit until the user explicitly says to.

---

## ⚠ PAST MISTAKES — HISTORICAL LOG

| What I did wrong | Why it was wrong |
|---|---|
| Changed Galtia "his belly" → "her belly" based on context alone | Galtia is MALE per reference. Context made him seem female. |
| Changed "Root Ari" → "Root Ali" | VNDB/MiraHeze standard is "Root Ari". |
| Changed "Crook" → "Krukk" | "Crook Mofus" IS the VNDB name for クルックー. It was already correct. |
| Removed leading spaces / changed spacing in translation lines | User: "I asked you to correct the translation, not to reformat lines." / "why are you butchering spaces?" |
| Fixed pronoun without consulting this file | Led to wrong Galtia fix. |
| Inferred character gender from translation context | This file is the source of truth — never learn genders from the text. |
| Rewrote a two-line split into unnatural English | User: "don't butcher the lines." |
| Did not read this file after context compaction | No excuse for skipping mandatory startup reads. |
| Described edits by what changed, not why | User: "don't comment on what you do, comment why you do that." |
| Split a line leaving second line without a subject | English needs a subject; result was grammatically broken. |
| Added movement/action not in the Japanese | マリスは書類が詰まった引き出しから says nothing about going anywhere. Only translate what is in the source. |
| Changed "Jiphteria" → "Jiphtheria" | "Jiphtheria" is wrong; correct is "Diphteria" per mistranslated_names.json. |
| Used git / grep to investigate past changes | User: "don't fucking use ANY software". |
| Rewrote whole file using PowerShell Set-Content | Corrupted file encoding. Only the Edit tool is permitted. |
| Treated マジック as the character "Magic the Gandhi" | マジック is the Japanese loanword for the concept "magic". |
| Did not write user instructions into this file immediately | Instructions got lost. Must be recorded before continuing any edits. |
| Omitted closing curly quote in Edit tool old_string | Dropped the `"` from dialogue lines, corrupting the file. |
| Did not re-read user messages after compaction | Compaction summary missed specific corrections. |
| Removed translator's notes in brackets | User: "don't remove such notes, they have value." |
| Bundled multiple change explanations into one sentence | User: "leave the explanation of the change for each individual change line." |
| Confused ヴィッチ (Vitch) with ビッチ (bitch) | ヴ = V, ビ = B. Also introduced wrong `---` instead of `...`. |
| Did not validate JSON after editing | Edits can silently corrupt JSON structure. |
| Challenged phrasing choices in translations | User: "fix UNAMBIGUOUS LOGICAL MISTAKES, not challenge vaguity of phrasing choices." |
| Did systematic replace_all name-spelling sweeps | Pronoun check was not performed on those files as a result. |
| Claimed contextual review when files were only pattern-swept | Must guarantee every file was actually Read with context. |

---

## ⚠ Special Cases

| Character | Note |
|---|---|
| **Uesugi Kenshin** | Historical male — **FEMALE** in Rance universe. Biggest GPT error source. |
| **Lexington** | Referred to as **MALE** throughout — use **he/him/his** and **Lord Lexington**. |
| **Kesselring** | **MALE** for the vast majority of the story. Use **he/him/his** and **Lord Kesselring** throughout. A sex change occurs late but do not change pronouns unless you are certain the scene is post-change. |
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
| **Yutin Fulz** | Copandon's secretary — **Hermaphrodite** (wiki: "Sex Hermaphrodite"). Source JP consistently frames her as female (called ふたなり娘, "futanari girl"), and existing GPT translations use "she/her" throughout — use **she/her** to match established practice and source characterization, not they/them. |
| **Amades Kakades** | User-confirmed **MALE**. |
| **Doss (Doessky)** | User-confirmed **MALE**. |
| **Samezan** | User-confirmed **FEMALE**. |

---

## Master Alphabetical List

| Character | Japanese | Gender | Game(s) |
|---|---|---|---|
| 3G | 3G | Male | RX |
| Abert Safety | アベルト・セフティ | Male | RQ |
| Aegis Kalar | イージス・カラー | Female | RX |
| Agireda | アギレダ | Female | RX |
| Aizel | アイゼル | Male | RVI |
| Akashi Kazemaru | 明石 風丸 | Male | SR |
| Aki Del | アキ・デル | Female | RVI |
| Alefgard | アレフガルド | Male | RX |
| Alex Valse | アレックス・ヴァルス | Male | RVI RX |
| Alexander | アレキサンダー | Male | RIII RX |
| Alfra Ray | アルフラ・レイ | Female | RQ |
| Alicia | アリシア | Female | RI R01 |
| Alkanese Rize | アルカネーゼ・ライズ | Female | RX |
| Am Yisael | アム・イスエル | Female | RX |
| Amades Kakades | アマデス・カカデス | Male | RX |
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
| Bafamoon, King of the Naked Tribe | 裸族王バファムーン | Male | RX |
| Barres Province | バレス・プロヴァンス | Male | RIII RX |
| Bashou Matio |  | Male | SR |
| Battling Centers | バッティング・センターズ | Male | RX |
| Bernard Seramite | バーナード・セラミテ | Male | RX |
| Bintan Destra | ビンタン・デストラー | Male | RIII |
| Bird Lithfie | バード・リスフィ | Male | RQ RX |
| Biscuitta Berns / Biscuitta Burns | ビスケッタ・ベルンズ | Female | RX |
| Bitch Golch | ビッチ・ゴルチ | Male | RQ |
| Black Swan | ブラックスワン | Female | RIX |
| Bobza Flanders | ボブザ・フランダース | Male | RQ |
| Borchini | ボルチーニ | Male | RX |
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
| Cynthia | シンシア | Female | RIII |
| Daidouji Komatsu | 大道寺 小松 | Female | SR |
| Daniel Safety | ダニエル・セフティ | Male | RQ |
| Dark Rance | ダークランス | Male | RVI RQ RX |
| Dark Wings (Freya faction) | — | RX |
| Dens Blau | デンズ・ブラウ | Male | RQ |
| Dio Calmis | ディオ・カルミス | Male | RQ |
| Diphteria (city mayor) | ジフテリア | Male | RX |
| Dogi Magi | ドギ・マギ | Male | RX |
| Dokuganryuu Masamune | 独眼流 政宗 | Male | SR RX |
| Dolhan Cricket | ドルハン・クリケット | Male | RQ |
| Don Doessky | ドン・ドエススキー | Male | RX |
| Doss | ドッス | Male | RX |
| El | エール | Male | RX |
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
| Galban | ガルバン | Female | RX |
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
| Hectomillibar Chizu | ヘクトミリバール・千津 | Female | RX |
| Heidi Pankrau | ハイジ・パンクラウ | Female | RX |
| Henderson Dauntless | ヘンダーソン・ドーントレス | Male | RQ |
| Hibachi | 火鉢 | Female | SR |
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
| Jhahlckas | ジャハルッカス | Male | RX |
| Jaro Jasrack | ジャロ・ジャスラック | Male | R5D |
| Jean Gangvang II | ジャン・ギャンバン二世 | Male | RQ |
| Jericho Colon | イェリコ・コロン | Female | RQ |
| Johnny | じょにぃ | Male | R5D |
| Julia Lindum | ジュリア・リンダム | Female | RX |
| Kabachahn the Lightning | カバッハーン・ザ・ライトニング | Male | RX |
| Kana Seihajuu Oosaka | カーナ・セイハジュウ・オオサカ | Female | SR |
| Cantel | キャンテル | Male | RX |
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
| Kiratouki | キラトーキ | Male | RX |
| Kisara Copley | キサラ・コプリ | Female | RQ |
| Kite | カイト | Male | RQ |
| Klean Bew | クリン・ビゥ | Female | RX |
| Kobayakawa Chinu | 小早川 ちぬ | Female | SR RX |
| Kojuurou | 小十郎 | Male | RX |
| Kola (Cola) | コーラ | Male | RX |
| Kousaka Yoshikage | 高坂 義風 | Male | SR |
| Koushuuin Hazuki | 甲州院 葉月 | Female | SR |
| Krutche Muffin | クルーチェ・マフィン | Female | RX |
| Kurobe | 黒部 | Male | SR RX |
| Kurohime | 黒姫 | Female | SR |
| Kurusu Miki | 来水 美樹 | Female | SR RX |
| La Hawzel | ラ・ハウゼル | Female | RX |
| La Seizel | ラ・サイゼル | Female | RX |
| La Vaswald | ラ・バスワルド | Female | RX |
| Lark Pikespeak | ラーク・パイクスピーク | Male | RQ |
| Lassie | ラッシー | Female | RX |
| Launea |  | ? | RX |
| Lei | レイ | Male | RX |
| Leila Grecni | レイラ・グレクニー | Female | R01 RX |
| Lelikov Helman | レリコフ・ヘルマン | Female | RX |
| Lelyukov Berkov | レリューコフ・バーコフ | Male | RIX |
| LeMay | ルメイ | Male | RX |
| Leopard Maara | レオパルド マーラ | Female | SR |
| Lexington | **Male** | RX |
| Lia Parapara Leazas | リア・パラパラ・リーザス | Female | R01 RX |
| Lil Avenger | 復讐ちゃん | Female | RQ |
| Lola Indus | ローラ・インダス | Female | RQ |
| Louis Kittwac | ルイス・キートワック | Male | RIV |
| Lucy Julietta | ルーシー・ジュリエッタ | Female | RX |
| Magic the Gandhi | マジック・ザ・ガンジー | Female | RVI RX |
| Mai | マイ | Female | SR |
| Maitrea Meishin | マイトレイア・メイシアン | Male | RIII |
| Makibano Meg | 牧場野 メグ | Female | SR |
| Makutsudou Nobuhiko | 魔窟堂 野武彦 | Male | SR |
| Maria Custard | マリア・カスタード | Female | RIII RX |
| Maris Amaryllis | マリス・アマリリス | Female | RX |
| Martina Curry | マルチナ・カレー | Female | RX |
| Mary Ann | メアリー・アン | Female | RX |
| Masou Shizuka / Shizuka Masou | 魔想 志津香 | Female | RIII RX |
| Masuzoe | ますぞゑ | Male | RX |
| Matilda Mateuri | マチルダ・マテウリ | Female | SR |
| Medusa | メディウサ | Female | RVI RX |
| Megadeath Moromi | メガデス・モロミ | Female | SR RX |
| Megaforce Horus | メガフォース・ホルス | Male | RX |
| Megas Horus | メガッス・ホルス | Male | RX |
| Megawas Horus | メガワス・ホルス | Male | RX |
| Mekill Depa L'Zile | ミーキル・デパ・ラジール | Female | RQ |
| Melfeis Promenade | メルフェイス・プロムナード | Female | RX |
| Menad Shisei | メナド・シセイ | Female | R01 RX |
| Merci Archa | メルシィ・アーチャ | Male | RQ |
| Mercy Julietta | マーシー・ジュリエッタ | Female | RX |
| Merim Tser | メリム・ツェール | Female | RX |
| Mi Lordring | ミ・ロードリング | Male | RX |
| Mikan | ミカン | Female | RX |
| Mill Yorks / Milli Yorks | ミル・ヨークス | Female | RIII RX |
| Millie Lincle | ミリー・リンクル | Female | RQ |
| Mineva Margaret | ミネバ・マーガレット | Female | RIX RX |
| Miracle Tou / Miracle Tor | ミラクル・トー | Female | RX |
| Mix | ミックス | Female | RX |
| Modern Kalar | モダン・カラー | Female | RX |
| Moganda | モガンダ | Male | RQ |
| Morita Ai | 森田 愛 | Female | SR |
| Mouri Motonari | 毛利 元就 | Male | SR RX |
| Mouri Teru | 毛利 てる | Female | SR RX |
| Murala | ムララ | Male | RQ |
| Mysteria Tou | ミステリア・トー | Female | RX |
| Nagata-kun | 長田君 | Male | RX |
| Nagi su Ragarl | ナギ・ス・ラガール | Female | RIII RX |
| Nanjou Ran | 南条 蘭 | Female | SR |
| Naoe Ai | 直江 愛 | Female | SR RX |
| Natori | 名取 | Female | SR |
| Nay Wrong | ネイ ヲロング | Female | RQ |
| Necai Sys | ネカイ・シス | Female | R5D |
| Nelson Server | ネルソン・サーバー | Male | RX |
| Neplacus | ネプラカス | Male | RX |
| Nero Chapet VII | ネロ・チャペット7世 | Male | RIII |
| Nikkou / Holy Katana Nikkou | 日光 | Female | SR RX |
| Nimitz Leak | ニミッツ リーク | Female | RX |
| Noah Sailing | ノア・セーリング | Female | RX |
| Nogiku | 野菊 | Female | SR RX |
| Noir | ノワール | Female | SR RX |
| Nopperabo |  | Female | SR |
| Nos | ノス | Male | RQ |
| Nunuhara Cabbage | ヌヌハラ・キャベツ | Female | RX |
| Oama Motohide | オアマ・モトヒーデ | Male | SR |
| Oda Kou | 織田 香 | Female | SR RX |
| Oda Nobunaga | 織田 信長 | Male | SR |
| Ogawa Kentarou | 小川 健太郎 | Male | SR RX |
| Ogier Lott Stein | オーギル・ロット・シュタイン | Male | RQ |
| Okita Nozomi | 沖田 のぞみ | Female | SR |
| Omachi | お町 | Female | SR RX |
| Onoha Mespos | オノハ・メスポス | Female | RX |
| Orime | 折女 | Female | SR RX |
| Oluore the 3rd | オルオレ・ザ・サード | Male | RX |
| Ouka Toki | 凰火 朱鷺 | Female | SR |
| Pamela Helman | パメラ・ヘルマン | Female | RIII RIX |
| Papaya Server | パパイア・サーバー | Female | RX |
| Papdimus Scirsabun (Papademas Shirusven) | — | Male | RX |
| Parsley Rig Zeth | パセリ・リグ・ゼス | Female | RX |
| Pastel Kalar | パステル・カラー | Female | RX |
| Patricia Bacon |  | Female | RX |
| Patton Misnarge / Patton Helman | パットン・ミスナルジ | Male | RIII RIX RX |
| Peruelé Kalette | ペルエレ・カレット | Female | RX |
| Pervert Mouse | 変態ネズミ | Male | RQ |
| Pespo Tontone | ペスポ・トントーネ | Male | RX |
| Pi-R | パイアール | Male | RX |
| Pigu Geliciam | ピグ・ギリシアム | Female | RX |
| Pitten Chao | ピッテン・チャオ | Male | RX |
| Pizarro | ピサロ | Male | RX |
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
| Sakamoto Ryouma | 坂本 龍馬 | Female | SR |
| Sakura Kalar | サクラ・カラー | Female | RX |
| Samar Happiness | サマール・ハッピネス | Male | RQ |
| Samezan |  | Female | RX |
| Samson Maximov | サムソン・マキシモフ | Male | RIX |
| Sanada Tourin | 真田 透琳 | Male | RX |
| Sanakia Drelshkaf | サーナキア・ドレルシュカフ | Female | RQ RX |
| Satella | サテラ | Female | RVI RX |
| Saya Friday | サヤ・フライディ | Female | RIII |
| Seigan | 性眼 | Male | SR |
| Sel Catchgolf | セル・カーチゴルフ | Female | RX |
| Senhime / Tokugawa Sen | 徳川千 | Female | SR RX |
| Sepia Landstarr | セピア・ランドスター | Male | RQ |
| Serachrolas | セラクロラス | Female | RX |
| Seyadatara | セヤダタラ | Female | RQ |
| Shariela Aries | シャリエラ・アリエス | Female | RX |
| Sheila Helman | シーラ・ヘルマン | Female | RIX RX |
| Shibata Katsuie | 柴田 勝家 | Male | SR |
| Shichisei | 七星 | Male | SR |
| Shimazu Yoshihisa | 島津 ヨシヒサ | Male | SR |
| Sieg | ジーク | Male | RVI |
| Silbarrel Silbarella | シルバレル・シルバレラ | Female | RX |
| Silky Littleraisin | シルキィ リトルレーズン | Female | RX |
| Sill Plain | シィル・プライン | Female | All |
| Sioux / Sioux Province | スー・プロヴァンス | Female | RX |
| Starlevel The Great | スターレベル様 | Male | RQ |
| Stessel Romanov | ステッセル・ロマノフ | Male | RIX |
| Stroganoff | ストロガノフ | Male | RX |
| Sushinu the Gandhi | スシヌ・ザ・ガンジー | Female | RX |
| Suzume | 鈴女 | Female | RQ RX |
| System Goddess | システム神 | Female | RX |
| Tadanobu | 忠信 | Male | RX |
| Takeda Shingen | 武田 信玄 | Male | SR |
| Takega Satsu | 岳画 殺 | Female | SR |
| Tama | タマ | Female | RX |
| Tamagushi Fuuka | 玉籤 風華 | Female | SR |
| Tamanegi | タマネギ | Male | SR |
| Tanegashima Shigehiko | 種子島 重彦 | Male | SR |
| Tenmabashi Alice | 天満橋 ありす | Female | SR |
| Thalgo |  | ? | RX |
| Thoma Lipton | トーマ・リプトン | Male | RIII RIX RX |
| Tilde Sharp | チルディ・シャープ | Female | RX |
| Tokugawa Ieyasu / Tokugawa Sen | 徳川 家康 | Male/Female | SR=Male; RX=Female (Sen) |
| Tolstoy Batou | トルストイ・バトー | Male | RIX |
| Tone | 深根 | Female | RX |
| Toppos | トッポス | Male | RX |
| Uesugi Katsuko | 上杉 勝子 | Female | SR RX |
| Uesugi Kenshin | **Female** | SR RX |
| Uesugi Torako | 上杉 虎子 | Female | SR RX |
| Unga Sayori | 運河 さより | Male | SR |
| Urza Pranaice | ウルザ・プラナアイス | Female | RVI RX |
| Uspira Shintou | ウスピラ・真冬 | Female | RX |
| Uzume | ウズメ | Female | RX |
| Varen | ファーレン | Female | RX |
| Vivid Kalar | ビビッド・カラー | Female | RX |
| Warg | ワーグ | Female | RX |
| Wayoso Benville | ワヨソ・ベンビール | Female | RQ |
| Wichita Skate | ウィチタ・スケート | Female | RX |
| Willis Fujisaki | ウィリス・藤崎 | Female | RX |
| Wrench Luncheon | レンチ・ランチョン | Female | RQ |
| Wuu | ウー | Male | SR |
| Yamada Chizuko / Chizuko Yamada | 山田 千鶴子 | Female | RVI RX |
| Yamamoto Isoroku | 山本 五十六 | Female | SR RX |
| Yamamoto Rangi | 山本 乱義 | Male | RX |
| Yamanaka Kojika | 山中 子鹿 | Female | SR |
| Yamisagi / Dark Heron | 闇鷺 | Female | RX |
| Yosif | よーぜふ | Male | RX |
| Yoshikawa Kyouko | 芳川 今日子 | Female | SR |
| Yoshikawa Machiko | 芳川 真知子 | Female | SR |
| Youko | 洋子 | Female | SR |
| Yuki Del | ユキ・デル | Female | RIV |
| Yukichi | 諭吉 | Male | RX |
| Yulang Mirage | ユラン・ミラージユ | Female | RQ |
| Yutin Fulz | ユーティン・フルズ | Hermaphrodite | RX |
| Yuzuhara Yuzumi | 柚原 柚美 | Female | SR RX |
| Yvette Cheria | イベット・チェリア | Female | RQ |
| Zance (Zans/Zence) | ザンス | Male | RX |
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

**LAST STOPPED: 2026-07-20. Resume from `gpt_outputs/166410_166470.json`.**

- [x] Build character gender reference
- [ ] Scan gpt_outputs/ for gender errors and fix (4805 total files)
  - **~3166 files sequentially reviewed** (up to 166470_166530.json — NOT inclusive, stop here)
  - **Next file to read: `gpt_outputs/166410_166470.json`** (was mid-read, not yet edited)
  - Within that file, lines 166380 and 166382 have Kanami using "her/she" for Lexington — must be fixed to "him/he" (Lexington = Male)
  - Previous sessions covered 000000–158880 (see commit history for details)
  - This session covered 158880–166410 sequentially, plus bulk honorific fixes (see below)

  **BULK FIXES APPLIED this session (NOT sequential — may have missed pronoun errors in swept files):**
  - Lord Hawzel → Lady Hawzel (all gpt_outputs/)
  - Lord Seizel → Lady Seizel (all gpt_outputs/)
  - Lord Hornet → Lady Hornet (all gpt_outputs/)
  - Lord Kenshin → Lady Kenshin (15 files, 123xxx–253xxx range)
  - Lord Kaybwan/Kaybnyan → Lady (19+ files, 135xxx–248xxx range)
  - Lord Reset → Lady Reset (10 files, 112xxx–229xxx range)
  - Lord Maris → Lady Maris (2 files)
  - Lord Lia → Lady Lia (3 files)
  - Lord Urza → Lady Urza (1 file)
  - Lord Warg → Lady Warg (3 files)
  - Lord Kiku → Lady Kiku (2 files)
  - Lord Rizna → Lady Rizna (1 file)
  - Lord Kiratoki → Lady Kiratoki (1 file)
  - Lord Satella → Lady Satella (1 file)
  - Lord Gandhi → reverted back to Lord Gandhi (see GANDHI NOTE below)
  - Lord Lexington → Lord Lexington (kept as male throughout, see LEXINGTON NOTE below)

  **IMPORTANT NOTES:**
  - **GANDHI**: Two characters share the surname Gandhi: Magic the Gandhi (Female) and Ragnarokarc Super Gandhi (Male). Both are rulers of Zeth. **CANNOT do bulk replace.** Must read each file in context to identify which Gandhi is present before changing any honorific.
  - **LEXINGTON**: User explicitly confirmed Lexington must be referred to as **MALE** throughout (he/him/his, Lord Lexington), even though the in-game entity is Nimitz (female human) impersonating him. Do not change to she/her.
  - Files swept with bulk replace may still have individual pronoun errors — the sequential review will catch these when reached.
  - Files 158880–166410 were both sequentially reviewed AND had bulk fixes. The sequential review is the authoritative pass.

  **Key early fixes (sessions before this one):**
  - Lucy (7038-39), Arcy (7242), Arlcoate (7823), Galtia (7886), Lei (8066-8082), Pi-R (8378, 8391), Willis (8913, 8922, 8931)
  - Reverted: Galtia "his belly"→"her belly" (wrong), "Crook"→"Krukk" (wrong), "Root Ari"→"Root Ali" (wrong)

- [ ] Scan gpt_outputs_v104/ for gender errors and fix (85 total files)
  - Reviewed key files; 003290_003350.json fixed (Lady Hawzel), 004550_004610.json fixed (Housel→Hawzel, Hornet guy→Hornet)
  - Remaining files likely need sequential review — low priority vs gpt_outputs/
