
import fs from "fs/promises";
import {replaceUnicode, wrapAt} from "./modules/TextNormalization.js";

const translations = `ランス\tRance
キースギルド所属 冒険者\tAdventurer belonging to the Keith Guild
剣２，冒険２\tSword 2, Adventure 2
強きをくじくが弱きもくじく 気に入らない者切捨て御免\tHe oppresses the strong and also the weak. Those he dislikes are cut down without pardon.
乱世の奸雄、治世の暴漢 全ての美女は俺様のもの\tA treacherous hero in chaotic times, a tyrant during peace; all beautiful women belong to me.
世界の女を手中にせんと、今日も今日とて東奔西走\tDetermined to have all the women in the world in his grasp, he runs around east and west today as always.
ご存知、鬼畜戦士こと本作の主人公！\tAs you know, this is the infamous brutal warrior, the protagonist of this work!
ランス\tRance
キースギルド所属 冒険者\tAdventurer belonging to the Keath Guild
剣２，冒険２\tSword 2, Adventure 2
ランス人生の目標\tRance's life goals
・各国の姫とセックス（←Complete！）\t- Have sex with the princesses of each country (←Complete!)
・シィル解凍（←Complete！）\t- Defrost Shiiru (←Complete!)
・全ての女の子モンスターとセックス（←NeW！）\t- Have sex with all the girl monsters (←New!)
・魔人ホーネットとセックス（←NeW！）\t- Have sex with the demon Hornet (←New!)
ランス\tRance
キースギルド所属 冒険者\tAdventurer belonging to the Keath Guild
剣２，冒険２\tSword 2, Adventure 2
かわいい女の子とエッチするためならば\tIf it's to have sex with cute girls,
ランスは、どんな手段もいとわない\tRance does not hesitate to use any means necessary.
時には地道に手数で勝負\tSometimes he relies steadily on sheer effort.
優秀な戦士は積み重ねる手間を惜しまないのだ\tAn excellent warrior never shirks the effort of accumulation.
ランス\tRance
キースギルド所属 冒険者\tAdventurer belonging to the Keath Guild
剣２，冒険２\tSword 2, Adventure 2
ランスアタックは本人も理屈がよく分かっていないが\tEven Rance himself doesn’t fully understand the reasoning behind the Rance Attack,
とにかくすごい威力を放つ必殺技だ！\tbut it’s an ultimate technique that releases tremendous power!
そしてランスの力がさらに鍛え上げられたとき\tAnd when Rance’s power is further honed,
究極の必殺技、鬼畜アタックが開眼するのだ！\tthe ultimate special move, the Brutal Attack, awakens!
理屈はもちろん分からない！\tOf course, the reasoning is unknown!
ランス\tRance
キースギルド所属 冒険者\tAdventurer belonging to the Keath Guild
剣２，冒険２\tSword 2, Adventure 2
この世界の生物には皆、才能限界として\tAll creatures in this world have a talent limit,
強くなれる上限が個々に定まっている\ta personal maximum level of strength they can achieve.
しかし何ゆえか、ランスにはこの才能限界が存在しない\tHowever, for some reason, Rance has no such talent limit.
この男は理論上、戦えば戦うほどに、際限なく\tThis man theoretically becomes infinitely stronger the more he fights,
無限に強くなっていくのだ！理論上は！\tlimitlessly growing stronger! At least in theory!
ランス\tRance
キースギルド所属 冒険者\tAdventurer belonging to the Keath Guild
剣２，冒険２\tSword 2, Adventure 2
もともと自分が気持ちよければそれで良いという\tOriginally, he only cared about his own pleasure,
セックスをしてきたが女の子を喜ばせることにも\tbut he has started to take enjoyment in making girls happy too.
楽しみを覚え始めたランス\tRance has begun to appreciate this pleasure.
今ではテクニックもずいぶんと上達しているぞ\tNowadays, his technique has improved considerably.
らんす\tRance
ぼうけんしゃ\tAdventurer
けん２、ぼうけん２\tSword 2, Adventure 2
つよきを くじくが よわきも くじく\tHe oppresses the strong and also the weak.
らんせの えいゆう ちせいの ぼうかん\tRance’s heroism and treachery of intellect.
ごぞんじ ほんさくの しゅじんこう\tThe well-known main character of this work.
ビスケッタ・ベルンズ\tBisketta Berns
ランス城メイド長\tHead Maid of Rance Castle
メイド２、格闘１、諜報１、統率１、経営１\tMaid 2, Fighting 1, Intelligence 1, Command 1, Management 1
メイドになるべくして生まれてきたと言われる\tSaid to have been born to become a maid,
メイドの中のメイド\tthe maid among maids.
ランス城における雑務のほとんどは、\tMost of the miscellaneous work at Rance Castle
彼女率いるメイド隊によって賄われている\tis handled by the maid squad under her command.
ビスケッタ・ベルンズ\tBisketta Berns
ランス城メイド長\tHead Maid of Rance Castle
メイド２、格闘１、諜報１、統率１、経営１\tMaid 2, Fighting 1, Intelligence 1, Leadership 1, Management 1
ビスケッタはこれまで、その完璧すぎる奉仕によって\tBisuketta, until now, through her overly perfect service,
多くのご主人様を自堕落の極みへ落し「呪われたメイド」\thas led many masters to the depths of decadence and was feared as the 'Cursed Maid'.
と恐れられるほどであった\tShe was feared to such an extent.
ランス城に来て、彼女の枠に収まらないランスの生き様に\tHaving come to Rance Castle, in Rance's way of life which cannot be confined within her framework,
真の主としての器を見出している\tshe has found the caliber of a true lord.
ビスケッタ・ベルンズ\tBisuketta Bernz
ランス城メイド長\tHead Maid of Rance Castle
メイド２、格闘１、諜報１、統率１、経営１\tMaid 2, Fighting 1, Intelligence 1, Leadership 1, Management 1
色事には疎く、ランスとのエッチが初体験\tUnfamiliar with matters of love, her first sexual experience was with Rance.
表情を作るのが苦手なビスケッタさんの色んな顔を\tWanting to see the various expressions of Bisuketta, who is not good at making faces,
見てやりたくて、彼女を抱くとき、\tRance always devises new ways each time he embraces her.
ランスは毎度工夫を凝らしている\t(Repeated for emphasis) Rance always comes up with ingenuity each time.
クリン・ビゥ\tKurin Byu
ランス城メイド\tMaid of Rance Castle
メイド１\tMaid 1
ビスケッタと同じ出張メイドサービス組織に属している\tBelongs to the same dispatched maid service organization as Bisuketta.
以前はリーザスでメイドをしていた\tPreviously worked as a maid in Leesas.
お掃除大好き\tLoves cleaning.
クリン・ビゥ\tKurin Byu
ランス城メイド\tMaid of Rance Castle
メイド１\tMaid 1
お掃除が大好きなのでチンコを掃除してくれと言ったら\tSince she loves cleaning, if you ask her to clean your penis,
ちゃんと綺麗にしてくれます\tshe will properly clean it.
黙っていると雑巾とかタワシとか使われるので\tIf you stay silent, she might use a rag or a scrubbing brush,
ちゃんと「口で」と言いましょう\tso be sure to specifically say 'with your mouth'.
ハイジ・パンクラウ\tHaiji Pankurau
ランス城メイド\tMaid of Rance Castle
白いパンを見ると盗まずにはいられないという\tShe has a troublesome fetish that she cannot resist stealing white bread when she sees it.
困った性癖を持つメイドさん\tA maid with a troubled fetish.
黒いパンはノーサンキュウ\tShe says no thank you to black bread.
今日も懲りずにパン食らう\tToday again, she shamelessly devours bread.
ハイジ・パンクラウ\tHaiji Pankurau
ランス城メイド\tMaid of Rance Castle
リーザスでパン盗みをランスに見つかり処女を奪われた\tShe was caught by Rance stealing bread in Leesas and lost her virginity.
ランス城でのパン泥棒はビスケッタにもバレてるし\tHer bread stealing at Rance Castle has been found out by Bisuketta as well,
ランスにも報告が届いているが\tand reports have reached Rance,
お仕置きセックスの口実にできるので放置されている\tbut it is left alone since it can be used as an excuse for punishment sex.
ロナ・ケスチナ\tRona Keschina
ランス城メイド\tMaid of Rance Castle
付与２\tEnchantment 2
生まれた時からレッドアイの虐待を受け続けてきた少女\tA girl who has been continuously abused by Red Eye since birth.
遠くない未来にある死の運命を悟り、\tRealizing the fate of death in the not-so-distant future,
怯えることしか出来なかった\tshe could do nothing but be afraid.
肌を焼かれ、肉を切られることのない平穏の日々に\tIn peaceful days without having her skin burned or flesh cut,
今はただ戸惑いを覚えるばかりである\tnow she only feels bewilderment.
ロナ・ケスチナ\tRona Keschina
ランス城メイド\tMaid of Rance Castle
付与２\tEnchantment 2
初潮があった時から子供を生むための性交を\tSince her first menstruation, she has been forced by Red Eye to have intercourse for bearing children.
レッドアイに強制されてきた\tShe was forced by Red Eye.
それは時としてレッドアイの娯楽を兼ねたものであり\tSometimes it doubled as Red Eye's entertainment,
すなわち彼女の苦痛と絶望を意味した\tmeaning her pain and despair.
もっともそれは彼女にとって日常の一幕に過ぎない\tNonetheless, it was just a scene of her daily life.
ロナ・ケスチナ\tRona Keschina
付与２\tEnchantment 2
魔人レッドアイの虐待を受け続けた地獄の記憶\tHellish memories of ongoing abuse by the demon Red Eye.
砕かれた心が癒える日は遠い\tThe day when her broken heart will heal is far away.
シィル・プライン\tShiel Pline
ランスの奴隷\tRance's Slave
魔法１，神魔法１\tMagic 1, Divine Magic 1
ランスの奴隷として数々の冒険を共にしてきた女の子\tA girl who has shared many adventures as Rance's slave.
ピンクのもこもこヘアーがトレードマーク\tHer trademark is fluffy pink hair.
掃除洗濯料理に内職、攻撃魔法にヒーリングと仕事は様々\tHer duties vary from cleaning, laundry, cooking, side jobs, offensive magic to healing.
約一年間、呪いで氷漬けになっていたが最近解放された\tShe was frozen by a curse for about a year but was recently freed.
シィル・プライン\tSill Plain
ランスの奴隷\tRance's Slave
魔法１，神魔法１\tMagic 1, Divine Magic 1
シィルはゼスの小さな村で生まれ、祖父は偉大な\tSill was born in a small village in Zeth; her grandfather was a great
魔法使いだった。祖父の教えでどんどんと魔法を覚える\tmage. She rapidly learned magic under her grandfather's guidance.
優秀な子だったが、さらなる高みを目指して、上級学校に\tShe was an excellent child, but aiming higher, she set out to attend a prestigious school.
入学する旅で親戚に騙され、紆余曲札の果て\tOn the journey to enroll, she was deceived by relatives and after many twists and turns,
人買いに奴隷として売られてしまった\tshe was sold as a slave to slave traders.
シィル・プライン\tSill Plain
ランスの奴隷\tRance's Slave
魔法１，神魔法１\tMagic 1, Divine Magic 1
魔法が使え、可愛く、しかも処女であったシィルは\tSill, who could use magic, was cute and also a virgin,
奴隷としても破格の大金で売られていた\twas sold for an extraordinary large sum even as a slave.
シィルを一目見たランスは、奮闘の末お金を稼ぎ、\tRance, having seen Sill at first sight, struggled to earn money,
彼女を買い上げた。自由都市には高額な奴隷税があるが\tand bought her. In the Free City, there is a high slave tax,
ランスは毎年律儀にこれを納めている\tbut Rance pays it diligently every year.
シィル・プライン\tSill Plain
ランスの奴隷\tRance's Slave
魔法１，神魔法１\tMagic 1, Divine Magic 1
シィルのもともとの才能限界は３０程度だったが\tSill's original talent limit was about 30,
何度もランスと抱かれてるうちに徐々に高まっていった\tbut it gradually increased as she was embraced by Rance many times.
ランスに抱かれた者は、何故か一時的に才能限界が\tThose embraced by Rance somehow experience a temporary rise in their talent cap,
上昇することがあるのだが、あまりにも頻繁に抱かれた\tbut since Sill was embraced so frequently,
シィルのそれは恒常的なものになったようだ\thers appears to have become permanent.
シィル・プライン\tSill Plain
ランスの奴隷\tRance's Slave
魔法１，神魔法１\tMagic 1, Divine Magic 1
数々の冒険でシィルも様々な危険に会ってきた\tSill has faced various dangers in many adventures.
誘拐されたこともあった。氷漬けになったこともあった\tShe was once kidnapped. She was also frozen in ice.
何があってもなんとかする。もう二度と手放さない\tNo matter what happens, she manages somehow. She will never be let go again.
・ランスとの子供は生んでいない\t・Has not borne any children with Rance.
・電卓迷宮：シィルフィード\t・Calculator Dungeon: Silfeed
SILL PLAIN\tSILL PLAIN
RANCE NO DOREI\tRANCE'S SLAVE
MAHO 1 KAMIMAHO 1\tMAGIC 1 DIVINE MAGIC 1
RANCE NO DOREI TOSITE\tAS RANCE'S SLAVE,
KAZUKAZU NO BOUKEN WO\tON COUNTLESS ADVENTURES,
TOMONI SHITEKITA ONNANOK\tSHE HAS BEEN TOGETHER WITH HIM,
PINKU NO MOKOMOKO HEA GA\tWITH FLUFFY PINK HAIR AS
TOREDO MAKU\tHER TRADEMARK.
シィル・プライン\tSill Plain
ランスの奴隷\tRance's Slave
魔法１，神魔法１\tMagic 1, Divine Magic 1
世界中の美女とセックスすることを人生の目標とする\tRance's life goal is to have sex with beautiful women all over the world.
ランスは、日々様々な女性をとっかえひっかえ抱いている\tHe sleeps with various women day after day.
その中でどれだけ繰り返し抱いても飽きないのが\tAmong them, the one he never gets tired of no matter how many times he embraces her is
シィルなのだと言う。\tsaid to be Sill.
あてな２号\tAtena No. 2
ランスのペット\tRance's Pet
弓１、ラーニング１\tBow 1, Learning 1
魔女フロストバインによって生み出された\tCreated by the witch Frostvine,
究極の人工生命体……のはずが材料にランスの精液が\tan ultimate artificial life form... but since Rance's semen was mixed into the materials,
混じったためか少々おつむが足りない\tshe is somewhat lacking in intelligence.
失敗作なんかじゃないのれす\tShe is not a failure.
あてな２号\tAtena No. 2
ランスのペット\tLance's Pet
弓１、ラーニング１\tBow 1, Learning 1
人工的に作られた肉体に偶発的に魂が入ることで完成した\tCompleted by a soul accidentally entering an artificially created body.
その体は成長することがないためレベルアップもしない\tBecause that body does not grow, it does not level up.
でもあてなはおりこうさんなので、敵の攻撃を覚えて\tBut Atena is smart, so she can remember enemy attacks,
真似っこすることができるのれす。とっても優秀れす\tand mimic them. She's very excellent.
あてな２号\tAtena No. 2
ランスのペット\tLance's Pet
弓１、ラーニング１\tBow 1, Learning 1
謎の力で人間となったあてな\tAtena who became human by a mysterious power.
頭に白カブトムシを付けている間は、あてなは人間となる\tWhile wearing a white rhinoceros beetle on her head, Atena becomes human.
だからといってとりたてて何かが変わるわけではない\tBut that doesn't particularly change anything.
あてな２号\tAtena No. 2
ランスのペット\tLance's Pet
弓１、ラーニング１\tBow 1, Learning 1
ランスにモニターレンタルということで預けられたが\tLance was entrusted with her as a monitor rental,
最初はセックス機能が無かったので後から付け足された\tAt first, she had no sexual functions, so they were added later.
ちょっとＳＭチックな変態プレイが好き\tShe likes a bit of S&M-style kinky play.
量産型あてな２号\tMass-produced Atena No. 2
ランス城あてな２号部隊\tLance Castle Atena No. 2 Unit
弓１、ラーニング１\tBow 1, Learning 1
あてな２号を元にフロストバインが作成した新型\tA new model created by Frostbine based on Atena No. 2.
基本的な性能はあてな２号と全く同じで頭もかしこい\tIts basic abilities are exactly the same as Atena No. 2, and it’s also smart.
しかし主を認識する能力が低いという致命的欠陥があり\tHowever, it has a fatal flaw: a low ability to recognize its master.
オリジナルのあてな２号の言うこと以外一切聞かない\tIt will not listen to anyone except the original Atena No. 2.
量産型あてな２号\tMass-produced Atena No. 2
ランス城あてな２号部隊\tLance Castle Atena No. 2 Unit
弓１、ラーニング１\tBow 1, Learning 1
乳首も性器も存在しないつんつるてん\tFlat-chested with neither nipples nor genitals.
オリジナルのあてな２号も最初はそうだった\tThe original Atena No. 2 was like that at first too.
フロストバイン\tFrostbine
魔女\tWitch
生命科学２、付与１\tLife Science 2, Enchantment 1
大昔から人工生命体の研究を行っていた割と凄い魔女\tA fairly amazing witch who has researched artificial life forms since ancient times.
あてな２号のデータをとり\tShe takes data from Atena No. 2,
さらなる人工生命体を作り出すべく日々研究している\tand continues daily research to create even more artificial life forms.
タマ\tTama
魔女の助手 接客\tWitch's Assistant, Customer Service
フロストバインのお手伝いをしている女の子\tThe girl who helps Frostbine.
ＣＩＴＹに開いたフロストバインのお店の\tAt Frostbine's shop opened in the CITY,
看板娘もしている\tshe also serves as the poster girl.
その正体は人間の姿をとった化け猫\tHer true identity is a bakeneko disguised as a human.
……化け猫って何？\t...What is a bakeneko?
タマ\tTama
魔女の助手 接客\tWitch's Assistant, Customer Service
定期的に発情期が訪れる\tShe regularly has mating seasons.
でも人間の彼氏がいるので安心\tBut she has a human boyfriend, so she’s safe.
……とも言えず、彼氏の不在時には我慢できずに\t...Or rather, when her boyfriend is absent, she can't hold back,
ランスに抱いてもらったこともある\tand has even let Lance hold her.
タマ\tTama
魔女の助手 接客\tWitch's Assistant, Customer Service
なんでも売りますフロストバイてン\tFrostbine sells anything.
下着だろうと服だろうとなんだって売ります\tWhether it's underwear, clothes, or anything, she sells it.
一張羅なので替えの服はありません\tSince that's her only outfit, she has no spare clothes.
ババアケチなんすよ\tThe old woman is stingy.
クレイン\tCrane
逃亡者\tFugitive
盗賊１、諜報２\tThief 1, Intelligence 2
「盗み聞きの魔女」と恐れられる元国際指名手配人\tA former internationally wanted person feared as the 'Eavesdropping Witch'.
本人の意思と無関係に、他人の重大な秘密を\tRegardless of her own will, she uncovers others' crucial secrets.
知ってしまうという不思議な体質の持ち主\tA person with a mysterious condition of 'knowing things'.
それゆえ様々な組織に命を狙われ、逃げ延びてきた\tBecause of that, various organizations have targeted their life, and they have managed to escape.
クレイン\tCrane
逃亡者\tFugitive
盗賊１、諜報２\tThief 1, Intelligence 2
とある研究所で手に入れたステルススーツという\tEquipped with a rare item called a stealth suit obtained from a certain laboratory.
レアアイテムを装備している。仕組みは謎だが\tThe mechanism is a mystery, but
透明になることができ、クレインの逃避行を助ける\tIt can turn transparent and assists Crane's escape journey.
ちなみにクレインというのは偽名で本名は謎\tBy the way, 'Crane' is an alias, and the real name is unknown.
クレイン\tCrane
逃亡者\tFugitive
盗賊１、諜報２\tThief 1, Intelligence 2
過去に拷問、陵辱を受けた経験があるため\tBecause of past experiences of torture and violation,
非処女だが、恋愛経験は皆無\tShe is not a virgin but has no romantic experience.
主要国の指名手配を解除してくれたランスには\tShe is very grateful to Rance who lifted the wanted orders from major countries,
とても感謝しているが恋愛はよく分からない\tbut she doesn't really understand romance.
ミラクル・トー\tMiracle Toe
暗黒魔女\tDark Witch
魔法３、魔法科学１、付与１\tMagic 3, Magical Science 1, Enchantment 1
桁外れの魔法の才能と知識を有する若き大魔法使い\tA young great mage possessing extraordinary magical talent and knowledge.
世界征服の野望を持ち、実現のため日々活動している\tShe has ambitions to conquer the world and works daily to realize that.
その一環として、才能を持つ１２人の男性-ﾄｩｴﾙﾌﾞﾅｲﾄ-を\tAs part of that goal, she aims to have twelve talented men - the Twelve Knights -
側近にすることを目標としている\tas her close aides.
ランスは１２人のリーダー「カオスマスター」（予定）\tRance is the planned leader of the twelve, the 'Chaos Master'.
ミラクル・トー\tMiracle Toe
暗黒魔女\tDark Witch
魔法３、魔法科学１、付与１\tMagic 3, Magical Science 1, Enchantment 1
伝説級の才能である魔法レベル３の力を持つミラクルは\tMiracle possesses legendary-level talent with magic level 3 powers,
魔力においてはアニスに及ばないものの、使用できる\tand although her magical power does not reach Anis's level, she can use
魔法の数においては歴史上でも並ぶ者は少ない\ta number of spells few can rival throughout history.
有言実行を宗とし、知識の吸収を絶やさない\tShe lives by the principle of keeping her promises and never stops absorbing knowledge.
勤勉な性格こそが彼女の最大の武器かもしれない\tHer diligent personality may be her greatest weapon.
ミラクル・トー\tMiracle Toe
暗黒魔女\tDark Witch
魔法３、魔法科学１、付与１\tMagic 3, Magical Science 1, Enchantment 1
トゥエルブナイト初期候補メンバー ピッテン 透琳\tInitial candidate members of the Twelve Knights: Pitten, Tourin,
ロレックス ガンジー 摩利支天 魔人アイゼル ラーク\tRolex, Gandhi, Marishiten, Demon Aizel, Lark,
信長 パットン 早雲 アリオス …そしてランス\tNobunaga, Patton, Soun, Arios ...and then Rance.
「カオスマスター」ランス以下それぞれにミラクル考案の\tEach, including 'Chaos Master' Rance, has unique names devised by Miracle,
独自ネームがあるが全て紹介するには字数が足りない\tbut there aren't enough characters here to introduce them all.
ミラクル・トー\tMiracle Toe
暗黒魔女\tDark Witch
魔法３、魔法科学１、付与１\tMagic 3, Magical Science 1, Enchantment 1
余が片腕と見初めた男と運命のつながりがあった\tIt would be no surprise if there was a fateful connection with the man I chose as my right hand.
としても何の驚きもありはしない。もし運命が無い\tIf fate does not exist,
というのならそれは運命の方が間違っているのだ\tthen it is fate that is mistaken.
・ランスとの子供は生んでいない\t- Has not borne a child with Rance.
・電卓迷宮：電磁パルスの杖\t- Calculator Dungeon: Electromagnetic Pulse Staff.
みらくる・とー\tMiracle Toe
まじょ\tWitch
まほう３、まほうかがく１、ふよ１\tMagic 3, Magical Science 1, Enchantment 1
ふはははははははははははははは！\tFuhahahahahahahahahahaha!
よくぞ よ のかーどをてにいれた！\tWell done on obtaining the Y card!
ほうびに よ のぶかとなる えいよをつかわそう\tAs a reward, I shall send you a hero who becomes Y's retainer.
はい\tYes
→いいえ\t→No
ミラクル・トー\tMiracle Toe
暗黒魔女\tDark Witch
魔法３、魔法科学１、付与１\tMagic 3, Magical Science 1, Enchantment 1
ランスには油断して何度かレイプされてしまったが、\tShe let her guard down and was raped by Rance several times,
彼女の中ではノーカウント\tIt's a no-count for her.
王としてやんちゃな僕の悪戯は寛大な心で許してやろう\tAs a king, I will generously forgive my mischievous pranks.
世界征服が成った暁には褒美に「処女」を上げても良い\tWhen world conquest is achieved, I may even reward you with a 'virgin'.
ミステリア・トー\tMysteria To.
闇の大魔女\tGreat Dark Witch.
魔法２、魔法科学１、付与１\tMagic 2, Magic Science 1, Enchantment 1.
トー家はヌー家、ウー家と並び闇の御三家と称される\tThe To family is called one of the three great dark families along with the Nu and U families.
闇魔法のエキスパートの家系。中でもミステリアは\tA lineage of dark magic experts. Among them, Mysteria is...
「南の賢者」と呼ばれホ・ラガと対比される実力者\tAn accomplished figure known as the 'Sage of the South,' contrasted with Ho Raga.
その前向きでエネルギッシュ過ぎる性格は\tHer overly positive and energetic personality...
孫であるミラクルの人格形成に大きな影響を与えた\tHad a great influence on the character formation of her grandson, Miracle.
カフェ・アートフル\tCafe Artful.
ランス城客人\tGuest of Rance Castle.
神魔法２\tDivine Magic 2.
１５００年前に活躍した伝説のパーティーの一員\tA member of a legendary party active 1,500 years ago.
自分の容姿へのコンプレックスから、\tDue to a complex about her own appearance,
偉大な神に永遠の美貌を望んだ結果\tShe wished to a great god for eternal beauty,
長きに渡ってその業に苦しみつづけていた\tAnd suffered from that fate for a long time.
時を経て、カオスとランスによって助けられる\tAfter time passed, she was saved by Chaos and Rance.
カフェ・アートフル\tCafe Artful.
ランス城客人\tGuest of Rance Castle.
神魔法２\tDivine Magic 2.
エターナルヒーローのヒーラー\tHealer of the Eternal Heroes.
その名に違わぬ強力な神魔法の使い手\tA powerful wielder of divine magic true to her name.
体力にはあまり自信がなく、当時の冒険では\tNot very confident in her stamina, in those adventures,
よくカオスに助けられては憎まれ口を叩かれていた\tShe was often saved by Chaos and scolded in return.
カフェ・アートフル\tCafe Artful.
ランス城客人\tGuest of Rance Castle.
神魔法２\tDivine Magic 2.
神の力で究極の美貌と永遠の命を手にしたカフェは\tCafe, who gained ultimate beauty and eternal life through the power of a god,
最初は望むがままの恋愛を満喫していたが、次第に\tInitially enjoyed love as she wished, but gradually...
男の欲望、女の嫉妬に翻弄され、\tShe was tossed about by men’s desires and women’s jealousy,
幾千の陵辱を受け苦しみ続けることになった\tEndured thousands of humiliations and continued to suffer.
色恋沙汰はもう懲り懲り\tShe's fed up with love affairs.
サーナキア・ドレルシュカフ\tSarnakia Doreushkaf.
ランス城騎士団長\tCaptain of Rance Castle Knights.
剣１、戦術０、統率０\tSword 1, Tactics 0, Leadership 0.
今は亡きダラスという国の戦士だったが、闘神都市\tShe was a warrior of the now-extinct country Dallas, but during the investigation of the Fighting God City,
の調査中に石化させられ、２２０年間冬眠状態だった\tShe was petrified and remained in a state of suspended animation for 220 years.
騎士に強い憧れが有り、騎士道精神を重んじている\tShe has a strong admiration for knights and values knightly spirit.
ランス城にて念願の騎士団長になれた\tShe finally became the knight captain she longed to be at Rance Castle.
サーナキア・ドレルシュカフ\tSarnakia Doreushkaf.
ランス城騎士団長\tCaptain of Rance Castle Knights.
剣１、戦術０、統率０\tSword 1, Tactics 0, Leadership 0.
剣士として、指揮官として、その実力は残念ながら凡庸\tUnfortunately, as a swordswoman and commander, her skills are mediocre.
しかし、努力と根性で突き進むその姿を慕う隊員は多い。\tHowever, many troops admire her for pushing forward with effort and guts.
蛮勇が過ぎて失敗をやらかしては、隊員がフォローする\tHer reckless bravery often causes failures, which the troops cover up.
というのがランス城騎士団のいつもの姿\tThis is the usual state of the Rance Castle Knight Corps.
サーナキア・ドレルシュカフ\tSarnakia Doreushkaf.
ランス城騎士団長\tCaptain of Rance Castle Knights.
剣１、戦術０、統率０\tSword 1, Tactics 0, Leadership 0.
無骨な鎧は石化する前から身につけていた思い出の品\tThe rugged armor is a memento she wore before being petrified.
強いこだわりがあるようで、他の鎧は身につけない\tShe seems strongly attached to it and refuses to wear other armor.
が、ランスによってセクシーな鎧を着させられ\tHowever, Rance makes her wear sexy armor,
街をねり歩く罰ゲームをたびたびさせられている\tAnd often forces her to walk through town as a punishment game.
サーナキア・ドレルシュカフ\tSarnakia Doreushkaf.
ランス城騎士団長\tCaptain of Rance Castle Knights.
剣１、統率０\tSword 1, Leadership 0.
自分が女であることを疎んじ女性扱いされるのを嫌がる\tShe despises being a woman and hates being treated as one.
ランス城に仕えてからも、ランスに勝負をしかけては\tEven after serving Rance Castle, she keeps challenging Rance to duels.
返り討ちに合いそのたびにセックスさせられている\tBeing counterattacked and made to have sex every time.
アルカネーゼ・ライズ\tArkanese Rise
ランスの舎弟 法王の護衛\tLance's subordinate and the Pope's bodyguard.
鎚１\tHammer 1
元盗賊団のボス。ランスと出会うまで\tFormer leader of a band of thieves. Until meeting Lance,
女扱いされない人生に荒みグレていた\tShe lived a rough life, never treated like a woman.
法王クルックーと友達になった縁から、彼女の\tAs a result of becoming friends with Pope Kurukku,
お忍びの冒険では護衛としてよくお供をしている\tShe often accompanies her as a bodyguard on secret adventures.
アルカネーゼ・ライズ\tArkanese Rise
ランスの舎弟 法王の護衛\tLance's subordinate and the Pope's bodyguard.
鎚１\tHammer 1
考えることは苦手で体を動かすほうが得意\tNot good at thinking; better at physical activity.
大柄な体格に見合ったパワフルな戦闘を繰り広げる\tEngages in powerful battles fitting her large physique.
ウジウジしているのが嫌いで、不正は許さず\tDislikes being indecisive and never tolerates injustice.
弱者を見捨てない男前な性格\tHas a manly character who never abandons the weak.
そういうわけで男よりも女の子からよくモテてしまう\tBecause of that, she is more popular with girls than with men.
アルカネーゼ・ライズ\tArkanese Rise
ランスの舎弟 法王の護衛\tLance's subordinate and the Pope's bodyguard.
鎚１\tHammer 1
好きになった男性に女と思えないと言われフられ続け\tContinually rejected by men she liked for not seeming like a woman.
ヤケになった酒の席で、女の子に処女を奪われている\tIn a drunken moment of despair, a girl took her virginity.
ランスだけは自分を女扱いしてくれる\tOnly Lance treats her like a woman.
でもエッチは恥ずかしいので少し苦手\tBut she's a little shy and not good at sex.
キバ子\tKibako
野生児\tWild Child
格闘１、神魔法１、調理１、狩り１\tFighting 1, Divine Magic 1, Cooking 1, Hunting 1
森の中、一人で生きてきた少女\tA girl who has lived alone in the forest.
完全なる野生児で言葉を話す事もできない\tA complete wild child who cannot speak.
キバ子というのも近隣住民が名づけたもの\tThe name Kibako was given by nearby residents.
まんが肉が大好き\tShe loves cartoon-style meat.
キバ子\tKibako
野生児\tWild Child
格闘１、神魔法１、調理１、狩り１\tFighting 1, Divine Magic 1, Cooking 1, Hunting 1
近隣住民の誰もキバ子を捕らえることは出来なかったが\tNone of the nearby residents could capture Kibako,
ランスが近寄ると、ランスのキバを見て一目惚れし\tBut when Lance approached, she fell in love at first sight with his fang.
自分から巣に連れて行って、交尾した\tShe took him to her nest and mated willingly.
現在はランス城屋上の庭園に生息している\tCurrently she lives in the rooftop garden of Lance Castle.
キャロリ・メイト\tCarolie Mate
ランス城看護婦\tNurse at Lance Castle.
盗賊１、薬剤１\tThief 1, Pharmacy 1
女の子のみが罹患する奇病ミドリ病に掛かり、\tContracted the rare illness 'Midori Disease' that affects only girls,
隔離施設に入れられていた少女\tShe was placed in an isolation facility.
ミドリ病の治療法が見つかった今は、\tNow that a cure for Midori Disease has been found,
ランス城の医務室で働いている\tShe works in the medical office of Lance Castle.
キャロリ・メイト\tCarolie Mate
ランス城看護婦\tNurse at Lance Castle.
盗賊１、薬剤１\tThief 1, Pharmacy 1
ミドリ病に対する世間の偏見は厳しく\tSociety's prejudice against Midori Disease is severe.
罹患者は皆嫌悪の目で見られ\tThose afflicted are all looked upon with disgust.
その境遇は例外なく悲惨なものだった。\tTheir situation was invariably tragic.
劣悪な環境の中で援助を続けてくれた魔人カイトだけが\tOnly the demon Kaito continued to assist in the harsh conditions,
ミドリ病患者たちの唯一の希望であった\tAnd was the sole hope for the Midori Disease patients.
キャロリ・メイト\tCarolie Mate
ランス城看護婦\tNurse at Lance Castle.
盗賊１、薬剤１\tThief 1, Pharmacy 1
ランスに無理やりレイプされたところ\tShe was forcibly raped by Lance,
なぜかミドリ病が治った\tAnd for some reason her Midori Disease was cured.
レイプされたのは最悪だけど、ランスさんには\tBeing raped was awful, but to Lance-san,
感謝しています。いや普通に最悪でしたけどね\tI am grateful. Well, it was pretty awful though.
アタゴ・マカット\tAtago Makkat
酒場の店長\tTavern Manager
料理１、踊り１\tCooking 1, Dancing 1
事あるごとにランスに振り回される酒場の店長\tThe tavern manager who gets tossed around by Rance at every opportunity.
昔は明るく人気者のウェイトレスだった\tShe used to be a cheerful and popular waitress.
酒場の人気メニューは葡萄ごはん。葡萄に含まれる\tThe tavern’s popular dish is grape rice. Contained in the grapes...
プラシーヴォ効果がお肌に潤いを与えます\tThe placebo effect gives your skin moisture.
アタゴ・マカット\tAtago Macat
酒場の店長\tTavern Manager
料理１、踊り１\tCooking 1, Dancing 1
最初は野盗を退治してくれたランスに感謝していたが\tAt first, she was grateful to Rance who defeated the bandits,
調子にのったランスに散々と酷い目にあわされた\tbut Rance, getting cocky, caused her a lot of terrible trouble.
舞姫ローションというアイテムを無理やり塗りたくられ\tHe forcibly covered her with an item called ‘Dancer’s Lotion’,
踊り子としての才能を開花させられてしまっている\tawakening her talent as a dancer.
カロリア・クリケット\tKaroria Cricket
ムシ使い\tInsect Tamer
ムシ使い１\tInsect Tamer 1
ゼスで迫害を受け全滅したムシ使いの最後の生き残り\tThe last surviving Insect Tamer who was persecuted and wiped out in Zeth.
自分のことを人から忌み嫌われた存在だと思い\tShe believes herself to be a despised existence among people,
小さな頃から一人で暮してきた\tand has lived alone since she was little.
人見知りで、とても優しい女の子。かなぶんが好き\tA shy and very kind girl. She likes beetles.
カロリア・クリケット\tKaroria Cricket
ムシ使い\tInsect Tamer
ムシ使い１\tInsect Tamer 1
カロリアは体内に四匹のムシを飼っている\tKaroria keeps four insects inside her body.
毒やん：毒の生成、および解毒を行う\tDoku-yan: Produces poison and detoxifies.
あげは：センサー機能を持ち、隠れた物を見つける\tAgeha: Has sensing abilities and finds hidden things.
じいさま：硬質化した外皮を広げてカロリアの身を守る\tJiisama: Spreads hardened outer shell to protect Karoria.
火の子：炎を吐く。いぶし銀のにくいやつ\tHinoko: Breathes fire. A cool, tough guy.
カロリア・クリケット\tKaroria Cricket
ムシ使い\tInsect Tamer
ムシ使い１\tInsect Tamer 1
ランスのことは大好き\tShe really likes Rance.
ランスがエッチしたいと言うならしてあげたい\tIf Rance says he wants to do naughty things, she wants to do them with him.
と思うが、体内のムシたちは何かと反対してくる\tShe thinks so, but the insects inside her often oppose it.
クルックー・モフス\tKulukuu Mofusu
ＡＬ教法王\tAL Church Pope
神魔法３、冒険１\tDivine Magic 3, Adventure 1
世界宗教ＡＬ教の最高権力者\tThe supreme authority of the world religion AL Church.
無表情で口数も少なく、何を考えているのか\tExpressionless and few words, it’s hard to tell what she’s thinking,
よくわからないが、ランスの望みは\tbut she generally grants Rance’s wishes.
だいたい言う事を聞く。\tShe usually listens to him.
貝の収集というランスと共通の趣味を持っている\tShe shares a hobby with Rance of collecting shells.
クルックー・モフス\tKulukuu Mofusu
ＡＬ教法王\tAL Church Pope
神魔法３、冒険１\tDivine Magic 3, Adventure 1
前法王の娘だったが、女ゆえ教会内での立場が弱く\tShe was the daughter of the previous Pope, but as a woman, her position in the church was weak.
部下もおらず、司教の任務を一人でこなしてきた\tHaving no subordinates, she handled the bishop’s duties alone.
そのため冒険者としても一流の腕前を持っている\tBecause of this, she is also a top-tier adventurer.
自分の欲望に乏しく、教義にのみ生きてきた\tShe has little personal desire and has lived solely by doctrine.
クルックー・モフス\tKulukuu Mofusu
ＡＬ教法王\tAL Church Pope
神魔法３、冒険１\tDivine Magic 3, Adventure 1
ＡＬ教の中枢で生まれ育ち、教義に殉じることだけが\tBorn and raised at the core of the AL Church, dedicated only to upholding doctrine,
己の存在意義であると理解していたクルックーは\tKulukuu understood this as her very reason for existence.
法王となって神の真実を知り、その意味を失った\tUpon becoming Pope and learning the truth of God, she lost that meaning.
彼女の脳裏に欲望のまま生きるという\tIn her mind lingers Rance’s words about living by desire,
ランスの言葉が残響する\techoing deeply.
くるっくー・もふす\tKulukuu Mofusu
ほうおう\tPope
かみまほう３、ぼうけん１\tDivine Magic 3, Adventure 1
ようこそ まよえるこひつじよ\tWelcome, wandering lamb.
ほんじつはきょうかいに どんなごようですか？\tWhat brings you to the church today?
なかまをいきかえらせてほしいのですか？むりです\tDo you want me to revive your companions? That's impossible.
クルックー・モフス\tKurukkuu Mofusu
ＡＬ教法王\tAL Church Pope
神魔法３、冒険１\tDivine Magic 3, Adventure 1
司教の時代から、男に、魅力的に見えなくする\tSince his time as a bishop, he has made himself unattractive to men.
「男除け指輪」を装備していたがランスに見つかって\tHe wore the 'Anti-Man Ring,' but Lance found it.
指輪をはずされ、処女を奪われた\tThe ring was taken off, and his virginity was taken.
以後もランス以外の前では指輪をつけておくように\tSince then, he has been told to wear the ring except in front of Lance.
言われ、それに従っている\tHe was told this and has been following it.
ミ・ロードリング\tMi Lordring
ＡＬ教司教\tAL Church Bishop
聖魔法１、工作１、神魔法０\tHoly Magic 1, Crafting 1, Divine Magic 0
誰よりも女神ＡＬＩＣＥを敬愛する信仰心篤き男\tA man with deep faith who reveres the goddess ALICE more than anyone else.
女神ＡＬＩＣＥに対する愚直なまでの忠誠心で\tThrough his naive loyalty to the goddess ALICE,
司教まで駆け上がった\the climbed up to become a bishop.
冒険中に出会った人間に勢いでヒーリングをかけ\tDuring adventures, he impulsively casts healing on people he meets,
そのまま走り去っていく\tthen runs away immediately.
ミ・ロードリング\tMi Lordring
ＡＬ教神官\tAL Church Priest
聖魔法１、工作１、神魔法０\tHoly Magic 1, Crafting 1, Divine Magic 0
数年前には豊かにあった毛髪だが\tA few years ago, he had abundant hair,
短期間で後退してきた\tbut it has receded rapidly over a short period.
彼なりに気苦労があるのかもしれない\tHe might have his own worries and troubles.
恋愛とか\tLike romance, perhaps.
ミ・ロードリング\tMi Lordring
ＡＬ教司祭\tAL Church Clergyman
聖魔法１、工作１、神魔法０\tHoly Magic 1, Crafting 1, Divine Magic 0
はーーーーーーーーーーーーーーーーーーーーーーーー\tHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
ーーーーーーーーーーーーーーーーーーーーーーーーー\t---------------------------------------
ーーーーーーーーーーーーーーーーーーーーーーーーー\t---------------------------------------
ーーーーーーーーーーーーーーーーーーーーーーーーー\t---------------------------------------
ーーーーーーーーーーーーーーーーーーーーーーーっ！\t-----------------------------------!
ミ・ロードリング\tMi Lordring
ＡＬ教司教\tAL Church Bishop
聖魔法１、工作１、神魔法０\tHoly Magic 1, Crafting 1, Divine Magic 0
ＡＬ教司教として、天与の才能はほぼ無し\tAs an AL Church bishop, he has almost no innate talent.
ヒーリングも実は低レベルのものしか\tHe can only actually use low-level healing spells.
使えないのだが、根性でカバーしている\tBut he covers for it with sheer determination.
１秒間に１６発のヒーリング\tHe casts sixteen healings per second.
サチコ・センターズ\tSachiko Centers
応用学生\tApplied Student
ガード０、パン１\tGuard 0, Pan 1
貧しいながらごく普通の家庭に生まれ\tBorn into a poor but very ordinary family,
ごく普通に育ってきたごく普通の女の子\tshe grew up as a perfectly normal girl.
ひょんなことからランスの冒険に巻き込まれ\tBy some chance, she got caught up in Lance's adventure.
無理やりガード職をやらされることになった\tShe was forcibly made to take the guard job.
サチコ・センターズ\tSachiko Centers
応用学生\tApplied Student
ガード０、パン１\tGuard 0, Pan 1
最初は無理やり付き合わされただけだったが\tAt first, she was forced to accompany him,
次第に冒険者の道にも魅力を感じはじめるサチコ\tbut gradually Sachiko began to find the path of an adventurer appealing.
ただの重荷だった呪盾「ヒロシくん」は\tThe cursed shield 'Hiroshi-kun,' which was just a burden,
今や欠かせない相棒。ありがとうヒロシくん\thas now become an indispensable partner. Thank you, Hiroshi-kun.
サチコ・センターズ\tSachiko Centers
応用学生\tApplied Student
ガード０、パン１\tGuard 0, Pan 1
旅行に来たＣＩＴＹで危ないところをランスに助けられ\tWhile visiting the city on a trip, Lance saved her from a dangerous situation.
お礼と称してセックスの約束をさせられてしまう\tShe was forced to promise sex as a form of thanks.
その後良い様に使われ長い冒険に付き合わされた挙句\tAfter that, she was used conveniently and forced to accompany a long adventure,
結局処女を奪われてしまった\tIn the end, she lost her virginity.
セル・カーチゴルフ\tSel Kachigolf
ＡＬ教神官\tAL Religion Priest
神魔法ＬＶ１\tDivine Magic LV1
レッドの教会を営む敬虔なＡＬ教信者。とにかく真面目な\tA devout AL religion believer who manages the Red Church. Extremely serious.
堅物で不道徳なランスにいつも説教をしている\tA stern person who always preaches to the immoral Rance.
正式なフルネームは「セル・セッテントマイ・\tHer full formal name is 'Sel Settentomai...
カリフラジリスティック・パイポノシューリンガン・\tCalifragilistic Paiponoshuringan...
カーチゴルフ」\tKachigolf.
セル・カーチゴルフ\tSel Kachigolf
ＡＬ教神官\tAL Religion Priest
神魔法ＬＶ１\tDivine Magic LV1
ランスとは短くない付き合いだが、そのお堅さから\tShe has known Rance for quite some time, but due to her strict nature,
未だ純潔を守り通している。ただし、お酒に弱く\tshe has still managed to keep her virginity. However, she is weak to alcohol,
酔った隙にランスにアナルセックスされたことがある\tand there was a time when Rance had anal sex with her while she was drunk.
また、カオスには何度かエロ触手で悪戯されたこも\tAlso, Chaos has played naughty tricks on her with erotic tentacles several times.
セル・カーチゴルフ\tSel Kachigolf
ＡＬ教神官\tAL Religion Priest
神魔法ＬＶ１\tDivine Magic LV1
も〜〜〜、なんれしゅか？ わらひがぁ酔ってる〜？\tMoo~ What is it? Am I drunk~?
ぜんっっっぜんっっっ！ 酔ってまひぇん！\tNoooooo waaay! I'm not drunk at all!
もぉ〜〜〜、ランスさんはいつもいつもいつも、\tMoo~ Rance-san always, always, always,
そうやってすぐに誤魔化そうとしてぇ〜〜〜！\ttries to cover it up right away like that~~~!
［ある日のセルさんの台詞より抜粋］\t[Excerpt from Sel-san's line on a certain day]
セル・カーチゴルフ\tSel Kachigolf
ＡＬ教神官\tAL Religion Priest
神魔法ＬＶ１\tDivine Magic LV1
彼女は身持ちの硬い女性であり、処女である\tShe is a chaste woman and a virgin.
しかし、危ない場面はこれまでに幾度もあり\tHowever, there have been many dangerous situations until now,
彼女が純潔を守り通せてきたのは\tand the reason she has kept her purity all along
運が良かっただけでは？ という噂も……\tmight just be because she was lucky? That is what some rumors say...
アム・イスエル\tAm-Isuel
完全汚染人間\tCompletely Contaminated Human
神魔法２、話術３\tDivine Magic 2, Oratory 3
先々代の法王。真実を知り失踪して神の反逆者となり\tThe pope before last. After learning the truth, she disappeared and became a rebel against God,
人類の救済を掲げて暗躍した\tsecretly acting under the banner of humanity's salvation.
その真の目的は、人の魂を汚染し輪廻から外すことで\tHer true goal was to contaminate human souls and remove them from the cycle of reincarnation,
少しずつ神の力を奪い、最終的には神を殺すこと\tgradually steal God's power and ultimately kill God.
趣味は二人羽織（下手）\tHer hobby is 'Futari-buori' (two-person kimono act), though she's bad at it.
アム・イスエル\tAm-Isuel
完全汚染人間\tCompletely Contaminated Human
神魔法２、話術３\tDivine Magic 2, Oratory 3
この世は地獄であり死後もまた地獄である\tThis world is hell, and after death, it is also hell.
神の存在ある限り地獄に終わりがないならば神を……\tIf hell has no end as long as God exists, then God must be...
救いを願う心に汚れがあろうはずもなく、\tThere can be no impurity in the heart that wishes for salvation,
彼女はおそらくＡＬ教の教えに最も忠実な神の信徒である\tshe is probably the most devout follower of the AL religion's teachings.
――ただし、その信仰は狂気とよく似ている\t—However, that faith closely resembles madness.
アム・イスエル\tAm-Isuel
完全汚染人間\tCompletely Contaminated Human
神魔法２、話術３\tDivine Magic 2, Oratory 3
法王を辞め、貴族にかくまわれた彼女は、自ら汚染人間\tHaving resigned as pope and sheltered by nobles, she has a past indulging in debauchery to become a contaminated human herself.
となる為に忌避してきた淫行に耽り続けた過去を持つ\tShe has a past filled with indulging in immoral acts she once shunned to become such.
乱交、獣姦、露出、媚薬、緊縛、ＳＭ……\tOrgy, bestiality, exhibitionism, aphrodisiacs, bondage, S&M...
協力者である貴族は純真な法王を汚す快楽に夢中になり、\tThe noble collaborators, obsessed with the pleasure of defiling the pure pope,
人間が想像しうるほぼ全ての性行為を体験させた\tmade her experience almost every kind of sex act imaginable by humans.
バッティング・センターズ\tBatting Centers
テンプルナイツリーダー\tTemple Knights Leader
ガード１、神魔法１\tGuard 1, Divine Magic 1
サチコの父。鉄壁の防御力を持つＡＬ教が誇るガード\tSachiko's father. A guard boasting impenetrable defense for the AL religion.
自分が騎士団長であることは家族に秘密にしていた\tHe kept it a secret from his family that he was the knight commander.
かなりの高位職だが清貧を宗とし給与のほとんどを\tAlthough it is a fairly high-ranking position, he adheres to poverty and donates most of his salary.
寄付に回しているため家は貧乏\tBecause of this, his household is poor.
ノア・ハコブネ\tNoah Hakobune
冒険者\tAdventurer
魔法１、聖魔法１、航海士２\tMagic 1, Holy Magic 1, Navigator 2
昔はラークという戦士と組んだ有名な冒険者だったが\tHe used to be a famous adventurer who partnered with a warrior named Lark,
魔人サテラと遭遇、敗北し引退した\tEncountered the demon Satella, was defeated, and retired.
引退後は一時家庭も持ったが、神の啓示を受け\tAfter retirement, he had a family for a time, but upon receiving a divine revelation,
再び冒険者となり、海へと旅立った\the became an adventurer again and set off to sea.
ノア・ハコブネ\tNoah Hakobune
冒険者\tAdventurer
魔法１、聖魔法１、航海士２\tMagic 1, Holy Magic 1, Navigator 2
サテラが作成したガーディアン「イシス」によって\tHe was deflowered by 'Isis,' a guardian created by Satella.
処女を奪われた\tHis virginity was taken.
魔物の精液と媚薬の混合液を射精する凶悪な擬似ペニス\tA vicious pseudo-penis that ejaculates a mixture of monster semen and aphrodisiac.
で貫かれたノアが心に負った物は小さくなかったようだ\tThe injury Noah suffered to his spirit from being pierced by it was significant.
日光\tNikko
聖刀\tHoly Sword
剣２\tSword 2
エターナルヒーローのメンバーの一人\tOne of the members of the Eternal Hero.
魔王殺しの刀、聖刀日光が人型となった状態\tThe magic king-slaying sword, Holy Sword Nikko, in human form.
魔人に故郷を焼かれ、激しい復讐心を持っているが\tHis hometown was burned by demons, and he holds a fierce grudge,
非情になりきれない性格が、美樹や健太郎への同情を\tbut his inability to be completely ruthless has bred sympathy towards Miki and Kentarou.
生み、なんとか彼らを救いたいと考えるようになった\tHe has come to want to somehow save them.
日光\tNikko
聖刀\tHoly Sword
剣２\tSword 2
聖刀日光は魔剣カオスとは異なり契約を交わした者しか\tHoly Sword Nikko differs from the magic sword Chaos in that only those who have made a contract can wield it.
振るうことが出来ない。そして、契約のためには\tFurthermore, to form the contract,
性交を行うことが必要となる\tsexual intercourse is necessary.
当然健太郎ともセックスをしているが、その記憶は\tOf course, she has also had sex with Kentarou, but the memories of it
日光によって消されている\thave been erased by Nikko.
ルート・アリ\tRoot Ali
ランス城客人\tGuest at Rance Castle
教育１\tEducation 1
ナイチサが支配する過酷な時代、貧家に生まれた彼女は\tIn a harsh era ruled by Naichisa, she was born into a poor family,
弟のパイアールと身を寄せ合って暮していた\tand lived closely with her younger brother, Paiar.
人にものを教えるのが得意。弟の教師役として、\tShe is good at teaching others. Acting as a tutor to her brother,
基礎的な教養を授けた\tshe provided him with basic education.
ルート・アリ\tRoot Ali
ランス城客人\tGuest at Rance Castle
教育１\tEducation 1
美しいルートは当時の男性の羨望の的であったが\tThe beautiful Root was the envy of men at that time,
常にパイアールが傍らに張り付き誰も寄せ付けなかった\tbut Paiar always stayed by her side, keeping others away.
パイアールの発明の才能が武力へと発揮されたのも、\tPaiar's talent for invention was also channeled into martial power,
最初は悪い虫から彼女を護るためであった\toriginally to protect her from unwanted suitors.
アームズ・アーク\tArms Ark
モンスターハンター\tMonster Hunter
槍２、冒険１\tSpear 2, Adventure 1
モンスターを狩り、レアアイテムを収集することに\tA lone adventurer who dedicates her life to hunting monsters and collecting rare items.
人生を捧げる孤高の冒険者\tShe is a solitary adventurer who has devoted her life to this.
パーティーを組まずソロでの冒険を好む\tShe prefers solo adventures without forming parties.
量より質、ボス系モンスターが好き。甘いものが苦手\tShe favors quality over quantity, likes boss-type monsters, and dislikes sweets.
アームズ・アーク\tArms Ark
モンスターハンター\tMonster Hunter
槍２、冒険１\tSpear 2, Adventure 1
とにかく希少価値が高い物、入手難度が高いものを\tShe loves to get things that are rare and difficult to obtain,
手に入れるのが大好き。\tno matter what it is.
今の興味は魔剣カオスと聖刀日光\tCurrently, her interest lies in the magic sword Chaos and the holy sword Nikko.
とはいえ人の物に手を出す悪趣味は無い。\tThat said, I have no bad taste to lay hands on someone else's belongings.
でも譲ってくれるのならもらってもいいんだぞ？\tBut if you’re willing to give it up, I wouldn’t mind taking it, you know?
アームズ・アーク\tArms Ark
モンスターハンター\tMonster Hunter
槍２、冒険１\tSpear 2, Adventure 1
ドラゴン狩りの最中にランスと出会い、ドサクサで\tDuring a dragon hunt, she met Rance and, in the confusion,
ランスに無理やり処女を奪われた\tRance forcibly took her virginity.
その後ランス城にしばらく留まる\tAfterwards, she stayed at Rance Castle for a while.
仲間との冒険も、ランスとのセックスもそんなに\tAdventure with companions and sex with Rance aren't too bad,
悪いものではないが、やっぱり一人で戦うのが良い\tbut after all, she prefers fighting alone.
シャリエラ\tShaliera
ホムンクルス\tHomunculus
踊り子２\tDancer 2
悪魔バンオペタがデスココの願いにもとづき\tThe demon Vanopeta, following Death Coco’s wish,
生み出したホムンクルスの一人\tcreated her as one of the homunculi.
その中で唯一、彼女のみが\tAmong them, only she
自我と魂を持つ「完成品」であった\twas the "completed product" possessing self-awareness and a soul.
シャリエラ\tShaliera
ホムンクルス\tHomunculus
踊り子２\tDancer 2
デスココはその他の多くの人形とは異なり\tUnlike many other dolls, Death Coco
シャリエラを閨に呼ぶ事は無かった\tnever called Shaliera to her bed.
メディウサやケイブリスもまた、\tMedusa and Cavebris also,
彼女を破壊しないよう自重したため、\trefrained from harming her,
肌を重ねたことがあるのはランスだけである\tso Rance is the only one who has slept with her.
クルーチェ・マフィン\tCruce Muffin
ランス城騎士団副団長\tDeputy Commander of Rance Castle Knights
剣１、統率１\tSword 1, Leadership 1
やる気が無く、いつもだるそうにしているが、\tShe lacks motivation and always looks sluggish,
その実力は団長サーナキアを大きく上回る\tbut her actual ability far surpasses Commander Sanakia.
のらりくらりとした態度で今日もゆる〜く生きてます\tWith a laid-back attitude, she’s living easy today as well.
クルーチェ・マフィン\tCruce Muffin
ランス城騎士団副団長\tDeputy Commander of Rance Castle Knights
剣１、統率１\tSword 1, Leadership 1
性に関してはとても緩い感性の持ち主で\tShe has a very lax attitude regarding sex,
ランス城に入る前から非処女\tand was not a virgin even before entering Rance Castle.
これでも一応相手は選ぶ\tStill, she does choose her partners to some extent.
相手がランス？ いっすよオッケー、気にしな〜い\tOpponent is Rance? Sure, that’s okay, she doesn’t mind~
リア・パラパラ・リーザス\tRia Palapala Liseas
リーザス女王\tQueen of Liseas
政治２、性技１\tPolitics 2, Sexual Skill 1
幼い頃から侍女マリスと共に醜い政争に勝ち残り\tFrom a young age, along with her maid Maris, she survived ugly political struggles,
最後には父である前王を隠居させて女王の座を勝ち取った\tultimately forcing her father, the former king, into retirement and winning the throne.
その後も政治、経済、外交と辣腕をふるいリーザス王国を\tAfterwards, she wielded strong influence in politics, economy, and diplomacy
最強国に押し上げた若く優秀な王\tand elevated the Liseas Kingdom to the strongest nation as a young and capable queen.
ライトニングドラゴンの幼体をペットにしている\tShe keeps a Lightning Dragon juvenile as a pet.
リア・パラパラ・リーザス\tRia Palapala Liseas
自称ランスの正妻 リーザス女王\tSelf-proclaimed legitimate wife of Rance, Queen of Liseas.
政治２、性技１\tPolitics 2, Sexual Skill 1
「ダーリン大好き！ リアもリーザスもダーリンの物よ」\tDarling, I love you! Ria and Liseas both belong to you, darling!
とある事件でランスに犯されて以来、ランスにゾッコン\tAfter being violated by Rance in a certain incident, she became utterly infatuated with him.
\t
・ランスとの間に第１子 ザンス を産んでいる\t・She bore Rance’s first child, Zansu.
・電卓迷宮：征服者の仮面\t・Calculator Labyrinth: Mask of the Conqueror
リア・パラパラ・リーザス\tRia Palapala Liseas
リーザス女王\tQueen of Liseas
政治２、性技１\tPolitics 2, Sexual Skill 1
幼少の頃、命を狙われていた事もあり性的に歪んでいた\tIn her childhood, having been targeted for assassination, she became sexually warped.
マリスとはレズ関係になり、また面白半分で若い娘達を\tShe entered a lesbian relationship with Maris and, partly for amusement,
掠ってきてはいじめ殺したりしていた\twould abduct young girls and bully them to death.
ランスに犯されお仕置きされ過去の事は反省して\tShe was violated and punished by Rance and has reflected on the past.
もうしないと約束している、が……たまにウズウズ\tShe has promised not to do it anymore, but... sometimes she feels restless.
リア・パラパラ・リーザス\tRia Parapara Rizas
リーザス女王\tQueen of Rizas
政治２、性技１\tPolitics 2, Sexual Technique 1
囚われの身であった頃、穴奴隷として調教され\tWhen she was captive, she was trained as a hole slave.
深刻なダメージと改造をその身に受ける\tShe suffered severe damage and modifications to her body.
体はいつか戻ったとしても心まで容易には戻らない\tEven if her body someday recovers, her heart will not easily return.
現在のリアはランスが誰かも忘れてしまった\tThe current Ria has even forgotten who Rance is.
マリス・アマリリス\tMaris Amaryllis
リアの専属侍女（実質＝宰相）\tRia's personal maid (in effect, prime minister)
政治１、執事１、神魔法２\tPolitics 1, Butler 1, Divine Magic 2
侍女の範疇を超えて他方面に活躍する才女\tA talented woman active beyond the scope of a maid.
１４歳の時にリア付きになってからずっと一途に仕え\tSince becoming attached to Ria at age 14, she has served her devotedly.
リアの為、リアが喜ぶためならどんな事でもする\tShe will do anything for Ria, anything that pleases her.
普段は毅然としているリアもこのマリスの前だけでは\tEven the usually resolute Ria becomes
甘えた性格になります\taffectionate and dependent only in front of this Maris.
マリス・アマリリス\tMaris Amaryllis
リアの専属侍女（実質＝宰相）\tRia's personal maid (in effect, prime minister)
政治１、執事１、神魔法２\tPolitics 1, Butler 1, Divine Magic 2
最初はごく普通の侍女、メイドだったが\tAt first, she was an ordinary maid.
政敵に命を狙われるリアを守る為に学習し知識を得た\tShe learned and acquired knowledge to protect Ria, whose life was threatened by political enemies.
特に神魔法に関しては司教クラスでも難しいと言われる\tEspecially regarding divine magic, it is said to be difficult even for bishop class.
神聖分解波すら習得しＡＬ関係者を驚愕させた\tShe even mastered the Holy Decomposition Wave, astonishing AL affiliates.
全てはリア様の為\tAll is for Lady Ria.
マリス・アマリリス\tMaris Amaryllis
リアの専属侍女（実質＝宰相）\tRia's personal maid (in effect, prime minister)
政治１、執事１、神魔法２、性技１\tPolitics 1, Butler 1, Divine Magic 2, Sexual Technique 1
宮廷闘争でリアを守る為に好きでもない男にも抱かれた\tIn court struggles, to protect Ria, she let herself be embraced by men she did not even like.
リアを守る為にランスにも抱かれた\tTo protect Ria, she even let Rance embrace her.
悲しむリアを慰める為にリアとレズ関係にもなった\tTo comfort the saddened Ria, she even entered a lesbian relationship with her.
リアを楽しませる為にＳＭや拷問の知識も覚えた\tTo entertain Ria, she also learned knowledge of S&M and torture.
この身は全てリア様の為にある\tHer entire being exists solely for Lady Ria.
アールコート・マリウス\tArlcourt Marius
リーザス第１軍（黒の軍）幕僚\tStaff officer of Rizas First Army (Black Army)
軍師２\tMilitary Strategist 2
子供の頃、好きな男の子にいじめられて以来\tSince being bullied by the boy she liked in childhood,
ネガティブ思考が身についてしまった\tshe developed a negative way of thinking.
実力も才能もあるのだが自分に自信が持てない女の子\tShe is a girl with both ability and talent, but lacks self-confidence.
アールコート・マリウス\tArlcourt Marius
リーザス第１軍（黒の軍）幕僚\tStaff officer of Rizas First Army (Black Army)
軍師２\tMilitary Strategist 2
貧乏な肉屋の家庭で育ったが、足長募金のおかげで\tShe was raised in a poor butcher's family, but thanks to sponsorship funding,
士官学校に入学、見事な成績を残し主席で卒業した\tshe entered the officer school and graduated top of her class with excellent results.
卒業後、リーザス軍に入るとその力は如何無く発揮され\tAfter graduation, upon entering the Rizas military, her abilities were fully demonstrated.
あっというまに第一軍の参謀にまで上り詰めた\tIn no time, she rose to become a staff officer of the First Army.
リーザスの次代を担う若き才能である\tShe is a young talent who will carry the next generation of Rizas.
アールコート・マリウス\tArlcourt Marius
リーザス第１軍（黒の軍）幕僚\tStaff officer of Rizas First Army (Black Army)
軍師２\tMilitary Strategist 2
足長募金は全額俺様が出資していたという言葉を信じ\tBelieving the words that I fully funded the sponsorship donation,
ランスを「おじさま」と慕っている\tshe adores Rance as her 'uncle'.
魔軍から救出された際のランスとのセックスが初体験\tHer first sexual experience was with Rance when rescued from the demon army.
だが、それ以前に、変態ポピンズに掴まって\tHowever, before that, she was caught by the pervert Popins,
機械でいたずらされたことがある\tand was violated with machines.
バレス・プロヴァンス\tBares Provence
リーザス軍総大将 第１軍（黒の軍）将軍\tGeneral of the Rizas Army, Commander of the First Army (Black Army)
剣１、統率２、軍師１、将棋０\tSword 1, Leadership 2, Military Strategist 1, Shogi 0
代々王家に仕えるリーザスを代表する将軍\tA general representing Rizas who has served the royal family for generations.
リーザス全軍を預かり、全軍人、全国民、そして\tHe commands the entire Rizas army, all soldiers, all citizens, and...
女王リアから篤い信頼を受ける熟練の名将である\tA seasoned and distinguished general who has earned the deep trust of Queen Ria.
最近ゴルフを始めた\tRecently started playing golf.
バレス・プロヴァンス\tBares Provence
リーザス軍総大将 第１軍（黒の軍）将軍\tGeneral-in-Chief of the Rias Army, Commander of the 1st Army (Black Army)
剣１、統率２、軍師１、将棋０\tSword 1, Leadership 2, Strategist 1, Shogi 0
リーザス全軍を指揮する総大将\tGeneral-in-Chief commanding the entire Rias army.
ランスとの出会いはパットンによるリーザス侵攻の折\tHe met Rance during Patton's invasion of Rias.
この時、強運と卑怯作戦で次々敵を撃破していくランスに\tAt that time, he recognized Rance's qualities as a hero as he defeated enemies one after another through strong luck and underhanded tactics.
英雄としての資質を見出している。\tHe saw in him the qualifications of a hero.
ランスからはボケ老人扱いされている。\tRance treats him like a senile old man.
ハウレーン・プロヴァンス\tHowleen Provence
リーザス第４軍（白の軍）副将\tDeputy Commander of the Rias 4th Army (White Army)
剣１、運転１\tSword 1, Driving 1
父であるバレスを尊敬し、彼に憧れ軍人となった\tRespects her father Bares and admired him, becoming a soldier herself.
険が強く、軍人のままでは嫁の貰い手が\tHer stern nature causes concern that she might not find a suitor as long as she remains a soldier.
いないのではないのかとバレスに心配されている\tBares worries that she might not get a bridegroom.
彼女はそれが不満で仕方ない\tShe is extremely dissatisfied with that.
ハウレーン・プロヴァンス\tHowleen Provence
リーザス第４軍（白の軍）副将\tDeputy Commander of the Rias 4th Army (White Army)
剣１、運転１\tSword 1, Driving 1
軍在籍中に付き合っていた彼氏がいたが今は別れている\tShe had a boyfriend during her military service but they have since broken up.
セックスは苦手、というよりとても弱く\tShe is not good at sex, or rather very weak.
行為中は我を忘れて夢中になってしまう\tDuring the act, she loses herself and becomes completely absorbed.
そんな自分が嫌で、男を作ることを拒絶してしまった\tHating herself for that, she has refused to make a boyfriend.
スー・プロヴァンス\tSue Provence
リーザス第１軍（黒の軍）小隊長\tSquad Leader of the Rias 1st Army (Black Army)
槌１、軍師１、将棋１\tHammer 1, Strategist 1, Shogi 1
まるいものの一種「ラプ」という生き物の集落で\tRaised in a settlement of creatures called 'Lap,' a kind of round-being.
育てられた少女。自分をラプと信じ人間を敵視していた\tA girl who was raised believing she was a Lap and viewed humans as enemies.
当時は完全なる野生児だったが、\tAt that time she was a complete wild child,
バレスの養子となり教育を受け立派に育った\tShe became Bares's adopted daughter, received education, and grew up admirably.
スー・プロヴァンス\tSue Provence
リーザス第１軍（黒の軍）小隊長\tSquad Leader of the Rias 1st Army (Black Army)
槌１、軍師１、将棋１\tHammer 1, Strategist 1, Shogi 1
野生児だった頃、ランスと「人間の勉強」と称して\tWhen she was a wild child, she frequently had sex with Rance under the guise of 'studying humans'.
何度もセックスしていた\tThey had sex many times.
今は常識もわきまえているので\tNow that she understands common sense,
女の子として、はしたないマネはいたしません！\tAs a girl, she will not behave indecently!
スー・プロヴァンス\tSue Provence
リーザス第１軍（黒の軍）小隊長\tSquad Leader of the Rias 1st Army (Black Army)
槌１、軍師１、将棋１\tHammer 1, Strategist 1, Shogi 1
理知に依らず、本能と閃きで戦ってきたあの頃の記憶\tMemories from when she fought relying not on intellect, but on instinct and intuition.
マルヤキ、ムシヤキ、ドビンムシ\tGrilled fish, grilled insect, Dobin bug
コルドバ・バーン\tCordoba Burn
リーザス第２軍（青の軍）将軍\tGeneral of the Rias 2nd Army (Blue Army)
剣１、鎚１、統率１、ガード１\tSword 1, Hammer 1, Leadership 1, Guard 1
リーザスの青い壁と言われる巨躯の将軍\tA giant general known as the Blue Wall of Rias.
将として武人として、堅牢堅固の防御力を誇りとし\tAs a commander and warrior, he prides himself on his solid and formidable defense.
数々の戦場で幾千幾万の矢刃に晒されようとも\tHaving been exposed to countless thousands of arrows and blades on many battlefields,
ただの一度も膝をついたことが無いと言われる\tHe is said to have never once gone down on his knees.
リック・アディスン\tRick Addison
リーザス第３軍（赤の軍）将軍\tGeneral of the Rias 3rd Army (Red Army)
剣２\tSword 2
赤い死神と各国から恐れられるリーザス最強の戦士\tKnown as the Red Grim Reaper, he is the strongest warrior in Rias feared by many countries.
その実力はランスもが認めている\tEven Rance acknowledges his ability.
実は怖がりで、お化けや、ダンジョンなど暗い所が苦手\tIn reality, he is cowardly and afraid of ghosts, dungeons, and dark places.
兜を外すと気弱な青年になる\tWhen he takes off his helmet, he becomes a timid young man.
リック・アディスン\tRick Addison
リーザス第３軍（赤の軍）将軍\tGeneral of the Rias 3rd Army (Red Army)
剣２\tSword 2
赤の軍はリーザスでも優秀な戦士のみ集めた精鋭の\tThe Red Army is an elite unit made up only of the most skilled warriors even within Lisas.
切り込み部隊である。常に先鋒を任される赤の軍の\tIt is a cutting-edge assault force. The Red Army is always assigned the vanguard.
さらにその最前で、リーザス軍２０万を背に帯びて\tAt the very front of that, wielding the retractable magic sword Bai Road with 200,000 Lisas troops behind them,
伸縮する魔法剣バイ・ロードを打ち振るい、\tswinging the expanding and contracting magic sword Bai Road,
赤い死神が戦場を切り裂く\tthe Red Reaper tears through the battlefield.
メナド・シセイ\tMenado Shisei
リーザス第３軍（赤の軍）副将\tLisas 3rd Army (Red Army) Vice Commander
剣１、裁縫１\tSword 1, Sewing 1
正義感が強い女の子で、人々を守るために軍に入った\tA girl with a strong sense of justice who joined the army to protect people.
リーザス城の門番から始まり、赤の軍に編入されると\tStarting as a gatekeeper at Lisas Castle, she was transferred to the Red Army,
みるみる武功を積み重ね、副将にまで駆け上がった\tquickly accumulating military achievements and rising to the rank of vice commander.
かなみとはプライベートでもお友達\tShe is also friends with Kanami in private.
メナド・シセイ\tMenado Shisei
リーザス第３軍（赤の軍）副将\tLisas 3rd Army (Red Army) Vice Commander
剣１、裁縫１\tSword 1, Sewing 1
リアが王として即位する戴冠式の日。王家と険悪関係に\tOn the day of Ria's coronation as king. Some Lisas nobles who had a hostile relationship with the royal family
あった一部のリーザス貴族がクーデータを起こした\tstarted a coup d'état.
メナドは情報を察知したかなみと協力してこれを阻止\tMenado, cooperating with Kanami who sensed the information, stopped it.
首謀者を討ち取る獅子奮迅の働きを見せた。\tShe showed lion-like fierce efforts by defeating the ringleader.
この武功によりメナドは赤の軍副将となった。\tDue to this military achievement, Menado became the vice commander of the Red Army.
メナド・シセイ\tMenado Shisei
リーザス第３軍（赤の軍）副将\tLisas 3rd Army (Red Army) Vice Commander
剣１、裁縫１\tSword 1, Sewing 1
門番時代にランスに出会い、抱かれている\tShe met Rance during her gatekeeper days and has been embraced by him.
女の子扱いしてくれるランスを好きになる。ちょろい\tShe comes to like Rance because he treats her like a girl. Easily swayed.
かなみから、ランスの悪評は聞いてきたが耳に入らない\tAlthough she has heard from Kanami about Rance's bad reputation, it doesn't get through to her.
ただ、リアの想い人だということが、つらい\tHowever, the fact that he is Ria's beloved is painful.
エクス・バンケット\tEx Banquette
リーザス第４軍（白の軍）将軍\tLisas 4th Army (White Army) General
剣１、軍師１\tSword 1, Strategist 1
リーザスが誇る一流の策士\tA top-notch strategist Lisas prides itself on.
神出鬼没の白の軍はリーザス軍のワイルドカード\tThe elusive White Army is Lisas Army's wild card.
変幻自在の用兵術で戦場を操る\tHe controls the battlefield with versatile tactics.
死別した妻を今も愛している\tStill loving his deceased wife.
キンケード・ブランブラ\tKinkade Blamblar
リーザス第２軍（青の軍）副将\tLisas 2nd Army (Blue Army) Vice Commander
統率１、軍師１、短剣１\tLeadership 1, Strategist 1, Dagger 1
優れた統率力を持つ将校だが\tAn officer with excellent leadership,
強いものには媚びへつらい、弱い者には尊大\the flatters the strong and is arrogant toward the weak.
優秀な才能と反比例した性格の持ち主\tHis personality inversely contradicts his outstanding talent.
おべっかとフェンシングが得意\tSkilled at flattery and fencing.
チルディ・シャープ\tTildi Sharp
リーザス親衛隊（金の軍）副隊長\tLisas Imperial Guard (Gold Army) Deputy Commander
短剣２、菓子作り２、学習１、統率１\tDagger 2, Confectionery 2, Learning 1, Leadership 1
文・武・美・礼あらゆる面で女性Ｎｏ１を目指している\tShe aims to be the No.1 woman in all aspects: culture, military, beauty, and etiquette.
上昇志向溢れる女の子\tA girl full of ambition.
真面目で優秀な子だがプライドが高く負けず嫌いで\tA serious and excellent girl, but proud and hates to lose.
すぐムキになってしまうところが玉に瑕\tHer tendency to get overly worked up is her only flaw.
チルディ・シャープ\tTildi Sharp
リーザス親衛隊（金の軍）副隊長\tLisas Imperial Guard (Gold Army) Deputy Commander
短剣２、菓子作り２、学習１、統率１\tDagger 2, Confectionery 2, Learning 1, Leadership 1
努力家で自分の力で手に入れたものに価値を感じる性格\tA hard worker who values what she earns through her own effort.
その反面、努力を人に見せることは嫌う見栄っ張り\tOn the other hand, she is vain and dislikes showing her effort to others.
だが、お菓子作りの才能は凄まじく、\tHowever, her talent for confectionery is astounding,
何の努力もなく達人級になってしまった\tbecoming a master level without any effort.
みんなそこばかり褒めるのでお菓子を作るのは嫌\tShe hates making sweets because everyone praises nothing but that.
チルディ・シャープ\tTildi Sharp
リーザス親衛隊副隊長\tLisas Imperial Guard Deputy Commander
短剣２、菓子作り２、学習１、統率１\tDagger 2, Confectionery 2, Learning 1, Leadership 1
Ｎｏ１女性にふさわしいエレガントな男性との恋を望んだ\tShe desires a romance with an elegant man worthy of the No.1 woman.
チルディだったが、自分の小指から伸びる赤い糸は\tIt was Chirdy, but the red thread extending from her little finger
ランスの小指へと繋がっていた。足の小指だった\twas connected to Lance's little finger. It was the little toe.
・ランスとの子供は無し\t- No children with Lance
・電卓迷宮：ムーンクァイ\t- Calculator Labyrinth: Moonquai
チルディ・シャープ\tChirdy Sharp
リーザス親衛隊（金の軍）副隊長\tRizas Royal Guard (Golden Army) Deputy Captain
短剣２、菓子作り２、学習１、統率１\tDagger 2, Confectionery 2, Learning 1, Leadership 1
己のエロテクの可能性に挑んだランスは女の子の\tLance, challenging the potential of his erotic techniques, tried training a girl’s
エロ調教にトライ。その相手にチルディを選んだ\terotic training. He chose Chirdy for that partner.
学習能力の高さが災いし、ランスの調教は\tHer high learning ability became a disadvantage, and Lance’s training
まんまと成功してしまい、哀れ、\tcompletely succeeded, pitifully,
チルディは頭を撫でられるだけで発情する体に……\tChirdy’s body became aroused just by having her head patted......
チルディ・シャープ\tChirdy Sharp
リーザス親衛隊（金の軍）副隊長\tRizas Royal Guard (Golden Army) Deputy Captain
短剣２、菓子作り２、学習１、統率１\tDagger 2, Confectionery 2, Learning 1, Leadership 1
今まで何人かの優秀な剣士とお付き合いしたことがある\tShe has dated several skilled swordsmen in the past.
彼らの技を吸収し、学ぶことがなくなると別れた\tAfter absorbing their skills and no longer having anything to learn, she parted ways.
その過程で一度だけ抱かれたことがある\tDuring that process, she was embraced only once.
ランスに抱かれたときは簡単に骨抜きに出来る、と\tWhen embraced by Lance, she thought she could be easily weakened,
思っていたが、さすがに男性経験が足りなかった\tbut as expected, she lacked enough experience with men.
レイラ・グレクニー\tLeyla Grecnie
リーザス親衛隊（金の軍）隊長\tRizas Royal Guard (Golden Army) Captain
剣１、料理０\tSword 1, Cooking 0
リーザス城と王の守護を任されるリーザス一の女剣士\tRizas' top female swordsman entrusted with protecting Rizas Castle and the king.
攻守共に優れたシバ流剣術の使い手\tA practitioner of Shiba style swordsmanship, excellent both offensively and defensively.
有望な後進が育っているがまだまだその座は譲らない\tPromising successors are growing, but she still does not give up her position.
レイラ・グレクニー\tLeyla Grecnie
リーザス親衛隊（金の軍）隊長\tRizas Royal Guard (Golden Army) Captain
剣１、料理０\tSword 1, Cooking 0
お酒は好きなのだがとても弱いので\tShe likes alcohol but is very weak at it,
普段は飲み過ぎないようにしている\tso she usually tries not to drink too much.
嫌なことがあるとついつい飲み過ぎてしまう\tWhen something unpleasant happens, she ends up drinking too much.
そんなときのレイラさんは、ヤバい\tLeyla at times like that is dangerous.
レイラ・グレクニー\tLeyla Grecnie
リーザス親衛隊（金の軍）隊長\tRizas Royal Guard (Golden Army) Captain
剣１、料理０\tSword 1, Cooking 0
自分より強い男にしか興味が無い。男性経験は\tShe is only interested in men stronger than herself. Her experience with men is
それなりにあり、ランスとも肌を重ねたことがある\tfairly extensive and she has been intimate with Lance.
ＨＬ戦争で共に戦って以来、リックを意識するようになり\tSince fighting together in the HL war, she began to be conscious of Rick,
そこから地道にアタックしつづけていた\tand has been steadily attempting to win him over since then.
ジュリア・リンダム\tJulia Lindam
リーザス親衛隊（金の軍）隊員\tRizas Royal Guard (Golden Army) Member
剣１\tSword 1
リーザスの名門貴族の出身。親のコネで親衛隊に入った\tFrom a prestigious Rizas noble family. Joined the royal guard through parental connections.
実力は皆無で部隊のお荷物だが\tShe has no actual skill and is a burden to the unit,
リアと仲良しで何かと重用されている\tbut she is close friends with Ria and is used often for various tasks.
ジュリア・リンダム\tJulia Lindam
リーザス親衛隊（金の軍）隊員\tRizas Royal Guard (Golden Army) Member
剣１\tSword 1
部隊のお荷物と言われるジュリアだが\tJulia is called the unit’s burden,
後輩も増えてきて、彼女なりに頑張っている様子\tbut with more juniors joining, it seems she is trying her best in her own way.
カードを名前順でソートしてレベルを比べてもらえば\tIf you sort the cards by name and compare their levels,
その努力ははっきりと見て取れるだろう\ther efforts will be clearly noticeable.
ジュリア・リンダム\tJulia Lindam
リーザス親衛隊（金の軍）隊員\tRizas Royal Guard (Golden Army) Member
剣２、ハニー２\tSword 2, Honey 2
ハニーキングの改造を受けてパワーアップしたジュリア\tJulia, powered up by modifications from Honey King,
なにやら様々なデータを改ざんすることで\tis said to have various data altered
内部的に、はにわ好みの数値になっているという\tso that internally, the values suit Haniwa’s preferences.
ジュリア・リンダム\tJulia Lindam
リーザス親衛隊（金の軍）隊員\tLeazas Royal Guard (Golden Army) Member
剣１\tSword 1
リアからランスへのプレゼントとして\tAs a present from Ria to Rance
闘神都市のランス捜索メンバーに参加\tParticipated as a member searching for Rance in the Fighting God City
このときランスに一度だけ抱かれたが、\tAlthough she was embraced by Rance just once at that time,
痛かったのでもうしたくない\tIt was painful, so she doesn’t want to do it again.
チャカ・カドミュウム\tChaka Cadmium
リーザス魔法軍（紫の軍）将軍\tGeneral of Leazas Magic Army (Purple Army)
魔法１、付与１\tMagic 1, Enchantment 1
魔女の呪いで身体がぬいぐるみと化した老人\tAn old man whose body was transformed into a stuffed toy by a witch's curse
孫のアスカの身体を使って行動する\tActs using the body of his grandson Asuka
リーザスきっての魔法使いとして、まだまだ力足らずな\tAs Leazas's foremost magician, still lacking in power,
魔法軍の育成に余生を捧げている\tHe dedicates his remaining life to training the Magic Army.
メルフェイス・プロムナード\tMelface Promenade
リーザス魔法軍（紫の軍）副将\tVice General of Leazas Magic Army (Purple Army)
魔法２\tMagic 2
レベルが極端に下がりにくいという自分の体質に\tShe greatly suffers from her own constitution which makes her level extremely hard to decrease.
彼女は大いに苦しんでいた\tShe was greatly troubled.
違法レベルダウン屋のおかげで、その苦しみは\tThanks to illegal level-down dealers, that suffering
軽減されたが、紫の軍は大きな戦力を失ったことになる\tWas eased, but the Purple Army ended up losing a major force.
メルフェイス・プロムナード\tMelface Promenade
リーザス魔法軍（紫の軍）副将\tVice General of Leazas Magic Army (Purple Army)
魔法２\tMagic 2
元は田舎の教師\tOriginally a rural teacher
村を守るため魔女の呪いを受け入れ、力を得た\tAccepted a witch's curse and gained power to protect the village.
定期的に自分より強い男に抱かれなくては\tShe must regularly be embraced by men stronger than herself,
彼女は狂死してしまう\tOtherwise, she will go mad and die.
メルフェイス・プロムナード\tMelface Promenade
リーザス魔法軍（紫の軍）副将\tVice General of Leazas Magic Army (Purple Army)
魔法２\tMagic 2
呪いから命を守るため、彼女は自分の生徒に\tTo protect her life from the curse, she laid hands on her own student,
手を出してしまっている。その後、リーザス軍に入り\tand afterwards joined the Leazas Army,
何人もの男と肌を重ねた\tengaging intimately with many men.
貞淑な彼女にはあまりにも心苦しい経験であった\tIt was a painfully harsh experience for her modest nature.
見当かなみ\tKentou Kanami
忍者\tNinja
忍者１\tNinja 1
以前はリーザス王女直属で、今はランス専属の女忍者\tFormerly directly under the Leazas Princess, now Rance's exclusive female ninja.
才能はあるのだが、いまいち修行が中途半端になって\tShe has talent, but her training ended up somewhat half-hearted.
しまった永遠の発展途上忍\tAn eternally developing ninja in progress.
「見当」は本当は苗字ではなく忍者として授かった別名\tKentou is actually not her surname but an alternative name given as a ninja.
見当かなみ\tKentou Kanami
忍者型巨人\tNinja-type Giant
忍者１\tNinja 1
巨大化薬の力で超大型巨人と化したかなみだ！\tKanami transformed into a super giant thanks to a gigantification potion!
強いぞ！凄いぞ！カッコいいぞ！\tShe's strong! She's amazing! She's cool!
じゃあくなまじんバボラにもまけないぞ！\tShe won’t lose to the wicked demon Baborah either!
砕け！ジャイアントかなみ！\tCrush them! Giant Kanami!
衣装は別注だ！\tHer costume is custom made!
見当かなみ\tKentou Kanami
忍者\tNinja
忍者１\tNinja 1
ランスとは長い付き合いで散々酷い目に会ってきた\tShe’s had a long relationship with Rance and has suffered terribly because of it.
ときめいたこともあったけどその度に思い直してきた\tThere were times she was moved, but each time she reconsidered.
でも本気で口説かれるとめろめろになっちゃった。安い\tBut when seriously flirted with, she melts easily. Cheap.
・ランスとの子供は生んでいない\t- Has not borne Rance's child.
・電卓迷宮：首切り刀\t- Calculator Dungeon: Executioner's Sword
KENTO KANAMI\tKENTO KANAMI
NINJA\tNINJA
NINJA1\tNINJA 1
DOMO. GAME PLAYER-SAN.\tHello, Game Player.
I AM KENTO KANAMI.\tI am Kento Kanami.
EXCHANGE OF AISATU\tGreetings must not be neglected.
CANNOT BE NEGLECTED.\tGreetings must not be neglected.
見当かなみ\tKanami Kentō
忍者\tNinja
忍者１\tNinja 1
くのいちの訓練は受けていないので性技には乏しいが\tShe has not undergone training as a kunoichi, so her sexual techniques are lacking,
リアからの命令で、不本意ながらランスに抱かれてきた\tUnder orders from Ria, she reluctantly has been embraced by Rance.
ランスと恋人になってからは優しいセックスが増えて\tSince becoming Rance's lover, kinder sexual encounters have increased,
まんざらでもなくなってきた様子\tand she seems to have come to somewhat enjoy them.
オーギル・ロット・シュタイン\tOgil Rott Stein
リーザス第４軍（白の軍）小隊長\tCommander of Leazas 4th Army (White Army) squad
剣１、軍師１、詩１\tSword 1, Strategist 1, Poetry 1
文武両道を旨とする白の軍の頼れる男\tA reliable man of the White Army, which values both literary and martial arts.
剣技だけでなく知略も冴え芸術にも通じる器用さがウリ\tHe is skilled not only in swordsmanship but also in strategy, and is adept in the arts.
その誠実で正直な人柄から、上官部下の別なく信頼される\tBecause of his sincere and honest personality, he is trusted by both superiors and subordinates alike.
……が、女性からの評価は低い。何故だろう\t...However, his ratings among women are low. I wonder why.
イベット・チェリア\tYvette Cheria
リーザス親衛隊（金の軍）隊員\tMember of Leazas Guard (Gold Army)
ものすごく無口。いまいち何を考えているのか分からない\tExtremely quiet. It's hard to tell what she's thinking.
とても素直で、言われたことは必ずこなす。（返事以外）\tVery obedient and always performs the tasks she's told (except replies).
レベルは高いが少々不器用で\tShe is highly skilled but a bit clumsy.
あまり戦闘は上手くない\tNot very good at combat.
イベット・チェリア\tYvette Cheria
リーザス親衛隊（金の軍）隊員\tMember of Leazas Guard (Gold Army)
男性経験はあるのか無いのか、よく分からない\tIt's unclear whether she has experience with men or not.
聞いても答えてくれない\tShe doesn't answer even if asked.
とりあえず脱げと言われれば脱いでくれる\tFor now, if told to undress, she will.
あおい\tAoi
穴奴隷\tHole slave
性技２\tSex technique 2
調教師ヌタヌタによって王侯貴族向けの商品として\tTrained by the trainer Nutanuta as a product for nobles and aristocrats,
調教された最高級の性処理用奴隷\tshe is a top-class sex slave trained for sexual service.
値段にすれば、おそらくシィルの１０倍はくだらない\tHer price is probably no less than ten times that of Shiir.
あおい\tAoi
穴奴隷\tHole slave
性技２\tSex technique 2
穴奴隷になる為の丁寧な調教を長期間に渡り受け、\tShe has undergone lengthy and meticulous training to become a hole slave,
当然、その一環として大昔に初体験を終えている\tand as part of that, she lost her virginity long ago.
あらゆる性交を行い、あらゆるテクを発揮し\tShe performs all kinds of intercourse and demonstrates every technique,
時間、場所、状況を問わず主を必ず満足させる\talways satisfying her master regardless of time, place, or situation.
シーラ・ヘルマン\tSheela Hellman
へルマン共和国大統領\tPresident of the Hellman Republic
神魔法１、投石１、魔鉄匠１\tDivine Magic 1, Slingshot 1, Magical Blacksmith 1
腐敗したヘルマンでお飾りの皇帝だったが\tShe was a figurehead emperor in a corrupt Hellman,
ヘルマン革命後、再び国のトップに据えられる\tbut after the Hellman revolution, she was put back at the top of the country.
今度は自らの意思と行動をもってヘルマンを導く\tThis time she leads Hellman with her own will and actions.
昔から国民に人気で、大統領選にも二期当選を果たした\tShe has long been popular with the citizens and was re-elected president for two terms.
兄パットンとは血の繋がりは無い\tShe has no blood relation to her brother Patton.
シーラ・ヘルマン\tSheela Hellman
へルマン共和国大統領\tPresident of the Hellman Republic
神魔法１、投石１、魔鉄匠１\tDivine Magic 1, Slingshot 1, Magical Blacksmith 1
何も知らない、何もできない籠の鳥だったシーラは\tSheela, who had been a caged bird knowing nothing and able to do nothing,
ランスの奴隷となった日々に確かな充足を覚えた\tfelt a sure fulfillment in her days as Rance's slave.
多忙な職務の中でランスのお世話は安らぎのひと時\tAmidst her busy duties, taking care of Rance is a moment of peace.
・ランスとの子供は生んでいない\t- She has not borne children with Rance.
・電卓迷宮：スーパーホーク\t- Calculator Labyrinth: Super Hawk
シーラ・ヘルマン\tSheela Hellman
へルマン共和国大統領\tPresident of the Hellman Republic
神魔法１、投石１、魔鉄匠１\tDivine Magic 1, Stone Throwing 1, Demon Iron Smith 1
皇帝でありながら帝都から逃げたシーラは、奴隷商に\tSheela, who fled the imperial capital despite being the emperor, was caught by a slave trader
捕まりランスの奴隷となった。下界を知らぬ箱入りの\tand became Rance's slave. The sheltered emperor who did not know the lower world
皇帝は純潔を汚され、様々な恥辱を与えられた\thad her purity defiled and was subjected to various humiliations.
それも今は良い思い出……やっぱり恥ずかしいです……\tBut now, those are good memories... though it's still embarrassing...
シーラ・ヘルマン\tSheela Hellman
へルマン共和国大統領\tPresident of the Hellman Republic
神魔法１、投石１、魔鉄匠１\tDivine Magic 1, Stone Throwing 1, Demon Iron Smith 1
数多の魔物に抱かれ続けたシーラは精神崩壊を起こす\tHaving been held by countless demons, Sheela suffered a mental breakdown.
今の彼女はどんな化け物が相手であろうと\tNow, no matter what monster faces her,
貼り付いた笑顔で全てを従順に受け入れる、\tshe accepts everything obediently with a fixed smile.
その姿は人形のようだと幾多の魔物に「可愛がられた」\tHer figure was like a doll, and she was “fondly treated” by many demons.
シーラ・ヘルマン\tSheela Hellman
ランスの奴隷\tRance's Slave
神魔法１、投石１、魔鉄匠１\tDivine Magic 1, Stone Throwing 1, Demon Iron Smith 1
自由の身になってから初めて見る空は普段と違う気がした\tThe sky she saw for the first time since gaining freedom felt different from usual.
自分で自分のことを決める、そんな当たり前のことが\tChoosing her own path — such an ordinary thing,
彼女にとっては何よりもかけがえのない宝物\twas the most precious treasure to her.
人形のようだった少女は笑顔の浮かべ方を思い出した\tThe girl who was like a doll remembered how to bring a smile to her face.
ペルエレ・カレット\tPereure Calette
メイド\tMaid
秘書０、盗賊１\tSecretary 0, Thief 1
貧しい日々を生き抜くためこすっからい小悪党に育った\tShe grew up a sly little villain in order to survive impoverished days.
私欲のためシーラを騙し、奴隷の身に落とした張本人\tShe was the very person who deceived Sheela for selfish reasons and reduced her to a slave.
シーラは気にしていないのだが、いつ報復されるかと\tSheela doesn't mind, but she is inwardly terrified of when the retaliation might come.
内心ビビりまくっている\tDeep inside, she is trembling with fear.
ペルエレ・カレット\tPereure Calette
メイド\tMaid
秘書０、盗賊１\tSecretary 0, Thief 1
魔人ケッセルリンクの使徒となったペルエレ\tPereure became an apostle of the demon lord Kesselring.
魔人は使徒に絶対服従を強いることもできるが\tThe demon lord can force absolute obedience from apostles,
ケッセルリンクはそれをしなかった\tbut Kesselring did not do that.
ペルエレ・カレットがどう動くか。それは彼女次第。\tHow Pereure acts is up to her.
ペルエレ・カレット\tPereure Calette
メイド\tMaid
秘書０、盗賊１\tSecretary 0, Thief 1
シーラに化けて、皇帝の身分を味わっていた折、\tWhile disguised as Sheela and enjoying the status of emperor,
ステッセルに正体がバれて、犯されている\ther true identity was exposed by Stessel, and she was violated.
その後皇帝として、ランスの捕虜になった際にも\tLater, when captured by Rance as the emperor,
やっぱり犯されている。因果応報\tshe was again violated. What goes around comes around.
クリーム・ガノブレード\tKrim Ganoburedo
へルマン軍参謀長官\tChief of Staff of the Hellman Army
軍師１、コンピューター１、菓子作り１\tStrategist 1, Computer 1, Pastry Making 1
ヘルマン一の智将。男社会のヘルマンで出世もできず\tHellman's greatest tactician. Unable to advance in Hellman's male-dominated society,
自国の腐敗と凋落を憂いていたが、パットン率いる\tshe was worried about her country's corruption and decline, but when Patton led
革命軍に同調し立ち上がった\tthe revolutionary army, she sympathized and rose up.
革命後は総大将ヒューバートを補佐し、\tAfter the revolution, she assisted Commander-in-Chief Hubert,
ヘルマン軍の要として活躍している\tand has been active as a key figure in the Hellman army.
クリーム・ガノブレード\tKrim Ganoburedo
へルマン軍参謀長官\tChief of Staff of the Hellman Army
軍師１、コンピューター１、菓子作り１\tStrategist 1, Computer 1, Pastry Making 1
生真面目な性格ゆえに気苦労が絶えず\tHer earnest personality causes her constant worry.
特に人類統一軍にあっては、ランスの言動には\tEspecially within the Unified Human Army, Rance's behavior
いつも頭を悩まされている\talways gives her a headache.
できれば早くシーラやヒューバートの下で仕事したいが\tShe wants to work under Sheela or Hubert as soon as possible,
どうにも上司運には恵まれないらしい\tbut it seems she is unlucky with bosses.
クリーム・ガノブレード\tKrim Ganoburedo
へルマン軍参謀長官\tChief of Staff of the Hellman Army
軍師１、コンピューター１、菓子作り１\tStrategist 1, Computer 1, Pastry Making 1
女である前に軍人である、と意気込むお堅い女性\tA stern woman who insists she is a soldier before being a woman.
だが、やらせてくれなきゃ革命軍をクビにすると\tHowever, if you don't let me, I'll fire the revolutionary army.
ランスに脅され処女を奪われてしまった\tI was threatened by Rance and lost my virginity.
故第２軍将軍ボドゥに告白されていた\tI was confessed to by the late 2nd Army General Bodou.
ヒューバート・リプトン\tHubert Lipton
へルマン軍総大将\tCommander-in-Chief of the Helman Army
運転１、ガード１、剣１、弓１\tDriving 1, Guard 1, Sword 1, Bow 1
パットン、シーラの幼馴染でトーマ将軍の息子\tPatton, Sheila's childhood friend and General Thoma's son.
事あるごとに偉大な父と比較されることに\tBeing compared to his great father on every occasion,
嫌気が差し不真面目な軍人となっていた\tHe grew tired of it and became a frivolous soldier.
親友パットンが祖国のために立ち上がった時、\tWhen his close friend Patton rose up for their homeland,
この男もまた目を覚ました\tThis man also woke up.
ヒューバート・リプトン\tHubert Lipton
へルマン軍総大将\tCommander-in-Chief of the Helman Army
運転１、ガード１、剣１、弓１\tDriving 1, Guard 1, Sword 1, Bow 1
何事も人並み以上にこなすことができる器用な男\tA skilled man who can handle everything better than average.
当人には、一つの事を極めることが出来ないという\tHe has a self-deprecating thought that he can't master one thing.
自虐があるが、この男の最大の力は、人のために怒り\tDespite that self-criticism, his greatest strength is getting angry for others,
信念のために貫くことができる心力にある\tand the willpower to persevere for his beliefs.
ロレックス・ガドラス\tRolex Gadras
へルマン第５軍将軍\tGeneral of the Helman 5th Army
剣２\tSword 2
軍人らしくない無頼漢で彼が率いる５軍も、一見すると\tA rogue unlike a soldier, and the 5th Army he leads at first glance
盗賊のようなならず者集団にしか見えない\tonly looks like a band of villains akin to thieves.
しかし亡き妻を今でも愛しており、「国を守る」という\tHowever, he still loves his deceased wife and keeps his promise
彼女との約束を守るため、その武をヘルマンに捧げる\tto 'protect the country,' dedicating his martial skills to Helman for her.
ロレックス・ガドラス\tRolex Gadras
へルマン第５軍将軍\tGeneral of the Helman 5th Army
剣２\tSword 2
「人斬り鬼」の異名を持つ二刀流の達人\tA dual-wielding master known by the nickname 'Man-Slashing Demon'.
一度は土を付けられたが、限界まで鍛え上げられた\tHe was once defeated but has trained to his limits.
戦闘能力は赤い死神をも上回る\tHis combat ability even surpasses the Red Reaper.
必殺技「弐式豪翔波」が並み居る敵を粉砕する\tHis fatal technique 'Second Style Grand Soaring Wave' crushes all enemies.
オルオレ・ザ・サード\tOlore the Third
へルマン第５軍副将\tVice General of the Helman 5th Army
忍者１、盗賊２\tNinja 1, Thief 2
一昔前、とある戦で大活躍したロレックスの戦ぶりを\tSome time ago, he became an instant fan after seeing Rolex's great performance in a certain battle in the newspaper.
新聞で見て、あっという間にファンになってしまった\tHe saw it in the newspaper and quickly became a fan.
作戦や諜報でロレックスを補佐する５軍の智嚢\tThe brains of the 5th Army supporting Rolex through strategy and intelligence.
昔はＪＡＰＡＮで有名な盗賊だったらしい\tApparently, he used to be a famous thief in JAPAN.
アミトス・アミテージ\tAmitos Armitage
へルマン第１軍将軍\tGeneral of the Helman 1st Army
剣１、ガード１\tSword 1, Guard 1
ヘルマンに忠誠を誓う鋼鉄の女騎士\tA steel-willed female knight who swore loyalty to Helman.
他人に厳しく、自分には更に厳しい、\tHarsh to others, even harsher to herself,
正義と戒律を尊ぶ軍人の中の軍人である\tshe is a soldier among soldiers who respects justice and discipline.
経験不足により未だ未熟な点はあれど、\tThough still inexperienced and immature in some ways,
その誇り高き姿でヘルマン軍主力の１軍を率いる\tshe leads Helman's main force, the 1st Army, with proud demeanor.
アミトス・アミテージ\tAmitos Armitage
へルマン第１軍将軍\tGeneral of the Helman 1st Army
剣１、ガード１\tSword 1, Guard 1
ランスにレイプされそうになったことがあるが\tShe was once almost raped by Rance,
鉄の意志をもってハイパー兵器を処女膜で防いだ\tbut with iron will, she protected her virginity against the hyper-weapon.
ヘルマン革命の折、評議委員バショウに拷問を受け\tDuring the Helman revolution, she was tortured by Councilor Bashou,
処女を失った\tand lost her virginity.
アミトス・アミテージ\tAmitos Armitage
へルマン第１軍将軍\tGeneral of the Helman 1st Army
剣１、ガード１\tSword 1, Guard 1
ケッセルリンクに噛まれたことにより\tShe was bitten by Kesselring,
チュパ病にかかった彼女は常の誇り高き姿など\tand the chupadisease she contracted made her forget her usual proud self.
忘却の彼方へ追いやってしまった\tIt banished that proud image far into oblivion.
血液の極度な渇望、真っ赤に染まった瞳、理性を失った心\tExtreme thirst for blood, eyes dyed bright red, a mind that has lost reason
その姿からは在りし日の彼女の面影は見えない\tFrom that appearance, there is no trace of the woman she once was
トルストイ・バトー\tTolstoy Bato
ヘルマン第２軍副将\tHerman 2nd Army Vice Commander
統率１\tLeadership 1
入れ替わりの激しいヘルマン２軍で、\tIn the highly volatile Herman 2nd Army,
才覚をあらわにし若くして副将となった\tHe showed talent and became vice commander at a young age.
家族と国を愛するが、どこまでも熱くならず\tLoves his family and country, but never gets overly passionate.
冷静に判断できる男\tA man who can judge calmly.
フレイア・イズン\tFreya Izn
闇の翼頭領\tLeader of the Dark Wings
くのいち１、統率１\tKunoichi 1, Leadership 1
暗殺者組織に両親を殺され、幼い彼女は拉致された\tHer parents were killed by an assassin organization, and she was kidnapped as a child.
家族の思い出は薄く、彼女もまた生粋の暗殺者となった\tHer memories of family are faint, and she too became a purebred assassin.
常に組織を存続させることを第一として行動する\tShe always acts with the organization's survival as her top priority.
冷酷な女性だが、面倒見が良い一面もある\tA cold-hearted woman, but she also has a caring side.
フレイア・イズン\tFreya Izn
闇の翼頭領\tLeader of the Dark Wings
くのいち１、統率１\tKunoichi 1, Leadership 1
女アサシンとして、房中術の訓練を受けており\tAs a female assassin, she has been trained in sexual arts.
セックスの間も油断ならない恐ろしい女性\tA terrifying woman you cannot let your guard down around, even during sex.
Ｓっ気があり、かなみの下に付いていた頃に\tShe has a sadistic streak, and when she was under Kanami,
「部下」として彼女を可愛がってあげたことも\tShe even doted on her as a 'subordinate'.
フレイア・イズン\tFreya Izn
闇の翼頭領\tLeader of the Dark Wings
くのいち１、統率１\tKunoichi 1, Leadership 1
闇の翼頭領、ブラックスワン\tLeader of the Dark Wings, Black Swan
その噂をヘルマンで聞いたことのある者は多けれど、\tMany in Herman have heard the rumors,
こと正体の話になればまさに影のように誰にも掴めない\tBut when it comes to her true identity, she is like a shadow, unattainable to anyone.
仮面の下は闇の翼の構成員にも明かせぬ秘匿事項である\tWhat lies beneath the mask is a secret not even revealed to members of the Dark Wings.
……最近は大勢にもうバレちゃったので半ば適当\t...But recently it's been exposed to many, so it's half-hearted now.
闇鷺\tYamisagi
闇の翼副官\tDeputy Officer of the Dark Wings
忍者１\tNinja 1
フレイアの指示を組織内外に伝達し、\tConveys Freya's orders both inside and outside the organization,
直接の指揮を執る役割が多い\tOften takes on the role of direct command.
そのため組織内では、フレイアよりも面が通っている\tTherefore, within the organization, she has more familiarity than Freya.
闇の翼の副官が頭領になることは無い\tThe deputy officer of the Dark Wings will never become the leader.
闇鷺\tYamisagi
闇の翼副官\tDeputy Officer of the Dark Wings
忍者１\tNinja 1
くのいちの訓練は少しだけ受けたが\tShe received only a little kunoichi training,
才能が無かったため房中術は使えない\tBut due to lack of talent, she cannot use the sexual arts.
セックスに関してはほぼ素人レベル\tHer level regarding sex is almost that of a beginner.
パットン暗殺に失敗した折ランスにレイプされている\tWhen the assassination of Patton failed, she was raped by Rance.
アナセル・カスポーラ\tAnasel Caspora
村娘\tVillage Girl
音楽１\tMusic 1
ヘルマンの没落貴族の娘。両親を失い、\tDaughter of a fallen noble family in Herman. She lost her parents,
ヘルマンの寒村を転々と移り住んでいる\tand drifts around impoverished villages in Herman.
高飛車な性格で村人と良好な関係を築くことが出来ない\tWith an arrogant personality, she cannot build good relationships with the villagers.
アナセル・カスポーラ\tAnasel Caspora
村娘\tVillage Girl
音楽１\tMusic 1
住んでいる村がピンチに陥るたびに、\tEvery time the village she lives in is in trouble,
なぜかランスが通りがかる\tRance somehow passes by.
そのたびにランスが褒美を要求し、\tEach time, Rance demands a reward,
そのたびに彼女が差し出される\tand each time, she is offered up.
そんな人生\tSuch is her life.
アナセル・カスポーラ\tAnasel Caspora
村娘\tVillage Girl
音楽１\tMusic 1
生贄としてランスに処女を奪われて以来\tSince having her virginity taken by Rance as a sacrifice,
男を寄せ付けまいとかたくなにガードしてきた\tshe stubbornly guarded herself so that no man would approach.
しかし結局ランスが現れるので\tHowever, since Rance eventually appeared,
ランスとばかりエッチすることに\tshe ended up having sex only with Rance.
ルーベラン・ツェール\tRubellan Tsel
へルマン警備隊\tHellman Guard
剣１\tSword 1
家が非常に貧しく、家計を助けるために軍に入った\tHer family was very poor, so she joined the military to help support the household.
真面目すぎて少々融通が利かず、\tToo serious and somewhat inflexible,
人から恨みを買ってしまう損な性格\tshe has a personality that earns resentment from others.
ルーベラン・ツェール\tRubellan Tsel
へルマン警備隊長\tCaptain of the Hellman Guard
剣１\tSword 1
同僚の彼氏がいたが、彼氏の不正の現場を目撃\tShe had a boyfriend who was a colleague, but witnessed him committing fraud.
逮捕しようとするも、逆上してレイプされた\tShe tried to arrest him, but he went berserk and raped her.
また連続レイプ犯として指名手配されていたランスを\tAlso, when trying to capture Rance, who was wanted as a serial rapist,
捕らえようとするも、返り討ちに合いレイプされた\tshe was defeated and raped by him.
メリム・ツェール\tMerim Tsel
遺跡探検家\tRuins Explorer
不幸１、探索１\tMisfortune 1, Exploration 1
遺跡探索マニアの女の子。奴隷的境遇にあったが\tA girl obsessed with exploring ruins. She was in a slave-like situation,
闘神都市でランスと出会い、解放された\tbut met Rance in the Fighting God City and was freed.
辛い過去にもめげず、明るく前向きに生きている\tShe lives brightly and positively despite her painful past.
眼鏡が外れないハニーの呪いを受けている。問題無いね\tShe is under Honey’s curse that her glasses will not come off. No problem, right?
メリム・ツェール\tMerim Tsel
遺跡探検家\tRuins Explorer
不幸１、探索１\tMisfortune 1, Exploration 1
ヘルマンの名家の生まれだが、家が没落し、\tBorn into a famous Hellman family, but the family fell into ruin,
口減らしのため、ゴルチ家に売られた\tand was sold to the Golchi family to reduce mouths to feed.
ゴルチ家で奴隷として様々な性的虐待を受けており\tShe suffered various sexual abuses as a slave in the Golchi family,
ＳＭやアナルセックスなどの調教も受けている\tand has also been trained in S&M and anal sex.
パットン・ヘルマン\tPatton Hellman
冒険者\tAdventurer
格闘１、ガード１、プロレス２\tMartial Arts 1, Guard 1, Pro Wrestling 2
ヘルマン最後の皇帝\tThe last Emperor of Hellman
傲慢で愚かな王子であったが、戦争と政争に敗れて\tHe was an arrogant and foolish prince, but after losing wars and political strife,
国を追われて以来、自分を見つめなおし、己を鍛え上げ、\tsince being driven out of the country, he reflected on himself and trained hard,
心も身体も一人前以上の男となった\tbecoming a man fully proficient in both body and mind.
祖国へルマン、そして妹シーラを影から守る\tHe protects his homeland Hellman and his sister Sheila from the shadows.
パットン・ヘルマン\tPatton Hellman
冒険者\tAdventurer
格闘１、ガード１、プロレス２\tMartial Arts 1, Guard 1, Pro Wrestling 2
最強の王、ザナゲス・ヘルマンの血を引くパットンだが\tPatton descends from the strongest king, Zanages Hellman, but
剣の才能はいまひとつであった\this talent with the sword was somewhat lacking.
失脚した後、武者修行の時期に、素手の戦いに\tAfter falling from power, during his warrior's training period, he found
己を見出し、鍛錬によって頑健極まる肉体を手に入れた\thimself in unarmed combat and, through training, gained an extremely robust physique.
被弾を省みない特攻攻撃「武舞乱舞」が必殺技\tHis special move is the reckless charge attack called 'Buburanbu' (Martial Dance Frenzy).
パットン・ヘルマン\tPatton Hellman
ヘルマン帝国王子（当時）\tPrince of the Hellman Empire (at the time)
格闘１、ガード１、プロレス２\tMartial Arts 1, Guard 1, Pro Wrestling 2
パットンは皇帝の独り子であり、当然皇太子であったが\tPatton was the emperor's only child and naturally the crown prince,
皇帝の晩年に後妻パメラがシーラを産むと宰相ステッセル\tbut in the emperor’s later years, his second wife Pamela gave birth to Sheila, and the chancellor Stessel
の暗躍により跡継ぎとしての立場を危ぶめていった\tthrough his scheming, Patton's position as heir was threatened.
策謀に疎いパットンは、宮廷で孤立していくほどに\tUnskilled with intrigue, Patton became increasingly isolated in court,
やる気を失い、自堕落へ陥っていった。\tlosing his motivation and falling into decadence.
ピグ・ギリシアム\tPig Girisham
ピグ\tPig
物書き１\tWriter 1
狂気の天才科学者オアマ博士によって\tBy the insane genius scientist Dr. Oama,
改造手術を受けた少女\ta girl who underwent cybernetic modification surgery,
人間とイカマンとぷりょの合成生物となった\tbecame a composite being of human, Ikaman, and Puryo.
ぷりょの特性から、肉体を分裂させることができる\tDue to Puryo's traits, she can split her body.
ピグ・ギリシアム\tPig Girishium
ピグ\tPig
物書き１\tWriter 1
ジャーナリストであった父親が秘密警察に捕まり\tHer father, who was a journalist, was captured by the secret police,
家族は皆人体実験の犠牲となったため天涯孤独の身\tand her entire family became victims of human experimentation, leaving her utterly alone.
自身も人ならざる身となってしまったが\tThough she herself became no longer fully human,
それでもピグはピグらしく、前向きに、自由に生きる\teven so, Pig lives positively and freely, true to herself.
110101100101010\t110101100101010
101011110001111010\t101011110001111010
10101011101010\t10101011101010
000100001110000001111100101000000000\t000100001110000001111100101000000000
000111101010000010000100101000000000\t000111101010000010000100101000000000
000100001110000100001000101000000000\t000100001110000100001000101000000000
000100000000000000010000000000000000\t000100000000000000010000000000000000
000111110000000000100000000000000000\t000111110000000000100000000000000000
ピグ・ギリシアム\tPig Girishium
ピグ\tPig
物書き１\tWriter 1
ランスに囚われて、レイプと称して初体験をしたため\tCaptured by Rance, she had her first experience under the pretense of rape,
セックス＝レイプという言葉で覚えてしまっている\tand thus associates sex with the word 'rape'.
レイプは楽しいので大好き\tShe loves rape because it is enjoyable.
ランスに自分以外とするなと言われたので\tBecause Rance told her not to do it with anyone else,
ランスとしかレイプしない\tshe only 'rapes' with Rance.
ピグ・ギリシアム\tPig Girishium
ピグ\tPig
物書き１\tWriter 1
ピグだぞー\tIt's Pig~
こんにちはー\tHello~
リーザスはごはんおいしいね\tRizath has delicious food, you know.
ピグ・ギリシアム\tPig Girishium
ピグ\tPig
物書き１\tWriter 1
ピグだぞー\tIt's Pig~
ゼスだぞー\tIt's Zeth~
緑色のおじいちゃんが「研究してみたい」って言ってた\tThe green old man said, 'I want to research her.'
でもしないんだって\tBut he said he won't do it.
ピグ・ギリシアム\tPig Girishium
ピグ\tPig
物書き１\tWriter 1
ピグだぞー\tIt's Pig~
今はランス城に住んでるから最初はこっちにいたんだけど\tShe lives in Rance Castle now, so she was originally here,
ヘルマンに行きなさいって偉い人にいわれた\tbut a superior told her to go to Herman.
ピグ・ギリシアム\tPig Girishium
ピグ\tPig
物書き１\tWriter 1
ピグだぞー\tIt's Pig~
主人公だぞー\tI'm the main character~
てやー、ランスアターック\tHyaa! Rance Attack!
ばばーん\tBabaaan!
サムソン・マキシモフ\tSamson Maximov
ヘルマン地方警備隊\tHerman Regional Security Force
槍２\tSpear 2
世捨て人の如く山にこもり修行に明け暮れていた男\tA man who secluded himself in the mountains like a hermit, dedicating himself to training,
世界の情勢を知り慌ててヘルマン軍に入隊した\tbut upon learning the world situation, hurriedly enlisted in the Herman army.
将軍級の実力を持ちながら、世間知らずで\tDespite having the strength of a general, he is naive to the world,
要領も悪いため、組織の仕組みなどもわからず\tand due to poor aptitude, he does not understand organizational structures.
小さな都市の警備隊に収まっていた。\tHe was assigned to the security forces of a small city.
ビンタン・デストラー\tBintan Destrler
ヘルマン第１軍 魔物使い部隊長\tCommander of the Monster Tamer Unit, Helman 1st Army
魔物使い２、性技１\tMonster Tamer Level 2, Sexual Skill Level 1
魔物使い兵を多数抱えるヘルマン軍にあって、\tAmong the Helman Army, which has many Monster Tamer soldiers,
現在ナンバーワンの実力者。\tHe is currently the top-ranked expert.
多くの弟子を抱え、魔物使い関係の書籍も出版している\tHe has many disciples and has published books related to monster taming.
また、別のジャンルの本も多数出版している\tHe has also published numerous books in other genres.
イオ・イシュタル\tIo Ishtar
ヘルマン第１軍 魔法兵\tMagic Soldier, Helman 1st Army
魔法１\tMagic Level 1
ヘルマン軍では貴重な上位の魔法使い\tA rare high-level magic user in the Helman Army.
とても不真面目でウソを吐くのが好き\tVery irresponsible and likes to tell lies.
闘神都市探索部隊として、\tAs part of the Battle God City exploration team,
ヒューバートらと行動を共にしたことがある\tShe has acted together with Hubert and others.
イオ・イシュタル\tIo Ishtar
ヘルマン第１軍 魔法兵\tMagic Soldier, Helman 1st Army
魔法１\tMagic Level 1
エッチは大好きだが性癖はドＳ\tLoves sex, but her sexual preference is extreme dominance (Do-S).
闘神都市では、催眠魔法をかけたランスと一緒に\tIn Battle God City, together with Lanse under hypnosis magic,
シィルをさんざんにいじめまくった\tShe thoroughly bullied Sil.
マジック・ザ・ガンジー\tMagic the Gangy
ゼス四天王\tZeth's Four Heavenly Kings
魔法２\tMagic Level 2
国王ラグナロックアークの一人娘。ゼス四天王であり\tThe only daughter of King Ragnarock Arc. A member of Zeth's Four Heavenly Kings,
一児の母であり、上級学生の生徒でもあり非常に忙しい\tA mother of one child and an advanced student, very busy.
真面目で責任感が強く、それゆえ周囲の期待に応えようと\tSerious and responsible, and therefore tries hard to meet others' expectations,
頑張り過ぎ、自分を追い詰めてしまう性質がある\tBut tends to push herself too hard and drives herself to exhaustion.
ランスを真人間にしようと（無駄な）努力をしている\tShe is making (futile) efforts to make Lanse a decent person.
マジック・ザ・ガンジー\tMagic the Gangy
ゼス四天王\tZeth's Four Heavenly Kings
魔法２\tMagic Level 2
魔法至上主義の時代のゼスで若くして四天王に任命された\tAppointed to the Four Heavenly Kings at a young age in the magic supremacist era of Zeth.
その魔力は、ゼス王家の血を証明するに足る力を持つ\tHer magical power is strong enough to prove her royal bloodline from the Zeth royal family.
いまいち頼りきれない印象もあるが\tShe can seem somewhat unreliable,
三大国の姫の中では間違いなく最強の戦闘力を誇る\tBut among the princesses of the three great nations, she unquestionably boasts the strongest combat ability.
マジック・ザ・ガンジー\tMagic the Gangy
ゼス四天王\tZeth's Four Heavenly Kings
魔法２\tMagic Level 2
勘違いから始まった頼りない交際。マジックは、つとめて\tA shaky relationship that started from a misunderstanding. Magic earnestly
ランスを好きになろうと努力した。ランスはそれに応える\ttried to like Lanse. Lanse responded accordingly.
器を持っていた。結婚式はすっぽかされた。\tHe had the capacity. The wedding was stood up.
・ランスとの間に娘スシヌを生んでいる\t- She has given birth to a daughter, Sushinu, with Lanse.
・電卓迷宮：雷王の指輪\t- Calculator Dungeon: Ring of the Thunder King.
マジック・ザ・ガンジー\tMagic the Gangy
ゼス四天王\tZeth's Four Heavenly Kings
魔法２\tMagic Level 2
もとは、アレックスと清い交際関係にあったが、ランスと\tOriginally, she had a pure relationship with Alex, but due to a misunderstanding that she had sex with Lanse,
セックスしてしまったという勘違いからランスとの結婚を\tshe decided to marry Lanse.
決意。その後結局本当に処女を奪われてしまった。\tAfterwards, she really lost her virginity to him.
その後もランスの恋人として懸命にランスの求めに応え\tSince then, as Lanse's lover, she has earnestly responded to his requests,
奉仕したり、悪戯されたり頑張ってきた\tserved him, been teased, and has been doing her best.
マジック・ザ・ガンジー\tMagic the Gangy
ゼス四天王\tZeth's Four Heavenly Kings
魔法２\tMagic Level 2
性交回数：１２５回\tNumber of sexual intercourse: 125 times.
妊娠回数：１回\tNumber of pregnancies: 1 time.
備考：テスト最低値の個体が執着、優先的に抱かせる\tNote: The individual with the lowest test value is fixated and is given priority for intercourse.
精神崩壊した模様。生殖機能は問題なし。出産間近\tAppears mentally broken. Reproductive functions are normal. Near childbirth.
［マジックを担当した魔物兵の手記より］\t[From the memoirs of the monster soldier in charge of Magic]
ウルザ・プラナアイス\tUrza Plantaice
ゼス四天王 ゼス警察長官\tZeth's Four Heavenly Kings - Zeth Police Chief
剣１、弓１、軍師１、政治１\tSword 1, Bow 1, Strategist 1, Politics 1
元レジスタンスのリーダー\tFormer leader of the Resistance
作戦の失敗によって家族や仲間を失った時\tWhen she lost her family and comrades due to a failed operation,
心が折れ、戦う意志を失ってしまった\ther spirit broke and she lost the will to fight.
しかしゼスが最悪の危機に直面した時、人々を救うため、\tBut when Zeth faced its worst crisis, in order to save the people,
仲間の死を無駄にしないため、彼女は再び立ち上がった\tand to not let the deaths of her comrades go in vain, she rose again.
ウルザ・プラナアイス\tUrza Plantaice
ゼス四天王 ゼス警察長官\tZeth's Four Heavenly Kings - Zeth Police Chief
剣１、弓１、軍師１、政治１\tSword 1, Bow 1, Strategist 1, Politics 1
遠距離にあってはボウガンによる精密無比の射撃を行い\tAt long range, she performs unparalleled precise shooting with a crossbow,
強引に接近してきた敵には腰に下げた\tagainst enemies who forcibly approach, she draws
ショートソードを抜き払う\tthe short sword hanging at her waist.
激しい戦闘でも絶えず周囲への指揮は絶やさない\tEven in fierce battles, she constantly commands those around her without fail.
遠近自在・文武両道のオールマイティな優秀さを持つ\tShe possesses versatility and excellence, equally skilled in both martial and civil arts, effective at any distance.
ウルザ・プラナアイス\tUrza Plantaice
ゼス四天王 ゼス警察長官\tZeth's Four Heavenly Kings - Zeth Police Chief
剣１、弓１、軍師１、政治１\tSword 1, Bow 1, Strategist 1, Politics 1
自信を喪失していた時代、ランスに付け込まれて\tDuring a time when she had lost confidence, Lance took advantage of her,
処女を奪われ、良いように身体を弄ばれていた\tstealing her virginity and playing with her body as he pleased.
今はランス相手にも簡単に身体を許す事は無い、が\tNow she does not easily give her body to Lance anymore, but
なんだかんだ、良い雰囲気になることもあったり\tstill, somehow, there are moments when they get along well.
山田千鶴子\tChizuko Yamada
ゼス四天王\tZeth's Four Heavenly Kings
魔法１、情報魔法２、経営１\tMagic 1, Information Magic 2, Management 1
最高峰の情報魔法と極悪な服装センスの持ち主\tHolder of the highest-level information magic and a terrible sense of fashion.
ガンジー王を心から敬愛しており、放浪癖のある彼に\tShe sincerely admires King Gandhi and, for his wandering habits,
代わって、国政の中枢を支え続けてきた\tshe has continued to support the core of the national government in his stead.
政務と同時にアニスのお守りにも頭を悩ませている\tAlong with political duties, she also worries about taking care of Anis.
山田千鶴子\tChizuko Yamada
ゼス四天王\tZeth's Four Heavenly Kings
魔法１、情報魔法２、経営１\tMagic 1, Information Magic 2, Management 1
四天王としての豪華絢爛な正装は自分で考案したもの\tThe gorgeous formal attire as one of the Four Heavenly Kings was designed by herself.
理知と威厳と規律と色気を兼ね揃えた渾身のデザイン\tA design full of intelligence, dignity, discipline, and sensuality.
今回の戦争では魔力増幅の必要性にかられた結果\tDue to the necessity of magic amplification in this war,
装備との兼ね合いで泣く泣く地味な\tshe reluctantly adopted a modest
アシンメトリーの装飾になってしまった\tasymmetrical decoration balancing with her equipment.
山田千鶴子\tChizuko Yamada
ゼス四天王\tZeth's Four Heavenly Kings
魔法１、情報魔法２、経営１\tMagic 1, Information Magic 2, Management 1
美人なのだが残念な服装センスのせいでモテない\tShe is beautiful but unpopular due to her unfortunate fashion sense.
男に言い寄られることもなく、本人もガンジー王\tShe is never approached by men, and she herself has never felt attracted
以外の異性に魅力を感じたことが無いので\tto anyone other than King Gandhi.
男性とお付き合いした経験は皆無\tShe has no experience dating men.
アニス・沢渡\tAnis Sawatari
小間使い\tMaid
魔法３\tMagic 3
魔法ＬＶ３と絶大な魔力を持つ人類最強の魔法使い\tPossesses Magic Level 3 and immense magical power; the strongest human mage.
しかし、頭がへっぽこすぎて、まともに力を使うことが\tHowever, her mind is so clumsy that she cannot properly use her power,
できず、その才能はむしろ災厄と化している\tand that talent has rather become a disaster.
付いたあだ名が「味方殺しのアニス」\tHer nickname is "Anis the Ally Killer."
アニス・沢渡\tAnis Sawatari
小間使い\tMaid
魔法３\tMagic 3
有り余る魔力を暴発させるように魔法を放つアニスだが、\tAnis casts spells as if unleashing her overflowing magical power,
魔法ＬＶ３だけに極めて高度な魔法も操ることができる\tbut being Magic Level 3, she can also wield extremely advanced magic.
最強の攻撃魔法「黒色破壊光線」は、その恐るべき\tHer strongest offensive spell, the "Black Destructive Ray," is so terrifying
破壊が仲間に降り注がないことを祈るばかりである\tthat one can only pray it doesn't rain destruction upon her allies.
アニス・沢渡\tAnis Sawatari
小間使い\tMaid
魔法３\tMagic 3
彼女を異性として見ようとする命知らずな男性は\tNo man has dared to see her as the opposite sex,
今までおらず、保護者である千鶴子のお堅い性格も\tand combined with her guardian Chizuko's strict personality,
相まって、長らく男性経験は無かった\tshe has had no male experience for a long time.
ランスに貫かれたことがトラウマになっているもよう\tBeing pierced by Rance seems to have become a trauma for her.
ラグナロックアーク・スーパー・ガンジー\tRagnarock Arc Super Gandhi
ゼス国王 アイスフレーム現リーダー\tKing of Zeth, current leader of Iceframe
魔法２、剣１\tMagic 2, Sword 1
ゼスの未来を考える立派な人格者だが、王でありながら\tHe is a respectable person who thinks about Zeth's future, but despite being king,
放浪癖があり表舞台に出ることを好まない変人でもある\the has a wandering habit and is a strange person who dislikes appearing on the public stage.
悪人にも慈悲の心で接するが仏の顔は三度までである\tHe treats even villains with mercy, but a Buddha's patience lasts only three times.
ランスの英雄としての資質をいち早く見抜いた\tHe was one of the first to recognize Rance's qualities as a hero.
ラグナロックアーク・スーパー・ガンジー\tRagnarock Arc Super Gandhi
ゼス国王 アイスフレーム現リーダー\tKing of Zeth, current leader of Iceframe
魔法２、剣１\tMagic 2, Sword 1
魔法大国の王でありながら、恵まれた肉体を持ち\tDespite being king of a magical superpower, he has a blessed physique,
最前に立って戦える力を持っている\tand has the strength to stand at the forefront and fight.
肉弾戦にあっては拳を振るうことを\tIn hand-to-hand combat, he wields his fists
得意とし、また、その強大な魔力は\tas his specialty, and furthermore, his immense magical power
ただの炎の矢ですら必殺の破壊力を持つ\teven a simple fiery arrow possesses deadly destructive power.
カオル・クインシー・神楽\tKaoru Quincy Kagura
ガンジーの護衛\tGandhi's bodyguard
神魔法１、柔術２\tDivine Magic 1, Jujutsu 2
普段は聡明で一見すると常識的な女性だが、ガンジーの\tShe is usually intelligent and appears sensible at first glance, but she
言う事を絶対とし全てにおいて彼が正しいと信じている\ttakes Gandhi's words as absolute and believes that he is right in everything.
その想いはもはや信仰に近い\tHer feelings have become close to faith.
古流柔術・天然武神流の免許皆伝。神楽とはその称号\tShe holds a full license in the classical Jujutsu and Tennen Bushinryu styles. 'Kagura' is that title.
カオル・クインシー・神楽\tKaoru Quincy Kagura
ガンジーの護衛\tGandhi's bodyguard
神魔法１、柔術２\tDivine Magic 1, Jujutsu 2
任務のために女を使うことも多々あるが、知り合いの\tShe often uses women for missions, but learned techniques from an acquaintance
娼婦から学んだテクニックを駆使して本番は避けている\twho is a prostitute, and uses those techniques to avoid the act itself.
初めてはどうしてもガンジーにもらって欲しいと\tShe earnestly wished Gandhi to be the one for her first time,
彼に頼み込み純潔を捧げている\tand begged him, handing over her virginity.
ウィチタ・スケート\tWichita Skate
ガンジーの護衛\tGandhi's bodyguard
剣１、魔法１\tSword 1, Magic 1
代々ゼス国王の警護をしてきた家の娘\tDaughter from a family that has guarded the kings of Zeth for generations.
マジックの級友でもある\tAlso a classmate of Magic.
カオル同様ガンジーを信奉している\tLike Kaoru, she worships Gandhi.
非常に珍しい魔法剣の使い手\tA very rare magic sword user.
ウィチタ・スケート\tWichita Skate
ガンジーの護衛\tGandhi's bodyguard
剣１、魔法１\tSword 1, Magic 1
初めてはガンジーに捧げたいと思っていたのだが\tShe had wanted to dedicate her first time to Gandhi,
ランスに襲われ、処女を奪われている\tbut was assaulted by Rance and lost her virginity to him.
その後も何度かランスに抱かれてしまった\tAfter that, she ended up being embraced by Rance several times.
ガンジーにはまだ抱いてもらっていない\tShe has yet to be embraced by Gandhi.
アレックス・ヴァルス\tAlex Vals
ゼス光軍将軍\tGeneral of Zeth Light Army
魔法２、統率１\tMagic 2, Leadership 1
ゼス名門の家柄で誠実な好青年\tA sincere, good young man from a prestigious Zeth family.
四将軍の中では弟のような存在\tAmong the four generals, he is like a younger brother.
マジックと清い交際をしていたが、ランスに寝取られた\tHe was in a pure relationship with Magic but was cuckolded by Rance.
傷心の折にエロピチャが彼を慰め、付き合うようになり\tWhen heartbroken, Eropicha comforted him, and they began dating.
最近婚約した。プロポーズはアレックスから\tThey recently got engaged. The proposal came from Alex.
アレックス・ヴァルス\tAlex Vals
ゼス光軍将軍\tGeneral of Zeth Light Army
魔法２、統率１\tMagic 2, Leadership 1
マジックと交際して以来、アレックスは彼女に釣り合う\tSince starting a relationship with Magic, Alex has strived to become worthy of her.
人間になるべく努力を重ね、光の将軍の地位を手にした\tHe made relentless efforts to become human and earned the position of General of Light.
鍛え上げられた白色破壊光線の威力は\tThe power of his thoroughly trained White Destruction Beam
大陸に並ぶ者無し\tHas no equal on the continent.
サイアス・クラウン\tSyas Crown
ゼス炎軍将軍\tZeth Flame Army General
魔法２、園芸１\tMagic 2, Horticulture 1
ゼスでも特に古い名門の出。用意されていた\tFrom one of Zeth’s most ancient noble families. He rejected
行政長官の椅子を蹴り、一兵卒から軍に入る\tthe prepared seat of governor and joined the army as a mere soldier.
将軍の地位は実力で手に入れた\tHe earned the rank of general through his own ability.
「炎」の冠とは対称的に、４将軍の中でも\tIn contrast to the 'Flame' crown, among the four generals,
もっとも冷静な戦局眼をもって戦場にあたる\the approaches the battlefield with the most composed strategic insight.
サイアス・クラウン\tSyas Crown
ゼス炎軍将軍\tZeth Flame Army General
魔法２、園芸１\tMagic 2, Horticulture 1
女性経験は豊富で、昔は女泣かせの\tHe has extensive experience with women and was once a heartbreaker.
プレイボーイだった\tHe was a playboy in the past.
軍に入り、ウスピラと出会って、\tHe joined the army and met Uspira,
その心の強さに胸を打たれた\tand was moved by her strength of heart.
それからは彼女ひとすじ\tSince then, he has been devoted solely to her.
ウスピラ・真冬\tUspira Mafuyu
ゼス氷軍将軍\tZeth Ice Army General
魔法２、統率１\tMagic 2, Leadership 1
事業に失敗した両親が一家心中するも、彼女だけが\tHer parents failed in business and committed family suicide, but she alone
生き残り、借金のカタに売られてしまった\tsurvived and was sold off as collateral for debt.
過酷な経験から心を閉ざしてしまったが、四将軍に\tShe closed her heart due to harsh experiences, but only to the four generals
だけは心を開いている。非凡な軍統率力を持つが\tshe has opened it. She possesses extraordinary military leadership,
自分一人で突っ走ってしまうきらいがある\tthough she tends to rush forward alone.
ウスピラ・真冬\tUspira Mafuyu
ゼス氷軍将軍\tZeth Ice Army General
魔法２、統率１\tMagic 2, Leadership 1
過酷な過去や、ゼス崩壊時に多くの部下を死なせた\tBecause of her harsh past and causing many subordinates to die during Zeth’s collapse,
ことからか、自分の幸せを考えることを拒む節がある\tshe has a tendency to refuse to think about her own happiness.
彼女が誰よりも心を許していないのは\tThe one she trusts least of all
自分自身なのかもしれない\tmay be herself.
そんな凍てつく氷もいずれ炎で溶かされる\tSuch freezing ice will eventually be melted by flames.
ウスピラ・真冬\tUspira Mafuyu
ゼス氷軍将軍\tZeth Ice Army General
魔法２、統率１\tMagic 2, Leadership 1
ゼス長官に買い取られた彼女は成績優秀であったため、\tShe was purchased by the Zeth chief, and because she was an excellent student,
学業を続けることはできたが裏では慰み者にされ続けた\tshe was able to continue her studies but was repeatedly abused in secret.
輪姦、獣姦、拷問……あらゆる苦痛を味わってきている\tGang rape, bestiality, torture... she has endured every form of pain.
現在サイアスのプロポーズを保留しているが、\tCurrently, she is withholding her answer to Syas's proposal,
傍からはいちゃいちゃしているように見える\tthough to outsiders they seem to be affectionate.
カバッハーン・ザ・ライトニング\tKabahaan the Lightning
ゼス雷軍将軍 魔法学園講師\tZeth Thunder Army General, Magic Academy Instructor
魔法２、魔法科学１\tMagic 2, Magical Science 1
「雷帝」の異名を持つ雷魔法のエキスパート\tA lightning magic expert known by the nickname 'Thunder Emperor'.
四天王や他の四将軍からも信頼篤いゼス軍の重鎮\tA respected senior member of the Zeth army trusted even by the Four Heavenly Kings and other four generals.
２匹の気まぐれな雷の妖精に好かれ、\tLiked by two capricious lightning fairies,
「もっとも雷に愛された男」とも言われる\the is also called 'the man most loved by lightning'.
カバッハーン・ザ・ライトニング\tKabahaan the Lightning
ゼス雷軍将軍 魔法学園講師\tZeth Thunder Army General, Magic Academy Instructor
魔法２、魔法科学１\tMagic 2, Magical Science 1
軍人であると同時に教師であり、研究者でもある彼は\tHe is simultaneously a soldier, teacher, and researcher,
ゼスの魔法文化を広く支えている\tand broadly supports Zeth’s magical culture.
若かりし頃は冒険家で、様々な場所を訪れ\tIn his youth, he was an adventurer who visited various places
知見を深めてきた\tand deepened his knowledge.
ネルソン・サーバー\tNelson Sarver
革命家\tRevolutionary
話術２、魔法０\tOratory 2, Magic 0
パパイアの実父。反政府組織ペンタゴンに入り\tPapaya's biological father. Joined the anti-government group Pentagon,
過激なテロリストとなっていった\tand became an extremist terrorist.
未熟な革命は成されず、全てを失った扇動家は\tThe immature revolution failed, and the agitator who lost everything
失意の果てに新たな答えを見出した\tfound a new answer at the end of despair.
パパイア・サーバー\tPapaya Server
魔法研究者\tMagic Researcher
魔法１、生命科学２\tMagic 1, Life Science 2
元ゼス四天王。志に燃えた娘だったが\tFormer member of Zeth's Four Heavenly Kings. She was a passionate girl,
危険な魔術書「ノミコン」によって精神が犯され\tbut her mind was corrupted by the dangerous grimoire 'Nomicon'.
狂気の人体研究実験を繰り返していた\tShe repeatedly performed insane human experimental research.
ノミコンから解放されてからは、罪滅ぼしのため\tAfter being freed from Nomicon, to atone for her sins,
山奥の研究所で人々のための研究を続けている\tshe continues research for the people at a remote mountain laboratory.
パパイア・サーバー\tPapaya Server
魔法研究者\tMagic Researcher
魔法１、生命科学２\tMagic 1, Life Science 2
ノミコンの狂気に飲まれた彼女が最初にしたことは\tThe first thing she did after being swallowed by the madness of Nomicon
彼に憧れていた部下を誘惑し、肉欲に溺れることだった\twas to seduce a subordinate who admired him and drown in carnal desire.
この時が彼女の初体験である\tThis was her first sexual experience.
正気を取り戻した今も、淫蕩に耽った日々の記憶は\tEven now that she has regained sanity, memories of days indulging in debauchery
心と身体に刻まれている\tare engraved in her mind and body.
エロピチャ・ニャンコ\tEropicha Nyanko
魔法博物館館長\tDirector of the Magic Museum
魔法１、話術１、経営１\tMagic 1, Oratory 1, Management 1
マジックの乳母の娘でマジックとは姉妹同然に育った\tShe is the daughter of Magic’s wet nurse and was raised almost like sisters with Magic.
のんびりとした雰囲気だが、行動に無駄が無く\tShe has a relaxed demeanor, but her actions are efficient,
気付かぬ内に自分のペースに引き込む油断ならない女性\tmaking her a dangerous woman who draws others to her pace without them noticing.
エロピチャ・ニャンコ\tEropicha Nyanko
魔法博物館館長\tDirector of the Magic Museum
魔法１、話術１、経営１\tMagic 1, Oratory 1, Management 1
男を手玉に取るのが得意で、複数の彼氏と同時に\tShe is skilled at manipulating men and has simultaneously dated multiple boyfriends.
付き合っていたこともある。非常に経験豊富\tShe is very experienced.
婚約者アレックスの死後、ガンジー王に取り入り\tAfter the death of her fiancé Alex, she ingratiated herself with King Gandhi,
後妻の席に座った\tand took the position of his second wife.
エレナ・フラワー\tElena Flower
フラワー盗賊団団長\tLeader of the Flower Bandits
槌２（残虐ギーコの力）\tHammer 2 (Power of the Brutal Giko)
血吸いペッタンという呪いのハンマーから解放されたが\tShe was freed from the cursed hammer called Bloodsucking Pettan,
今度は残虐ギーコというアイテムに呪われてしまった\tbut this time she was cursed by an item called Brutal Giko.
部下が一生懸命探して見つけてきた\tHer subordinates searched hard and found it for her.
ギーコに血を吸わせないと貧血で死んでしまう\tIf she doesn't let Giko suck her blood, she will die from anemia.
エレナ・フラワー\tElena Flower
フラワー盗賊団団長\tLeader of the Flower Bandits
槌２（血吸いペッタンの力）\tHammer 2 (Power of Bloodsucking Pettan)
ヘルマンで盗賊をしていたころのエレナ\tElena when she was a bandit in Hellman.
このときは血吸いペッタンというアイテムに\tAt that time, she was cursed by an item called Bloodsucking Pettan.
呪われていた。呪いはおおむね残虐ギーコと\tThe curse was generally the same kind as Brutal Giko.
同質のもの。ただし、血吸いペッタンは\tHowever, Bloodsucking Pettan
処女にしか取り憑けない\tcan only possess virgins.
エレナ・フラワー\tElena Flower
フラワー盗賊団団長\tLeader of the Flower Bandits
槌２（残虐ギーコの力）\tHammer 2 (Power of the Brutal Giko)
以前呪いのアイテムを持っていた頃、\tWhen she once possessed the cursed item,
ランスに抱かれたのが初体験となっている\ther first experience was being embraced by Rance.
アイテムの力により精神は男になっている為、\tBecause the item's power turns her mind male,
男性には、絶対、絶対、ぜーーったい抱かれたくない\tshe absolutely, absolutely, ab-so-lutely does not want to be embraced by a man.
エレナ・フラワー\tElena Flower
花売り\tFlower Seller
元はヘルマンの花屋の娘\tOriginally the daughter of a florist in Hellman.
男の人格を持っていたが、呪いのアイテムから\tShe had a male personality, but from the cursed item...
解放されたことで元の優しい性格に戻った\tShe returned to her original gentle personality after being freed.
花売りは別に変な隠語とかではありません\tFlower seller' is not some strange euphemism.
エレナ・フラワー\tElena Flower
花売り\tFlower seller
キスすら知らず、恋に夢見る可憐な乙女だったが\tShe was an innocent maiden who didn't even know about kissing and dreamed of love,
呪いのアイテムから解放するため、\tBut to free her from the cursed item,
ヘルマンでは衆目の中ランスに処女を奪われ、\tin Helman, Lanse took her virginity in front of everyone,
ゼスではアナルセックスされてしまった\tand in Zeth, she was forced to have anal sex.
マルチナ・カレー\tMartina Curry
サクラ＆パスタ総料理長\tHead Chef of Sakura & Pasta
料理２\tCooking 2
ゼスが誇る一流の料理人\tA top-class chef that Zeth is proud of.
「おいしい」と言われるのが何より大好き\tShe loves above all else to be told 'delicious'.
第６９回ゼス料理人コンテストで念願の優勝を果たした\tShe achieved her long-cherished victory at the 69th Zeth Chef Contest.
離婚歴があり、現在はシングルマザー\tShe has a history of divorce and is currently a single mother.
マルチナ・カレー\tMartina Curry
サクラ＆パスタ総料理長\tHead Chef of Sakura & Pasta
料理２\tCooking 2
料理の奥義を学ぶ為に危険を承知で食通親爺の元で修行\tShe trained under a gourmet old man, aware of the risks, to learn the secrets of cooking.
なんとか技術は学べたが、かなり酷いセクハラを受け\tShe somehow learned the skills but suffered severe sexual harassment,
エッチの教育もさせられた\tand was also subjected to sexual education.
ゼス暴動の混乱の中、ランスにレイプされている\tIn the chaos of the Zeth riot, she was raped by Lanse.
ロッキー・バンク\tRocky Bank
ランスの下僕\tLanse's Servant
鎚１、ガード０\tHammer 1, Guard 0
元ゼスの二級市民で自称ランスの召使い\tA former second-class citizen of Zeth and self-proclaimed servant of Lanse.
ランスを心から尊敬している\tHe truly respects Lanse from the heart.
子供に好かれやすく、孤児院の人気者\tHe is easily liked by children and popular at the orphanage.
リズナ・ランフビット\tRizuna Runfbit
旅人\tTraveler
槍１、魔法１、性技２\tSpear 1, Magic 1, Sex Technique 2
お人よしですぐに騙されてしまう女の子\tA good-natured girl who is easily deceived.
なぜかハニーに好かれやすい\tFor some reason, she is easily liked by Honeys.
魔法を受け付けないハニワ体質の持ち主\tShe has a Haniwa constitution that rejects magic.
３２年間、玄武城という異空間に閉じ込められていた\tShe was trapped in a different dimension called Genbu Castle for 32 years.
リズナ・ランフビット\tRizuna Runfbit
旅人\tTraveler
槍１、魔法１、性技２\tSpear 1, Magic 1, Sex Technique 2
学生時代はガンジー王の先輩。魔法学校で\tDuring her student days, she was a senior to King Gandhi at magic school.
生徒会長を務めた成績優秀者であり魔法は得意\tShe was an excellent student, serving as student council president and excelling in magic.
さらに玄武城ではぷちハニーの景勝から古武道を\tFurthermore, in Genbu Castle, she was taught ancient martial arts by Petite Honey Keisho.
教え込まれており、薙刀の達人でもある\tShe was taught thoroughly and is also a master of the naginata.
リズナ・ランフビット\tRizuna Runfbit
旅人\tTraveler
槍１、魔法１、性技２\tSpear 1, Magic 1, Sex Technique 2
３２年に渡る玄武城の生活で様々な男の陵辱を受けた\tDuring 32 years living in Genbu Castle, she suffered various men's assaults.
チドセセーという男によって壮絶な調教を受け\tShe underwent brutal training from a man named Chidose Se.
常に発情しどんな命令にも快楽をもって従う最上級の\tShe is always aroused and obedient to any command with pleasure, becoming the highest-class
穴奴隷と化している\tsex slave.
現在、普段は薬で淫乱化を抑えている\tCurrently, she usually suppresses her lewdness with medicine.
パセリ・リグ・ゼス\tParsley Rig Zeth
ゼス建国者\tFounder of Zeth
魔法Lv2．神魔法２．魔法科学１．探索１\tMagic Level 2, Divine Magic 2, Magical Science 1, Exploration 1
２００年前、魔法使いの復権を求めて立ち上がった\tTwo hundred years ago, he rose up seeking the restoration of wizards.
伝説の魔法使い。当時紛争地帯だった大陸南部を平定し\tA legendary wizard who pacified the troubled southern continent at that time,
魔法大国ゼスを作り上げた\tand built the great magical nation of Zeth.
パセリ・リグ・ゼス\tParsley Rig Zeth
ゼス建国者\tFounder of Zeth
魔法Lv2．神魔法２．魔法科学１．探索１\tMagic Level 2, Divine Magic 2, Magical Science 1, Exploration 1
パセリには７人の夫がいた。パセリは男達を愛し\tParsley had seven husbands. Parsley loved those men,
男達もパセリを愛した。７人は恨み合うことなく、\tThe men also loved Parsley. The seven of them, without resentment,
恋のライバルとして競争しあう爽やかな間柄であった\thad a refreshing relationship, competing as rivals in love.
後に２代目ゼス王となる子を身ごもった時、誰の子か\tWhen she later became pregnant with the child who would be the second Zeth king, no one tried to find out whose child it was.
調べようとはせず、８人全員の子として大切に育てた\tThey did not investigate and lovingly raised the child as the offspring of all eight.
キムチ・ドライブ\tKimchi Drive
孤児院院長\tOrphanage Director
料理１\tCooking 1
レジスタンス時代からウルザを支え続けてきた彼女の親友\tHer close friend who has supported Ulza since the resistance days.
ゼスの二級市民孤児で、悲惨な少女時代を過ごしてきた\tAn orphan and second-class citizen of Zeth, who had a tragic childhood.
同じ境遇を持つ子供達を守るため、孤児院を運営している\tRuns an orphanage to protect children who share similar circumstances.
キムチ鍋を作ることができる。カラウマー\tCan make kimchi hot pot. It's spicy and delicious.
キムチ・ドライブ\tKimchi Drive
孤児院院長\tOrphanage Director
料理１\tCooking 1
幼少から酷い性的虐待を受けてきた過去を持つ\tHas a past of severe sexual abuse since childhood.
レジスタンスでも子供達が襲われる危険があったため\tBecause children were at risk of being attacked even in the resistance,
自ら男達の性処理係を引き受けてきた\tshe took it upon herself to be the men's sex worker.
チョチョマン・パブリ\tChochoman Pabri
ゼス四天王\tThe Four Heavenly Kings of Zeth
政治１、書道２\tPolitics 1, Calligraphy 2
ゼスの改革によって初めて、まったく魔法が使えない\tFor the first time under Zeth's reforms, someone completely unable to use magic
民間人からゼス四天王が選ばれた\twas chosen as one of the Four Heavenly Kings of Zeth from among civilians.
ウルザと並び新しいゼスを象徴する国民の信頼篤き人物\tA trusted figure among the people, symbolizing the new Zeth alongside Ulza.
ソルトアン\tSoltan
ゼス王国親衛隊 公安部\tZeth Kingdom Royal Guard, Public Security Division
魔法１、神魔法１\tMagic 1, Divine Magic 1
ゼスの地方貴族の一人娘\tThe only daughter of a regional noble family in Zeth.
次期当主として英才教育を受けてきた実力派\tA capable person who has received elite education as the next head of the family.
現在はウルザ直属の部下として実績を重ねている\tCurrently, she is building her record as a direct subordinate to Ulza.
行政部所属なので軍人ではない\tShe belongs to the administrative department and is not a soldier.
ソルトアン\tSoltan
ゼス王国親衛隊 公安部\tZeth Kingdom Royal Guard, Public Security Division
魔法１、神魔法１\tMagic 1, Divine Magic 1
恋愛経験は無し\tNo romantic experience.
勉学や仕事に打ち込むタイプで色恋に無頓着\tShe is the type to devote herself to study and work, indifferent to romance.
貴族の娘として、一応その手の勉強もしてはいる\tAs a noble's daughter, she has studied that sort of thing to some extent.
ブラックロータス\tBlack Lotus
魔法犯罪者（元研究員）\tMagic Criminal (former researcher)
魔法１、聖魔法１\tMagic 1, Holy Magic 1
元は無から有を生み出す研究を行っていた魔法研究者。\tFormerly a magical researcher who conducted research to create something from nothing.
研究が神の領域を侵す危険なものになっていったため\tBecause her research became dangerously intrusive into the realm of the gods,
ＡＬ教から警告を受けたがこれを無視。\tShe was warned by the AL Church but ignored it.
教会の介入を警戒したゼス当局によって投獄された。\tThe Zeth authorities, wary of church intervention, imprisoned her.
コパンドン・ドット\tCopandon Dott
コパ・ホールディングス会長 ＣＩＴＹ都市長\tChairman of Copa Holdings, CITY City Mayor
お神籤１、経営２\tFortune-telling 1, Management 2
ポルトガル出身の商人\tA merchant from Portugal.
神社で生まれ、おみくじの修行を積んでいる\tBorn at a shrine, she has trained in omikuji (fortune slips).
以前は玉の輿を目指していたが致命的に男運が無かった\tShe once aimed for a rich marriage but had disastrously bad luck with men.
金も幸せも、自分の力で掴み取ったるんや！\tI'll seize both money and happiness with my own strength!
コパンドン・ドット\tCopandon Dott
コパ・ホールディングス会長 ＣＩＴＹ都市長\tChairman of Copa Holdings, CITY City Mayor
お神籤１、経営２\tFortune-telling 1, Management 2
おみくじの師匠には「自分の事は決して占うな」と\tHer omikuji master warned her, 'Never divine your own fortune',
釘を刺されていたが、無視して恋愛運を占ってしまった\tbut she ignored it and ended up divining her love fortune.
結果は「凶」\tThe result was 'bad luck'.
彼女はこれを受け入れられず、おみくじにかかれた文字と\tShe could not accept this, and along with the words on the fortune,
一緒に自分の記憶も改ざんしてしまった。\tshe altered her own memories as well.
コパンドン・ドット\tCopandon Dott
コパ・ホールディングス会長 ＣＩＴＹ都市長\tChairman of Copa Holdings, CITY City Mayor
お神籤１、経営２\tFortune 1, Management 2
ランスの人生を丸ごと買い占めることを目標に、\tWith the goal of buying up Rance's entire life,
この世の富のありったけをかき集めるため奮闘し\the struggled to gather all the wealth in the world,
遂に世界一の大金持ちとなった\tand finally became the richest person in the world.
目指せ１兆億Ｇ！\tAim for one trillion billion G!
コパンドン・ドット\tCopandon Dot
コパ・ホールディングス会長 ＣＩＴＹ都市長\tChairman of Copa Holdings, Mayor of CITY city
お神籤１、経営２\tFortune 1, Management 2
自分は大吉女だからと自信満々に男を振ってきたが\tConfident that she was a 'great fortune' woman, she had been rejecting men,
同級生が次々と結婚する中、未だ処女であることに\tbut as her classmates got married one after another, she became anxious over still being a virgin.
焦ってきた時分にバード、そしてランスに出会った\tAt a time when she was getting desperate, she met Bird and then Rance.
大吉男のランスに処女を捧げ運命の男と心を定めた\tShe gave her virginity to the 'great fortune' man Rance and decided he was her destined man.
ユーティン・フルズ\tYutin Fullz
コパンドン秘書\tCopandon's Secretary
性技１、家事１、巫女１\tSex Technique 1, Housework 1, Shrine Maiden 1
コパンドンが３０歳の誕生日に\tOn Copandon's 30th birthday,
悪趣味な富豪からプレゼントされた女の子\ta girl was given to him as a present from a tasteless wealthy man.
性的な愛玩奴隷として送られてきたが\tShe was sent as a sexual pet slave,
コパンドンの秘書に採用されている\tbut she is employed as Copandon's secretary.
ユーティン・フルズ\tYutin Fullz
コパンドン秘書\tCopandon's Secretary
性技１、家事１、巫女１\tSex Technique 1, Housework 1, Shrine Maiden 1
女性でありながら男性器も持つふたなり娘。珍しい\tA futanari girl who, although female, also has male genitalia. Unusual.
身体から人買いに高値で売られ愛玩用に調教されてきた\tShe was sold at a high price to a buyer from her body and trained as a pet.
ランスと共に、コパンドンに二本刺しした経験があるが\tShe has experience of double penetration of Copandon together with Rance,
それ以来、エロ的には何もしてもらっていない\tbut since then, she hasn't received any erotic attention.
セシル・カーナ\tCecil Karna
自由都市連合軍隊長\tChief of the Free City Union Army
剣１\tSword 1
決して折れない超重量の剣、グラビティソードを振るう\tWields an unbreakable super-heavy sword, the Gravity Sword.
「紅の天使」の異名を持つ傭兵。傭兵でありながら、\tA mercenary known as the 'Crimson Angel.' Despite being a mercenary,
大国には渡らず、自由都市を守るためだけに戦う\tshe does not serve great powers, fighting only to protect the Free City.
なぜか年を隠しているが別に驚くような年齢ではない\tShe hides her age for some reason, but it's not an astonishing age.
セシル・カーナ\tCecil Karna
自由都市連合軍隊長\tChief of the Free City Union Army
剣１\tSword 1
クールな態度とはうらはらに、女心は意外に一途\tContrary to her cool attitude, her heart as a woman is surprisingly devoted.
恋い慕う男性と、いつか再会し添い遂げる日を夢見て、\tDreaming of the day she will reunite with and be with the man she loves,
男を拒み続けてきた\tshe has continued to reject men.
篠田源五郎\tGengorou Shinoda
スポーツ評論家 自由都市連合軍参謀\tSports Critic, Staff Officer of the Free City Union Army
軍師２\tStrategist 2
世界屈指の軍師の能力を持つ稀代の傑人\tA rare genius with the ability of one of the world's top strategists.
本人は戦争が嫌いで本当はサッカー監督になりたい\tHe hates war himself and really wants to become a soccer coach.
旧Ｍランド都市長の運河さゆりに\tHe proposed to Sayuri Unga, the former mayor of M Land,
プロポーズしてフられている\tbut was rejected.
魔想志津香\tMasou Shizuka
カスタム防衛隊\tCustom Defense Squad
魔法２\tMagic 2
カスタムの四魔女のリーダー\tLeader of Custom's Four Witches.
父の仇を討つため努力を重ねてきたが\tShe has made strenuous efforts to avenge her father's death,
ランスにはたびたび邪魔をされている腐れ縁\tbut has a love-hate relationship with Rance, who frequently interferes.
ナギの命を救うために肉体を別ち、子供の身体になった\tTo save Nagi's life, she separated her body and became a child's body.
魔想志津香\tMasou Shizuka
カスタム防衛隊\tCustom Defense Squad
魔法２\tMagic 2
仇討ちのため、その青春を魔法の修行に捧げてきた\tShe dedicated her youth to magical training for revenge.
志津香は、世界有数の実力を持つ魔法使いとなった\tShizuka has become one of the world's most powerful magicians.
ナギと肉体を分けた今も、その魔力に翳りは無い\tEven now, after separating her body from Nagi's, her magical power remains undiminished.
最強の魔法「白色破壊光線」は必殺の一撃\tHer strongest spell, the 'White Destructive Beam,' is a lethal strike.
魔想志津香\tMasou Shizuka
カスタム防衛隊\tCustom Defense Squad
魔法２\tMagic 2
父の仇打ちを邪魔した男。自分や友人をレイプする\tThe man who interfered with avenging her father. He rapes her and her friends.
サイテーの男。突然現れて、人を連れまわす自分勝手な男。\tThe worst man. A selfish man who suddenly appears and drags people around.
頼みもしないのに自分を助ける男。それがランス\tA man who helps her without being asked. That is Rance.
・ランスとの子供：なし？\t- Child with Rance: None?
・電卓迷宮：クリスタルロッド\t- Calculator Labyrinth: Crystal Rod
MASO SHIZUKA\tMASO SHIZUKA
MAGE\tMAGE
MAGIC2\tMAGIC 2
SHE IS THE WITCH WHO USE\tSHE IS THE WITCH WHO USES
THE VERY STRONG MAGIC\tVERY STRONG MAGIC
'WHITE DESTRUCTION BEAM'\tWHITE DESTRUCTION BEAM
HER ACTUAL AGE IS OVER 20 YEARS OLD.\tHER ACTUAL AGE IS OVER 20 YEARS OLD.
ナギ・ス・ラガール\tNagi Su Ragaru
カスタム市民\tCustom Citizen
魔法２、メイド１\tMagic 2, Maid 1
志津香の異父妹。志津香を憎み命を狙っていたが\tShizuka's half-sister. She hated Shizuka and targeted her life,
死の間際、志津香が肉体を分け与え、命を救われる\tbut at the brink of death, Shizuka shared her body and saved her life.
当時の記憶はほとんど失われているようで、\tShe seems to have lost most of her memories from that time,
今は無邪気に志津香、ランスに懐いている\tand now she innocently is attached to Shizuka and Rance.
ナギ・ス・ラガール\tNagi Su Ragaru
カスタム市民\tCustom Citizen
魔法２、メイド１\tMagic 2, Maid 1
昔は肉体改造によって人間離れした力を手にしていたが\tIn the past, she had superhuman strength due to body modification,
今その力は無い\tbut now she no longer possesses that power.
しかし、志津香と血を分けたその才能は本物であり、\tHowever, the talent she shares in blood with Shizuka is genuine,
子供ながらに強力な魔力を秘めている\tand even as a child, she holds powerful magical energy.
志津香の補助がないと、あまり高度な魔法は使えない\tWithout Shizuka's support, she cannot use very advanced magic.
NAGI SU RAGARL\tNAGI SU RAGARL
MAGE\tMAGE
MAGIC2\tMAGIC 2
WHEN SHE THIRSTED FOR REVENGE,\tWHEN SHE THIRSTED FOR REVENGE,
SHE WAS LONELY.\tSHE WAS LONELY.
BUT NOW SHE HAS A LOT OF FRIENDS.\tBUT NOW, SHE HAS A LOT OF FRIENDS.
AMONG THEM, RESET IS HER BEST FRIEND.\tAMONG THEM, RESET IS HER BEST FRIEND.
マリア・カスタード\tMaria Custard
マリア工場所長\tMaria Factory Chief
機械２、魔法１\tMachine 2, Magic 1
カスタムの四魔女。兵器開発のスペシャリストで\tOne of Custom's Four Witches. A specialist in weapons development,
その才能はＡＬ教に警戒されたほど\ther talent was so great that the AL religion became wary of her.
魔法の力はほとんど失われているが、自慢の兵器\tHer magical power is mostly lost, but she fights with her proud weapons,
チューリップシリーズで戦う。お菓子大好き\tthe Tulip series. She loves sweets.
マリア・カスタード\tMaria Custard
マリア工場所長\tMaria Factory Chief
機械２、魔法１\tMachine 2, Magic 1
チューリップ１号：携帯型バズーカ砲\tTulip No.1: Portable bazooka launcher
チューリップ２号：固定式砲台。通称マレスケ\tTulip No.2: Fixed turret, nicknamed Malesuke.
チューリップ３号：移動式砲台。通称戦車\tTulip No.3: Mobile turret, nicknamed Tank.
チューリップ４号：飛空艇。イラーピュに墜落\tTulip No.4: Airship. Crashed in Ilapiu.
チューリップ５号：ロボットカンパン 悪魔により暴走\tTulip No.5: Robot Kanpan. Went berserk due to a demon.
マリア・カスタード\tMaria Custard
マリア工房所長\tMaria Factory Chief
機械２、魔法１\tMachine 2, Magic 1
ランスとの付き合いは長く、数々の冒険を共にした\tShe has had a long relationship with Rance and shared many adventures.
付き合いの数だけ、ランスに抱かれてきた\tShe has been embraced by Rance as many times as they have been together.
初めての男もランス\tRance was also her first man.
いつしかその胸の内にはランスへの恋心が芽生えていた\tBefore long, feelings of love for Rance had begun to grow in her heart.
しかし最近少し、その想いに虚しさを覚え始めている\tHowever, recently she has started feeling a bit empty about those feelings.
マリア・カスタード\tMaria Custard
マリア工房所長\tHead of the Maria Workshop
機械２、魔法１\tMachinery 2, Magic 1
大量の魔物達の手によって行われた忌々しい陵辱、\tThe abominable violation carried out by the hands of countless monsters,
景品としてモノ扱いを受けた恥辱の日々の記憶は、\tThe humiliating days of being treated like an object as a prize,
今もまだ心と体にしっかりと刻まれている\tAre still deeply engraved in her heart and body even now.
……笑顔の浮かべ方はもう忘れて久しい\t...It's been a long time since she even remembered how to smile.
カスミ・Ｋ・香澄\tKasumi K. Kasumi
マリア工場副所長\tDeputy Head of Maria Factory
機械１、経営１\tMachinery 1, Management 1
マリアの一番弟子で、マリアに負けず劣らずの機械馬鹿\tMaria's top disciple, a machinery geek no less than Maria herself.
彼女がいるから、マリアは安心して工場を任せ\tBecause she is there, Maria can entrust the factory with peace of mind,
冒険に出ることが出来る\tand go on adventures.
カスミ・Ｋ・香澄\tKasumi K. Kasumi
マリア工場副所長\tDeputy Head of Maria Factory
機械１、経営１\tMachinery 1, Management 1
カスタムの主力産業となっているマリア工場だが\tThe Maria Factory, which is Custom's main industry,
機械バカのマリアよりも組織運営の腕前は上\thas better organizational management skills than the machinery-obsessed Maria.
本人に自覚はないがカスタムを支える重要人物と言える\tThough she herself is unaware, she can be said to be an important figure supporting Custom.
ゼス崩壊やＪＡＰＡＮ戦乱などで彼女も出張することに\tDuring incidents like the collapse of Zeth or the JAPAN civil war, she also had to go on business trips.
なった時などは、概ねエレノアが悲鳴を上げることに\tUsually, when that happens, it is Eleanor who screams loudly.
カスミ・Ｋ・香澄\tKasumi K. Kasumi
マリア工場副所長\tDeputy Head of Maria Factory
機械１、経営１\tMachinery 1, Management 1
技術家肌で世事に疎く、男に騙されやすい\tA technologist at heart, but naive about worldly matters and easily deceived by men.
現在は子持ちの中年男性に騙され遊び相手にされている\tCurrently, she is being deceived and toyed with by a middle-aged man with children.
エレノア・ラン\tEleanor Ran
カスタム都市長代理\tDeputy Mayor of Custom City
剣１、魔法１\tSword 1, Magic 1
カスタム四魔女の一人。責任感が強く、\tOne of Custom's Four Witches. She has a strong sense of responsibility,
少々ネガティブ思考で思いつめてしまいがち\tand tends to get a bit negative and brooding.
カスタム陥没事件の贖罪として都市のため働いている\tShe works for the city as atonement for the Custom Collapse Incident.
エレノア・ラン\tEleanor Ran
カスタム都市長代理\tDeputy Mayor of Custom City
剣１、魔法１\tSword 1, Magic 1
剣術と幻覚の魔法を操る魔法戦士\tA magic warrior wielding swordsmanship and illusion magic.
攻撃魔法で大した威力は出せないが\tHer attack magic is not very powerful,
剣戦闘のさなかに放つ幻覚攻撃が彼女の本領\tbut her true strength lies in the illusion attacks she unleashes during sword combat.
バード・リスフィーの腕を切り落としたのは\tThe one who cut off Bard Risfy's arm
フィールの指輪で暴走した彼女である\twas her, driven into a frenzy by the Feel's ring.
エレノア・ラン\tEleanor Ran
カスタム都市長代理\tDeputy Mayor of Custom City
剣１、魔法１\tSword 1, Magic 1
カスタムが復興を果たした時、彼女は生きる目標を\tWhen Custom was restored, she lost her reason to live.
失ってしまった。そんな彼女に再び意志を与えるため\tTo give her a will to live again,
ランスは自ら悪役となり彼女を脅迫し身体を求めた\tRance took on the role of the villain himself, threatened her, and demanded her body.
仲間を守るため、彼女は生きなくてはならない\tShe must live to protect her comrades.
……うむ、人助けだから仕方ない\t...Hmm, it can't be helped since it's helping people.
ミル・ヨークス\tMill Yorks
薬屋\tPharmacist
召喚１、魔法１、性技１\tSummoning 1, Magic 1, Sexual Technique 1
カスタムの四魔女\tOne of Custom's Four Witches.
幻獣召喚という特殊な魔法を操る\tShe wields a special magic called phantom beast summoning.
病死した姉ミリのような、強くてエロくてカッコ良い\tShe aims to be a strong, sexy, and cool adult woman like her late sister Milli.
大人の女性を目指しているが、まだまだ色気が足りない\tShe strives to be an adult woman but still lacks sex appeal.
ミル・ヨークス\tMill Yorks
薬屋\tPharmacist
召喚１、魔法１、性技１\tSummoning 1, Magic 1, Sexual Technique 1
フィールの指輪の力で大人な姿になったミル\tMill transformed into an adult form by the power of the Feel's ring.
指輪の呪いとともに元の姿に戻ってしまった\tBut along with the ring's curse, she reverted back to her original form.
１０年、１５年後は再びこんな姿に？\tTen or fifteen years later, will she be like this again?
ミル・ヨークス\tMil Yorks
薬屋\tPharmacist
召喚１、魔法１、性技１\tSummoning 1, Magic 1, Sexual Technique 1
大人の身体になっていたところを\tAt the time she had an adult body,
ランスにレイプされ処女を失っている\tshe was raped by Rance and lost her virginity.
元の身体に戻った後、何度もランスを誘惑しているが\tAfter returning to her original body, she has repeatedly tried to seduce Rance,
ランスにはまったく相手されない\tbut Rance pays her no attention at all.
最近誘惑に成功したが、やっぱりまだまだ\tShe recently succeeded in seducing him, but still has a long way to go.
ピッテン・チャオ\tPitten Chao
パランチョ軍総大将\tGeneral of the Palancho Army
剣１、ガード１、教育１\tSword 1, Guard 1, Education 1
パランチョ王国前王の長男だが、王位は弟に譲った\tHe is the eldest son of the former king of Palancho Kingdom, but he ceded the throne to his younger brother.
欠点が無くあらゆる面ですぐれた能力を発揮すること\tHe is said to have no flaws and demonstrates excellent abilities in all areas,
から「完全無欠の男」と噂される文武に優れた男\tthus rumored as the "perfect man," excelling both in literature and martial skills.
ランスにはホモだと思われている\tRance thinks he might be homosexual.
ポロン・チャオ\tPoron Chao
パランチョ国王\tKing of Palancho
格闘２、政治１、神魔法１\tMartial Arts 2, Politics 1, Divine Magic 1
ピッテンの弟。王位継承権で兄との確執が噂された\tHe is Pitten’s younger brother. There were rumors of conflict with his brother over succession rights.
事もあるが、騒動なく弟への王位継承が行われた\tThough there were incidents, the throne was smoothly passed to the younger brother without turmoil.
パットンは、冒険を助けてもらったことがある恩人\tPatton is a benefactor whom he met during an adventure.
メアリー・アン\tMary Ann
ゴア市民\tCitizen of Goa
料理１、編み物１、貝ハンター１\tCooking 1, Knitting 1, Shell Hunter 1
天涯孤独の身で貧しい暮らしをしているが\tShe lives a poor life, completely alone in the world,
曲がることなく真っ直ぐに生きている\tbut lives honestly and uprightly without compromise.
珍しい貝を集めるのが得意だが\tShe is good at collecting rare shells,
コレクション趣味は無いのですぐ捨てる\tbut she has no hobby of collecting, so she quickly discards them.
ヌヌハラ・キャベツ\tNunuhara Cabbage
コンピューター技師\tComputer Technician
情報魔法１、魔法１\tInformation Magic 1, Magic 1
ランスの活躍を裏からこっそりと見守り続けてきた\tShe has quietly watched over Rance’s exploits from behind the scenes.
ランスのストーカー\tRance’s stalker.
情報魔法の力はそこまで高くは無いのだが根性と情熱で\tHer information magic skills aren’t very strong, but with guts and passion,
ランスにまつわるあらゆる情報を集めまくっている\tshe gathers every possible piece of information related to Rance.
ヌヌハラ・キャベツ\tNunuhara Cabbage
コンピューター技師\tComputer Technician
情報魔法１、魔法１\tInformation Magic 1, Magic 1
男性経験は皆無。男と話したこともほとんど無い\tShe has no experience with men and has hardly ever talked to one.
可能な限り世界中の監視カメラをチェックし、\tShe checks surveillance cameras worldwide as much as possible,
ランスのエロシーンを盗撮してはオナニーしている\tsecretly filming Rance’s erotic scenes to masturbate to them.
カチューシャ・ボッシュ\tKatyusha Bosch
ロックアース都市長 ＤＸの会会長\tMayor of Rock Earth City, Chairman of the DX Society
格闘１、政治１、性技１\tMartial Arts 1, Politics 1, Sexual Technique 1
ロックアース前都市長の戦闘情婦だったが\tShe was the battle concubine of the former mayor of Rock Earth,
都市長の地位を丸ごと奪い取った\tand she completely seized the position of mayor.
戦闘においても性技においても発揮される並外れた\tHer extraordinary skills demonstrated in both combat and sexual techniques
技術はそのまま彼女の壮絶な人生を物語っている\treflect her intense and fierce life story.
カチューシャ・ボッシュ\tKatyusha Bosch
ロックアース都市長 ＤＸの会会長\tMayor of Rock Earth City, Chairman of the DX Society
格闘１、政治１、性技１\tMartial Arts 1, Politics 1, Sexual Technique 1
無法者の捌け口となり、玩具としていたぶられ\tShe became an outlet for outlaws, tormented as a toy,
奉仕のための調教を受け、あらゆる薬物を投与され、\ttrained to serve, administered all kinds of drugs,
政略の道具とされ、嗤われ、嬲られ……\tused as a tool for political schemes, mocked and abused...
全てに耐えてのし上がってきた\tShe endured everything and climbed up.
もう二度と屈しないと誓って\tSwearing never to submit again.
カチューシャ・ボッシュ\tKatyusha Bosch
ロックアース都市長 ＤＸの会会長\tMayor of Rock Earth City, Chairman of the DX Society
格闘１、政治１、性技１\tMartial Arts 1, Politics 1, Sexual Technique 1
カチューシャは裕福な良家の娘だったが、\tKatyusha was the daughter of a wealthy and respectable family,
男に騙され、家を出て、地獄の底に叩き込まれた\tbut she was deceived by a man, left home, and was thrown into the depths of hell.
セラクロスによって若返った身体は\tHer body, rejuvenated by Seracross,
まだ、それを知る以前の姿である\tis still in the form from before she knew that.
カチューシャ・ボッシュ\tKatyusha Bosch
ロックアース都市長 ＤＸの会会長\tMayor of Rock Earth City, President of the DX Association
格闘１、政治１、性技１\tMartial Arts 1, Politics 1, Sexual Technique 1
過酷な責めに耐える彼女の強さは、辛苦の経験を\tHer strength to endure harsh torment
乗り越え鍛えられた肉体の強さに裏付けられていた\twas backed by the physical strength honed through overcoming hardship.
その肉体を失ったとき、彼女の中に屈服の記憶が蘇る\tWhen she loses that body, memories of submission resurface within her.
パパデマス・シルサブン\tPapademas Silsabun
ジオ都市長\tMayor of Geo City
政治１、経営１\tPolitics 1, Management 1
おべっか、お世辞でのし上がってきたジオの都市長\tMayor of Geo, who rose through flattery and compliments.
政治能力が皆無というわけではないが、\tIt's not that he completely lacks political ability,
彼の真の能力はペコペコと下手に出ることに\tbut his true skill is in humbly and obsequiously kowtowing.
躊躇のないところである、と言われているとか\tIt is said he does so without hesitation.
表には出さないがコパンドンをライバル視している\tThough he doesn’t show it openly, he views Copandon as a rival.
パトリシア・ベーコン\tPatricia Bacon
アイス都市長\tMayor of Ice City
経営１\tManagement 1
アイスの中では名門の家柄\tFrom a prestigious family within Ice.
アイスという都市をわが子のように可愛がっているが\tShe cherishes the city of Ice like her own child,
逆にその外のことに気を回さない傾向がある\tbut conversely tends to neglect matters outside it.
おしゃべり好きのおばさん\tA talkative middle-aged lady.
ビヨンホウ・オスマン\tBiyonhou Osman
ジフテリア都市長 ＡＬ教司祭\tMayor of Jiphteria City, AL Religion Priest
神魔法１\tDivine Magic 1
美人の妻と娘を持つ愛妻家\tA devoted husband with a beautiful wife and daughter.
都市長でありながら司祭でもあり、その職務は\tThough a mayor, he is also a priest, and his duties
多忙であるが、家族との時間を大切にしている\tare busy, but he values time with his family.
ペスポ・トントーネ\tPespo Tontone
ハンナ都市長\tMayor of Hanna City
政治１\tPolitics 1
遊び人で、何度も結婚と離婚を繰り返している\tA playboy who has repeatedly married and divorced.
離婚暦は計７回。ポピンズを嫁にしたこともある\tHas been divorced a total of seven times. Once married Poppins.
現在は独身\tCurrently single.
ドン・ドエススキー\tDon Doesuski
作家\tWriter
物書き２\tWriting Skill 2
数々の名作を手がけるベストセラー作家\tA bestselling author with numerous masterpieces.
執筆環境にうるさく、世界の僻地を移ろいながら\tParticular about his writing environment, he wanders the world's remote areas
作家活動を続けている\twhile continuing his work as a writer.
代表作：ザナゲスサーガー（１〜４７２巻、以下続刊）\tNotable work: Zanages Saga (Vols. 1–472, ongoing)
バーナード・セラミテ\tBernard Ceramite
冒険者\tAdventurer
剣技能０、話術１\tSword Skill 0, Speaking Skill 1
若かりし頃より世界を旅する歴戦の戦士\tA battle-hardened warrior who has traveled the world since youth.
多くの歴史的大乱、戦乱においてもその戦禍の中心\tIn many historical upheavals and wars, he was at the center of the conflict
……からちょっと外れたあたりで活躍してきた\t...though his activities were slightly off to the side.
ランスとは旧知の仲、と本人は言っている\tHe claims to be an old acquaintance of Rance.
シルバレル・シルバレラ\tSilbarel Silbarella
ブス\tUgly Woman
ブス３\tUgly 3
伝説のブスとして世界的に有名なブス\tAn ugly woman world-famous as a legendary ugly.
世界の美醜のバランスを破壊してしまう恐れがあるため\tBecause she might disrupt the balance of beauty and ugliness in the world,
ＡＬ教によって封印されていた\tshe was sealed away by the AL religion.
ランスが恐怖するただ一人の女性\tThe only woman Rance fears.
オノハ・メスポス\tOnoha Mespos
魔物使い\tMonster Tamer
魔物使い１\tBeast Tamer 1
危険なマジックアイテムにより多くのモンスターを従え\tCommanding many monsters through dangerous magic items,
人間を恐れ敵対していた魔物使いの少女\tA beast tamer girl who feared and was hostile to humans,
使役していたモンスターたちにひどい目にあわされ\tWas horribly mistreated by the monsters she controlled,
人間の世界で生きていくことに決めた\tAnd decided to live in the human world.
生き別れた家族がいるかもしれない。いないかもしれない\tShe may have family she was separated from. She may not.
オノハ・メスポス\tOnoha Mespos
魔物使い\tBeast Tamer
魔物使い１\tBeast Tamer 1
以前は多数の男の子モンスターを使役していたが\tShe used to command many male monsters,
制御を失った男の子モンスターに陵辱されたことが\tBut was violated by male monsters she lost control over,
トラウマとなっている\tWhich became a trauma.
人間こわい。男の子モンスター怖い\tHumans are scary. Male monsters are scary.
アマデス・カカデス\tAmades Kakades
村人\tVillager
リーザスの田舎、アペムンタ村の住人\tResident of Apemunta Village, a rural area of Leazas.
とても真面目でやさしい性格の持ち主\tA very serious and kind-hearted person.
片田舎の村民としては高いレベルをもっており\tPossesses a high level for a rural villager,
村人たちからも頼られている\tAnd is relied upon by the villagers.
イアン・ルストン\tIan Ruston
種馬\tStud (Sire)
剣１、執事１\tSword 1, Butler 1
とある国の高潔な貴族の嫡子だったが\tHe was the legitimate heir of a noble family of a certain country,
「健康そうである」というだけの理由で\tBut just for being 'healthy looking',
一族は皆殺しにされ、ロナの種馬に宛がわれる\tHis entire clan was massacred, and he was assigned as Rona's stud.
現在はロナと共にビスケッタに引き取られている\tHe is currently taken in by Biscetta along with Rona.
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
織田香\tOda Kaori
ＪＡＰＡＮ国主 織田家当主\tRuler of JAPAN, Head of the Oda family
護身術２、ガード１、軍師１、毒１\tSelf-defense 2, Guard 1, Strategist 1, Poison 1
ランスの力で統一されたＪＡＰＡＮの平和が絶えぬよう、\tTo ensure the peace of JAPAN unified by Rance's power remains eternal,
ランス、そして亡き兄信長に代わって\tShe dutifully serves as ruler in place of Rance and her late brother Nobunaga.
国主を務める健気な少女\tA brave girl who serves as the ruler.
団子作りが趣味だができる団子は何故か殺人兵器に\tHer hobby is making dumplings, but for some reason, the dumplings she makes become lethal weapons.
織田香\tOda Kaori
ＪＡＰＡＮ国主 織田家当主\tRuler of JAPAN, Head of the Oda family
護身術２、ガード１、軍師１、毒１\tSelf-defense 2, Guard 1, Strategist 1, Poison 1
数年前から香姫はＪＡＰＡＮ一美しい姫として大陸でも\tFor several years, Kaori-hime has been known on the continent as the most beautiful princess in JAPAN.
有名な存在であった。それは主に香姫の兄信長が、\tShe was a famous figure. This was mainly because Kaori-hime's brother Nobunaga,
妹バカすぎて周囲にそのように宣伝しまくったからである\twas so doting on his sister that he kept promoting her like that to those around him.
噂を期待してＪＡＰＡＮに来たランスは\tLance, who came to JAPAN with great expectations from the rumors,
まだまだ未成熟な香姫を見てとてもがっかりした\twas very disappointed to see that Kaori-hime was still very immature.
織田香\tOda Kaori
ＪＡＰＡＮ国主 織田家当主\tRuler of JAPAN, head of the Oda family
護身術２、ガード１、軍師１、毒１\tSelf-defense 2, Guard 1, Strategist 1, Poison 1
守られるだけの存在ではいられないと心に決めた時から\tSince she decided in her heart that she would not just be someone to be protected,
彼女に眠る力は少しずつ開花していった\tthe power sleeping within her gradually began to blossom.
様々な武将を師と仰ぎめきめきと力をつけているが\tShe has been looking up to various warlords as her teachers and rapidly gaining strength,
その潜在能力が完全に目覚めるのはもう少し先である\tbut her latent potential will fully awaken a little further down the road.
織田香\tOda Kaori
ＪＡＰＡＮ国主 織田家当主\tRuler of JAPAN, head of the Oda family
護身術２、ガード１、軍師１、毒１\tSelf-defense 2, Guard 1, Strategist 1, Poison 1
魔人ザビエル一派の罠にかかり、同世代の子供達に\tShe fell into a trap set by the demon Xavier faction and was gang-raped by children of the same age,
輪姦された経験があり、男性恐怖症となっている\tresulting in her developing gynophobia (fear of men).
若い男には近づくだけでも恐怖を感じたが\tShe felt fear even just approaching young men,
兄と慕うランスにだけは安心して身体を預けられた\tbut she was able to safely entrust her body only to Lance, whom she admired as a brother.
３Ｇ\t3G
織田家家老\tOda family chief retainer
栄養士ＬＶ３\tNutritionist Lv3
代々織田家に仕えてきた電波の妖怪\tA radio wave monster who has served the Oda family for generations.
生まれたときから面倒を見てきた香姫を\tShe has been taking care of Kaori-hime since she was born,
何よりも大切に思っている\tand considers her more important than anything else.
毛利てる\tMouri Teru
毛利家当主\tHead of the Mouri family
ガード１、剣１、槍１、弓１、メイド１\tGuard 1, Sword 1, Spear 1, Bow 1, Maid 1
毛利元就の長女。荒くれ揃いの毛利家にあって、\tEldest daughter of Mouri Motonari. Amidst the rowdy Mouri family,
最も元就の血を色濃く受け継ぐウォーモンガー\tshe is the warmonger who inherits Motonari's blood the most strongly.
家族想いな面もあり、父を慕っている\tShe also has a family-oriented side and admires her father.
亡き母から躾けられて、掃除にだけは苛烈に厳しい\tRaised by her late mother, she is fiercely strict only about cleaning.
毛利てる\tMouri Teru
毛利家当主\tHead of the Mouri family
ガード１、剣１、槍１、弓１、メイド１\tGuard 1, Sword 1, Spear 1, Bow 1, Maid 1
父元就が元気（幽霊）なうちに、\tWhile her father Motonari is still well (as a ghost),
孫の顔を見せたくて、ランスの子種を強引に欲した\tshe forcefully desired Lance's seed to show him a grandchild.
出産予定日を過ぎても、何故だか子供が生まれない\tEven after the expected birth date, for some reason the child is not born.
・ＬＰ６／８月にランスの子を懐妊している\t- LP 6 / Pregnant with Lance's child in August.
・電卓迷宮：イツクシマ\t- Calculator dungeon: Itsukushima
毛利てる\tMouri Teru
毛利家当主\tHead of the Mouri family
ガード１、剣１、槍１、弓１、メイド１\tGuard 1, Sword 1, Spear 1, Bow 1, Maid 1
ランスの案で「死の幻覚剤」を使い、戦争の刺激と\tOn Lance's idea, she used the 'Death Hallucination Drug', experiencing the thrill of war and
セックスを同時に味わいながら処女を失う\tlosing her virginity while simultaneously feeling the excitement of sex.
甘ったるいセックスなど気持ち悪い\tShe finds sweet, syrupy sex disgusting.
やるなら命の危険を感じながらでないとやりたくない\tIf she's going to do it, she doesn't want to unless she can feel the danger to her life.
吉川きく\tYoshikawa Kiku
毛利家忍者\tMouri family ninja
忍者１、メイド１\tNinja 1, Maid 1
毛利三姉妹の次女\tThe second daughter of the three Mouri sisters.
姉妹の中では一番の常識人だが、戦場を駆け、\tAmong the sisters she is the most sensible, but runs through the battlefield,
撲殺する喜びはまさに毛利の血筋\tand the joy of bludgeoning to death is truly the Mouri bloodline.
亡き母から躾けられて、料理にだけは徹底的にうるさい\tRaised by her late mother, she is extremely particular only about cooking.
吉川きく\tYoshikawa Kiku
毛利家忍者部隊長\tLeader of the Mouri family ninja corps
忍者１、メイド１\tNinja 1, Maid 1
政略のため父に無断で吉川家に嫁いでいる\tMarried into the Yoshikawa family without her father's permission for political reasons.
初夜で旦那が怖気づいてしまい呆れて実家に帰った\tOn the wedding night, her husband got scared and fled, leaving her annoyed and returning to her parents' home.
恥かしがり屋でランスとのエッチを渋っていたが\tShe is shy and reluctant to have sex with Lance,
どんな条件もクリアするランスに折れて処女を渡した\tShe gave up her virginity to Rance, who cleared every condition.
小早川ちぬ\tChinu Kobayakawa
毛利家巫女部隊長\tCaptain of the Mouri Family Shrine Maidens
神魔法１、巫女１、薬剤１、メイド１\tDivine Magic 1, Shrine Maiden 1, Alchemist 1, Maid 1
毛利三姉妹の三女\tThe youngest of the three Mouri sisters
一見のほほんとした性格だが\tAt first glance, she seems easygoing,
人を毒殺するのが好きという危険な女性\tbut she is a dangerous woman who likes poisoning people.
亡き母から躾けられて、作法は完璧\tTaught by her late mother, her etiquette is perfect.
小早川ちぬ\tChinu Kobayakawa
毛利家巫女部隊長\tCaptain of the Mouri Family Shrine Maidens
神魔法１、巫女１、薬剤１、メイド１\tDivine Magic 1, Shrine Maiden 1, Alchemist 1, Maid 1
体内に封印していた魔人の使徒が復活したとき\tWhen the apostle of the demon sealed inside her body revived,
肉体が破裂し、一度死亡している\ther body ruptured and she died once.
戯骸が行った復活の儀式によって、\tBy the resurrection ritual performed by Sugomori,
半分ゾンビのようになって黄泉返った\tshe returned from the underworld half like a zombie.
脳みそ食べたい\tI want to eat brains.
小早川ちぬ\tChinu Kobayakawa
毛利家巫女部隊長\tCaptain of the Mouri Family Shrine Maidens
神魔法１、巫女１、薬剤１、メイド１\tDivine Magic 1, Shrine Maiden 1, Alchemist 1, Maid 1
エッチが大好きで\tShe loves sex,
嫁ぎ先の旦那を腹上死させてしまったほど\tto the extent that she caused her husband’s death from a sudden orgasm.
エッチする相手は一応選ぶが\tShe somewhat chooses her partners,
エッチする場所は選ばない\tbut she does not choose where to have sex.
上杉謙信\tKenshin Uesugi
上杉家当主\tHead of the Uesugi Family
剣２\tSword 2
義を重んじ、正なる道のために剣を振るう女の子\tA girl who values justice and wields her sword for the righteous path.
弱きを助けるためならば\tIf it’s to help the weak,
国を越えても軍を率いて駆けつける\tshe will lead troops across countries to rush to their aid.
人の十倍食べてもおなかが鳴る大飯食らい\tShe is a big eater whose stomach growls even after eating ten times a normal amount.
上杉謙信\tKenshin Uesugi
上杉家当主\tHead of the Uesugi Family
剣２\tSword 2
戦国時代にあって軍神と恐れられた腕前はＪＡＰＡＮ最強\tHer skill, feared as the war god in the Sengoku period, is the strongest in JAPAN.
竜巻のごとき回転から繰り出される怒涛の太刀は\tThe furious slashes unleashed from a tornado-like spin
一撃、二撃、三撃と、絶える事無く繰り返される\tstrike continuously — one strike, two strikes, three strikes without end.
これぞ必殺「車懸かりの剣」\tThis is the deadly technique, the 'Kuruma Kagari no Ken' (Sword of the Revolving Cart).
上杉謙信\tKenshin Uesugi
上杉家当主\tHead of the Uesugi Family
剣２\tSword 2
戦一筋に生きてきた彼女だったが、\tShe had lived solely for war,
ランスを一目見た瞬間、恋に落ちてしまった\tbut the moment she saw Rance, she fell in love.
彼女は自らランスを求めることはしない\tShe does not seek Rance herself,
ただただ、ランスの心のままに\tbut simply follows Rance's heart.
上杉謙信\tKenshin Uesugi
帝 上杉家当主\tThe Emperor, Head of the Uesugi Family
剣３\tSword 3
ＪＡＰＡＮに伝わる三種の神器\tThe three sacred treasures handed down in JAPAN.
帝ソード、帝リング、帝ハチマキを身に付けた謙信\tKenshin wearing the Imperial Sword, Imperial Ring, and Imperial Headband.
帝を前にした日本人は魔王に対する魔人のごとく、\tJapanese people facing the Emperor act like demons before the Demon King,
自ずから地に伏し屈服してしまうという\tand naturally fall prostrate and submit.
直江愛\tAi Naoe
上杉家軍師\tUesugi Family Military Strategist
軍師１\tStrategist 1
代々上杉家に仕える謙信の幼馴染\tKenshin’s childhood friend who has served the Uesugi family for generations.
愚直すぎる謙信を参謀として全力でサポートする\tShe fully supports the overly straightforward Kenshin as his strategist.
謙信の食事や身の回りの世話なども面倒を見る\tShe also takes care of Kenshin’s meals and personal needs.
家臣でありながら保護者のような存在\tThough a retainer, she is like a caretaker.
直江愛\tAi Naoe
上杉家軍師\tUesugi Family Military Strategist
軍師１\tStrategist 1
初心な謙信とは対照的に恋愛経験は人並み\tIn contrast to naive Kenshin, her romantic experience is average.
初めては好きな人とセックスしている\tHer first time was with someone she loved.
上杉家で謀反が起きたとき、謙信を守るために\tWhen a rebellion occurred in the Uesugi family, she offered herself to protect Kenshin.
自ら身を差し出し、輪姦されている\tShe offered herself and was gang-raped.
上杉勝子\tUesugi Katsuko
上杉家武将\tUesugi clan military commander
剣１、槍１\tSword 1, Spear 1
上杉家の傍流に生まれた女の子\tA girl born into a branch family of the Uesugi clan.
謙信に仕えるためエリート教育を受けてきており、\tShe has received elite education to serve Kenshin.
謙信への憧れは非常に強い。とっても負けず嫌い\tHer admiration for Kenshin is very strong. She's very competitive.
ライバルは虎子。あんなお子ちゃまに負けるもんですか\tHer rival is Torako. She refuses to lose to such a child.
上杉勝子\tUesugi Katsuko
上杉家武将\tUesugi clan military commander
剣１、槍１\tSword 1, Spear 1
ランスが上杉家を解放した際\tWhen Rance liberated the Uesugi clan,
ご褒美と称して無理やり処女を奪われた\tShe was forcibly made to lose her virginity as a so-called reward.
虎子より先に自分が選ばれたことを\tShe feels a little proud that she was chosen before Torako.
ちょっと得意げに思っている。ふふん\tShe thinks so with a bit of arrogance. Hmph.
上杉虎子\tUesugi Torako
上杉家武将\tUesugi clan military commander
陰陽１\tOnmyou 1
上杉家の傍流で北条家の親戚でもある陰陽師の女の子\tA girl on a branch of the Uesugi clan and also a relative of the Hojo family, an onmyouji (yin-yang diviner).
大家族で奔放に育っており、ちょっと子供っぽい\tRaised freely in a large family, she's a bit childish.
兄弟達との切磋琢磨の中、異常に負けず嫌いに育つ\tGrowing up competing with her siblings, she developed an extreme aversion to losing.
ライバルは勝子。負けないんだからー！\tHer rival is Katsuko. She won't lose!
上杉虎子\tUesugi Torako
上杉家武将\tUesugi clan military commander
陰陽１\tOnmyou 1
ランスが上杉家を解放した際\tWhen Rance liberated the Uesugi clan,
ご褒美と称して無理やり処女を奪われた\tShe was forcibly made to lose her virginity as a so-called reward.
ランスに、家督争いと称して\tRance made her engage in an erotic competition, called a succession battle,
勝子とエロ勝負をやらされる。結果は引き分け\tagainst Katsuko. The result was a draw.
真田透琳\tSanada Torin
ヘルマン客将\tHermann guest general
軍師１、弓１\tStrategist 1, Bow 1
旧武田家重臣。ＪＡＰＡＮが誇る智将。\tFormer Takeda clan senior retainer. JAPAN's proud wise general.
世界に想いを馳せ、武田家滅亡後、大陸に渡った\tDreaming of the world, after the fall of the Takeda clan, he crossed to the continent.
ランスに仕官を求め、断られている\tHe sought to serve Rance but was refused.
ヘルマン革命に助力し、革命後はクリームに請われて\tHe helped with the Hermann revolution, and after the revolution, at Cream's request,
客将としてヘルマンに残った\the remained in Hermann as a guest general.
真田透琳\tSanada Torin
ヘルマン客将\tHermann guest general
軍師１、弓１\tStrategist 1, Bow 1
真田透琳はＪＡＰＡＮにおいては\tIn JAPAN, Sanada Torin is
武田四天王の名で知られる\tknown by the name Takeda's Four Heavenly Kings.
「風林火山」の「林」の一字を背負い、\tHe carries the character 'Rin' from 'Fuurinkazan' (Wind, Forest, Fire, Mountain),
静かなる瞳で勇猛果敢の諸将を導く\tguiding brave and resolute generals with calm eyes.
朝倉義景\tAsakura Yoshikage
朝倉家当主\tHead of the Asakura family
政治１、話術１\tPolitics 1, Oratory 1
戦国の世にあって、武力に頼らず\tIn the Warring States era, he expanded his power
政治力と交渉術で勢力を拡大した大名\tnot relying on force but through political skill and negotiation.
老齢ながら子沢山\tAlthough old, he has many children.
中でも雪姫という娘を溺愛している\tAmong them, he dotes on a daughter named Yukihime.
徳川千\tTokugawa Sen
ランス城保母\tRance Castle Nursery Nurse
槍１、ガード１、幸運１、家事２、子育て１\tSpear 1, Guard 1, Luck 1, Housework 2, Childcare 1
無類の戦好きだが子供を身ごもった時\tShe loves fighting immensely, but when she became pregnant,
槍を置き、子育てに専念することを決めた\tshe put down her spear and decided to devote herself to raising children.
徳川の姫として厳しく躾けられ\tStrictly disciplined as a princess of the Tokugawa family,
完璧な作法を身に付けている\tShe has mastered perfect etiquette.
徳川千\tTokugawa Sen
ランス城保母\tRance Castle Nurse
槍１、ガード１、幸運１、家事２、子育て１\tSpear 1, Guard 1, Luck 1, Housework 2, Childcare 1
戦乱の世に生まれ、姫として生きるを良しとせず\tBorn in a time of war, she does not accept merely living as a princess.
十二で初陣を飾り、青春の日々を戦場に投じる\tShe made her combat debut at twelve and dedicated her youth to the battlefield.
矢弾飛び交う戦場で死地に立てるが無上の喜び\tStanding in the death zone on a battlefield filled with flying arrows is her supreme joy.
人は彼女の「千」の名に\tPeople place the character for 'war' (戦) on her name 'Sen' (千)
「戦」の字ををあて恐れおののく\tand tremble in fear.
徳川千\tTokugawa Sen
ランス城保母\tRance Castle Nurse
槍１、ガード１、幸運１、家事２、子育て１\tSpear 1, Guard 1, Luck 1, Housework 2, Childcare 1
戦狂いの自分でも、いずれ子をなすこともあるだろう\tEven a war-obsessed person like herself may eventually have children.
そうは考えていたが、その日は案外早く来たようだ\tShe thought so, but that day came sooner than expected.
我が子の父がランスとなったことは素直に嬉しく思う\tShe is honestly happy that Rance became the father of her child.
・ランスとの間に娘、深根を生んでいる（ＬＰ６／１０月）\t- She bore a daughter, Fukane, with Rance (LP 6 / October).
・電卓迷宮：銀杏吹雪\t- Calculator Dungeon: Ginkgo Blizzard.
徳川千\tTokugawa Sen
ランス城保母\tRance Castle Nurse
槍１、ガード１、幸運１、家事２、子育て１\tSpear 1, Guard 1, Luck 1, Housework 2, Childcare 1
幽閉されていたところをランスが助け、ついでに\tRance rescued her from imprisonment, and as a bonus,
処女ももらった。その後も何度か肌を重ねる。\the took her virginity. Afterwards, they slept together several times.
ＳＭ的なプレイになることが多い。\tIt often turns into BDSM-style play.
ランスの事は好ましく思っているが、\tShe likes Rance,
恋愛感情と言えるのかは難しい\tbut whether it can be called romantic love is difficult to say.
アギレダ・コイサブッシ・ゾンナ・アボナ\tAgireda Koisabushi Zonna Abona
アフリカ族長\tAfrican Tribe Chief
槍１\tSpear 1
ＪＡＰＡＮ南国、アフリカ地方の部族の娘\tDaughter of a tribe from the African region in southern JAPAN.
部族の尊敬を集める巫女だが\tShe is a priestess respected by the tribe,
悪い男に騙されてばかりいる\tbut she is often deceived by bad men.
アギレダ・コイサブッシ・ゾンナ・アボナ\tAgireda Koisabushi Zonna Abona
アフリカ族長\tAfrican Tribe Chief
槍１\tSpear 1
幾千年の時を越え一族に受け継がれてきた試練を果たし\tHaving fulfilled the trial passed down through the clan over thousands of years,
神から力を授かったアギレダ\tAgireda received power from the gods.
その力はまさに最強。人の身を超越した存在となった\tThat power is truly supreme, making her a being beyond human.
アギレダ・コイサブッシ・ゾンナ・アボナ\tAgireda Koisabushi Zonna Abona
アフリカ族長\tAfrican Tribe Chief
槍１\tSpear 1
幾千年の時を越え一族に受け継がれてきた試練を果たし\tHaving fulfilled the trial passed down through the clan over thousands of years,
神から力を授かったアギレダ\tAgireda received power from the gods.
その力はまさに最強。人の身を超越した存在となった\tThat power is truly supreme, making her a being beyond human.
うなれ必殺の大切断\tRoar, deadly great slash!
アギレダ・コイサブッシ・ゾンナ・アボナ\tAgireda Koisabushi Zonna Abona
アフリカ族長\tAfrican Tribe Chief
槍１\tSpear 1
アフリカ最大勢力の部族だった頃、島津四兄弟に\tWhen her tribe was the largest power in Africa, she was seduced and charmed by the four Shimazu brothers.
篭絡されメロメロにされた。はじめての相手はトシヒサ\tShe was completely captivated; her first partner was Toshihisa.
正直セックスは好きなのだが、最高のテクニックを\tHonestly, she likes sex, but having experienced the best technique,
味わっているため、知らずハードルが高くなっている\tunconsciously her standards have become very high.
柚原柚美\tYuzuhara Yumi
旅人\tTraveler
鉄砲２\tGun 2
鉄砲鍛冶であった亡き父が作った\tThe miraculous masterpiece 'Hokiboshi' was made by her late father who was a gunsmith.
奇跡の逸品「箒星」を使う凄腕の鉄砲打ち\tShe is a top-notch gunslinger who uses the miraculous piece 'Hokiboshi'.
マスコットや可愛い生き物が大好き。正気を失う程好き\tShe loves mascots and cute creatures to the point of losing her sanity.
ポピンズの王国で事件を起こして追放処分を受けた\tShe caused an incident in the Poppins Kingdom and was expelled.
柚原柚美\tYuzuhara Yumi
旅人\tTraveler
鉄砲２\tGun 2
戦場に弾を持ってくるのを忘れる、という\tShe made the mistake of forgetting to bring bullets to the battlefield,
ミスをやらかし、ランスに「弾込め」と称して\tand because of this mistake, Lance 'loaded her with bullets' (a euphemism),
犯され処女を奪われた\twas raped and lost her virginity.
弾込めなら仕方ない。とはならなかった。怒る\tIf it's loading bullets, it can't be helped.' That was not how it went. She was angry.
北条早雲\tSoun Hojo
北条家当主\tHead of the Hojo family
陰陽２\tOnmyou 2
北条家稀代の実力と称される天才陰陽師\tA genius onmyouji called the rare talent of the Hojo family.
戦国時代から、そして統一された後も\tFrom the Warring States period and even after unification,
常にＪＡＰＡＮ全体の未来を考え続ける男\ta man who constantly thinks about the future of all JAPAN.
亡き恋人蘭を想い、生涯独身、童貞を誓っている\tThinking of his deceased lover Ran, he has vowed to remain lifelong single and a virgin.
山本五十六\tIsoroku Yamamoto
山本家 当主の母\tMother of the Yamamoto family head
弓２\tBow 2
愛する我が子を立派な山本家当主へと育てる\tShe raises her beloved child to become a fine head of the Yamamoto family.
それが彼女の宿願。そしてこの子を授けてくれた\tThat is her heartfelt wish. And she believes this child given to her
ランスへの恩返しになると信じて……\twill be a way to repay Lance...
・ランスとの間に長男乱義を生んでいる（ＬＰ６／４月）\t- She bore the eldest son Rangyi with Lance (LP 6/April).
・電卓迷宮：ラバウルの弓\t- Calculator Labyrinth: Bow of Rabaul.
山本五十六\tIsoroku Yamamoto
山本家 当主の母\tMother of the Yamamoto family head
弓２\tBow 2
群雄割拠の戦国の荒波の中で山本家は滅び\tIn the turbulent waves of the Warring States period, the Yamamoto family fell,
唯一の男子、弟の太郎も殺害されてしまった。\tand the only male, her younger brother Taro, was also killed.
お家復興のために全てを捧げていた五十六に\tTo Isoroku, who had devoted everything to the revival of the family,
ランスは、五十六が生んだ子を国主にすると約束した\tLance promised to make the child borne by Isoroku a lord.
世継ぎを産むつもりのない香姫も、これに快く賛同する\tKaohime, who had no intention of bearing an heir, also willingly agreed to this.
山本五十六\tIsoroku Yamamoto
山本家 当主の母\tMother of the Yamamoto family head
弓２\tBow 2
世継ぎを生まねばならない五十六を騙して\tDeceiving Isoroku, who must produce an heir,
ランスは彼女を好きなように抱いた\tLance took her as he pleased.
しかし、五十六の切なる願いを聞いた時\tHowever, when he heard Isoroku’s earnest wish,
ランスは自らの意思で避妊魔法を解かせた\tLance willingly had the contraceptive magic removed.
独眼流政宗\tOne-Eyed Masamune
妖怪王\tDemon King
三代目妖怪王\tThe third Demon King
狂気の刀鍛冶が１５人の弟子を殺し、その血を用いて\tA crazed swordsmith killed fifteen apprentices and used their blood
一本の刀を鍛え上げた。刀は妖気を吸収し妖怪となった\tto forge a single sword. The sword absorbed demonic energy and became a youkai.
４人の妻を持つ侠気溢れる男。乾燥が苦手\tA chivalrous man with four wives. He is weak against dryness.
お町\tO-machi
北方護天\tNorthern Protector
二代目妖怪王。狂星九尾・末知女殿の名で\tThe second Demon King. Known as the Mad Star Nine-Tails, Lady Suechi,
ＪＡＰＡＮ全土を荒らしまわった大妖怪\ta great youkai who ravaged all of JAPAN.
殺生石という石が妖怪と化した存在\tA stone called Sessho-seki that turned into a youkai.
世が慈愛を忘れ殺戮に染まった時、人々に恐怖を与え、\tWhen the world forgets compassion and is stained with slaughter, she brings fear to the people,
力合わせることを思い出される。それが彼女の役割\treminding them to unite their strength. That is her role.
お町\tO-machi
北方護天\tNorthern Protector
ＪＡＰＡＮを恐怖に陥れた九尾の狐は、妖怪政宗によって\tThe nine-tailed fox that threw JAPAN into terror was defeated by Youkai Masamune.
倒された。九尾の生い立ちを知った政宗は、\tAfter being defeated. Masamune, having learned of the nine-tail’s origins,
彼女をとどめることをせず、自分の妻とし\tdid not destroy her, made her his wife,
自らが妖怪王となった。己が役割を果たした彼女は\tand became the Demon King himself. She, having fulfilled her role,
ただ、政宗への愛のみによって、この世に姿を留める\tremains in this world solely by her love for Masamune.
ノワール\tNoir
東方護天\tEastern Protector
女郎蜘蛛の妖怪\tA youkai of the female orb-weaver spider.
ムシ使いの女性が死に、体内のムシも死んだ時\tWhen an insect tamer woman dies, the insects inside her also perish,
手に持った杖にその想いが宿り妖怪と化した\tThe emotions dwelling in the staff held in hand transformed into a youkai.
ノワール\tNoir
東方護天\tEastern Protector of Heaven
政宗と戦い敗れ、その強さに惚れて\tFought against Masamune and was defeated; fell in love with his strength.
妻となった妖怪のひとり\tOne of the youkai who became his wife.
政宗にラブラブ\tMadly in love with Masamune.
だが、ランスにもちょっと興味しんしん\tHowever, also somewhat interested in Rance.
野菊\tNogiku
南方護天\tSouthern Protector of Heaven
勉強一筋に生きながら、若くして事故死してしまった\tLived devoted solely to study but died young in an accident.
娘の想いが万年筆に宿り、妖怪と化した\tThe daughter's feelings dwelled in a fountain pen and it transformed into a youkai.
勉強と槍術に優れるが、それ以外のことはからっきし\tExcelling in study and spear techniques, but completely hopeless at everything else.
野菊\tNogiku
南方護天\tSouthern Protector of Heaven
政宗と戦い敗れ、その強さに惚れて\tFought against Masamune and was defeated; fell in love with his strength.
妻となった妖怪のひとり\tOne of the youkai who became his wife.
妖怪の元となった心が、年頃の娘であったためか\tPerhaps because the heart that became the youkai was that of a young woman of marriageable age,
恥ずかしながらもエッチには積極的\tShe is shy but proactive when it comes to erotic matters.
折女\tOrihime
西方護天\tWestern Protector of Heaven
二口女。後頭部にも大きな口が付いている\tFutakuchi-onna. She has a large mouth on the back of her head as well.
飢餓で死んだ多くの女性の心が\tThe hearts of many women who died of starvation
爪楊枝に宿り妖怪と化した\tResided in a toothpick and transformed into a youkai.
甘い和菓子が好き\tLikes sweet Japanese sweets.
折女\tOrihime
西方護天\tWestern Protector of Heaven
政宗と戦い敗れ、その強さに惚れて\tFought against Masamune and was defeated; fell in love with his strength.
妻となった妖怪のひとり\tOne of the youkai who became his wife.
くのいちの技能を持ち、色香で惑わすのが得意\tPossesses the skills of a kunoichi and is skilled at seducing with charm.
誘惑し、行為の最中に後ろの頭で男を食らう\tShe seduces and, during the act, bites the man with the mouth on the back of her head.
黒部\tKurobe
独眼流家武将\tCommander of the Dokuganryu family
初代妖怪王\tThe first Youkai King.
オロチの折れた牙が妖怪となった存在\tThe broken fang of Orochi that became a youkai entity.
体から常に発する異常な妖気によって、\tDue to the abnormal youki constantly emitted from his body,
ＪＡＰＡＮの外にも妖怪を引き連れることが可能\tHe can lead youkai outside of JAPAN as well.
大昔、藤原石丸と共に大陸を駆け、魔人と戦った\tLong ago, he ran across the continent with Fujiwara Ishimaru and fought demons.
紀伊\tKii
用心棒 主婦\tBodyguard Housewife
剣２\tSword 2
苛烈で知られるＪＡＰＡＮの剣術道場で生まれ\tBorn in a swordsmanship dojo in JAPAN known for its harshness.
幼いころから徹底的に剣を教え込まれた\tThoroughly taught swordsmanship from a young age.
その腕で用心棒として戦国のＪＡＰＡＮを\tWith those skills, she worked as a bodyguard in Warring States JAPAN.
渡り歩いていた\tShe went from place to place.
紀伊\tKii
用心棒 主婦\tBodyguard Housewife
剣２\tSword 2
既婚者であり子供も一人生んでいる\tShe is married and has given birth to one child.
家庭を持った時用心棒は引退したが\tShe retired as a bodyguard when she started a family,
人類滅亡の危機にあって、家族を守るため\tBut in the crisis of humanity's extinction, to protect her family,
織田家の招集に応えた\tShe responded to the Oda family's call-up.
乳久里\tChikuri
歩き巫女\tWalking Miko
巫女２、くのいち１\tMiko 2, Kunoichi 1
元は巫女機関に所属し、時には全国を渡り歩き\tOriginally belonged to the Miko organization and sometimes traveled nationwide,
情報収集を行う任についていた\tTasked with gathering information.
巫女機関が閉鎖された後も、一つところに\tEven after the Miko organization was closed, she didn't stay in one place,
とどまることなく気ままに各地を巡り歩く。\tShe freely wandered various places without staying put.
乳久里\tChikuri
歩き巫女\tWalking Miko
巫女２、くのいち１\tPriestess 2, Kunoichi 1
男を抱いて、人の魂の負の感情を吸い上げる\tEmbracing men and absorbing the negative emotions of their souls
それがＪＡＰＡＮの癒し巫女の仕事\tThat is the job of Japan's healing priestesses
今も昔も乳久里は渡り歩いた先々で、寂しそうに\tBoth now and in the past, Chikuri wandered from place to place, looking lonely
している行きずりの男と肌を重ね癒してきた\tShe would overlap skin with passing men and offer healing
そうして癒しているのは自分自身なのかもしれない\tPerhaps the one she is truly healing is herself
パステル・カラー\tPastel Color
カラー女王\tColor Queen
呪術２、魔法１\tJujutsu 2, Magic 1
プライドが高く、人間……特にランスを敵視している\tProud, and hostile towards humans... especially Rance
意地っ張りすぎて、理性的に行動できなくなることが\tToo stubborn and often unable to act rationally
多々ある困った女王\tA troublesome queen with many such issues
カラー女王のみが受け継ぐ強力な呪いを使う事が出来る\tOnly the Color Queen can use the powerful curse passed down
パステル・カラー\tPastel Color
カラー女王\tColor Queen
呪術２、魔法１\tJujutsu 2, Magic 1
カラーの村人はあの男を英雄と持て囃す\tThe villagers of Color hail that man as a hero
愛娘リセットはいくら言っても懐いて離れん\tNo matter how much I say, my beloved daughter Reset clings and won't leave
妾は絶対、ぜったい、ぜぇーったい認めん！\tI absolutely, absolutely, absollutely refuse to accept it!
・ランスとの間にリセットを生んでいる（ＬＰ６／６月）\t- Has given birth to Reset with Rance (LP 6 / June)
・電卓迷宮：無し\t- Calculator Maze: None
パステル・カラー\tPastel Color
カラー女王\tColor Queen
呪術２、魔法１\tJujutsu 2, Magic 1
英霊が残したカラーの神具を身に付けたパステル\tPastel wearing Color's sacred treasures left by the heroic spirit
シルクウェアー アコーンハンマー クイーンスーツ\tSilkwear, Acorn Hammer, Queen Suit
いずれも強力な力を秘めたバランスブレイカーであるが\tAll are powerful balance breakers with hidden strength, but
うまく使いこなすには要領が必要\tOne needs skill and knack to wield them well
パステルには無かった\tPastel did not have it
ﾊﾟｽﾃﾙ･ｶﾗｰ\tPastel Color
ｶﾗｰｼﾞｮｵｳ\tColor Queen
ｼﾞｭｼﾞｭﾂ2,ﾏﾎｳ1\tJujutsu 2, Magic 1
ﾇﾜｰﾅﾝｼﾞｬｺﾉｶﾗﾀﾞﾊ!\tWha—what is this body!
ｶｸｶｸﾆﾅｯﾃｼﾏｯﾀﾃﾞﾊﾅｲｶ\tAren't things getting all blocky?
ﾘｾｯﾄ ﾘｾｯﾄｰ!\tReset! Reset!
パステル・カラー\tPastel Color
カラー女王\tColor Queen
呪術２、魔法１\tJujutsu 2, Magic 1
カラーの女王は代々儀式によって性交せずに子を成した\tThe queens of Color have for generations borne children without intercourse through a ritual
その儀式の最中にランスに犯されてしまった\tDuring that ritual, she was violated by Rance
復讐のため、勝負を挑んだが返り討ちにあい\tFor revenge, she challenged him but was defeated
さらにこっぴどく犯されてしまった\tAnd was even more harshly violated thereafter
リセット・カラー\tReset Color
カラー姫\tPrincess Color
弓１、魔法１、幸運１\tBow 1, Magic 1, Luck 1
ランスとパステルの娘\tDaughter of Rance and Pastel
好奇心旺盛で誰にでも懐く元気いっぱいの女の子\tA curious and energetic girl who befriends anyone
父親に似て非常にわんぱくに育っている\tGrows up very mischievously, like her father
おとーさんもおかーさんも大好き\tLoves both her father and mother very much
リセット・カラー\tReset Color
カラー姫\tPrincess Color
弓１、魔法１、幸運１\tBow 1, Magic 1, Luck 1
カラーの並外れた魔力。ランス譲りの頑丈な体\tExceptional magical power of Color. A sturdy body inherited from Rance
まだまだ小さく未熟だが、その可能性は無限大に広がる\tStill small and inexperienced, but her potential expands infinitely
ビンタをすることで相手を正気に戻す力\tThe power to bring others back to their senses by slapping them
「クラウゼンの手」を持つ\tPossesses the "Klausen's Hand"
ﾘｾｯﾄ･ｶﾗｰ\tReset Color
ｶﾗｰﾋﾒ\tPrincess Color
ﾕﾐ1､ﾏﾎｳ1､ｺｳｳﾝ1\tBow 1, Magic 1, Luck 1
ｵﾄｰｻﾝｵｶｰｻﾝﾐﾝﾅｶｸｶｸﾆﾅｯﾁｬｯﾀﾈ\tDad, Mom, everyone has gotten all blocky, huh?
ｶﾞﾊﾊﾊﾊﾊ ｸﾞｯﾄﾞﾀﾞｰ!\tGahahahaha! Good there!
サクラ・カラー\tSakura Color
カラー事務総長\tColor Chief Secretary
魔法１、政治１\tMagic 1, Politics 1
パステルの妹\tPastel's younger sister
女王の補佐として、パステルの相談役になっている\tShe serves as the queen's assistant and acts as Pastel's advisor.
自分を押し出さず、物事をそつなくこなす\tShe doesn't push herself forward but handles things smoothly.
サクラ・カラー\tSakura Color
カラー事務総長\tColor Chief Secretary
魔法１、政治１\tMagic 1, Politics 1
カラーの中では保守的な思想\tShe has a conservative mindset among the Color.
人間の男に興味は無い\tShe is not interested in human men.
正直に言えば若いころは興味をもっていたが\tTo be honest, she was interested when she was younger,
今はもうそんな年でもない\tbut now she is no longer at that age.
イージス・カラー\tAegis Color
カラー防衛隊長\tColor Defense Captain
弓１\tBow 1
村を守るため力を尽くす強く真面目な女性\tA strong and serious woman who devotes her strength to protecting the village.
嘘が大嫌い。心優しく部下想いで、\tShe hates lies. Kind-hearted and caring for her subordinates,
カラーの娘を守るためなら命を惜しまない\tShe would not hesitate to sacrifice her life to protect the daughter of Color.
カラーの村一番の弓の名手である\tShe is the best archer in the Color village.
イージス・カラー\tAegis Color
カラー防衛隊長\tColor Defense Captain
弓１\tBow 1
幼いころに姉妹を人間に攫われ、犯されて\tWhen she was young, her sisters were kidnapped and violated by humans,
額のクリスタルを引き抜かれている。\tand the crystal on her forehead was pulled out.
このことから極度に人間嫌いとなったイージスは\tBecause of this, Aegis became extremely distrustful of humans,
弓の腕を磨き上げ、ペンシルカウを守る\tshe honed her archery skills to protect Pencil Cow.
鉄壁の盾となることを誓った\tShe swore to become an impenetrable shield.
イージス・カラー\tAegis Color
カラー防衛隊長\tColor Defense Captain
弓１\tBow 1
部下を助けるため人間に捕まり集団にレイプされた\tShe was captured by humans and gang-raped while trying to save her subordinates.
（一番乗りはランスだった）\t(The first one was Rance.)
その後記憶を失い、ランスを恋人だと思い込まされ\tAfterwards, she lost her memory and was made to believe that Rance was her lover.
ラブラブエッチを強要されている\tShe is being forced into lovey-dovey sex.
フル・カラー\tFull Color
カラーの英霊\tColor's Heroic Spirit
呪術２、魔法２\tCurses 2, Magic 2
三代前のカラーの女王。パステルの曽祖母\tThe queen of Color three generations ago. Pastel's great-grandmother.
己を縛るあらゆる束縛に抗い\tShe resisted all the restraints that bound herself.
どこまでも我を通し続けた女性\tA woman who persistently asserted her own will to the end.
天使か悪魔になるというカラーの運命さえも拒絶し、\tShe even rejected the fate of Color to become either an angel or a demon,
自らの意思で英霊となった\tand became a heroic spirit by her own will.
フル・カラー\tFull Color
カラーの英霊\tColor's Heroic Spirit
呪術２、魔法２\tCurses 2, Magic 2
自由奔放に生きたフルであるが、\tFull lived freely and unrestrained,
まだまだやりたかったことはたくさんあるらしく\tbut it seems there were still many things she wanted to do.
パステルの体に取り憑いた時は、そのまま体を奪って\tWhen she possessed Pastel's body, she planned to take over the body and
好き勝手やってやろうと企んだ\tdo as she pleased.
今は興味なさげにしているが、油断ならない\tAlthough she now seems uninterested, she cannot be underestimated.
フル・カラー\tFull Color
カラーの英霊\tColor's Heroic Spirit
呪術２、魔法２\tCurses 2, Magic 2
フルは過去に一度ずつ、天使と悪魔に転生しかけた\tFull once nearly reincarnated as both an angel and a demon in the past.
この時クリスタルの色は固定されているが\tAt that time, the color of the crystal was fixed,
実際には、生前にセックス経験がある\tbut in reality, she had sexual experiences during her lifetime.
ビビッドはその時生まれた３人の娘の一人\tVivid is one of the three daughters born at that time.
ビビッド・カラー\tVivid Color
カラーの英霊\tSpirit Hero of Color
呪術１、魔法２、政治１\tJujutsu 1, Magic 2, Politics 1
カラーの二代前の女王でパステルの祖母\tThe queen two generations before Color and the grandmother of Pastel
自由奔放な母フルを反面教師としたせいで\tBecause she took her free-spirited mother Full as a negative example,
非常に真面目で規律正しい性格となった\tshe became very serious and disciplined in character.
現在のカラーの掟の多くを作り上げた人物\tShe is the person who established many of the current Color's laws.
ビビッド・カラー\tVivid Color
カラーの英霊\tSpirit Hero of Color
呪術１、魔法２、政治１\tJujutsu 1, Magic 2, Politics 1
パステルに憑依して肉体を得たビビッド\tVivid who possessed Pastel to gain a physical body,
本人の身体能力は極めて低いが\ther own physical abilities are extremely low,
自らの魔力で生み出したクリスタルを\tbut she deploys crystals created by her own magical power
周囲に展開し、敵の攻撃を阻みつつ\taround her to block enemy attacks while
強力な魔法を打ち込んでくる\tlaunching powerful magic.
ビビッド・カラー\tVivid Color
カラーの英霊\tSpirit Hero of Color
呪術１、魔法２、政治１\tJujutsu 1, Magic 2, Politics 1
見るからに未成熟な体のビビッドだが\tVivid appears physically immature, but
カラーの長として、たくさんの子を\tas the head of Color, she must have many children,
産まねばならないと、人工授精により\tso by artificial insemination,
７人の子を儲けている\tshe has fathered seven children.
モダン・カラー\tModern Color
カラーの英霊\tSpirit Hero of Color
呪術１、魔法１\tJujutsu 1, Magic 1
カラーの先代女王でありパステルの母親\tThe previous queen of Color and mother of Pastel.
カラー史上最多となる５０人の子供を産んだ\tShe bore fifty children, the most in Color's history.
おだやかな性格で人間に対する警戒や偏見も\tShe has a gentle personality, and her suspicion or prejudice toward humans
カラーとして人並より薄かった\twas thinner than average for a Color.
モダン・カラー\tModern Color
カラーの英霊\tSpirit Hero of Color
呪術１、魔法１\tJujutsu 1, Magic 1
パステルの度重なる失態によって\tDue to Pastel's repeated blunders,
カラー女王の威信が地に落ちた時、\twhen the authority of the Color queen fell to the ground,
その名誉を回復せんと\tto restore that honor,
３人の英霊は、パステルの肉体に憑依し\tthree spirit heroes possessed Pastel's body
ランス打倒のため戦った。\tand fought to defeat Rance.
モダン・カラー\tModern Color
カラーの英霊\tSpirit Hero of Color
呪術１、魔法１\tJujutsu 1, Magic 1
人間に対して寛容な態度で接してきたモダンだが\tModern has treated humans with a tolerant attitude, but
それでも掟にしたがい、性交渉はしなかった。\tshe still did not engage in sexual intercourse, following the laws.
５０人の子はすべて、人工授精によって生んでいる\tAll fifty children were born through artificial insemination.
パステルの肉体に憑依したとき、ランスと初めての\tWhen possessing Pastel's body, the first time with Rance,
セックスはとても気持ちが良かった。\tthe sex felt very good.
三菱王\tKing Mitsubishi
アニャガス王国国王\tKing of the Anyagas Kingdom
からくり１\tMechanism 1
ポピンズの王国を治める厳格な王様\tA strict king who rules the kingdom of Popins.
民に優しく、身内に厳しい立派な人\tKind to the people, strict with his family, a respectable person.
満鉄王\tKing Mantetsu
アレルギー超大国国王\tKing of the Allergy Superpower
からくり１\tMechanism 1
国一番のからくり技師にして\tThe country's top mechanism engineer and
国一番の変態親父\tthe country's biggest perverted old man.
国民には信頼されているらしい\tHe apparently is trusted by the citizens.
日立姫\tPrincess Hitachi
アレルギー超大国王女\tPrincess of the Allergy Superpower
からくり１\tMechanism 1
満鉄王の愛娘\tBeloved daughter of King Mantetsu.
思い込みが激しく\tStrongly opinionated.
走り出したら止まらない情熱的な性格\tA passionate personality that can't be stopped once it starts running.
東芝王子\tPrince Toshiba
アニャガス王国王子\tPrince of the Anyagas Kingdom
からくり２\tMechanism 2
三菱王の息子\tSon of King Mitsubishi
からくりの技術も高く\tHe is also highly skilled in mechanism technology.
王子として将来を有望視されている\tHe is seen as promising for the future as a prince.
ハンティ・カラー\tHanty Color
冒険者\tAdventurer
魔法３\tMagic 3
太古より「黒髪のカラー」の名で知られる伝説的存在\tA legendary figure known as 'Black-Haired Color' since ancient times.
カラーの間では「始祖様」と呼ばれ敬われている\tShe is called 'The Ancestor' and revered among the Colors.
その正体はドラゴンの時代のカラー\tHer true identity is a Color from the Dragon era.
亡きパットンの母パエリナの親友\tShe was a close friend of Paelina, the late Patton's mother.
パットンの母代わり、そして恋人でもある\tShe is both a mother figure and lover to Patton.
ハンティ・カラー\tHanty Color
冒険者\tAdventurer
魔法３\tMagic 3
ドラゴンカラーハンティの額のそれは\tThe one on Dragon Color Hanty's forehead
ヒューマンカラーのクリスタルとは異なり\tUnlike the Human Color's crystal,
処女を失ってもクリスタルが青くなることは無い\tThe crystal does not turn blue even if virginity is lost.
それを置いても、ハンティはまだ男を知らない\tApart from that, Hanty still doesn’t know about men.
とりあえずのところは\tFor the time being,
キャンテル\tCantel
ランス城物資運搬係\tRance Castle Supply Transport Staff
ドラゴン１\tDragon 1
聖魔教団と契約を交わし\tMade a contract with the Holy Magic Order
闘神都市ユプシロンを守護していたドラゴン\tA dragon that protected the battle god city Ypsilon.
風邪を引き動けなくなっていたところを\tWhen he caught a cold and became immobile,
ランスに助けてもらった\tHe was helped by Rance.
ゼータ\tZeta
闘神\tBattle God
聖魔法１\tHoly Magic 1
ゼスの魔法博物館に展示されていた闘神\tThe battle god displayed in Zeth’s Magic Museum.
本体はランス城に安置された聖櫃である\tThe main body is a holy ark enshrined at Rance Castle.
聖櫃から大きく離れることはできない\tIt cannot stray far from the holy ark.
シグマ\tSigma
闘神\tBattle God
聖魔法１、からくり２\tHoly Magic 1, Mechanism 2
珍しい魔法使いのポピンズが闘神と化した存在\tA rare magician, Poppins, who transformed into a battle god.
聖魔教団の機械技術に大きく貢献した技術者\tAn engineer who greatly contributed to the mechanical technology of the Holy Magic Order.
フリークとはＭＭルーンと出会う前からの友人であった\tHe was a friend of Freak before meeting the MM Rune.
Megas\tMegas
Horus Guardsman\tHorus Guardsman
A veteran warrior of Horus.\tA veteran warrior of Horus.
Respected by everyone as a teacher.\tRespected by everyone as a teacher.
Not of combat, but of calligraphy.\tNot of combat, but calligraphy.
メガワス\tMegawas
ホルス警備隊\tHorus Security Squad
見た目にそぐわぬ柔らかな乙女心を持つホルス戦士\tA Horus warrior with a soft maiden heart that doesn't match his appearance.
実はヌヌススがエペネススス（驚愕の事実）\tActually, Nunusus is Epenesusus (shocking fact).
メガフォース\tMegaforce
ホルス警備隊\tHorus Security Squad
ホルスの戦士\tHorus Warrior
血気盛んな若者で\tA hot-blooded young man,
ホルスの格闘大会で優勝したこともある\tHe has also won the Horus martial arts tournament.
テラ\tTera
ホルス女王\tQueen of Horus
女王種として、生まれながらに威厳と気品を\tAs a queen type, born with dignity and grace,
兼ねそろえたホルス界を統べる女性\tShe is the woman who rules the Horus world, possessing both.
その美しさに月は嫉妬し、星々は輝きを増す\tThe moon envies her beauty, and the stars shine ever brighter.
――ホルスの国では\t—In the country of Horus,
プルーペット\tProuppet
商人\tMerchant
商売１\tBusiness 1
どこからともなく現れ誰とでも商売する謎の商人\tA mysterious merchant who appears from nowhere and trades with anyone.
お金儲けが大好きで、人の足元を見るのが得意\tLoves making money and is skilled at taking advantage of others.
額に生える毛は大人毛（おとなげ）生えると成人の証\tThe hair growing on the forehead is called "otonage"; growing it is a sign of adulthood.
アカシロ・カラー\tAkashiro Kara
リセットの乳母\tReset's Nursemaid
弓２、子育て１\tBow 2, Childcare 1
パステルの妹の一人\tOne of Pastel's younger sisters.
リセットの護衛兼教育係を務めている\tServes as Reset's bodyguard and tutor.
昔はやんちゃで、\tUsed to be mischievous,
若い男と恋に落ちたこともあるとか。\tIt is said she once fell in love with a young man.
アカシロ・カラー\tAkashiro Kara
リセットの乳母\tReset's Nursemaid
弓２、子育て１\tBow 2, Childcare 1
村の掟を破って人間の男と恋仲になったアカシロは\tAkashiro, who broke the village rules by falling in love with a human man,
一時、カラーの村から追放されたが男を自らの手で\tWas temporarily banished from the Kara village but with her own hands
殺したことで、罪を雪ぎ村に帰ることができた。\tkilled the man, absolving her crime and allowing her to return to the village.
実は病に伏した男が、彼女のため自ら命を絶った\tIn reality, the man was ill and took his own life for her sake.
４０年前の思い出。\tA memory from 40 years ago.
アスベスト\tAsbestos
アレルギー超大国親衛隊長\tCaptain of the Allergy Superpower Guard
盗賊２\tThief 2
ポピンズ一の戦士で、ポピンズ一の悪戯好き。\tThe greatest warrior in Poppins and also the biggest prankster.
性格に難はあるが、腕は立つ。\tHas a difficult personality but is skilled.
そして、性格の難はあまり問題にされないお国柄\tAnd her difficult personality is not much of a problem due to the country's nature.
拷問戦士\tTorture Warrior
男の子モンスター\tBoy Monster
きゃんきゃん\tKyan Kyan
女の子モンスター\tGirl Monster
最弱の女の子モンスター\tThe weakest girl monster.
攻撃力はほとんど無く、誰に対してもニコニコと\tHas almost no attack power and smiles happily at everyone.
遊びに誘ってくる\tInvites others to play.
弱く無警戒なモンスターだが、何故か絶滅しない\tA weak and unsuspecting monster, yet somehow it does not go extinct.
幸福きゃんきゃん\tHappy Kyan Kyan
女の子モンスター\tGirl Monster
きゃんきゃんの突然変異\tA mutation of Kyan Kyan.
莫大な経験値を持つ冒険者のアイドル\tThe idol of adventurers with enormous experience points.
一見普通のきゃんきゃんと変わりないように見えるが\tAt first glance, she looks no different from a normal Kyan Kyan,
生で見るとオーラが違う。冒険者にはわかる\tbut when seen in person, her aura is different. Adventurers can tell.
９７チハ\t97 Chiha
女の子モンスター\tGirl Monster
ブリキの砲台と紙装甲でがんばる女の子モンスター\tA girl monster who does her best with tin artillery and paper armor.
頭の大砲はにほん兵さんに\tThe cannon on her head needs the Japanese soldier
操作してもらわないと発射できない\tto operate it; otherwise, it cannot be fired.
ラルカット\tRarkat
女の子モンスター\tGirl Monster
こうもりタイプの女の子モンスター\tA bat-type girl monster.
すばしっこく捕まえるのが厄介\tNimble and difficult to catch.
普段はクールだが、夜は甘えんぼ\tUsually cool, but becomes affectionate at night.
メイドさん\tMaid-san
女の子モンスター\tGirl Monster
他人のお世話をするのが大好きなみんなの人気者\tLoved by all as she loves taking care of others.
家に飼えば勝手にお掃除してくれる\tIf kept at home, she cleans on her own.
いつもダンジョンが綺麗なのは彼女のおかげです\tThe dungeon is always clean thanks to her.
フローズン\tFrozen
女の子モンスター\tGirl Monster
彼女を抱いた者は最高の快楽と引き換えに\tThose who embraced her, in exchange for the utmost pleasure,
体温を奪われ、幸福のうちに凍死するという\twould have their body heat stolen and die frozen in bliss.
年若い少年を好む\tShe prefers young boys.
雪うさぎが天敵\tSnow rabbits are her natural enemy.
マジック・スコルピオン\tMagic Scorpion
女の子モンスター\tFemale monster.
その名のとおり魔法タイプのモンスター\tA magic-type monster, as the name suggests.
「火爆破」に気をつけろ！\tBeware of 'Fire Explosion'!
正式名称よりも略称で呼ばれることが多い\tShe is more often called by her abbreviation than her official name.
バルキリー\tValkyrie
女の子モンスター\tFemale monster.
神の血が混じっているという戦闘種族\tA fighting race said to have the blood of gods mixed in.
脅威の回避力を誇るスピード特化の格闘タイプ\tA speed-specialized melee type boasting incredible evasion.
彼女と子を作るのが男の子モンスターの最高の\tFor male monsters, having children with her is considered the highest
ステータスだといわれ、いつも戦っている\tstatus, they say, and they are always fighting.
神風\tKamikaze
女の子モンスター\tFemale monster.
百発百中の弓の威力は脅威\tThe power of her bow, which never misses, is a threat.
その戦闘力は中・上級冒険者の大きな壁となる\tHer combat ability is a significant barrier to mid- and high-level adventurers.
和系モンスターの中で特に礼儀作法に厳しい\tAmong Japanese-style monsters, she is particularly strict about etiquette and manners.
ハチ女\tBee Woman
女の子モンスター\tFemale monster.
小型の女の子モンスター\tA small female monster.
「ハチの一刺し」は多くの冒険者の命を奪ってきた\tHer 'bee sting' has taken many adventurers' lives.
こんな姿でも男の子モンスターとセックスできる\tDespite her appearance, she can have sex with male monsters,
というのだから恐ろしい\twhich is terrifying.
はいからちゃん\tHaikara-chan
絶滅危惧種女の子モンスター\tAn endangered female monster species.
ＪＡＰＡＮの和服に身を包んだ女の子モンスター\tA female monster clad in traditional Japanese clothing from JAPAN.
銃剣で戦うその戦闘力は中々侮れない\tHer fighting strength with a bayonet is not to be underestimated.
潔癖でウブなところがあり異性と会話するのは\tShe is fastidious and naive, and thinks that talking with the opposite sex is
とてもエッチなことだと思ってる\ta very naughty thing.
シャチ子\tShachiko
絶滅危惧種女の子モンスター\tAn endangered female monster species.
海の殺し屋と称される女の子モンスター\tA female monster called the assassin of the sea.
海に好んで生息する性質らしく数が減っている\tShe prefers to live in the sea, and her numbers are dwindling.
捕らえた獲物を群れでもてあそんで楽しむ\tShe enjoys toying with her captured prey along with her group.
残虐な一面を持ち合わせている\tShe possesses a cruel side.
ガルバン\tGarban
絶滅危惧種女の子モンスター\tAn endangered female monster species.
言動こそ荒っぽいが弱きを助け強きを挫く\tThough rough in word and deed, she helps the weak and opposes the strong.
一本筋の通ったバンカラ女の子モンスター\tA straightforward, tough female monster.
喧嘩を三度の飯より好む\tShe prefers fighting to three meals a day.
女の子扱いされると顔を真っ赤にして逃げ出す習性を持つ\tShe has the habit of blushing bright red and running away when treated like a girl.
めぽら\tMepora
絶滅危惧種女の子モンスター\tAn endangered female monster species.
両目が見えない身ながら\tThough she is blind in both eyes,
仕込み杖から放たれる刀の一閃は神速の一言\tThe swift slash of the sword released from her walking stick is nothing short of divine speed.
一見すると近寄りがたいが性格は飄々としており\tAt first glance she seems unapproachable, but her personality is carefree,
悪は見過ごせない義の者でもある\tand she is also a person of justice who cannot overlook evil.
上野花子\tUeno Hanako
絶滅危惧種女の子モンスター\tAn endangered female monster species.
額から長い鼻が生えている不思議な女の子モンスター\tA mysterious female monster with a long nose growing from her forehead.
こう見えてその怪力は凄まじくどんな敵にも負けない\tDespite her appearance, her monstrous strength is tremendous and she doesn't lose to any enemy.
……らしいのだが何しろ常にひもじいので力が出ない\t...or so it's said, but since she is always hungry, she can't show her full strength.
いつだって絶滅寸前\tAlways on the verge of extinction.
ミイラン\tMiiran
絶滅危惧種女の子モンスター\tAn endangered female monster species.
迷宮の奥深くなどに隠した棺の中で\tInside a coffin hidden deep within labyrinths and such,
長い眠りにつく女の子モンスター\ta female monster who falls into a long sleep.
その習性のせいで出会いがなく絶滅の危機に\tBecause of that habit, it has no encounters and is on the brink of extinction.
何故か自分のことを王だと思っており非常に尊大\tFor some reason, it thinks of itself as a king and is extremely arrogant.
鉄腕ラブル\tIron Arm Lablue
絶滅危惧種女の子モンスター\tEndangered species girl monster
小柄な体に無限の破壊力を秘めた女の子モンスター\tA girl monster with a small body hiding infinite destructive power.
自分よりも強いと認めた相手を好む習性を持つ\tHas the habit of liking those she recognizes as stronger than herself.
転じれば弱い相手には抱かれたがらない\tIn other words, she does not want to be embraced by weaker opponents.
挑戦する男の子モンスターは絶えないとか\tThere are said to be endless boy monsters who challenge her.
絶魔物男装女\tDemonic Monster Tomboy
絶滅危惧種女の子モンスター\tEndangered species girl monster
グラマーな体に長い金髪で、\tWith a glamorous body and long blonde hair,
男の子モンスターにモテモテな女の子モンスター\ta girl monster very popular with boy monsters.
しょっちゅう襲われるので男装をしているが\tShe dresses as a boy because she is frequently attacked,
バレバレの為、乱獲が進み絶滅の危機に\tbut since it's obvious, overhunting progresses and she is on the brink of extinction.
体育スター\tGym Star
絶滅危惧種女の子モンスター\tEndangered species girl monster
運動神経抜群の女の子モンスター\tA girl monster with outstanding athletic ability.
Ａクイック・Ｂクイックなどの攻撃をしかけてくる\tShe attacks using moves like A Quick and B Quick.
熱血スポーツ女の子モンスターでありブルマ\tA hot-blooded sporty girl monster, and she wears bloomers.
絶滅の危機に瀕している\tShe is on the brink of extinction.
手裏剣使い\tShuriken User
絶滅危惧種女の子モンスター\tEndangered species girl monster
巨大な手裏剣を体の一部のように扱う\tShe handles huge shurikens as if they were part of her body.
ちょっと危険な女の子モンスター\tA somewhat dangerous girl monster.
なんとその正体は作り物の人形\tAmazingly, her true identity is an artificial doll.
力を失うと元の姿に戻ってしまう\tIf she loses her power, she reverts to her original form.
ラカン\tLakan
魔物隊長\tMonster Captain
突然変異種のモンスターで、異常な生命力を持って\tA mutant monster possessing abnormal vitality,
生まれ、魔物としても規格外の長寿を誇っている\tborn with it, boasting exceptional longevity even among monsters.
ホーネットが生まれた時から仕えており\tHe has served Hornet since she was born,
彼女に深く忠誠を誓っている\tand has pledged deep loyalty to her.
王様\tKing
マエリータ隊部隊長\tMaeryta Squad Leader
ガード１\tGuard 1
るろんたの突然変異種\tA mutant of Ruronta.
仲間から排斥されることの多い突然変異種にあって\tAmong mutants who are often rejected by their comrades,
同種族の尊敬を集める圧倒的カリスマの持ち主\the possesses overwhelming charisma that earns respect from his own kind.
剣豪\tSwordmaster
マエリータ隊部隊長\tMaeryta Squad Leader
剣２\tSword 2
サメラ〜イの突然変異種\tA mutant of Samerai.
ひたすらに強さだけを求め、常に鍛錬を怠らない\tHe relentlessly seeks strength alone and never neglects training.
学問にも精通しているがそれを発揮するには\tHe is also well-versed in academics, but to demonstrate it,
語彙が足りない\this vocabulary is insufficient.
アパッチ\tApache
マエリータ隊部隊長\tMaeryta Squad Leader
斧１\tAxe 1
ヤンキーの突然変異種ネイティブヤンキー\tA mutant yankee, a native yankee.
戦士としての誇りを重んじ、命を惜しまない男\tA man who values the pride of a warrior and does not cling to his life.
アクセサリーはお洒落\tHis accessories are fashionable.
学者\tScholar
マエリータ隊隊長\tMaeryta Squad Leader
魔法２\tMagic 2
アカメの突然変異\tA mutant of Akame.
高い知能を有し、学識豊かで多くの魔物に頼られている\tHe has high intelligence, is well-learned, and is relied upon by many monsters.
その知性ゆえに魔物としての有りかたを思索してきた\tBecause of that intellect, he has contemplated the way of monsters.
マッスル\tMuscle
マエリータ隊部隊長\tMaeryta Squad Leader
脅威の体脂肪率０パーセントを誇る\tHe boasts an astounding 0% body fat percentage.
ぶたバンバラの突然変異種\tMutant of the Pig Banbara
乱暴者だが仲間想い\tA thug but cares deeply for comrades
学者とは昔は仲が悪かったが今では無二の親友\tUsed to have a bad relationship with scholars but now an irreplaceable best friend
ニードル\tNeedle
マエリータ隊部隊長\tMaerita Squad Leader
ハチ女の突然変異種スズメバチ女\tMutant of the Bee Woman: Hornet Woman
普通のハチ女と違って蜜が作れない\tUnlike regular Bee Women, she cannot produce honey
怒りん坊で口が悪いが、本当はさびしがりや\tHot-tempered and sharp-tongued, but actually lonely
グリーンハニー\tGreen Honey
ハニー\tHoney
ハニー１\tHoney 1
よくみかける緑色のハニー\tCommonly seen green Honey
普通の茶色いハニーより少し強い\tSlightly stronger than the regular brown Honey
手に持つ武器の名は「トライデン」\tThe weapon held is called 'Trident'
ブルーハニー\tBlue Honey
ハニー\tHoney
ハニー１\tHoney 1
グリーンハニーより気持ち強いハニー\tHoney slightly stronger than Green Honey
その色はクール。左利きなところもクール\tHer color is cool. Being left-handed is also cool.
赤と緑に挟まれて、なんだか微妙に悲しい地味さがある\tSandwiched between red and green, she has a subtly sad plainness.
レッドハニー\tRed Honey
ハニー\tHoney
ハニー１\tHoney 1
熱く激しい真っ赤なハニー\tPassionate and fiery bright red Honey
なかなかの強さを見せる中級冒険者の脅威\tA threat to mid-level adventurers showing considerable strength
両手のトライデンが威圧的だ\tThe tridents in both hands are intimidating.
ハニ子\tHaniko
ハニー\tHoney
ハニー１\tHoney 1
ハニーのメス\tFemale Honey
オスハニーはハニ子と土をコネコネすることで子を作る\tMale Honeys create offspring by mixing soil with Haniko.
ハニ子を射止めるにはロマンチックな\tTo win Haniko's heart, one must have a romantic
愛の言葉を囁かなくてはならない\tWhisper words of love.
ハニーキング\tHoney King
ハニーキング\tHoney King
ハニー３\tHoney 3
全てのハニーの頂点に立つ偉大なるハニーの王\tThe great Honey King standing at the pinnacle of all Honeys.
眼鏡っこをこよなく愛している\tHe dearly loves girls with glasses.
不幸な女の子も愛する\tHe also loves unfortunate girls.
あとコロッケも愛する\tHe also loves croquettes.
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
ｘｘｘ\txxx
ｘｘｘ\txxx
ｘｘｘ\txxx
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
１２３４５６７８９０１２３４５６７８９０１２３４５６\t12345678901234567890123456
青色魔物兵\tBlue Monster Soldier
魔物兵\tMonster Soldier
青色魔物スーツを着用した魔物兵\tMonster soldier wearing a blue monster suit
緑とは違うのだよ緑とは\tIt's different from green, unlike green.
赤色魔物兵\tRed Monster Soldier
魔物兵\tMonster Soldier
赤色魔物スーツを着用した魔物兵\tMonster soldier wearing a red monster suit
ほかの魔物兵より少し偉い\tSlightly more important than other monster soldiers
３倍くらい偉い\tAbout three times more important
魔物兵３号\tMonster Soldier No. 3
魔物兵\tMonster Soldier
飛行魔物スーツを着用した魔物兵\tMonster soldier wearing a flying monster suit
飛べるタイプの魔物が着用することで\tWorn by flying-type monsters,
飛行能力が安定する。\tflight ability becomes stable.
魔物兵４号\tMonster Soldier No. 4
魔物兵\tMonster Soldier
魔法魔物兵スーツを着用した魔物兵\tMonster soldier wearing a magic monster soldier suit
もちろん中身はメイジマンやマジスコだ\tOf course, inside are Mage Man or Magisco.
キバオー\tKibao
次世代魔物\tNext-generation Monster
命の聖女モンスターウェンリーナーが\tThe Saintess of Life Monster Wenliner
ランスの遺伝子を取り込んで生み出した魔物\tA monster born by incorporating Lance's genes
こうみえて優しい\tDespite appearances, gentle
ハンマーン\tHamman
次世代魔物\tNext-generation Monster
大地の聖女モンスターハウセスナースが\tThe Saintess of the Earth Monster House Nurse
ランスの遺伝子を取り込んで生み出した魔物\tA monster born by incorporating Lance's genes
リーダー気質の男前\tA handsome man with a leader's spirit
ホワイトサタン\tWhite Satan
次世代魔物\tNext-generation Monster
時の聖女モンスターセラクロラスが\tThe Saintess of Time Monster Selacloras
ランスの遺伝子を取り込んで生み出した魔物\tA monster born by incorporating Lance's genes
感受性豊かな芸術家肌\tAn artist with rich sensitivity
キレキレタコラ\tSharp Octola
次世代魔物\tNext-generation Monster
力の聖女モンスターベゼルアイが\tThe Saintess of Power Monster Bezel Eye
ランスの遺伝子を取り込んで生み出した魔物\tA monster born by incorporating Lance's genes
暴れん坊だがやるときはやる\tA troublemaker, but gets things done when needed
使徒ルーシー・ジュリエッタ\tApostle Lucy Julieta
ゼス永久客人\tZeth’s Permanent Guest
長き時を生きる占い師の少女\tA girl fortune teller who has lived for a long time
ゼス建国者パセリの友人として\tAs a friend of Zeth's founder, Paseri
国家建立に尽力した\tShe contributed to the founding of the nation
駄菓子大好き\tLoves cheap sweets
使徒ルーシー・ジュリエッタ\tApostle Lucy Julieta
ゼス永久客人\tPermanent guest of Zeth
魔人バークスハムの使徒\tApostle of the demon Baksham
約５００年前に、魔王の後継者を探す任務を受けて\tAbout 500 years ago, she was commissioned to find the successor to the Demon Lord
大陸南部に赴任した\tShe was assigned to the southern part of the continent
使徒アーシー・ジュリエッタ\tApostle Arcy Julieta
占い師\tFortune teller
各地を放浪する伝説の占い師\tA legendary fortune teller who wanders various places
主にリーザスから自由都市に現れる\tMainly appears from Lizas to free cities
占いの的中率は１００％\tA 100% accuracy rate in fortune telling
代価は美味しいお菓子\tThe price is delicious sweets
使徒アーシー・ジュリエッタ\tApostle Arcy Julieta
占い師\tFortune teller
魔人バークスハムの使徒\tApostle of the demon Baksham
約５００年前に、魔王の後継者を探す任務を受けて\tAbout 500 years ago, she was tasked with finding the Demon Lord's successor
大陸東部に赴任した\tShe was assigned to the eastern part of the continent
使徒マーシー・ジュリエッタ\tApostle Marcy Julieta
ＵＭＡ\tUMA (Unidentified Mysterious Animal)
魔人バークスハムの使徒\tApostle of the demon Baksham
約５００年前に、魔王の後継者を探す任務を受けて\tAbout 500 years ago, she was commissioned to find the Demon Lord’s successor
大陸北部に赴任した\tAssigned to the northern part of the continent
死亡したと思われていたが\tShe was thought to have died
シベリアの厳しい大地に適応進化し、生き残っていた\tBut she adapted and evolved to the harsh Siberian land and survived
来水美樹\tMiki Konomizu
逃亡魔王\tFugitive Demon Lord
魔王１\tDemon Lord 1
新しい魔王となるべく異世界から連れて来られた女の子\tA girl brought from another world to become the new Demon Lord
魔王ガイから血の継承が行われたが覚醒を拒み逃亡した\tReceived blood inheritance from Demon Lord Guy but rejected awakening and fled
未覚醒ながらも強靭な肉体や暴発する魔力に、\tAlthough unawakened, her strong body and explosive magical power
魔王の恐るべき力の片鱗を見ることが出来る\tShow a glimpse of the terrible power of the Demon Lord
来水美樹\tMiki Konomizu
逃亡魔王\tFugitive Demon Lord
魔王１\tDemon Lord 1
魔人ワーグの力で記憶を書き換えられた美樹ちゃん\tMiki-chan whose memories were rewritten by the demon Warg’s power
彼女の中にあった健太郎の記憶はすべて\tAll memories of Kentarou inside her
ランスに差し替えられている\tHave been replaced with Lancer
健太郎君哀れ……\tPoor Kentarou...
来水美樹\tMiki Konomizu
逃亡魔王\tFugitive Demon Lord
魔王１\tDemon Lord 1
健太郎は故郷に帰れる日までと、我慢しているのだが\tKentarou is enduring it until the day he can return home
キスもされたことのない美樹は、\tMiki, who has never even been kissed,
自分に魅力が無いせいだと落ち込んでいた\tWas feeling down thinking it was because she had no charm
早く大人の女性になりたいが、魔王になったその日から、\tShe wants to become an adult woman soon, but from the day she became Demon Lord,
彼女の体の成長は止まってしまった\tHer body’s growth has stopped
小川健太郎\tKentarou Ogawa
逃亡魔人\tFugitive Demon Man
剣２\tSword 2
美樹ちゃんの幼馴染でボーイフレンド\tMiki-chan’s childhood friend and boyfriend
魔王にさらわれた美樹を追って異世界からやって来た\tCame from another world chasing Miki, who was kidnapped by the Demon Lord
こう見えて、何体かの魔人を倒しているツワモノ\tDespite appearances, he is a tough guy who has defeated several demon men
魔王リトルプリンセスが作った唯一の魔人である\tHe is the only demon man created by the Demon Lord Little Princess
魔人サテラ\tDemon Man Satera
ホーネット派魔人\tHornet faction Demon Man
ガーディアン２\tGuardian 2
魔王ガイによって、ホーネットの遊び相手として、\tBy Demon Lord Guy, as a playmate for Hornet,
人間界から連れて来られた少女\tA girl brought from the human world
魔人としての誇りを強く持ち、人間を見下している\tShe strongly holds pride as a demon and looks down on humans.
ガーディアン生成術が得意\tSkilled in guardian creation magic.
魔人サテラ\tDemon Satera
ホーネット派魔人\tHornet faction demon
ガーディアン２\tGuardian 2
自分で作成したガーディアンを使役するサテラは\tSatera, who commands guardians she created herself,
わざわざ自分の力を分けてまで、忠実なしもべを\tthought it unnecessary to go so far as to divide her own power to have loyal servants.
作る必要など無いと考えていた。所詮は魔人に劣る\tShe believed there was no need to make them; after all, they were inferior to demons.
下等な生物と仲良しごっこなど下らないと\tShe thought playing nice with inferior creatures was silly.
どうしても欲しい者がいるなんて思いもしなかった\tShe never imagined there would be something she desperately wanted.
魔人サテラ\tDemon Satera
ホーネット派魔人\tHornet faction demon
ガーディアン２\tGuardian 2
多感症で、少し愛撫されただけでイってしまう\tHypersensitive, she comes with just a little caressing.
圧倒的な力を持ちながら、ランスの愛撫に抵抗できず\tDespite her overwhelming power, she couldn’t resist Lance’s caresses,
処女を奪われてしまった\tand lost her virginity.
サテラはこの時の衝撃的な体験をずっと忘れられない\tSatera could never forget the shocking experience she had at that time.
シーザー\tCaesar
ガーディアン\tGuardian
魔人サテラが作成したガーディアンの最高傑作\tThe masterpiece guardian created by demon Satera.
無敵結界こそ無いものの\tThough it lacks an invincible barrier,
戦闘能力はサテラと同等の力を持つ\tits combat ability is equal to Satera's power.
サテラには絶対服従\tAbsolutely obedient to Satera.
魔人シルキィ・リトルレーズン\tDemon Silky Little Raisin
ホーネット派魔人\tHornet faction demon
付与２\tGrant 2
歴史上最も多くの人類を救った大英雄\tThe great hero who saved the most humans in history.
その代償として得た魔人の力も、裏切りの汚名も、\tThe demonic powers she gained as a price, as well as the stain of betrayal,
彼女の孤高の義心に一片の翳りも生むことは無い\thave never cast a shadow on her proud and righteous spirit.
強大な力を持っていたがケイブリスにより\tThough possessing great power, she was weakened by Kavebris.
弱体化させられている\tShe has been debilitated.
魔人シルキィ・リトルレーズン\tDemon Silky Little Raisin
ホーネット派魔人\tHornet faction demon
付与２\tGrant 2
人間時代から通して、男性経験はなく、恋人もいない\tFrom her human days through now, she has no experience with men and no lovers.
魔王ガイに対しては特別な感情を抱いていたようだ\tShe seemed to have special feelings for Demon King Guy.
派閥戦争に敗北し、捕虜となった時に彼女に恨みを持つ\tWhen defeated in the faction war and taken prisoner, many harbored resentment toward her.
多くの魔物兵によって輪姦され処女を失っている\tShe was gang-raped by many demon soldiers and lost her virginity.
魔人シルキィ・リトルレーズン\tDemon Silky Little Raisin
ホーネット派魔人\tHornet faction demon
付与２\tGrant 2
人間時代から通して、男性経験はなく、恋人もいない\tFrom human times onwards, she had no experience with men and no lovers.
魔王ガイに対しては特別な感情を抱いていたようだ\tShe appeared to hold special feelings toward Demon King Guy.
派閥戦争に敗北し、捕虜となった時に彼女に恨みを持つ\tAfter losing the faction war and becoming a prisoner, many resented her.
多くの魔物兵によって輪姦され処女を失っている\tShe was gang-raped by numerous demon soldiers and lost her virginity.
魔人ラ・ハウゼル\tDemon La Howzel
ホーネット派魔人\tHornet faction demon
魔法２\tMagic 2
エンジェルナイトの魔人と言われている\tShe is said to be the demon of the Angel Knight.
穏やかな平和主義者だが、怒るととても怖いらしい\tA calm pacifist, but apparently very scary when angry.
装備する武器はタワーオブファイヤー\tHer equipped weapon is the Tower of Fire.
拡散する火炎放射が広範囲の敵を焼き尽くす\tIts spreading flamethrower incinerates wide ranges of enemies.
魔人ラ・ハウゼル\tDemon La Howzel
ホーネット派魔人\tHornet faction demon
魔法２\tMagic 2
男性経験は皆無。魔人となる以前から、男性を\tHas no experience with men. Even before becoming a demon,
異性として意識した記憶すら無い\tshe has no memory of ever considering men as the opposite sex.
読書家だが性や恋愛を主題とした本に触れてこず\tShe is a reader but has not touched books about sex or love as subjects.
性知識そのものが無いに等しかった\tShe almost completely lacks sexual knowledge.
魔人ラ・サイゼル\tDemon La Saizel
逃亡魔人\tFugitive Demon
魔法２\tMagic 2
魔人ラ・ハウゼルの姉。本当は妹が大好きなのだが\tOlder sister of Demon La Howzel. She actually loves her younger sister very much, but
素直になれず顔を合わせるとつい喧嘩ばかりしてしまう\tShe can't be honest and ends up quarreling every time they meet.
装備する武器はクールゴーデス。収束する氷の光線が\tHer equipped weapon is the Cool Gordes. The converging ice beams
敵を貫通する。チャージすることで最大９連射が可能\tpierce through enemies. By charging, up to 9 consecutive shots can be fired.
魔人ラ・サイゼル\tDemon La Saizel
逃亡魔人\tFugitive Demon
魔法２\tMagic 2
男性経験は皆無だったが、ランスとの戦いに敗れた時\tShe had no experience with men, but when she was defeated in battle by Rance,
「先にイカせたら助けてやる」という条件で\tunder the condition of 'if you make me climax first, I'll help you',
強制的にシックスナインでフェラチオをさせられている\tshe was forced to perform a sixty-nine fellatio.
なんとか先に射精させられ、その場は助かった\tSomehow, she made him ejaculate first, and she was spared at that moment.
使徒ユキ\tApostle Yuki
サイゼルの使徒\tApostle of Saizel
格闘１、魔法１\tMelee 1, Magic 1
女の子モンスターのフローズンが魔人ラ・サイゼルの\tThe girl monster Frozen was given the blood of Demon La Saizel
血を与えられ使徒となった\tand became an apostle.
自由奔放にして支離滅裂、珍妙奇天烈にして摩訶不思議、\tFree-spirited yet incoherent, bizarre and peculiar, and utterly mysterious,
つまり非常にアレな性格をしている\tin other words, she has a very eccentric personality.
使徒ユキ\tApostle Yuki
サイゼルの使徒\tApostle of Saizel
格闘１、魔法１\tMelee 1, Magic 1
使途になる前に輪姦され死にかけた\tBefore becoming an apostle, she was gang-raped and nearly died.
ランスと戦闘に敗北後、ランスを挑発しセックスに誘い\tAfter being defeated in battle by Rance, she provoked him and invited him to sex,
挿入中に体を爆発させ、ランスのハイパー兵器を\tbut exploded her body during intercourse, freezing Rance's hyper weapon in ice.
氷漬けにしてしまった\tShe froze it solid.
使徒火炎書士\tApostle Flame Scribe
ハウゼルの使徒\tApostle of Howzel
軍師１\tStrategist 1
魔人ラ・ハウゼルの使徒\tApostle of Demon La Howzel
控えめで臆病な性格だが、智謀に長けた策士でもある\tShe has a modest and timid personality but is also a highly intelligent strategist.
主ハウゼルを守るためならどんな手段も厭わない\tShe will not hesitate to use any means to protect her master Howzel.
魔物界で図書館を運営している\tShe runs a library in the monster world.
使徒火炎書士\tApostle Flame Scribe
ハウゼルの使徒\tApostle of Howzel
軍師１\tStrategist 1
恥ずかしがり屋で色恋事は苦手\tShy and not good with romance.
常時身に着けている不気味な仮面が\tThe eerie mask she always wears
男を遠ざけていた\tkeeps men away.
ニミッツ・リーク\tNimitz Leak
半魔人\tHalf-Demon
槌０、情報魔法１\tHammer 0, Information Magic 1
魔人レキシントンの魔血魂を飲み込んだ少女\tA girl who swallowed the magical blood soul of Demon Lexington.
世を憎み、すべてを拒絶していたニミッツの心は\tNimitz's heart, full of hatred for the world and rejection of everything,
魔人の魂に和することなく、飲まれることもなく\tneither harmonized with the demon's soul nor was consumed by it,
不完全な融合を果たしている\tachieving an incomplete fusion.
ニミッツ・リーク\tNimitz Leak
半魔人\tHalf-Demon
情報魔法１\tInformation Magic 1
女子中心のいじめにあっており、男子生徒からは\tShe was bullied mainly by girls and was regarded by male students as
「ブス、汚い」といった認識をされ、レイプなどの\tugly and dirty', but had no experience of being raped or other such abuses.
被害を受けた経験は無かった。暴漢魔すら拒絶を覚えた\tEven violent demons felt rejection towards her.
風貌はひとえに彼女の心の暗さの反映であり、ランスに\tHer appearance is purely a reflection of the darkness in her heart, and to Rance,
とっては払えば晴れる霧のような程度のものだった\tit was nothing more than a mist that would clear once addressed.
ニミッツ・リーク\tNimitz Leak
半魔人\tHalf-Demon
情報魔法１\tInformation Magic 1
魔血魂との融合が不完全なため\tBecause of the incomplete fusion with the magical blood soul.
魔人状態と人間状態をオンオフできる\tCan toggle between demon form and human form.
魔人の姿は、ニミッツが肉体を乗っ取られた際の姿\tThe demon form is the appearance when Nimitz's body was possessed.
使徒アトランタ\tApostle Atlanta
レキシントンの使徒\tLexington's Apostle
魔法１、呪術１\tMagic 1, Sorcery 1
多くの女性を鏡に閉じ込めてきた危険な魔女\tA dangerous witch who has trapped many women inside mirrors.
魔人レキシントンの使徒であり、\tAn Apostle of the demon Lexington,
主の肉体に相応しい悪の心の持ち主を捜し求めている\tshe is searching for a wicked-hearted individual worthy of her master's body.
使徒アトランタ\tApostle Atlanta
レキシントンの使徒\tLexington's Apostle
魔法２\tMagic 2
服を着ない\tDoes not wear clothes.
なぜかいつも裸である\tFor some reason, she is always naked.
ジュノーのように見せようとしているわけでは\tIt doesn't seem like she’s trying to imitate Juno,
なさそうなので、服が嫌いなのかもしれない\tso she might just hate wearing clothes.
使徒ジュノー\tApostle Juno
魔人レキシントンの使徒\tDemon Lexington's Apostle
自分の美体を見せ付けるため、衣服は絶対に着ない\tShe never wears clothes to flaunt her beautiful body.
アトランタと手分けして、主の肉体に相応しい\tTogether with Atlanta, she searches for
美しい人物を捜し求めている\ta beautiful person worthy of their master's body.
使徒オーロラ\tApostle Aurora
ジークの使徒\tSiegh's Apostle
どんな衣装にも着替える変装能力を持っている使徒\tAn apostle with the ability to disguise herself in any costume.
人類の様々な機関にスパイとして入り込んでいる\tShe has infiltrated various human organizations as a spy.
意外と危険な存在\tShe is surprisingly dangerous.
主である魔人ジークを復活させるため奔走している\tShe is working hard to resurrect her master, the demon Siegh.
使徒オーロラ\tApostle Aurora
ジークの使徒\tSiegh's Apostle
処女。主人である魔人ジークにゾッコンだが\tA virgin. She is completely devoted to her master, the demon Siegh,
魔人一の紳士ジークが彼女に手を出すことは無かった\tbut Siegh, the most gentlemanly demon, never made a move on her.
ランスを騙すためトップレスで接待をしたことがあるが\tShe once entertained Rance topless in order to deceive him,
貞操は守っている\tyet she has preserved her chastity.
魔人ワーグ\tDemon Warg
元ケイブリス派魔人\tFormer member of the Cavebris faction of demons.
夢の中に潜り精神を操作する恐るべき魔人\tA fearsome demon who invades dreams to manipulate minds.
魔人でありながら、戦闘力は皆無に等しい\tDespite being a demon, her combat ability is almost nonexistent.
他者を強制的に眠らせる力は、制御が出来ず\tHer power to forcibly put others to sleep is uncontrollable,
周囲に避けられ、孤独な日々を過ごしてきた\tcausing those around her to avoid her, and she has lived lonely days.
魔人ワーグ\tDemon Warg
元ケイブリス派魔人\tFormer member of the Cavebris faction of demons.
ワーグが普段から厚着をしているのは\tWarg wears heavy clothing regularly
催眠効果のある体臭を抑えるためである\tto suppress her body odor which has a hypnotic effect.
全ての衣服を脱いだとき、その力は最大限に発揮される\tWhen she removes all her clothes, this power is unleashed to its fullest.
並外れた意志力なくば彼女の肢体を眺める事は出来ない\tWithout extraordinary willpower, one cannot even look at her body.
魔人ホーネット\tDemon Hornet
魔人筆頭\tTop demon.
魔法２、神魔法２、剣２\tMagic 2, Divine Magic 2, Sword 2
先代魔王ガイの娘として生まれた\tBorn as the daughter of the former Demon King Guy.
次代の魔王となるべく英才教育を受けたが、残念ながら\tShe was receiving elite education to become the next Demon King, but unfortunately,
魔王の器としての素質は生まれ持っていなかった\tshe was not born with the qualities to be a Demon King.
父の遺言に従い、美樹を魔王の座に据えたがっている\tFollowing her father’s will, she wants Miki to take the Demon King's throne.
魔人ホーネット\tDemon Hornet
魔人筆頭\tTop demon.
魔法２、神魔法２、剣２\tMagic 2, Divine Magic 2, Sword 2
ホーネット派を利用するために、ケイブリスは、当面は\tTo use the Hornet faction, Cavebris has, for the time being,
彼女に手をかけることはせず拘束するに留まっていた\trestrained her without harming her.
もしも救出に遅れていたら、彼女の純潔は\tIf the rescue had been delayed, her virginity,
その命とともに引裂かれていたことだろう\twould have been destroyed along with her life.
魔人ガルティア\tDemon Galtia
元ケイブリス派魔人\tFormer member of the Cavebris faction of demons.
剣２、ムシ使い３\tSword 2, Bug Tamer 3
魔人界一のグルメであり、常識を超えた大飯食らい\tThe greatest gourmet in the demon world and an extraordinarily voracious eater beyond common sense.
腹の穴はストマックホールと言う異界に繋がっている\tHis stomach hole connects to another world called the Stomach Hole.
人であった頃から十を超えるムシを体内に飼っており\tSince his human days, he has housed more than ten bugs inside his body.
ムシ使いの間では伝説的存在となっている\tHe has become a legendary figure among Bug Tamers.
使徒ラウネア\tApostle Launea
ガルティアの使徒\tApostle of Garthia.
ガルティアの使徒。体内に飼っていた複数のムシが\tApostle of Garthia. The multiple bugs he kept inside his body
融合して三体の使徒となった\tfused together to become three apostles.
粘度の高い糸の網や魔法障壁を展開する\tThey deploy sticky webs of threads and magical barriers.
コーヒーが好きだが、飲むと酔っ払う\tLikes coffee but gets drunk when he drinks it.
使徒タルゴ\tApostle Targo
ガルティアの使徒\tApostle of Garthia.
ガルティアの使徒\tApostle of Garthia.
脚でガルティアを掴み、腕の力で木々を跳躍し\tGrabs Garthia with its legs and leaps over trees using arm strength.
ガルティアの立体戦を補助する\tSupports Garthia's three-dimensional combat.
桃などの果実が大好物\tLoves fruits like peaches.
使徒サメザン\tApostle Samezan
ガルティアの使徒\tApostle of Garthia.
ガルティアの使徒\tApostle of Garthia.
ガルティアの空の足となるが、人を乗せての長時間\tBecomes the flying feet of Garthia, but long flights carrying people
飛行は無理なので、専ら緊急脱出等の際に使われる\tare impossible, so it is mainly used for emergency escapes and the like.
鹿せんべぇに目が無い\tHas no resistance to deer rice crackers (shika senbei).
魔人レイ\tDemon Rei
元ケイブリス派魔人\tFormer member of the Kavebris faction demons.
けんか２、サッカー２\tFighting 2, Soccer 2.
強力な雷気を身に帯びる魔人\tA demon that carries powerful lightning energy.
有り余る力のぶつける先を知らず\tDid not know where to channel his overflowing power.
鬱屈とした日々を過ごしていた\tSpent days in frustration and gloom.
誰かの為に生きるのも、悪くないかもしれない\tLiving for the sake of someone else might not be so bad.
パイアールロボ\tPyar Robot
ランス城備品\tEquipment of Rance Castle.
パイアールはいざと言う時のため、自身の脳を\tPyar replicated his own brain with perfect accuracy
完全な精度で複製し、バックアップとして保持していた\tand kept it as a backup in case of emergency.
ヒトとは何か、人格を定義するものは何なのか\tWhat is a human? What defines a personality?
我々はそれに答える術をいまだ持ち合わせていない\tWe still do not have a method to answer that.
魔人ケッセルリンク\tDemon Kessel Link
元ケイブリス派魔人\tFormer member of the Kavebris faction demons.
剣１、魔法２\tSword 1, Magic 2.
魔人四天王の一人に数えられる極めて強力な魔人\tAn extremely powerful demon counted among the Four Heavenly Kings of demons.
復活したばかりの肉体は、大いに力を失っているが\tAlthough his freshly resurrected body has greatly lost power,
それでもなお、恐るべき魔人であることに変わりはない\the remains a fearsome demon nonetheless.
魔人ケッセルリンク\tDemon Kessel Link
元ケイブリス派魔人\tFormer member of the Kavebris faction demons.
最弱の魔王と呼ばれたスラルを守るため、\tTo protect Slal, who was called the weakest demon king,
全ての女性の守護者たるため、彼女は肉体を男に変えた\tshe changed her body into a man to become the guardian of all women.
使徒パレロア\tApostle Paleroa
ケッセルリンクの使徒\tApostle of Kessel Link.
料理１、子育て１\tCooking 1, Childcare 1.
魔人ケッセルリンクの使徒の一人\tOne of Demon Kessel Link's apostles.
肉体年齢としては最年長\tThe oldest in physical age.
優しく、面倒見の良い包容力ある女性\tA gentle, nurturing, and compassionate woman.
いつも使徒仲間の若年組を気にかけている\tAlways looks out for the younger fellow apostles.
使徒パレロア\tApostle Paleroa
ケッセルリンクの使徒\tApostle of Kessel Link.
料理１、子育て１\tCooking 1, Childcare 1.
わが子を人体実験の道具にした夫を殺害し逃亡\tKilled her husband who used their child as a human experiment tool and fled.
絶望の中ケッセルリンクに出会った\tIn despair, she met Kessel Link.
子を失った彼女の悲しみを、ケッセルリンクは\tKessel Link slowly healed her grief over the loss of her child
時をかけて少しずつ、癒していった\tover time, little by little.
使徒バーバラ\tApostle Barbara
ケッセルリンクの使徒\tKesselrink's Apostle
魔法１\tMagic 1
魔人ケッセルリンクの使徒の一人\tOne of the demon Kesselrink's apostles
勝ち気で威勢の良い元気な女性\tA spirited and lively woman with a strong-willed nature
メイドとしての仕事や礼儀作法などは\tShe is still not good at her duties or manners as a maid,
未だに苦手だが主への忠誠心は他の使徒同様にある\tbut she has loyalty to her master like the other apostles.
使徒バーバラ\tApostle Barbara
ケッセルリンクの使徒\tKesselrink's Apostle
魔法１\tMagic 1
重篤の病に罹り、身動きのできない体で\tSuffering from a serious illness, with a body unable to move,
虐待を受け体を売らされていた\tshe was abused and forced to sell her body.
家族に捨てられ死に掛けていたところを\tAbandoned by her family and near death,
ケッセルリンクに拾われる\tshe was taken in by Kesselrink.
使徒ファーレン\tApostle Fahren
ケッセルリンクの使徒候補\tCandidate Apostle of Kesselrink
性技１\tSex Technique 1
ケッセルリンクに仕えるメイド\tA maid serving Kesselrink.
まだケッセルリンクの血を授かっておらず、\tShe has not yet received Kesselrink's blood,
正式には使徒ではなくただの人間\tand is officially not an apostle but just a human.
使徒ファーレン\tApostle Fahren
ケッセルリンクの使徒候補\tCandidate Apostle of Kesselrink
性技１\tSex Technique 1
奴隷として生まれ処女を失うと死ぬ呪いを賭けられ、\tBorn a slave, she was cursed to die if she lost her virginity,
いつ死ぬかという賭けの対象にさせられていたところを\tand made the subject of a bet on when she would die,
ケッセルリンクに助けられた\tbut was saved by Kesselrink.
使徒シャロン\tApostle Sharon
ケッセルリンクの使徒\tKesselrink's Apostle
格闘１、メイド１\tMartial Arts 1, Maid 1
魔人ケッセルリンクの使徒の一人\tOne of the demon Kesselrink's apostles.
主スラルを失ったケッセルリンクが\tAfter losing her master Slal, Kesselrink
最初に使徒にした女性\tmade her the first apostle.
３０００年近くずっと傍に居続けた\tShe has remained by his side for nearly 3,000 years.
使徒シャロン\tApostle Sharon
ケッセルリンクの使徒\tKesselrink's Apostle
統率１、魔法１\tLeadership 1, Magic 1
ある国の姫だったが、戦争の責任を押し付けられ\tShe was a princess of a certain country but was blamed for the war,
国民の怒りを買い、大衆から拷問、陵辱を受け\tincurring the people's wrath, subjected to torture and assault by the masses,
火あぶりにかけられつつあったが\tand was about to be burned at the stake,
ケッセルリンクによって命を救われた\tbut her life was saved by Kesselrink.
使徒エルシール\tApostle Elsir
ケッセルリンクの使徒\tKesselrink's Apostle
統率１、魔法１\tLeadership 1, Magic 1
魔人ケッセルリンクの使徒の一人\tOne of the demon Kesselrink's apostles.
高い統率力を持ち、メイド長として\tShe has high leadership skills and, as head maid,
使徒たちの指揮を執っている\tcommands the apostles.
使徒エルシール\tApostle Elsir
ケッセルリンクの使徒\tKesselrink's Apostle
メイド１、統率１、魔法１\tMaid 1, Leadership 1, Magic 1
貴族の娘だったが家が没落し、\tShe was a noble's daughter but her family fell into ruin,
性奴隷として小さな村で長年飼われ続けていた\tand she was kept as a sex slave for many years in a small village.
偶然立ち寄ったケッセルリンクによって\tShe was freed when Kesselrink happened to visit.
村は破壊され、彼女は解放された\tThe village was destroyed, and she was liberated.
使徒加奈代\tApostle Kanayo
ケッセルリンクの使徒\tKesselrink's Apostle
弓１、裁縫１\tBow 1, Sewing 1
魔人ケッセルリンクの使徒の一人\tOne of the demon Kesselrink's apostles.
いつもマイペースでニコニコ笑っている少女\tA girl who is always at her own pace and smiling cheerfully.
バーバラやリリムをからかう姿がよく見られる\tShe is often seen teasing Barbara and Lilim.
使徒加奈代\tApostle Kanayo
ケッセルリンクの使徒\tApostle of Kesselring
弓１、裁縫１\tBow 1, Sewing 1
武家の娘であったが、姉の嫉妬を受け\tShe was a samurai family's daughter, but was envied by her older sister,
言われ無き罪で死罪となる。刑の執行を待つ身で\taccused of a false crime and sentenced to death. While awaiting execution,
あったところをケッセルリンクが助けた\tKesselring saved her.
使徒リリム\tApostle Lilim
ケッセルリンクの使徒\tApostle of Kesselring
くのいち１、ぬいぐるみ作り１\tKunoichi 1, Stuffed Toy Making 1
魔人ケッセルリンクの使徒の一人\tOne of the demon Kesselring's apostles.
つっけんどんとしているが\tShe is blunt and curt,
仲間のメイドたちとの暮らしに\tbut finds great joy in living with her fellow maids,
誰よりも喜びを感じている\tmore than anyone else.
使徒リリム\tApostle Lilim
ケッセルリンクの使徒\tApostle of Kesselring
くのいち１、ぬいぐるみ作り１\tKunoichi 1, Stuffed Toy Making 1
身寄りであった叔父に命令され、、\tOrdered by her uncle, who was her only relative,
５０人の男に抱かれ、その首を狩ってきた\tshe was embraced by 50 men and hunted their heads.
その最後の首は殺人を命じた叔父自信である\tThe last head she took was that of the uncle who ordered the murders.
彼女の凶行は今なおヘルマンに伝説として語り継がれる\tHer brutal deeds are still told as legends in Herman.
使徒アルカリア\tApostle Alkaria
ケッセルリンクの使徒\tApostle of Kesselring
料理１\tCooking 1
魔人ケッセルリンクの使徒の一人\tOne of the demon Kesselring's apostles.
使徒としてはまだまだ年若いが\tStill very young as an apostle,
抜け目無いしたたかな女の子\tshe is a shrewd and cunning girl.
使徒アルカリア\tApostle Alkaria
ケッセルリンクの使徒\tApostle of Kesselring
料理１\tCooking 1
盗賊団に家を襲われ、家族全員が奴隷にされた\tHer home was attacked by a band of thieves, and her entire family was made slaves.
親兄弟とともに嬲られる日々を過ごし、\tShe spent days being tormented along with her brothers and sisters,
ひとり、ひとりと家族が死に行く中で最後の\tone by one her family died, and she was the last one left.
一人となったところをケッセルリンクに出会う\tWhen she was alone, she met Kesselring.
フェリス\tFeris
ランスの使い魔\tLance's Familiar
悪魔１\tDemon 1
カラー時代、ちょっと不良娘だったため悪魔となった\tDuring the Color era, she became a demon because she was a bit of a delinquent girl.
根は真面目だったので悪魔の仕事も誠実にこなし\tAt heart she was serious, so she performed her demon duties sincerely.
第六階級まで駆け上がったが、ランスに出会ったことで\tShe quickly rose to the sixth rank, but after meeting Lance,
坂を転がるように人生を転落させていった\ther life spiraled downward like rolling downhill.
フェリス\tFeris
ランスの使い魔\tLance's Familiar
悪魔１\tDemon 1
ランス。私の人生を滅茶苦茶にした男。私を弄ぶ酷い男\tLance. The man who ruined my life. The cruel man who toyed with me.
私を救い、匿ってくれた男。そして、あの子の父親\tThe man who saved me and hid me. And the father of that child.
・ＬＰ３／１月 ダークランスを出産\t— LP 3/1 month: Gave birth to Dark Lance.
・電卓迷宮：無し\t— Calculator Dungeon: None.
フェリス\tFeris
ランスの使い魔\tLance's Familiar
悪魔１\tDemon 1
ランスの悪知恵によって使い魔にされ、良い様に抱かれ\tShe was made a familiar by Lance's cunning, and taken advantage of,
フセイの日に中出しされたことでランスの子を孕んだ\tand was impregnated with Lance's child after being inseminated on the 'Fusei Day'.
人間の子を生んだ罰として、下級悪魔に輪姦され\tAs punishment for giving birth to a human child, she was gang-raped by low-level demons,
下等な兵隊悪魔を１０体ほど生まされている\tand gave birth to about ten low-class soldier demons.
ウィリス・藤崎\tWillis Fujisaki
第１１級天使 レベル神\t11th Rank Angel, Level God
ランスを担当しているレベル神\tThe Level God in charge of Lance.
元は人間のレベル屋だったが、一生懸命勉強して\tOriginally a human leveler, she studied hard
見事レベル神となった。頻繁にレベルアップを繰り返す\tand splendidly became a Level God. She frequently levels up.
ランスのおかげもあって、出世街道驀進中\tThanks to Lance as well, she is rapidly advancing the career path.
ウィリス・藤崎\tWillis Fujisaki
第１０級天使 ハイレベル神\t10th Class Angel High-Level God
１０級天使試験に合格し、\tHaving passed the 10th class angel examination,
見事ハイレベル神となったウィリス\tWillis who splendidly became a High-Level God
１１級までは頑張れば誰でもなんとか取れるが\tUp to the 11th class, anyone can somehow achieve it if they try hard,
１０級となるとそうはいかない。かなりすごい\tbut becoming a 10th class is not so easy. It's quite amazing.
ウィリス・藤崎\tWillis Fujisaki
レベル屋\tLevel-Shop Owner
神魔法０\tDivine Magic 0
リーザスでレベル屋を開いていたころのウィリス\tWillis during the time when she ran a level shop in Reisas
恋に仕事に受験にと大忙し\tBusy with love, work, and exams
ランスとの出会いで運気が上がった\tHer luck improved after meeting Rance
珍しい人かもしれない\tShe might be a rare person
ウィリス・藤崎\tWillis Fujisaki
第１１級天使 レベル神\t11th Class Angel Level God
高レベル者にストリップするレベル神の決まりで、\tBy the rule of Level Gods who strip for higher levelers,
ランスには散々裸を見られている\tRance has seen her naked countless times
その過程で、何度かエッチな悪戯もされている\tDuring that process, she has been subjected to naughty pranks several times
彼氏はいるがプラトニックな関係。らしい\tShe has a boyfriend, but it seems to be a platonic relationship.
ミカン\tMikan
第１３級天使 レベル神見習い\t13th Class Angel Level God Apprentice
レベルを上げるより、下げる方が得意という\tShe is said to be better at lowering levels than raising them,
恐ろしい女神様。ウィリスの弟子だが、\tA fearsome goddess. She's Willis's disciple, but
いつまで経っても見習いを卒業できない\tshe can never seem to graduate from being an apprentice.
レベル神の試験は鉛筆転がしで全問正解して合格した\tShe passed the Level God exam by rolling pencils and getting all answers correct.
ミカン\tMikan
第１３級天使 レベル神見習い\t13th Class Angel Level God Apprentice
レベル神には、担当者のレベルが一定に\tFor Level Gods, there is a strict rule that when their charge's level reaches a certain point,
達するごとにストリップしていくという鉄の掟がある\tthey must strip gradually with each achievement.
とりあえずミカンにはあんまり関係のない話\tAnyway, this doesn't really concern Mikan much.
使徒ケイブニャン\tApostle Cave Nyan
ケイブリスの使徒\tApostle of Cavebris
ニャンはケイブリス様の１の使徒！\tNyan is Cavebris-sama's number one apostle!
その名も最強将軍ケイブニャンにゃ！\tBy the name of the strongest general, Cave Nyan nya!
ケイブリス様への忠誠心は誰にも負けないのにゃ\tHer loyalty to Cavebris-sama is unmatched nya.
へ？ ポンコツ使徒？\tHuh? A useless apostle?
そんなこと言う奴にはニャンの肉球殺法にゃ！\tTo anyone who says that, Nyan will unleash her paw pad death blow nya!
使徒ケイブニャン\tApostle Cave Nyan
ケイブリスの使徒\tApostle of Cavebris
……こんなことして楽しいかにゃ？\t...Is doing this really fun, I wonder nya?
使徒ケイブワン\tApostle Cave Wan
ケイブリスの使徒\tApostle of Cavebris
ワンはケイブリス様の１の使徒\tWan is Cavebris-sama's number one apostle.
その名も無敵軍師のケイブワンよ\tBy the name of Invincible Strategist, Cave Wan.
ワンのケイブリス様への愛は本物わん\tWan's love for Cavebris-sama is genuine wan.
え？ へたれ使徒？\tEh? A wimpy apostle?
だ、誰がへたれ使徒わん！\tW-who are you calling a wimpy apostle wan!
使徒ケイブワン\tApostle Cave Wan
ケイブリスの使徒\tApostle of Cavebris
……なんで脱がすわん？\t...Why are you stripping me wan?
ベゼルアイ\tBezel Eye
聖女の子モンスター\tSaint Young Girl Monster
聖女モンスターの中でも物理攻撃に特化しており\tAmong the saint monsters, she specializes in physical attacks,
彼女が生み出した種にもその特徴が見られる\tand those characteristics are also seen in the species she has created.
また、周囲の者の戦闘力を増幅させる能力を持っている\tAdditionally, she possesses the ability to amplify the combat power of those around her.
ベゼルアイ\tBezel Eye
聖女の子モンスター\tSaint Young Girl Monster
その昔バンバラという博士に捕らえられ\tLong ago, she was captured by a scientist named Bambara,
様々な生物と強制繁殖させられている\tand was forced to breed with various creatures.
ぶたバンバラ、ぞうバンバラなどのモンスターは\tMonsters such as Pig Bambara and Elephant Bambara
この時期に生まれた\twere born during this period.
ベゼルアイ\tBezel Eye
聖女の子モンスター\tSaint Girl Monster
「力」の二つ名を持つ聖女の子モンスター\tA Saint Girl Monster known by the epithet "Power"
子を生むことを任務として世界を放浪している\tShe wanders the world with the mission of bearing children.
聖女モンスターの中では一番のしっかりもので\tAmong the Saint Monsters, she is the most reliable.
４人のリーダー格になっている\tShe is one of the four leaders.
ウェンリーナー\tWenlina
聖女の子モンスター\tSaint Girl Monster
「命」の二つ名を持つ聖女の子モンスター\tA Saint Girl Monster known by the epithet "Life"
おっとりしていて甘えたがりやさん\tShe is gentle-natured and a bit clingy.
ランスに助けられたことがあり、とっても懐いている\tShe was once saved by Rance and is very attached to him.
ウェンリーナー\tWenlina
聖女の子モンスター\tSaint Girl Monster
仲良くなった男の子モンスターと子供を作るが\tShe makes children with male monsters she befriends,
のんびりしているので強引にレイプされることもある\tBut due to her easygoing nature, she is sometimes forcibly raped.
酷い目にあってもしばらく泣くとすっきりして忘れる\tEven if she suffers greatly, once she cries for a while, she feels relieved and forgets it.
他人を恨まない性格\tShe has a personality that does not hold grudges.
ウェンリーナー\tWenlina
聖女の子モンスター\tSaint Girl Monster
生命力を司り、神魔法とは異なる力で\tShe governs vitality and with a power different from divine magic,
負傷や病を癒すことが出来る\tcan heal wounds and illnesses.
全ての力を使うことで、死者をも蘇らせる\tBy using all her power, she can even resurrect the dead.
ウェンリーナー\tWenlina
聖女の子モンスター\tSaint Girl Monster
セラクロラス\tSeracloras
聖女の子モンスター\tSaint Girl Monster
「時」の二つ名を持つ聖女の子モンスター\tA Saint Girl Monster known by the epithet "Time"
いつの間にか現れいつの間にか消える。興味を\tShe appears and disappears without notice. She follows things
示したものにフラフラとついていく掴み所の無い性格\tthat catch her interest, wandering restlessly with an elusive personality.
生死や物事に頓着しない精神性はある種最も神に近い\tHer indifference to life, death, and matters in general is in a way closest to a god.
セラクロラス\tSeracloras
聖女の子モンスター\tSaint Girl Monster
ぼーっとしているので\tBecause she is absent-minded,
よく男の子モンスターにレイプされているが\tshe is often raped by male monsters,
当人はまったく気にしていない\tthough she herself doesn't mind at all.
セックス中もほとんど何もしない。マグロ\tDuring sex, she barely does anything. She's like a log.
セラクロラス\tSeracloras
聖女の子モンスター\tSaint Girl Monster
「時間」と「魔法」に特性を持ち、高い魔力を有する\tShe has traits related to "Time" and "Magic," possessing high magical power.
過去、未来を見、物体の時間を操ることが可能\tShe can see past and future, and manipulate the time of objects.
来し方も行く末も、彼女にとっては「今」であり\tFor her, the past and the future are both the "now"
その性質ゆえか、彼女の肉体にも成体、幼体の別は無い\tPerhaps because of this nature, her body has no distinction between adult or juvenile.
セラクロラス\tSeracloras
聖女の子モンスター\tSaint Girl Monster
ハウセスナース\tHouses Nurse
聖女の子モンスター\tSaint Girl Monster
「自然」「天候」に特性を持つハウセスナースは\tHouses Nurse has traits related to "Nature" and "Weather" and
地形を自在に変化させる能力を持つ\thas the ability to freely alter terrain.
彼女が生み出す種は、その土地土地の影響を受けた\tThe species she births are influenced by the various lands,
個性的なモンスターが多い\tresulting in many unique monsters.
ハウセスナース\tHouses Nurse
聖女の子モンスター\tSaint Girl Monster
惚れっぽい性格で、彼女が新種を生むときは\tShe has a romantic personality, and when she gives birth to a new species,
おおむね恋愛を経て性交が行われる\tit is generally after romance and sexual intercourse.
たいていの場合子供を生むと相手は去ってしまうので\tUsually, once she gives birth, the partner leaves,
出産と同時にいつも失恋している。それでもめげない\tso she always suffers heartbreak with childbirth. Still, she doesn't give up.
ハウセスナース\tHouses Nurse
聖女の子モンスター\tSaint Girl Monster
「地」の二つ名を持つ聖女の子モンスター\tA Saint Girl Monster known by the epithet "Earth"
異常なまでに惚れっぽい性格をしており\tShe has an abnormally romantic personality.
人、魔物、ムシ、果ては無生物にまで惚れ\tFalling in love with humans, monsters, insects, and even inanimate objects,
相手の言うことをなんでも聞く危険な神様\tA dangerous god who listens to whatever the other party says.
ハウセスナース\tHowse's Nurse
聖女の子モンスター\tHoly maiden monster
魔人カミーラ\tDemon Kamila
元ケイブリス派魔人\tFormer Cavebris faction demon
ドラゴン２、魔法２\tDragon 2, Magic 2
悠久の時を生きる最後の牝ドラゴン。永らく\tThe last female dragon living through eternal times. For a long time,
魔人四天王一角を成し恐れられてきたが、その退廃的な\tShe was feared as one of the Four Heavenly Kings of demons, but due to her decadent
性格から、全盛期の力は大いに損なわれている\tpersonality, her power at its peak is greatly diminished.
自分に言い寄るケイブリスを侮蔑しているが、\tShe despises Cavebris who hit on her,
それ以上にホーネットを嫌悪していた\tbut she hates Hornet even more.
魔人カミーラ\tDemon Kamila
元ケイブリス派魔人\tFormer Cavebris faction demon
ドラゴン２、魔法２\tDragon 2, Magic 2
生まれて間もない頃からドラゴン王との交尾を\tFrom shortly after birth, she was forced to mate with the Dragon King.
強制されていた。魔人となってからは美少年趣味に走り\tAfter becoming a demon, she developed a preference for beautiful boys,
ラインコックなど美しい少年を使途とし、寵愛してきた\ttaking beautiful boys like Linecock as her followers and favoring them.
人類に捕らえられた後、身動きできない状態で\tAfter being captured by humans, she was immobilized and
何度かランスに犯されている\twas violated by Rance several times.
ランス\tRance
８代目魔王\t8th Generation Demon King
魔王２、剣３、魔法２\tDemon King 2, Sword 3, Magic 2
シィルを生き返らせる力を求めて魔王となったが\tHe became the Demon King seeking the power to resurrect Shirle,
それは果たされず次第に心を黒く染めていった\tbut that was never fulfilled, and gradually his heart grew dark.
そして魔王として覚醒しかけるとごとに\tAnd whenever he was about to awaken as the Demon King,
リセットがビンタを繰り返していた。\tReset repeatedly slapped him.
もう大丈夫\tIt's alright now.
ランス\tRance
元魔王\tFormer Demon King
剣２，冒険２\tSword 2, Adventure 2
魔王の力を捨てたランス\tRance who abandoned the power of the Demon King.
魔王の力を失っても、しばらくの間は\tEven after losing the Demon King's power, for a while,
強靭な肉体は保たれる。\this robust body remains intact.
まぁ俺様はもともとこれくらい強かったはずだ\tWell, I was supposed to have been this strong all along.
＜エール＞・モフス\t<Aile> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
ここからの物語の主人公はあなた自身だ\tFrom here, the protagonist of the story is you yourself.
ＡＬ教法王クルックー・モフスの子\tChild of AL Church Pope Krukku Mofus.
魔王の子の一人として冒険の旅にでる\tSetting out on an adventure as one of the Demon King's children.
＜エール＞・モフス\t<Aile> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
先人たちの経験と力は\tThe experience and power of those before you
余すことなくあなたに伝えられた\thave been fully passed down to you.
今こそ決着の時だ\tNow is the time for the decisive battle.
＜エール＞・モフス\t<Aile> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
あなたの強さはもはや、限界まで極まった\tYour strength has now reached its utmost limit.
人の身でこれほどの力をつけた者は歴史上にも\tNo one in history has attained such power in a human body,
いないと言って良いだろう\tit is safe to say.
＜エール＞・モフス\t<Aile> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
ここからの物語の主人公はあなた自身だ\tFrom here, you are the protagonist of the story.
ＡＬ教法王クルックー・モフスの子\tChild of AL Church Pope Krukku Mofus.
魔王の子の一人として冒険の旅にでる\tSetting out on an adventure as one of the Demon King's children.
＜エール＞・モフス\t<Aile> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
先人たちの経験と力は\tThe experiences and strength of those before you
余すことなくあなたに伝えられた\tHave been passed down to you without reserve
今こそ決着の時だ\tNow is the time for the conclusion
＜エール＞・モフス\t<Yell> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
あなたの強さはもはや、限界まで極まった\tYour strength has now reached its limit
人の身でこれほどの力をつけた者は歴史上にも\tThere is likely no one in history
いないと言って良いだろう\tWho has gained such power as a human being
＜エール＞・モフス\t<Yell> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
ここからの物語の主人公はあなた自身だ\tFrom here on, you yourself are the protagonist of the story
ＡＬ教法王クルックー・モフスの子\tChild of AL Pontiff Krucku Mofus
魔王の子の一人として冒険の旅にでる\tSetting out on an adventure as one of the Demon King's children
＜エール＞・モフス\t<Yell> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
先人たちの経験と力は\tThe experiences and strength of those before you
余すことなくあなたに伝えられた\tHave been passed down to you without reserve
今こそ決着の時だ\tNow is the time for the conclusion
＜エール＞・モフス\t<Yell> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
あなたの強さはもはや、限界まで極まった\tYour strength has now reached its limit
人の身でこれほどの力をつけた者は歴史上にも\tThere is likely no one in history
いないと言って良いだろう\tWho has gained such power as a human being
＜エール＞・モフス\t<Yell> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
ここからの物語の主人公はあなた自身だ\tFrom here on, you yourself are the protagonist of the story
ＡＬ教法王クルックー・モフスの子\tChild of AL Pontiff Krucku Mofus
魔王の子の一人として冒険の旅にでる\tSetting out on an adventure as one of the Demon King's children
＜エール＞・モフス\t<Yell> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
先人たちの経験と力は\tThe experiences and strength of those before you
余すことなくあなたに伝えられた\tHave been passed down to you without reserve
今こそ決着の時だ\tNow is the time for the conclusion
＜エール＞・モフス\t<Yell> Mofus
冒険者\tAdventurer
神魔法２，剣１，魔法１\tDivine Magic 2, Sword 1, Magic 1
あなたの強さはもはや、限界まで極まった\tYour strength has now reached its limit
人の身でこれほどの力をつけた者は歴史上にも\tThere is likely no one in history
いないと言って良いだろう\tWho has gained such power as a human being
見当ウズメ\tUzame Kentou
リーザス市民\tLeesas Citizen
忍者３\tNinja 3
ランスとかなみの間に生まれた娘\tA daughter born between Rance and Kanami
かなみの子とは思えないほど\tSo much so she doesn't seem like Kanami's child
忍者として凄まじい才能を秘めている\tShe has a tremendous talent as a ninja
見当ウズメ\tUzame Kentou
リーザス市民\tLeesas Citizen
忍者３\tNinja 3
忍者として正規の訓練を受けていないながらも\tThough she has not received formal ninja training
そのずば抜けた資質と、鍛え上げられた力には\tHer outstanding aptitude and well-trained strength
もはや並み居る忍者も相手にはならないであろう\tMake her a match for even the best of ninjas
Ｈなことはちょっと苦手かも\tShe might be a little bad with lewd things
見当ウズメ\tKento Uzume
リーザス市民\tResident of Lizas
忍者３\tNinja 3
その昔、ＪＡＰＡＮを駆け巡った一人の\tLong ago, there was a certain
天才くのいちがいた。\tgenius kunoichi who ran throughout JAPAN.
自由を愛し、カエルが苦手なその娘は\tLoving freedom and afraid of frogs, that girl
ほんのわずかな期間、ランスの友として冒険し\tadventured as Rance's friend for just a short time,
充実な日々を過ごして、この世を去ったという。\tspent fulfilling days, and then passed away from this world.
ミックス・トー\tMix To
医者\tDoctor
医術２、魔法２、料理１、政治１、剣１、盗賊１\tMedical Skill 2, Magic 2, Cooking 1, Politics 1, Sword 1, Thief 1
ミラクルとランスの間に生まれた子供\tA child born between Miracle and Rance.
覇道を好む母への反発と神異変によって\tDue to rebellion against his mother who favors conquest,
神魔法が失われつつあることから\tand the divine calamity causing lost divine magic,
人々を救う医学の道を志した\the aspired to the path of medicine to save people.
ミックス・トー\tMix To
医者\tDoctor
医術２、魔法２、料理１、政治１、剣１、盗賊１\tMedical Skill 2, Magic 2, Cooking 1, Politics 1, Sword 1, Thief 1
体も小さく正面戦闘は得意ではない\tSmall in body and not good at frontal combat.
しかし、人に興味のなさそうな態度の反面\tHowever, despite seeming uninterested in people,
こまごまと周囲の人間の状態に気を配れる\the carefully monitors the conditions of those around him.
広い視野を持ち、優れたサポート能力を発揮する\tWith a broad perspective, he demonstrates excellent support abilities.
ミックス・トー\tMix To
医者\tDoctor
医術２、魔法２、料理１、政治１、剣１、盗賊１\tMedical Skill 2, Magic 2, Cooking 1, Politics 1, Sword 1, Thief 1
ミックスにとって医学は、研究のための研究ではなく\tFor Mix, medicine is not research for the sake of research,
富や栄誉のためのものでもない。\tnor is it for wealth or honor.
人を救うための手段にすぎない。\tIt is merely a means to save people.
もしも神異変が解かれたとしても、彼女は\tEven if the divine calamity is resolved, she would
こともなげに、己の道を歩むであろう\tnonchalantly walk her own path.
ザンス・リーザス\tZans Lizas
リーザス王子 第３軍（赤の軍）将軍\tPrince of Lizas, General of the 3rd Army (Red Army)
剣２、政治１\tSword 2, Politics 1
リアとランスの間に生まれた子\tChild born between Ria and Rance.
リアから王としての教育を受けてきたため\tHaving been educated by Ria as a king,
傲岸不遜な態度を崩さない\the maintains a haughty and arrogant attitude.
しかし、リーザス最強の戦士の名はは\tHowever, the name of Lizas' strongest warrior
有無を言わせぬ本物の実力である\tis genuine power that brooks no objection.
ザンス・リーザス\tZans Lizas
リーザス王子 第３軍（赤の軍）将軍\tPrince of Lizas, General of the 3rd Army (Red Army)
剣２、政治１\tSword 2, Politics 1
日々陰ながら鍛錬を怠らないザンスであるが\tZans trains quietly every day, but
限界まで追い詰められた経験は無かった\the had never experienced being pushed to his limits.
死中に活を求める一瞬の閃きが\tA momentary flash seeking life amidst death
バイ・ロードに赤い死神の魂を宿す\timbued 'Buy Road' with the soul of the red grim reaper.
ザンス・リーザス\tZans Lizas
リーザス王子 第３軍（赤の軍）将軍\tPrince of Lizas, General of the 3rd Army (Red Army)
剣２、政治１\tSword 2, Politics 1
性格的には一見ランスに最も似ているかに見える\tIn terms of personality, he might seem most similar to Rance at first glance,
ザンスだが、童貞という一点で根本的に異なる\tbut Zans is fundamentally different in that he is a virgin.
実際のところ乱義に女性経験があるのかどうか\tIn truth, whether Rangi has any experience with women
聞いたことは無い。正直聞けない。\tis unknown. Honestly, no one asks.
ドッス\tDoss
盗賊\tThief
ガード１\tGuard 1
悪名高い双子の盗賊\tInfamous twin thieves.
とある犯罪組織に所属していたが\tThey belonged to a certain criminal organization,
下手を打って、処刑されるところだった\tbut messed up and were about to be executed.
ドッス\tDoss
盗賊\tThief
ガード１\tGuard 1
やると決めたことを\tA man who can persist stubbornly
愚直に続けることができる男\tin what he has decided to do.
パーティーが後ろから襲われることがあったら\tIf the party is attacked from behind,
最初に死ぬのは自分と決めている\the has resolved that he will be the first to die.
レリコフ・ヘルマン\tLerikoff Hellman
ヘルマン市民\tCitizen of Hellman
格闘２ 魔鉄匠１\tMartial Arts 2, Magitec Artisan 1
シーラとランスの間に生まれた子\tChild born between Sheila and Rance.
小柄ながらもすさまじい怪力の持ち主\tDespite her small stature, she possesses tremendous brute strength.
人の話を聞かずに突っ走ってしまう暴走機関車\tA runaway locomotive who rushes forward without listening to others.
パットン叔父さんやいとこのヒーローが大好き\tShe loves Uncle Patton and her cousin Hero.
レリコフ・ヘルマン\tLerikoff Hellman
ヘルマン市民\tCitizen of Hellman
格闘２ 魔鉄匠１\tMartial Arts 2, Magitec Artisan 1
恐れを知らず前へと進むレリコフにパットンが\tFor the fearless Lerikoff who moves forward,
ならばそれを貫けと伝授したのが\tPatton imparted the teaching to push through that.
無法の絶技武舞乱舞\tThe lawless ultimate technique: Martial Dance Chaos.
傷を治してくれる仲間なら\tIf there are comrades to heal your wounds,
お前の後ろにいくらでもいるさ\tthere are countless ones behind you.
レリコフ・ヘルマン\tLerikoff Hellman
ヘルマン市民\tCitizen of Hellman
格闘２ 魔鉄匠１\tMartial Arts 2, Magitec Artisan 1
幼少から友人といえるのはヒーローだけで\tSince childhood, the only true friend is Hero,
そのヒーローも実際には割と年下なので\tand Hero is actually somewhat younger,
同世代の友達というのはいなかったレリコフ\tso Lerikoff had no friends of the same age.
苦楽を共にする仲間との冒険は\tAdventures with comrades sharing joys and hardships
彼女にとってかけがえのない思い出となった\tbecame irreplaceable memories for her.
ワッス\tWass
盗賊\tThief
槌１\tHammer 1
悪名高い双子の盗賊\tInfamously notorious twin thieves.
兄弟以外と会話するのが苦手で非常に無口\tVery taciturn and bad at talking with anyone other than their brother.
悪意も敬意も、すべては行動で示す\tThey show all malice and respect through their actions.
ワッス\tWass
盗賊\tThief
槌１\tHammer 1
ほとんどしゃべらない二人だが\tThe two hardly speak,
どちらかといえばワッスの方が社交的\tbut Wass is somewhat more sociable.
簡単な文字なら読める\tHe can read simple letters.
スシヌ・ザ・ガンジー\tSushinu the Gandhi
ゼス王女\tPrincess of Zeth
魔法３\tMagic 3
マジックとランスの間に生まれた子\tChild born between Magic and Rance.
ゼス王家の血を受け継ぐ絶大な魔力を持って\tPossessing tremendous magical power inheriting the blood of the royal Zeth family,
生まれたが、それゆえ、自分の力を恐れ\tshe was born, but because of that, she fears her own power,
引っ込み思案な性格になってしまった。\tand developed a shy personality.
スシヌ・ザ・ガンジー\tSushinu the Gandhi
ゼス王女\tPrincess of Zeth
魔法３\tMagic 3
誰かを守りたいと願う心が\tA heart wishing to protect someone
自分を乗り越える力を与えてくれた\tgave her the power to overcome herself.
まだ怖いことばかりだけれど\tThough there are still many scary things,
なけなしの勇気を振り絞って\tshe musters the little courage she has,
必殺の白色破壊光線が暗闇を穿つ\tand her deadly white destructive beam pierces the darkness.
スシヌ・ザ・ガンジー\tSushinu the Gandhi
ゼス王女\tPrincess of Zeth
魔法３\tMagic 3
昔はザンスちゃんのお嫁さんになると言っていたが\tShe used to say she would marry Zansu-chan,
正直今はないなーって感じらしい。\tbut honestly, it seems she doesn’t feel that way anymore.
母親的にはクラウン家の跡取りを推しているが\tHis mother favors him to be the heir of the Crown family, but
あまり気乗りしない様子\tHe doesn't seem very enthusiastic about it.
ロッキー\tRocky
召使い\tServant
鎚１、ガード０\tHammer 1, Guard 0
十数年、様々なことがあり、冒険者となったロッキーは\tOver more than ten years, after various experiences, Rocky became an adventurer,
偶然ランスＪｒと出会い、彼の従者になることを誓った\tand by chance met Rance Jr., vowing to become his retainer.
ランスの子を陰ながら支えることが\tHe believes supporting Rance's child from behind the scenes
自分の天命と信じる男\tto be his own destiny.
魔想志津香\tMasou Shizuka
冒険者\tAdventurer
魔法２\tMagic 2
世界を放浪する熟練の魔法使い\tA skilled mage wandering the world.
事あるごとに魔王ランスに追いかけられ\tShe is chased by Demon Lord Rance at every opportunity,
抱かれていることから「魔王の愛人」とも言われる\tand because she is embraced by him, she is also called "Demon Lord's lover."
本人には言わないほうが良い\tIt's better not to tell her this directly.
魔想志津香\tMasou Shizuka
冒険者\tAdventurer
魔法２\tMagic 2
魔王の子らと同じく、常識を超えた才能限界を有する。\tLike the children of the Demon Lord, she possesses a talent limit beyond common sense.
これは、以前の志津香には明らかになかった特性である。\tThis is a trait that was clearly not present in the previous Shizuka.
極限の魔力が魔王の横面を叩く\tExtreme magical power strikes the side of the Demon Lord.
魔想志津香\tMasou Shizuka
冒険者\tAdventurer
魔法２\tMagic 2
時には独り、時には友と、そして今は最愛の家族と\tSometimes alone, sometimes with friends, and now with her beloved family,
長く永い旅路。\tshe travels a long and enduring journey.
そこには、頼みもしないのにいつもあの男が現れる。\tThere, that man always appears, unbidden.
――今はそこが目的地\t—That is now her destination.
ナギ・ス・ラガール\tNagi S. Ragaal
冒険者\tAdventurer
魔法２\tMagic 2
姉志津香と旅する魔法使い\tA mage who travels with her elder sister Shizuka.
魔王に追われるため、ひとつところにとどまれなく\tBecause they are chased by the Demon Lord, they cannot stay in one place.
なった志津香と、運命をともにすべく\tTogether with Shizuka, they share their fate.
姉妹２人であてどなく世界各地を渡り歩いていた\tThe two sisters wandered aimlessly across various parts of the world.
ナギ・ス・ラガール\tNagi S. Ragaal
冒険者\tAdventurer
魔法２\tMagic 2
魔王の子らとおなじ天井知らずの成長力は\tHer limitless growth potential, like the children of the Demon Lord,
己の肉体を分かちた時に混ざりあった\tis a characteristic shared when their bodies were divided and mixed.
もう一つの存在の特性である\tIt is a trait of another existence.
限界突破の姉妹が放つ白と黒の合体魔法に\tThe limit-breaking sisters unleash a combined magic of white and black,
もはや向かう所敵はなし\tand there are no enemies left to oppose them.
ナギ・ス・ラガール\tNagi S. Ragaal
冒険者\tAdventurer
魔法２\tMagic 2
志津香の負担を和らげるため、魔王には度々抱かれている\tTo ease Shizuka's burden, she is often embraced by the Demon Lord,
が、まっとうな恋愛経験となると微妙で\tbut when it comes to proper romantic experiences, it's complicated,
思いもよらぬところで初心な一面が出てくることも。\tsometimes revealing an unexpectedly innocent side.
魔王の子らに対しては\tTowards the children of the Demon Lord,
頼もしいお姉ちゃんでありたいと思っている\tshe wants to be a reliable older sister.
山本乱義\tYamamoto Rangyi
ＪＡＰＡＮ国主\tLord of JAPAN
弓２、政治１\tBow 2, Politics 1
五十六とランスの間に生まれた子\tThe child born between Isoroku and Rance.
若年ながらもＪＡＰＡＮの国主として\tThough young, he rules JAPAN as its lord,
見事に全国を収めている\tand admirably governs the entire nation.
ザンスとはライバル関係\tHe has a rivalry with Zansu.
山本乱義\tYamamoto Rangyi
ＪＡＰＡＮ国主\tJAPAN Lord
弓２、政治１\tBow 2, Politics 1
母から教え込まれた弓の腕は、魔法よりも遠くから\tThe archery skills taught by his mother boast greater range than magic,
百発百中の精度を誇る\tproudly possessing a perfect accuracy rate.
またザンスとの闘いを想定して磨き上げた連続射撃と\tAlso, he honed rapid-fire shooting skills expecting battles against Zans,
至近距離での短刀術によって\tand combined with close-range dagger techniques,
遠近自在の戦闘力を発揮する\the demonstrates versatile combat power at all ranges.
山本乱義\tRangiku Yamamoto
ＪＡＰＡＮ国主\tJAPAN Lord
弓２、政治１\tBow 2, Politics 1
一時は三種の神器を揃えた香姫がＪＡＰＡＮの帝と\tFor a time, Princess Kaori, possessing the Three Sacred Treasures, became the Emperor of JAPAN,
なっていたが神異変を境にその力も消えてしまった\tbut after the divine upheaval, that power vanished.
もとより大陸制覇の野望を持つ乱義にとっては\tFor Rangiku, who harbors ambitions to conquer the continent,
さしたる問題ではなかったようだ\tit did not seem to pose a significant problem.
毛利元就\tMotonari Mouri
毛利家次期当主\tHeir to the Mouri family
剣１、メイド１\tSword 1, Maid 1
てるとランスの間に生まれた子\tA child born between Teru and Rance.
獣のように獰猛な男でいくさ狂いの異常人\tA ferocious man like a beast, a war-obsessed abnormal person.
しかし、毛利家の中ではそれが正常\tHowever, within the Mouri family, that is considered normal.
不死の呪いを受けており、並大抵のことでは死なない\tHe bears an immortal curse and does not die from ordinary causes.
毛利元就\tMotonari Mouri
毛利家次期当主\tHeir to the Mouri family
剣１、メイド１\tSword 1, Maid 1
血の猛るままひたすらに、\tDriven relentlessly by raging blood,
暴れ狂うが毛利の華\the rampages wildly, the flower of the Mouri.
なれば魔人も魔王も神も、\tIf so, be they demon, demon king, or god,
噛み付き砕いてみせようぞ。\the will bite and crush them.
毛利元就\tMotonari Mouri
毛利家次期当主\tHeir to the Mouri family
剣１、メイド１\tSword 1, Maid 1
毛利家としての生き様を骨身に叩き込まれてきた元就は\tMotonari, ingrained with the way of life of the Mouri family in his bones,
己が悪童であると自覚しつつも、決して家族だけは\tthough aware he is a rascal, has sworn never to betray his family,
裏切ってはならないと心に誓っている\tand keeps that pledge in his heart.
叔母さん的にはそろそろ料理なども教えていきたい\tFrom an aunt’s perspective, she’d like to start teaching him cooking soon,
と思っているが、もう手遅れかもしれない\tbut it might already be too late.
リセット・カラー\tReset Color
カラー姫 シャングリラ外交官\tPrincess Color, Shangri-La Diplomat
弓１、魔法１、幸運１\tBow 1, Magic 1, Luck 1
パステルとランスの間に生まれた子\tA child born between Pastel and Rance.
世界の要衝シャングリラの外交官として活躍しており\tShe is active as a diplomat of the world’s strategic point, Shangri-La,
大陸中に様々な人脈を持っている\tand holds a wide range of connections throughout the continent.
人を正気に戻すクラウゼンの手は、過去の\tThe hand of Clausen that brings people back to sanity,
魔王との戦いでも極めて重要な役割を果たしてきた\thas played an extremely important role even in past battles against demon kings.
リセット・カラー\tReset Color
カラー姫 シャングリラ外交官\tPrincess Color, Shangri-La Diplomat
弓１、魔法１、幸運１\tBow 1, Magic 1, Luck 1
父親譲りの無限の才能限界を持つリセットだが\tReset inherits infinite talent limits from her father,
本質的に戦闘は得意ではない。\tbut fundamentally she is not good at combat.
それでも悔いを残さないよう、リセットは\tEven so, so as to have no regrets, Reset
ありったけの力を尽くす。\texerts all her strength.
その手を父に届けるため。\tTo deliver that hand to her father.
リセット・カラー\tReset Color
カラー姫 シャングリラ外交官\tPrincess Color, Shangri-La Diplomat
弓１、魔法１、幸運１\tBow 1, Magic 1, Luck 1
外の世界は恐ろしいと聞かされていたリセットだが\tReset was told the outside world is terrifying,
ランス城の日々は、世界をとても楽しいものと感じさせた\tbut the days at Rance Castle made her feel the world was very enjoyable.
本当はそうでなかったとしても、そうあってほしいと願う\tEven if it wasn’t really so, she wishes it were.
家族にとっても、そういう世界であってほしいと願う\tShe hopes it is such a world for her family too.
松下姫\tPrincess Matsushita
ポピンズ連合王国 第６王女\tPoppins United Kingdom 6th Princess
からくり１、冒険１\tMechanism 1, Adventure 1
ポピンズ王東芝と王妃松下の間生まれた娘\tDaughter born between Poppins King Toshiba and Queen Matsushita
思い込みが激しく\tStrongly stubborn
走り出したら止まらない情熱的な性格\tA passionate personality that doesn’t stop once she starts running
松下姫\tPrincess Matsushita
ポピンズ連合王国 第６王女\tPoppins United Kingdom 6th Princess
からくり１、冒険１\tMechanism 1, Adventure 1
母親から情熱的な恋物語を聞かされて育ち\tRaised listening to passionate love stories from her mother
ラブロマンスにとても憧れを抱いている。\tShe holds a strong admiration for love romances.
地上との交流がどんどん活発になってきた\tBeing born in a generation where exchanges with the surface world are becoming more active,
世代に生まれたため、ポピンズよりも\tmore so than the Poppins,
人間との恋に憧れがある\tshe longs for romantic love with humans.
松下姫\tPrincess Matsushita
ポピンズ連合王国 第６王女\tPoppins United Kingdom 6th Princess
からくり１、冒険１\tMechanism 1, Adventure 1
年齢的にはリセットの数歳年下になるが\tAge-wise, she is a few years younger than Reset,
寿命の短いポピンズとしては立派な成人\tbut as a Poppins with a short lifespan, she is a mature adult.
今回のメンバーでもっとも\tAmong the members this time,
「ちゃんとしたレディ」と言えるだろう\tshe could be called a 'proper lady'.
徳川深根\tTokugawa Fukane
癒し巫女\tHealing Miko (Shrine Maiden)
巫女２\tMiko 2
千姫とランスとの間に生まれた子\tChild born between Senhime and Rance.
もともと甘えん坊気質なところがあった娘だが\tShe originally had a spoiled, clingy nature,
巫女としての厳しい修行の反動で\tand as a reaction to the strict training as a miko,
さらに甘えん坊になってしまった\tshe became even more spoiled.
目指せ世界一の末っ子\tAiming to be the world's best youngest child.
徳川深根\tTokugawa Fukane
癒し巫女\tHealing Miko (Shrine Maiden)
巫女２\tMiko 2
怠け者な深根だが、もともと\tAlthough Fukane is lazy,
巫女として極めて大きな力を持っていた。\tshe originally possessed extremely great power as a miko.
甘えてばかりではいられない。\tShe can't just keep being spoiled.
みんなを守りたいから、深根は頑張った\tBecause she wants to protect everyone, Fukane has worked hard.
徳川深根\tTokugawa Fukane
癒し巫女\tHealing Miko (Shrine Maiden)
巫女２\tMiko 2
セックスを通じて魂の汚染を吸収する癒やし巫女だが\tShe is a healing miko who absorbs soul pollution through sex,
深根はその訓練で処女を失ったわけではない。\thowever, Fukane did not lose her virginity through this training.
一応その手のテクニックを勉強はしたが、\tShe did study such techniques to some extent,
実践したことはないのでどれほどのものか、本人にも\tbut since she has never practiced them, even she doesn't really know how effective they are.
分からない。長田君とか割れそうだし。\tShe doesn't understand. Like with Nagata-kun, it might break anyway.
長田君\tNagata-kun
冒険者\tAdventurer
ハニー１、冒険１\tHoney 1, Adventure 1
ハニワ界きってのおしゃれハニー\tThe most fashionable honey in the Haniwa world.
なんか冒険とかカッコよくね？と\tShe recently started adventuring thinking, "Isn't adventuring cool or something?"
最近冒険を始めた。\tShe recently started adventuring.
長田君\tNagata-kun
冒険者\tAdventurer
ハニー１、冒険１\tHoney 1, Adventure 1
好きな女の子のタイプはおっぱいが大きい人\tHis favorite type of girl is one with big breasts.
それでできれば眼鏡をかけてくれてると嬉しいけど\tAnd if possible, he'd be happy if she wears glasses.
まずはおっぱいかな、うん。\tFirst priority is breasts, yeah.
ヒーロー・ヘルマン\tHero Hermann
ヘルマン市民 ドラゴンカラーハーフ\tHermann citizen, dragon-colored half-breed.
プロレス２ ドラゴン１\tPro wrestling 2, Dragon 1
パットンとハンティの間に生まれた子\tChild born between Patton and Huntie.
ドラゴンカラーの性質を強く受け継いだ外貌だが\tHe inherited strong dragon-colored traits in appearance, but
精神的には年齢相応の子供。\tMentally, a child of appropriate age.
シーラ親子とは生まれたときから親交があり\tHas been close to the Sheela family since birth.
レリコフとは大の仲良し\tVery good friends with Lerikoff.
ダークランス\tDark Lance
冒険者 はぐれ悪魔\tAdventurer, Rogue Demon
剣２、悪魔１\tSword 2, Demon 1
フェリスとダークランスの間に生まれた子\tChild born between Felis and Dark Lance.
魔王の子の長兄であり、数年前には世界を率いて\tThe eldest son of the Demon King, who led the world several years ago.
魔王ランスとも戦った英雄的存在\tA heroic figure who once fought Demon King Rance.
因縁を断ち切るためネプラカスを追い続けている\tContinuously chasing Neprakass to sever their fate.
ダークランス\tDark Lance
冒険者 はぐれ悪魔\tAdventurer, Rogue Demon
剣２、悪魔１\tSword 2, Demon 1
ランスを倒さねばならないとう妄執に\tPossessed by the obsession that he must defeat Rance.
取り憑かれていたダークランスだったが\tDark Lance was possessed by this, but...
家族や仲間の支えによってその重圧から解放された。\tWas freed from that pressure by the support of family and comrades.
今は、ただ愛する家族を守るために力をふるう\tNow, he wields his power simply to protect his beloved family.
ダークランス\tDark Lance
冒険者 はぐれ悪魔\tAdventurer, Rogue Demon
剣２、悪魔１\tSword 2, Demon 1
たびたび襲い掛かって来るネプラカスを\tDark Lance had skillfully evaded the frequent assaults of Neprakass,
うまくかわしていたダークランスだったがある日、\tbut one day,
ネプラカスの矛先は、彼のパートナーへと向いた\tNeprakass turned his spear towards his partner.
重傷を負った彼女の姿を見た時、久しく忘れていた\tWhen he saw her severely wounded figure, emotions long forgotten awakened.
猛烈な怒りの感情が、魔剣グラムを最大成長させた\tA fierce anger caused the magic sword Gram to reach its maximum power.
アームズ\tArms
レアハンター\tRare Hunter
槍１、冒険１\tSpear 1, Adventure 1
世界のレアアイテム、レアモンスターを求め\tSeeking rare items and rare monsters worldwide,
未だ果てぬ旅路をゆく孤高のレアハンター\tA lone rare hunter on an endless journey.
装備に満載された様々なレアアイテムを駆使することで\tBy fully utilizing a variety of rare items equipped,
魔人すら討ち取る超人的な戦闘力を発揮する\tHe demonstrates superhuman combat power capable of defeating even demons.
アスカ\tAsuka
リーザス魔法軍特別隊員\tSpecial member of the Leazas Magic Army
魔法１、召喚２\tMagic 1, Summoning 2
ぬいぐるみとなった祖父の体となってくれる\tA little girl who has become the body of her grandfather, now in stuffed form.
小さな女の子。\tA small girl.
戦争は怖いけど、おじいちゃんのために頑張る\tAfraid of war but tries hard for her grandfather.
魔法の才能は上々\tHer magical talent is excellent.
ジャロ\tJaro
リーザス第１軍（黒の軍）隊員\tMember of Leazas 1st Army (Black Army)
レベルが高いということで\tBecause he has a high level,
メルフェイスのセックス相手に選ばれた男\tThe man chosen as Mel Face's sexual partner.
最初は有頂天だったが、己の立場の情けなさに\tAt first ecstatic, but due to the pitiable state of his position,
次第にねじれていった\tHe gradually became twisted.
ブリティシュ\tBritish
壁\tWall
剣２、ガード２\tSword 2, Guard 2
伝説の英雄エターナルヒーローのリーダー\tLeader of the legendary hero group Eternal Hero.
カオスすら認める稀代の英雄だった\tA rare hero even recognized by Chaos.
魔女エイナの弟子シンという男がエイナを討たれた\tA man named Shin, disciple of witch Aina, was killed by Aina.
復讐心から禁呪を放ち、ブリティシュは\tDriven by revenge, he cast a forbidden spell, and British was
呪いのコンクリート漬けにされてしまった\tsealed in a cursed concrete block.
リア\tRia
リーザス女王\tQueen of Leazas
政治２、性技１\tPolitics 2, Sexual Technique 1
相も変わらず辣腕ぶりを発揮する\tContinues to demonstrate her shrewd skill as always.
リーザスの国王。今年で在位２０年\tKing of Leazas. This year marks 20 years on the throne.
王者の道を突き進む怖い人だが息子には甘々\tA formidable person who pursues the path of a ruler, but indulgent with her son.
コンバート\tConvert
ヘルマンＡ級犯罪者\tHelman A-Class Criminal
戦術１\tTactics 1
元ヘルマン第二軍副将\tFormer Helman Second Army Vice General
悪宰相ステッセルと通じ、\tCollaborated with the evil prime minister Stessel,
パットンとヒューバートの盟友\tAn ally of Patton and Hubert
アリストレスを謀殺した\tAssassinated Aristores
権力者として返り咲くために魔物とすら結託する\tEven allied with demons to regain power as a ruler
バード・リスフィ\tBard Lisfi
冒険者\tAdventurer
剣１、冒険１\tSword 1, Adventure 1
顔が良いため女性にモテるが誰かと仲良くするたびに\tHandsome and popular with women, but every time he got close to someone,
ランスに寝取られていった。\tThey ended up being stolen by Rance.
何よりも彼は一目見た時からシィルに想いを寄せていた\tMore than anything, he had feelings for Sil from the moment he first saw her.
不遇の日々が心を漆黒に染めていく。\tHis days of misfortune darkened his heart to jet black.
ホ・ラガ\tHo Raga
隠者\tHermit
魔法３\tMagic 3
伝説の英雄エターナルヒーローの一員\tA member of the legendary heroes, the Eternal Heroes
ブリティシュの人物に惹かれ、魔王討伐の旅を\tAttracted to a person from British, joined the journey to defeat the Demon Lord
共にした凄腕の魔法使い。現在は北端の塔に隠遁し、\tA skilled magician who accompanied them. Currently secluded in the northernmost tower,
眉目秀麗な男性の貞操と引き換えにあらゆる知識を授ける\tKnown as the 'Sage of the North,' he grants all knowledge in exchange for the chastity of handsome men.
「北の賢者」の名で世に知られる\tKnown to the world as the 'Sage of the North'
よーぜふ\tYosef
ペット\tPet
ホ・ラガのペット\tHo Raga's pet
かたつむりが好物\tLikes to eat snails
シーラ\tSheila
ヘルマン共和国大統領\tPresident of the Helman Republic
神魔法１、投石１、魔鉄匠１\tDivine Magic 1, Stone Throwing 1, Demon Iron Smith 1
ヘルマンが民主政に移行してから１６年強\tMore than 16 years since Helman transitioned to democracy
すべての大統領選に勝利してきた\tHas won every presidential election
時には自分が立候補していないのに当選して\tSometimes elected even without running as a candidate,
しまったことも。\twhich has happened as well.
それはそれでどうなのか、とちょっと不安\tWhether that's a good thing or not is somewhat worrying.
タイガー将軍\tGeneral Tiger
東ヘルマン軍 将軍\tGeneral of the Eastern Helman Army
短剣１、戦術１\tDagger 1, Tactics 1
魔王によって妻子を殺された後\tAfter his wife and children were killed by the Demon Lord,
ホワイト将軍の東ヘルマン建国に協力した\tHe cooperated with General White in founding Eastern Helman.
魔王を肯定する世界のすべてを否定することが\tTo deny everything in the world that justifies the Demon Lord
彼にとっての弔い\tis his form of mourning.
ドギ・マギ\tDogi Magi
ランス盗賊団 首魁\tLeader of the Rance Thieves' Guild
片田舎の盗賊団としては破格の強さで\tExtremely strong for a countryside band of thieves,
魔王の子を自称していた男\tA man who claimed to be the child of the Demon Lord.
冬将軍１８１２\tGeneral Winter 1812
モンスター\tMonster
寒冷地帯に現れるモンスター\tA monster that appears in cold regions
周囲一帯を猛吹雪にしてしまう\tTurns the surrounding area into a fierce blizzard.
わざと負けて逃げることで相手を奥へ奥へと\tBy deliberately losing and retreating, it lures opponents deeper and deeper
引き込んでいく恐ろしい魔物\tinto its lair— a terrifying monster.
冬将軍１９４２\tGeneral Winter 1942
モンスター\tMonster
血も凍る零下３０度の氷雪世界\tAn icy world of minus 30 degrees Celsius that freezes the blood.
チューリップも凍る\tEven tulips freeze.
ザカリテ\tXacalite
はぐれ悪魔\tStray Demon
悪魔２\tDemon 2
「契約の椅子」というマジックアイテムに潜むはぐれ悪魔\tA stray demon lurking inside the magic item called the 'Contract Chair'.
椅子に座ると、命と引き換えに願いを叶えるというが\tWhen you sit in the chair, it grants your wish in exchange for your life.
契約は誠実に履行することなく言葉巧みに魂をだまし取る\tWithout sincerely honoring contracts, he cunningly deceives souls.
ゼス王家の者を何人も食い物にしてきた\tHe has exploited many members of the Zeth royal family.
ミリリッカ\tMiririka
ゼス雷軍 大隊長\tZeth Thunder Army Battalion Commander
ゼスの士官\tOfficer of Zeth
戦闘指揮中にアレフガルドに拉致され\tAbducted to Alefgard during combat command,
メディウサのペニスで\tby Medusa's penis,
内臓を食い破られて絶命した\this internal organs were torn apart, and he died.
ジャムコ\tJamco
ゼス光軍 中隊長\tZeth Light Army Company Commander
ゼスの士官\tOfficer of Zeth
メディウサのリクエストに合致した時\tWhen he met Medusa's request,
すべてを捨てて逃亡を試みたが\the abandoned everything and tried to escape,
かなわぬ望みであった\tbut it was an impossible hope.
マジック\tMagic
ゼス女王\tQueen of Zeth
魔法２\tMagic 2
ゼス王として動乱の魔王ランス時代を最前線に立ち\tAs Queen of Zeth, she stood at the forefront during the turbulent Demon King Rance era,
乗り越えてきた\tand overcame it.
国民からの信望は極めて篤いが、リーザスには\tShe is highly trusted by the people, but still struggles with Lizas.
いまだに振り回されている\tShe is still being controlled by Lizas.
ＹＯＲＡ\tYORA
闘神都市 都市長\tMayor of the Fighting God City
魔法科学１、政治１\tMagic Science 1, Politics 1
元はカサドの街に住んでいた気の弱い青年\tOriginally a timid young man living in the city of Casado,
イラーピュが墜落し、闘神都市ができたのち\tafter Ilapy fell and the Fighting God City was established,
頭角を現し、都市長となった\the emerged and became the mayor.
ひそかに手に入れた神の肉片を培養し\tHe secretly cultivates a piece of divine flesh he obtained,
何かよからぬことを企んでいる様子\tand seems to be plotting something evil.
ニーナ・ニルヴァーナ\tNina Nirvana
村人\tVillager
アリオスの幼馴染\tArios's childhood friend.
明るく優しい女の子\tA bright and kind girl.
勇者として旅立ったアリオスをずっと心配していた\tShe has always worried about Arios who set out as a hero.
日々の平穏な暮らしに喜びをかみしめている\tShe cherishes the joy of a peaceful daily life.
アレキサンダー\tAlexander
武術家\tMartial Artist
格闘２\tFighting 2
若き頃よりひたすらに強さを求め\tHe has relentlessly sought strength since his youth,
あくなき修行の道を走り続けた男\ta man who has persistently pursued the path of endless training.
鬼畜王戦争での凄まじい戦いぶりにより\tDue to his fierce fighting in the Demon Lord King War,
世界最強の格闘家の称号を得た\the earned the title of the world's strongest martial artist.
シュリ・セイハジュウ・ナガサキ\tShuri Seihajuu Nagasaki
闘神大会運営委員\tFighting God Tournament Organizing Committee Member
闘神大会の名物受付嬢\tThe famous receptionist of the Fighting God Tournament.
聞けば対戦相手の情報を教えてくれる親切なお姉さん。\tA kind older sister who, if asked, will give information about opponents.
勤続年数は不明。これからも。\tHer years of service are unknown. And counting.
マリア・カスタード\tMaria Custard
冒険者 マリア工場所長\tAdventurer, Maria Workshop Chief
機械２、魔法１\tMachinery 2, Magic 1
ダークランスの恋人\tDarklance's lover.
マリア工房は健在で定期的に\tMaria's workshop is still active and regularly
カスタムにも寄っているが\tmakes custom visits as well,
ダークランスの旅が決着をつけるまでは\tbut until Darklance's journey concludes,
そばにいることを優先している\tshe prioritizes staying by his side.
メアリー・アン\tMary Ann
シャングリラ市民\tCitizen of Shangri-La
料理１、編み物１、貝ハンター１\tCooking 1, Knitting 1, Shell Hunter 1
魔人レイの恋人\tDemon Rey's lover.
レイの立場を考えて、よく珍しい貝を拾ってあげている\tConsidering Rey's position, she often collects rare shells for him.
レイと対等であるため、使徒になることはない\tHe will never become an apostle because he is equal to Rei.
これからも…\tFrom now on as well...
バファムーン\tBafamoon
全裸教教祖\tFounder of the Naked Cult
格闘２、神魔法２\tMartial Arts 2, Divine Magic 2
元は敬虔なＡＬ教の信徒\tOriginally a devout follower of the AL religion.
神異変により神の恩恵を失った時絶望の闇に飲まれる\tWhen he lost the blessing of the gods due to the divine catastrophe, he was engulfed by the darkness of despair.
しかし彼は、己自信の力で人々を救わんと立ち上がった\tHowever, he rose up to save people by his own power.
すなわち、全裸である。\tIn other words, he is completely naked.
エロヤックＡＬＶ\tEroyack ALV
コンピューター\tComputer
魔人パイアールによって製作された\tCreated by the demon Paial.
巨大コンピューター\tA gigantic computer.
モニターは端末であり、本体は\tThe monitor is the terminal; the main body is...
ハイパービルと呼ばれる建造物全体\tThe entire structure called the Hyper Building.
船長\tCaptain
船長\tCaptain
航海士２\tNavigator 2
船の上で生まれ、船の上で育った生粋の船乗り\tA pure-blooded sailor born and raised on a ship.
過去に２度滿ち潮にも挑戦しているベテラン\tA veteran who has challenged the rising tide twice before.
本名は誰も知らない\tNo one knows his real name.
北条すず\tHojo Suzu
陰陽師\tOnmyoji (Yin-Yang Master)
陰陽１\tOnmyo 1
生時の魂の汚染が軽微だった者は\tThose whose souls were only mildly corrupted during life,
死後の魂の洗浄も簡易的なものになる\talso undergo a simpler cleansing of the soul after death.
それゆえ、強く生前の記憶を持つ事も\tTherefore, it is sometimes possible to strongly retain memories from life,
稀にあるのである\twhich rarely happens.
ＫＤ\tKD
？？？\t???
ドラゴン３\tDragon 3
神出鬼没に表れて、冒険者に意味不明な\tAn enigmatic being appearing suddenly and vanishing, posing incomprehensible
クイズを出してくる不思議存在\tquizzes to adventurers.
ジャハルッカス\tJaharlkas
罪人\tSinner
千年に一人生まれると言われるホルスの変異体。\tA mutant form of Horus said to be born once every thousand years.
強い力と殺戮衝動を持ち、ただただ同族を殺し続ける。\tPossessing great power and a killing urge, it continues slaughtering its own kind.
同族からはデスホルスと呼ばれ恐れられている。\tIt is feared and called Death Horus by its kin.
アスタコ\tAstaco
アレルギー超大国の技術の粋を結集して作られた\tBuilt by gathering the pinnacle technology of the super allergenic country.
半自律型多脚戦闘からくり\tA semi-autonomous multi-legged combat automaton.
どういう仕組みか、操縦席から口頭で命令を受け取る\tFor some reason, it receives verbal commands from the cockpit.
アリス\tAlice
看板娘\tPoster Girl
アリスソフトの看板娘\tThe poster girl of Alicesoft.
お供はカラスの諭吉\tHer companion is Yukichi the crow.
※女神ＡＬＩＣＥとは無関係です\t*Not related to the goddess ALICE.
闇アリス\tDark Alice
看板娘（闇）\tPoster girl (Dark)
アリスちゃんのお友達\tAlice-chan's friend.
とってもクール\tVery cool.
お供は真っ白い論吉\tHer companion is pure white Ronkichi.
ルート・アリ\tRoute Ari
教育１\tEducation 1
魔人パイアールの研究の失敗により\tDue to the failure of demon Paial's research,
肉の塊と化してしまったルートの肉体\tRoute's body became a mass of flesh.
生命活動は維持されており\tLife functions are maintained,
魂は肉にとどまっていた\tand the soul remained within the flesh.
戯骸\tPlay Corpse
使徒\tApostle
「朱雀」の別名を持つ魔人ザビエルの使徒\tApostle of the demon Xavier, also known as "Suzaku"
死んでも新たな肉体を得て転生するフェニックス\tA phoenix that reincarnates by gaining a new body even after death
早雲の恋人蘭の肉体に封印されていたが\tSealed within the body of Soun's lover Ran,
肉体ごと封印を破り復活した\tbroke the seal along with the body and revived.
ランスに一目惚れし、愛し合う機会を伺っている\tFell in love with Rance at first sight and is looking for an opportunity to reciprocate that love.
リクチェル・フォン・ド・コースス\tRikcherl von de Kossus
トレジャーハンター\tTreasure Hunter
呪術２\tJujutsu 2
魔法使いの間で有名な魔女\tA witch famous among magicians.
寒い夜に現れ、気まぐれに人に呪いをかけていく\tAppears on cold nights and capriciously curses people.
そして、呪われた人間の人生が破壊されてゆくさまを\tAnd watches joyfully from afar as the cursed person's life is destroyed.
遠くから楽し気に眺めている\t(Continuation of previous line) — enjoys watching from a distance.
ＤＤ\tDD
魔人\tDemon
魔王ランスが気まぐれに血を与えた魔人の一人\tOne of the demons whom Demon King Rance whimsically gave blood to.
元種族はパワーゴリラ\tOriginal species is Power Gorilla.
常にあらゆる痛みにさいなまれており\tConstantly tormented by all kinds of pain,
それを紛らわすため人間を喰らう\the eats humans to distract himself from it.
ゲイマルク\tGeimark
勇者\tHero
剣２、槍２、魔法１\tSword 2, Spear 2, Magic 1
魔王ランスを殺すため、人類を虐殺して回った勇者\tThe hero who went on a rampage slaughtering humanity to kill Demon King Rance.
その凶行は魔王ランスによって止められた\tHis rampage was stopped by Demon King Rance.
神異変によって勇者システムが異変を来たし\tDue to a divine anomaly, the hero system malfunctioned,
生ける屍と化した\tand he became a living corpse.
魔人かわぞえ\tDemon Kawazoe
魔人\tDemon
？？？\t???
通称天空の王。ＡＬ教によって補管されていた\tKnown as the King of the Sky. Was detained by the AL religion.
ますぞえの魔血魂を一体のハニーが盗み出した。\tA Honey stole Masuzoe's demonic blood soul.
彼は、その強靭な精神で、魔人ますぞえの精神を上書きし、\tWith his strong spirit, he overwrote demon Masuzoe's mind,
新たな魔人として生まれ変わった。\tand was reborn as a new demon.
新たな魔人として生まれ変わった（二回目）\tReborn as a new demon (second time).
魔人ますぞえ\tDemon Masuzoe
魔人\tDemon
？？？\t???
奈落の王と呼ばれるハニーの魔人\tHoney demon known as the King of the Abyss.
３００年後に世界を滅ぼすべく\tPlanning to destroy the world 300 years from now,
地下の奥底で力を蓄えている。\the is gathering power deep underground.
彼が死んでも、また新たなハニーが\tEven if he dies, another new Honey
魔人ますぞえとなる。\twill become Demon Masuzoe.
クエルプラン\tQuelprawn
１級神 魂管理局\tFirst-Class God, Soul Management Bureau
地上生物の全魂を最終的に管理する魂の管理者\tThe soul manager who ultimately manages all souls of living beings on the surface.
地上に生物が生まれたその時から、一秒も休むことなく\tFrom the moment creatures are born on the surface, without taking a single second off,
その激務をこなしつづけ、仕事部屋から\the continues to handle his overwhelming duties and has never
一歩も外へ出たことが無いという\tstepped outside his workspace even once.
女神ＡＬＩＣＥとは犬猿の中\tHe is mortal enemies with the goddess ALICE.
コーラ\tCola
勇者の従者\tHero's Attendant
いつの時代も勇者の傍に付き従って存在する少年\tA boy who has always accompanied heroes throughout the ages.
勇者の資格を得た者の元に現れ、彼によって\tHe appears before one who has gained the hero's qualification, and by him,
エスクードソードの所有権を授けられたものは\tthose bestowed ownership of the Escudo Sword
次代の勇者となる\tbecome the next hero.
コーラス００２４\tChorus 0024
４級神\tFourth-Class God
勇者の管理を行う中級神\tMid-level god who manages heroes.
勇者が魔王を討伐するよう誘導することを\tHis basic duty is to guide heroes to defeat the Demon King.
基本業務とする。実際に殺せなくともよい。\tIt is his fundamental job, but he does not have to actually kill him.
ただし、過剰に平和を維持するリトルプリンセスは\tHowever, the Little Princess who maintains excessive peace is...
可及的速やかに排除したいところであった。\tIt was a situation where I wanted to eliminate it as quickly as possible.
ジーク\tZeke
魔人\tDemon
剣戦闘Lv1、変身Lv1\tSword Combat Lv1, Transformation Lv1
変身が得意なモンスターまねしたの魔人\tA demon that mimics monsters skilled at transformation.
相手の心を読み、様々な者に姿を変え\tReads the opponent’s mind and transforms into various beings,
その力をも模倣することができる\tand can also imitate their powers.
卑怯なことが嫌いな紳士的な魔人\tA gentlemanly demon who hates cowardly acts.
黄色くて大きくて素敵\tYellow, big, and wonderful.
アリオス・テオマン\tArios Theoman
村人\tVillager
剣２\tSword 2
心優しい青年。そのため、勇者としては活躍しきず、\tA kind-hearted young man. Because of that, he couldn't fully succeed as a hero,
彼の姿は同世代のランスの活躍の陰に埋もれた\tHis presence was overshadowed by the achievements of his contemporary, Rance.
愛するものを失ったとき、彼は真の勇者として\tWhen he lost someone he loved, he stood up again as a true hero,
再び立ち上がる。死で死を喰らう力の化身として…\trising once more. As the incarnation of a power that devours death with death...
アリオス・テオマン\tArios Theoman
勇者\tHero
剣２\tSword 2
魔王を殺す。\tKills the Demon Lord.
魔王を守ろうとするものも全て殺す。\tKills anyone who tries to protect the Demon Lord as well.
その為ならどんなことでもやる。\tHe will do anything for that purpose.
力を得るのに必要ならば、人などいくらでも見殺しにする。\tIf necessary to gain power, he will abandon as many people as it takes.
勇者アリオス・テオマンが二度目の旅に出発した。\tHero Arios Theoman set out on his second journey.
ヌーク７７\tNuke 77
１１級天使\t11th-Class Angel
大怪獣クエルプラン討伐部隊に編制された天使\tAngel assigned to the Great Monster Quelplan subjugation unit.
エンジェルナイトではなく戦闘力は劣る\tNot an Angel Knight, so combat ability is inferior.
地上生物からの転生ではなく、\tNot reincarnated from an earthly creature,
天界で製造されうまれた天使\tbut an angel created and born in the heavenly realm.
ヌーク７７\tNuke 77
堕天使\tFallen Angel
天界からの帰還命令を長期にわたって無視した結果\tAs a result of ignoring the order to return from heaven for a long time,
堕天使となってしまった。\the became a fallen angel.
だってずっとそばに居たいんだもん…\tBecause I just want to stay by your side forever...
ネプラカス\tNeplacas
１級魔神\t1st-Class Demon God
上位悪魔は悪魔界に引きこもることが多いなか\tWhile high-ranked demons often seclude themselves in the demon realm,
第１階級でありながら地上に積極的に関与する珍しい存在\tthis rare 1st-rank demon actively involves himself on the surface world.
人間の子を孕んだフェリスへの懲罰を決定した\tHe decided the punishment for Felis, who bore a human child.
バスワルド\tBaswald
２級神 破壊神\t2nd-Class God, God of Destruction
勇者システムと共に実験的に生み出された存在\tAn entity experimentally created alongside the Hero System.
魂を汚染させたる者、神の尊厳を冒涜する者が\tWhen those who contaminate souls or blaspheme the dignity of gods,
一定数を超えた時、地上に神罰をもたらす破壊神\texceed a certain number, the God of Destruction brings divine punishment to the surface.
しかしいまいち使い勝手が悪かったため、別の実験のため\tHowever, since it was somewhat inconvenient to use, for another experiment,
その存在は二つに分かたれ５代目魔王ジルが拝領した\tthat existence was split into two, and the fifth Demon Lord Jill was bestowed one.
魔人バボラ\tDemon Babora
ケイブリス派魔人\tDemon of the Kebraist faction.
無制限に体が成長し続ける鬼の魔人。\tAn ogre demon whose body continues to grow without limit.
脳の大きさは変わらないため\tSince the size of the brain does not change,
総身に知恵が回らなくなってしまった。\twisdom no longer reaches throughout the entire body.
ラッシー\tLassie
ペット\tPet
夢イルカという珍しい生き物\tA rare creature called the Dream Dolphin.
人の心を読み取る生き物で、ワーグの心を代弁する\tA creature that reads human hearts and speaks for Warg's feelings.
ワーグにとっては大切な友だち\tA precious friend to Warg.
リトルプリンセス\tLittle Princess
７代目魔王\t7th Demon Lord
魔王１\tDemon Lord 1
魔王として覚醒してしまった美樹\tMiki, who has awakened as a Demon Lord
魔王の血に抗う者ほどその反動を大きく受ける\tThose who resist the blood of the Demon Lord suffer greater backlash.
もはや来水美樹としての人格は\tHer personality as Miki Kurasumi no longer exists,
洗い流された後のシミのごときものでしかない\tand is nothing more than a stain washed away.
レッドアイ\tRed Eye
ケイブリス派魔人\tKaeblis faction Demon
魔法３\tMagic 3
魔王に対抗すべく作り出された\tCreated to oppose the Demon Lord,
マジックアイテムは狂った凶器と化してしまった\tthe magic item has turned into a mad weapon.
魔王ナイチサは、この凶器に魔人の血を与えた\tDemon Lord Naichisa infused this weapon with demon blood.
ＡＬＩＣＥ\tALICE
１級神 人類管理局\tFirst-class god, Human Management Bureau
ＡＬ教を通じて人類を管理する１級神\tA first-class god who manages humanity through the AL religion.
世界から殺戮と混乱が尽きぬよう人々を導く\tGuides people so that slaughter and chaos never cease in the world.
魔人リズナ・ランフビット\tDemon Rizuna Runfbit
ランス派魔人\tRance faction Demon
槍１、魔法１、性技２\tSpear 1, Magic 1, Sex Technique 2
周囲の人間を強制的に発情させるフェロモンを放つ魔人\tA demon that emits pheromones forcibly arousing nearby humans.
両目を開いた時その力は最大限に発揮される\tIts power is maximized when both eyes are open.
魔人メディウサによって身体を破壊されたリズナは\tRizuna's body was destroyed by the demon Medusa,
魔王ランスの魔人となることで命を救われた\tbut her life was saved by becoming Demon Lord Rance's demon.
ＰＧ\tPG
試作ロボット\tPrototype robot
人間の肉体を機械的に完全に再現することを\tCreated with the goal of mechanically replicating the human body perfectly.
目指して作成された完全自律型の人形機械\tA fully autonomous doll machine made for that purpose.
１５メートルほどの巨大な機体として作成し\tBuilt as a giant unit about 15 meters tall,
超技術によって物理的に圧縮して人間大に小型化する\tusing advanced technology to physically compress and shrink it to human size.
圧縮に時間がかかるため、量産はできない\tBecause compression takes time, mass production is impossible.
ストロガノフ\tStroganoff
魔物大元帥\tGrand Marshal of Monsters
突き刺さった王剣フサフサ丸によって\tPierced by the royal sword Fusafusa-maru,
魔物界最弱の生物となった男。\the became the weakest creature in the monster world.
その剣を引き抜く時、命の灯火と引き換えに\tWhen he pulls out that sword, in exchange for the light of his life,
わずかなひととき、最強の魔物が復活する。\tfor a brief moment, the strongest monster is resurrected.
腹部にはスライム状の生物が入っておりそちらが本体\tInside his abdomen is a slime-like creature, which is the true body.
トッポス\tToppos
第二世代モンスター\tSecond-generation monster
世界で一匹しかいない特殊な生き物\tA unique creature, the only one of its kind in the world.
凄まじい戦闘力と生命力を誇り\tBoasts incredible combat ability and vitality,
生まれてから死ぬまで魔物を狩り続ける\thunting monsters continuously from birth until death.
ヒアウィゴー！（甲高い声）\tHere we go! (high-pitched voice)
骸骨王 モドカタ\tSkeleton King Modokata
ベズドグ山守備隊　レア男の子モンスター\tBez Dog Mountain Defense Unit, rare male monster.
ＪＡＰＡＮの黄泉比良坂で生まれたレアモンスター\tA rare monster born at Yomihirasaka in JAPAN.
殺戮を求める本能が常在戦場の牙となり\tIts instinct for slaughter becomes the fangs of a constant battlefield.
屍山血河の道を成す。\tIt paves a path of corpses and rivers of blood.
愛妻家。\tA devoted husband.
ツォトン\tTsoton
ゼス方面軍大将軍\tGeneral of the Zeth Front Army
ニィハオを愛しニィハオでないものを許さない\tLoves Nihao and will not forgive those who are not Nihao.
人類を品種改良し魔物の奴隷にふさわしい\tPlots to breed humanity to be suitable slaves for monsters,
愚かな生き物にしようと企む\tturning them into foolish creatures.
ホーネットの使徒に、作戦の杜撰さを嘲笑われた事を\tStill holds a grudge after being mocked by Hornet's Apostle for the plan's sloppiness.
いつまでも根に持っている\tNever lets it go.
ルメイ\tRumei
ヘルマン方面軍大将軍\tGeneral of the Helman Front Army
人類を制圧するだけでよい所、\tAlthough it would be fine to simply subjugate humanity,
ついつい殲滅に執心してしまう悪癖を持つ\tshe has a bad habit of obsessing over annihilation.
お気に入りの殺し方は焼却処分\tHer favorite method of killing is incineration.
人間をムシのように軽んじる魔物は珍しくないが\tMonsters who treat humans like insects are not uncommon,
ムシに尋常ならざる憎悪と嫌悪を抱くのがルメイである\tLumei harbors an extraordinary hatred and disgust for insects.
ピサロ\tPisaro
自由都市方面軍大将軍\tGeneral of the Free Cities Front Army
金銀財宝に目が無く、\tHe has an insatiable eye for gold and silver treasures,
落とした都市の金品を根こそぎ私財にしている\tand confiscates all the gold and goods of fallen cities as his private property.
そのために財宝探索隊や財宝運搬部隊を自軍内に作るほど\tTo that end, he has even established treasure-hunting and treasure-transporting units within his army.
金品の収集癖は多くのモンスターが持っているものだが\tMany monsters have a habit of collecting valuable items,
ピサロはその頂点にいると言って良い\tbut Pisaro can be said to be at the very pinnacle of that trait.
ヨシフ\tYoshif
リーザス方面軍大将軍\tGeneral of the Lizas Front Army
非常に疑い深く、あらゆる全てを信用していない\tExtremely suspicious, he trusts nothing at all.
彼への粗相は些細なものでも何らかの嫌疑となり\tAny slight offense against him, no matter how minor, becomes a suspicion.
大抵は死に繋がる\tUsually, it leads to death.
敵に対してより仲間に対してストレスを感じる性格からか\tPerhaps due to his personality that feels more stress towards comrades than enemies,
人間の雌に素直な好色を向ける一面をもつ\the also shows a straightforward lecherousness towards human females.
泥姫 バイランローズ\tMud Princess Bailan Rose
門番　レア女の子モンスター\tGatekeeper - Rare female monster
世界に一体しかいないレア女の子モンスター\tA rare female monster of which there is only one in the world.
軟体系に属する肉体はあらゆる攻撃を跳ね返す\tHer soft-bodied form repels all kinds of attacks.
夫を愛し、夫に尽くし、夫を立てる大和撫子タイプ\tShe is the Yamato Nadeshiko type who loves, serves, and honors her husband.
氷に弱い\tShe is weak to ice.
ケイブリス\tCavebris
野良魔人\tWandering demon
剣２、魔法１\tSword 2, Magic 1
ＡＬ教が保管していた魔血魂を\tThe demon blood soul, which was kept by the AL cult,
ワンとニャンが大冒険の果て回収\twas recovered by Wan and Nyan after their great adventure.
無事復活を果たしたが\tHe was safely revived,
何故かまた最初の強さに戻ってしまった。\tbut for some reason, he reverted back to his original strength.
今度こそ最強を目指すのだ\tThis time, he aims to become the strongest for sure.`
    .split("\n")
    .map(l => l.split("\t"))
    .map(([jpn, eng]) => ({ jpn, eng }));

// language=file-reference
const dataText = await fs.readFile("./Rance10EX/9_カード情報.x", "utf-8");
let translatedDataText = dataText;

const matches = dataText.matchAll(/(フルネーム|職業|スキル|コメント１|コメント２|コメント３|コメント４|コメント５) = (".*")/g);
for (const match of [...matches].reverse()) {
    const [whole, key, capture] = match;
    const jpn = JSON.parse(capture).trim();
    if (capture === "\"？？\"" || capture === "\"？？？\"") {
        continue;
    }
    const translation = translations.find(t => t.jpn.trim() === jpn);
    if (!translation) {
        throw new Error("Missing translation for: " + jpn);
    }
    const eng = translation.eng;
    const normalized = replaceUnicode(eng)
        .replace(/[^\x00-\x7F♪☆○Σ]/g, ".")
        .replace(/r/g, "R"); // it's very stupid, but the engine interprets "r" as a line break, so we are replacing it with "R" everywhere
    const precedingText = translatedDataText.slice(0, match.index);
    const replacedText = key + " = " + JSON.stringify(normalized);
    const followingText = translatedDataText.slice(match.index + whole.length);
    translatedDataText = precedingText + replacedText + followingText;
}

await fs.writeFile("ololo_data_translated.x", translatedDataText);

// console.log([...matches].map(m => JSON.parse(m[2])).join("\n"));