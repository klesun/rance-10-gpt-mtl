
import fs from "fs/promises";
import {replaceUnicode, wrapAt} from "../modules/TextNormalization.js";

const translations = `出発します\tWe're departing.
手段は選ばない\tI’ll use any means necessary.
女の子モンスターはrいねがぁ〜\tAre there no gal monsters?
えへへ、よろしくね\tHehe, nice to meet you.
いくぞr掃討じゃー！\tLet’s go, time to sweep them out!
かるーくやってやる\tI’ll take care of this easily.
行くわよ\tLet's go.
さーて、雑魚掃除だ\tAlright, time to clean up the small fry.
リアを救い出す\tRescue Lia.
シーラを奪い返す\tTake Sheila back.
マジックを助ける\tHelp Magic.
俺の女たちを取り戻す\tTake back my women.
ハック＆スラッーシュ！\tHack & Slash!
…………ぐぅ\t...Guu.
かしこまりました\tUnderstood.
しゃあないなr今回だけやで\tIt can't be helped, just this once.
ほな戦争用に改造で\tThen let's modify it for war.
まてまてrそれは俺様の冒険用だ\tWait, wait, that's for my adventures.
戦闘＝勝利\tBattle = Victory.
戦闘＝・・・\tBattle = ...
戦闘＝勝利\tBattle = Victory.
戦闘＝・・・\tBattle = ...
いざ大海原！\tTo the great ocean!
さあ乗り込むぞ\tAlright, let's board.
乗船振り分け後なのでr部隊編成が必要です\tSince boarding allocation is done, squad formation is necessary.
出　航　！\tSetting sail!
広いですね、海って\tThe sea is vast, isn't it?
モンスターは出る……rふむふむ\tMonsters will appear... Hmm hmm.
わ、私、偵察手伝うんだけど……rきゃー\tI-I'll help with scouting... Kyaa!
この船、頑丈だな……\tThis ship is sturdy...
とーりかじぃー\tHard to starboard!
おーもかじぃー\tHard to port!
あら、何かありそうね\tOh, something seems to be happening.
酔い止めのお薬は……r無いみたいですね　残念\tIt seems we don't have any seasickness medicine. What a pity.
さあ、2日目だ！\tNow, it's the second day!
元気元気\tFeeling great!
ふん、造作もない\tHmph, that's nothing.
いいから沖合だrフグが俺様を呼んでいる\tJust head offshore, the pufferfish is calling me.
それもそうかrちっ、勘弁してやろう\tThat's true too. Tch, I'll let it slide.
……あら。こっちに行くの？\t...Oh? You're going this way?
俺は攻める男rさらに沖合だ\tI'm an attacking man, further offshore.
クレバーに引き下がる\tSmartly retreat.
おおおおぉー！？\tOoooooh!?
死ぬかと思ったぜ\tI thought I was going to die.
………………\t...........
んじゃ、こっちは任せてくれ\tWell then, leave this side to me.
ごっはん　ごっはん\tFood, food.
すっきりと3日目だrがはははは\tRefreshing third day, hahaha!
右手に見えますのがr海獣でございます\tTo your right, you can see a sea beast.
海獣かr面白いものを見た\tA sea beast, huh? I've seen something interesting.
魔力全開rフルパワーじゃ！\tMagic power fully unleashed, full power!
よろしくお願いします\tThank you in advance.
とーりかじぃー\tHard to starboard!
おーもかじぃー\tHard to port!
よしよしr俺様の航海はこうでないと\tAlright, my voyage has to be like this.
4日目！　朝だーーーー\tDay 4! Morning---!
あっちが平和な気がする\tThat side feels peaceful.
ん、あれは・・？\tHuh, what's that..?
戦闘＝・・・\tBattle = ...
戦闘＝勝利\tBattle = Victory.
……はあ。驚きました……\t...Haa. That was surprising...
俺達には目的があるのだrパスだ\tWe have a purpose. It's a pass.
神秘の島が俺様を呼んでいるr行く\tThe mysterious island is calling me. Let's go.
しびびび…\tShibibibi...
あ、宝箱\tAh, a treasure chest.
船が出るぞー\tThe ship is leaving!
6日目……rそろそろ着くか？\tDay six... Are we about to arrive?
時間切れを警戒するr海岸沿いだ\tWatch out for running out of time. Along the shore.
俺は用心深い男r沖合だ\tI'm a cautious man. Offshore.
絶対に逃がすな！\tDon't let them escape, no matter what!
戦闘＝・・・・\tBattle = ....
戦闘＝勝利\tBattle = Victory.
沖に出るぞ\tLet's head out to the open sea.
寝るぞ\tTime to sleep.
なんかいるぞ？\tThere's something there?
よーそろー\tYo-soro!
嵐が来ます\tA storm is coming.
うおおーっ！\tUooo!
しっかり掴まってろ！\tHold on tight!
踏ん張れー！\tHang in there!
なんとかならんのか！\tCan't something be done?!
落ちるなよー！\tDon't fall!
ぐわーーー！\tGwaaah!
うごごご…死ぬ…\tUgo-go-go... I'm going to die...
どりゃーーーー！\tDoryaah!
ぐわーーー！\tGwaaah!
なんとかならんのか！\tCan't something be done?!
落ちるなよー！\tDon't fall!
海のアホーーーー！\tStupid sea!
ぐわーーー！\tGwaaah!
まだか…まだ続くのか…\tNot yet... Is it still continuing...
どりゃーーーー！\tDoryaah!
うごごご…死ぬ…\tUgo-go-go... I'm going to die...
サンセット号の女の子が心配だr捜すぞ\tI'm worried about the girl from the Sunset ship. Let's search.
心配だが時間が無いr先を進む\tI'm worried, but there's no time. Let's press on.
あっ、あれ…！\tAh, that...!
進路を戻します\tWe'll turn back on our course.
取り舵半分。r先を急ぐぜ\tPort half rudder. Let's hurry ahead.
がまん……がまん……ごはん\tEndure... endure... food.
ランス様、rホッとしてます\tLord Rance is relieved.
海のレアモンスターは、と……\tThe sea's rare monster is, uh...
上陸地点によーそろー\tReady to land at the landing point.
上陸急げー！\tHurry up and land!
出発する\tDeparting.
男なら勲章だ\tIf you're a man, it's a medal.
男なら友情だ\tIf you're a man, it's friendship.
大変だー\tThis is terrible!
大変だー\tThis is terrible!
まずは城内の鬼をr制圧しなくてはいけない\tFirst, we must suppress the demons inside the castle.
片付いたか\tIs it cleaned up?
よろしくお願いします\tPlease take care of it.
香姫に挨拶\tGreeting to Princess Kaori.
急ぎ死国へ向かう\tHurry and head to the country of death.
わくわく\tExcited.
深根が居る\tFukane is here.
−−−\t---
まったくもう……\tGood grief...
早雲様を捜します\tI will search for Lord Soun.
早雲様を捜します\tI will search for Lord Soun.
早雲様を捜します\tI will search for Lord Soun.
早雲様を捜します\tI will search for Lord Soun.
早雲様を捜します\tI will search for Lord Soun.
早雲様を捜します\tI will search for Lord Soun.
あっちに進む\tGo that way.
こっちに進む\tGo this way.
オーブを捜す\tSearch for the orb.
早雲の所に戻る\tReturn to Soun's place.
帰りましょう\tLet's go back.
クエルプランだと！？\tQuelplan!?
？？？？\t????
あれは…\tThat is...
少女を探す\tLook for the girl.
何か聞きたい事はあるか？\tIs there something you want to ask?
余のサービスだr選ぶが良い\tIt's my service, choose as you like.
余のサービスだr選ぶが良い\tIt's my service, choose as you like.
余のサービスだr選ぶが良い\tIt's my service, choose as you like.
余のサービスだr選ぶが良い\tIt's my service, choose as you like.
余のサービスだr選ぶが良い\tIt's my service, choose as you like.
余のサービスだr選ぶが良い\tIt's my service, choose as you like.
食後の運動？\tSome exercise after the meal?
キナニ砂漠を越える\tCross the Kinani desert.
道沿いに砂漠を進む\tProceed along the desert path.
男なら寄り道r砂漠を横断しようぜ\tIf you're a man, let's take a detour and cross the desert!
道沿いに砂漠を進む\tProceed along the desert path.
よろちくでちゅわ\tPleased to meet you (childish/slang tone).
大怪獣を避けて通る\tAvoid and pass by the giant monster.
悪魔をころせーr悪魔を倒せー\tKill the demon! Defeat the demon!
眼鏡ルート\tGlasses route.
天使ルート\tAngel route.
ひー！\tEek!
男なら砂r砂漠を進もうぜ\tIf you're a man, let's advance through the desert.
道沿いに進む\tProceed along the road.
お肉お肉\tMeat, meat.
ほかほか\tWarm and fresh.
(-_-)zzz\t(-_-)zzz (sleeping sound)
よろしくね\tNice to meet you.
出発する\tDepart.
さぁ、いこー\tAlright, let's go!
がはははははははは！\tGahahahahahaha!
なんじゃーー！？\tWhat the heck!?
怪獣退治だ！\tIt's time to slay the monster!
がはははー！\tGahahaha!
帰ろう\tLet's go home.
出発する\tDepart.
ヘルマンへ\tTo Helman.
ゼスへ\tTo Jess.
ＪＡＰＡＮへ\tTo JAPAN.
リーザスへ\tTo Leazas.
シャングリラへ\tTo Shangri-La.
故郷へ\tTo hometown.
家に帰る\tReturn home.
左の扉を開ける\tOpen the left door.
右の扉を開ける\tOpen the right door.
一人で行く\tGo alone.
みんなに紹介する\tIntroduce everyone.
出発します\tI will depart.
魔物界に入る\tEnter the monster world.
魔物の死体が散乱しているr調べてみる\tMonsters' corpses are scattered; investigate.
目的パワジオンセンにrまっすぐ向かう\tHead straight to the objective, Pawajionsen.
ぐわはははははは！\tGuahahahahaha!
別のルートを進む\tTake a different route
さらに別のルートを進む\tTake yet another different route
裸エリアに進もう\tLet's head to the bare area
沢山戦う\tFight a lot
出来るだけ避ける\tAvoid as much as possible
がはははははr死ね死ねー！\tGahahahahaha! Die, die!
ひーー！\tEek!
出発\tDeparture
吹雪いてきたrみんなで寄り添う\tIt started snowing heavily, let's huddle together
突っ切る\tCut through
ぐぬぬ…\tGrrr...
追いかける\tChase
レリコフを追いかける\tChase Relikoff
レリコフを見失ったrどっちいった？\tLost sight of Relikoff, which way did he go?
巨大戦艦遺跡を目指そう\tLet's head for the giant battleship ruins
うわわわわわ\tWhoa whoa whoa whoa!
出口を捜す……\tSearching for the exit...
モンスターを避ける\tAvoid monsters
戦う\tFight
地上への道は……\tThe path to the surface is...
地上への道は……\tThe path to the surface is...
二人で脱出口を捜す\tThe two of us search for an exit
モンスターを避ける\tAvoid monsters
戦う\tFight
二人で脱出口を捜す\tThe two of us search for an exit
二人で脱出口を捜す\tThe two of us search for an exit
出口どこかなー\tI wonder where the exit is
二人でじっとしておこう\tLet's stay still together
よかった\tThank goodness
巨大戦艦遺跡へ\tTo the giant battleship ruins
ジャハルッカスを倒す\tDefeat Jaharks
シーウィードへ向かう\tHead towards Seaweed
屋台に寄る\tStop by the food stall
露天商に寄る\tStop by the street vendor
どきどき\tHeartbeat (nervous/excited)
タイガー将軍とr話し合いたい\tI want to talk with General Tiger
気を取り直してr先に進む\tPull yourself together and move forward
魔王の子は倒す\tDefeat the Demon King's child
よろしくでござる\tI am at your service
休憩する\tTake a break
おいr話がある\tHey, I have something to talk about
ざんすざんす・・\tIndeed, indeed...
そろそろ行くか\tShall we go soon?
出発だrついてこい\tLet's depart, follow me
まずは都市内の探索だ\tFirst, explore inside the city
ついでに魔物も退治するか\tMight as well exterminate some monsters along the way
こっちに行く\tGo this way
公園の方角はどうかな？\tHow about the direction of the park?
あの建物の中でrオーブを捜すべきだ\tWe should search for the orb inside that building
オーブ見つかんないなー\tCan't find the orb
とっとと進むぞ\tLet's hurry up and move on
疲れた…rそろそろ休憩しない？\tI'm tired... Shall we take a break soon?
オーブを探す\tSearch for the orb
がははははは\tGahahahaha!
オーブを捜す\tSearch for the orb
オーブを捜す\tSearch for the orb
（ごくり・・）\t(gulp...)
ここは俺に任せろ\tLeave this to me
オーブを捜す\tSearch for the orb
任務完了\tMission complete
付いてくんなよr俺一人でいいのに\tDon't follow me. I'm fine on my own.
次の目的地へ向かう\tHeading to the next destination.
行くぞ\tLet's go.
おばさんかぁ…\tAn old lady, huh...
きゃっほー！\tYahoo!
わーい！\tYay!
楽しかったなー\tThat was fun.
さてと\tWell then.
試練迷宮に向かう\tHeading towards the Trial Labyrinth.
あー……　お疲れ\tAh... good work.
・・・・・・\t......
・・・・・・\t......
・・・・・・\t......
・・・・・・\t......
戦闘＝勝利\tBattle = Victory.
戦闘＝・・・\tBattle = ...
・・・・・・\t......
・・・・・・\t......
・・・・・・\t......
やったね！\tWe did it!
メダルスープを食べる\tEating Medal Soup.
フレンドパンを食べる\tEating Friend Bread.
・・・・・・\t......
・・・・・・\t......
・・・・・・\t......
・・・・・・\t......
戦闘＝勝利\tBattle = Victory.
戦闘＝・・・\tBattle = ...
出発します\tDeparting.
目標変更r翔竜山を目指す\tTarget change: aiming for Mount Shoryu.
翔竜山を登る\tClimbing Mount Shoryu.
こっちに行こうぜ\tLet's go this way.
頂上までは長いr体力を温存して進みましょう\tIt's a long way to the summit; let's conserve our stamina and proceed.
こんな高い山に登るのr始めてだよ\tIt's my first time climbing such a tall mountain.
勇者の事はrとりあえずほっておこう\tLet's just leave the hero alone for now.
ド、ドラゴン…r来るー\tD-Dragon... it's coming!
迂回する\tTaking a detour.
・・・・・・・\t......
・・・・・・・\t......
翔竜山へ・・r魔王ランスの元へ・・\tTo Mount Shoryu... to Demon Lord Rance...
部隊編成は大丈夫か？\tIs the troop formation okay?
邪魔だ！\tGet out of the way!
・・・\t...
休憩する\tTaking a break.
警戒を怠らない\tStay alert.
突き進む\tPush forward.
突き進む\tPush forward.
突き進む\tPush forward.
突き進む\tPush forward.
＊＊＊＊\t****
メダルスープを食べる\tEating Medal Soup.
フレンドパンを食べる\tEating Friend Bread.
突き進む\tPush forward.
突き進む\tPush forward.
突き進む\tPush forward.
突き進む\tPush forward.
この場はアームズに任せる\tI'll leave this area to Arms.
突き進む\tPush forward.
ばたんきゃー\tFlop!
逃げ出す\tRun away.
逃げ出す\tRun away
＊＊＊＊\t****
行こう\tLet's go
お父さんに会いに来た\tI came to see my father
魔王を倒しに来た\tI came to defeat the Demon King
ビンタ成功\tSlap successful
・・・・・\t.....
それでは行ってきます\tWell then, I'm off
はにほー\tHaniho~ (a cheerful greeting)
俺を編成するのr忘れてないよな？\tYou haven't forgotten to include me in the formation, right?
……ん？\t...Hm?
助ける\tHelp
助けない\tDon't help
トドメ\tFinish off
びくびく……\tTrembling...
いかない\tDon't go
出発する\tDepart
さぁ中に入ってr盗賊を始末しよう\tAlright, let's go inside and deal with the thieves
アジトを探索……\tSearching the hideout...
アジトを探索……\tSearching the hideout...
こちらだすr付いて来て下さい\tThis way, please follow me
長田君……\tNagata-kun...
あっちに進もう\tLet's go that way
こっちに進もう\tLet's go this way
俺達の勝利だー！\tWe are victorious!
出口\tExit
冒険を続ける\tContinue the adventure
冒険を止める\tStop the adventure
出発します\tWe'll depart
リックの教えr突撃訓練\tRick's Lesson: Assault Training
サーナキアの教えr騎士心得講習\tSarnakia's Lesson: Knight's Code Lecture
パットンの教えr徹底体力訓練\tPatton's Lesson: Thorough Physical Training
チルディの教えr高速剣術\tChildi's Lesson: High-Speed Swordsmanship
ブリティシュの教えr応用チーム戦術\tBritish's Lesson: Applied Team Tactics
アレキサンダーの教えr努力、努力、努力\tAlexander's Lesson: Effort, Effort, Effort
アームズの教えrボス攻略虎の巻\tArms' Lesson: Boss Strategy Guide
謙信の教えr心頭滅却\tKenshin's Lesson: Mental Concentration
ロッキーの教えr従者の心得\tRocky's Lesson: Servant's Mindset
タイガー将軍の教えr模擬戦するぞ\tGeneral Tiger's Lesson: We'll Have a Mock Battle
ピッテンの教えr防御の心得\tPitten's Lesson: Defense Knowledge
ミラクルの教えr強い精神力\tMiracle's Lesson: Strong Willpower
出発します\tWe'll depart
魔人ますぞえr撃破済み\tDemon Masuzoe - Defeated
−−−\t---
カラーの村に出発\tDeparting to Kala Village
隠しルートの入り口は…と\tThe entrance to the secret route is... so
よし、もうちょっとだ\tAlright, just a little more
少し休憩だ\tLet's take a short break
カラー娘を補充\tReplenishing Kala girls
さらばペンシルカウ！\tFarewell, Pencil Cow!
総員、慌てるなrだが急げー\tEveryone, don't panic, but hurry!
戦闘＝勝利\tBattle = Victory
戦闘＝・・・\tBattle = ...
はぐれた偵察隊を捜しに行きたい\tI want to search for the lost scout team
さっさと進む\tMove forward quickly
魔軍に突っ込む\tCharge into the demon army
少し後方に下がる\tFall back a little
魔軍に突っ込む\tCharge into the demon army
何か考える\tThink about something
じっとしていろr声を出すなr待つのだ\tStay still, don't make a sound, wait
戦闘＝勝利r※特殊\tBattle = Victory *Special
戦闘＝・・・r※通常\tBattle = ... *Normal
えっ、魔人と戦うのですか？\tEh, are we going to fight the demon lord?
がはははははr俺様の勝ちだ\tGahahahaha! I’m the winner!
ランス城に戻る\tReturn to Rance Castle
よし、クルックーr一緒に行くぞ\tAlright, Kurukuu, let's go together.
わっ、r滝の裏に通路が…\tWow, there’s a passage behind the waterfall...
メリムを保有していた時\tWhen Merim was possessed
−−−\t---
あっ、待って下さいrそこの壁…\tAh, wait please. That wall there...
保管庫の中に入る\tEnter the vault
入らない\tDo not enter
よろしくね\tNice to meet you.
ぐぬぬ…\tGnnnn...
地下通路を使ってr一気に行くぞ\tWe’ll use the underground passage and go straight through.
…………こっちよ\t...This way.
行くぞＧＯ\tLet's go, GO!
この道も魔物だらけ\tThis path is also full of monsters.
あの道も魔物だらけ\tThat path is full of monsters too.
どっちでも同じだなr戦うだけだ\tEither way is the same, we just have to fight.
・・・・\t....
−−−\t---
魔人メディウサr撃破済み\tDemon Lord Medusa - Defeated
こ、怖かったぁ…\tS-So scary...
−−−\t---
魔人パイアールr撃破済み\tDemon Lord Piarl - Defeated
うう、勝ったけど敗北感…\tUgh, I won, but I feel defeated...
−−−\t---
魔人ケッセルリンクr撃破済み\tDemon Lord Kessel Link - Defeated
や、やばかった…\tT-That was close...
−−−\t---
魔人レキシントンr撃破済み\tDemon Lord Lexington - Defeated
ぜえぜえ…r疲れてきたぞ…\tHuff huff... I'm getting tired...
休憩すべきなのだけどr見つけてしまいました\tWe should take a break, but I discovered something.
さすがにやばいr休憩しよう\tThis is serious, let's take a break.
とつげーき！！\tCharge!!
よーし、凱旋だ\tAlright, it’s a triumphal return.
いくぞ、出撃だ！\tLet’s go, sortie time!
魔軍、前衛部隊突破！\tDemon army breaks through the vanguard!
どけどけ、親玉はどこだ！\tGet out of the way, where's the boss?
キナニ砂漠に出発\tDeparting for Kinani Desert.
あっちに進もう\tLet's go that way.
こっちに進もう\tLet's go this way.
前方にモンスター発見しました\tMonster spotted ahead.
くんくん、臭うれす\tSniff sniff, I smell something.
砂漠横断を開始するぞー\tLet's begin crossing the desert!
こっちでちゅ\tThis way.
うるさいrあっちに進むぞ\tQuiet! We're going that way.
こっちでちよ\tThis way.
あれは…オアシスか？\tIs that... an oasis?
きっと蜃気楼だな\tIt must be a mirage.
オアシスだーr泳ぐぞー\tIt’s an oasis! Let's swim!
裸の女だ！r今度こそ間違いない\tA naked woman! This time, no doubt about it.
なわけあるか、蜃気楼だ\tNo way, it’s a mirage.
おほほー！\tOh ho ho!
遠回りになったでちrさぁ元の道に戻りまちゅよ\tThat was a detour, so let's get back on the original path.
シャングリラに入る\tEnter Shangri-La.
敵地侵入だr慎重に行くぞ\tWe've infiltrated enemy territory; let's proceed carefully.
踊り子が居る所\tWhere the dancers are.
ケイブリスが居る所\tWhere the Cave Lis are.
気にはなるが後回しだ\tI'm curious, but I'll deal with it later.
回復ポイントはこっち\tThe recovery point is this way.
食券はこっちに落ちている\tThe meal tickets have fallen over here.
あっ、そっちは…\tAh, over there is...
大勝利ですrランス様\tIt's a great victory, Lord Rance.
ケイブニャンを拷問r(大変ルート)\tTorture Cave-Nyan (Difficult route).
シャリエラを拷問r(順当ルート)\tTorture Shariera (Standard route).
ついでにもう少し魔物兵をしばく\tWhile we're at it, let's beat up a few more monster soldiers.
さっさとケイブリスを殺す\tQuickly kill the Cave Lice.
かなみを偵察に出していた\tKanami was sent out to scout.
−−−\t---
ケイブリスをぶっ殺すぞ\tI'm going to kill the Cave Lice.
次は本体をぶっ殺してやる\tNext, I'll kill the main boss.
とっとと帰るか\tShould we head back quickly?
気配はこっちー\tThe presence is this way.
かえろー\tLet's go home.
臨時首都とやらにr向けて出発だ\tLet's depart towards the temporary capital.
マジックさんの所へr急ぎましょう\tLet's hurry to Magic-san's place.
暑いねー、ゼスは……ふぅっ\tIt's hot, isn't it, Zeth...? Phew.
ま、気にせず進むか\tWell, let's move forward without worrying.
あっr味方の陣が見えてきたわ\tAh, I can see the allied camp.
この付近の魔物をr少し退治してやろう\tLet's take care of some monsters around here.
シィル、昼飯だ\tSil, it's lunch time.
買い食いでもrしながら歩こう\tLet's walk while snacking on something.
こんな時に……rまた……はぁ\tAt a time like this... again... sigh.
うむ。満喫したぞ\tHmm. I really enjoyed it.
魔人ガルティアをr倒しに行く\tGoing to defeat the demon Galtia.
食料輸送隊をr護衛しながら移動だ\tMoving while escorting the food transport team.
ずんずんいくぜ！\tLet's keep going strong!
つまみ食いしながらr山道を行こう\tLet's go along the mountain path while snacking.
山賊、出てきたわねr警戒しないと\tBandits have appeared; we need to stay alert.
よーし、晴れたなr進軍再開だ\tAlright, it's clear now, let's resume the march.
晴れたら晴れたでr暑いな、くそ\tNow that it's clear, it's hot too, damn.
紳士の俺様は女の子を助けるrエレナの呪いを解く\tAs a gentleman, I will help the girl and break Elena's curse.
利用できるものは利用するrそのままのエレナを部下にする\tUse whatever can be used; make Elena as she is into my subordinate.
がはははは、満足満足\tGahaha, I'm satisfied, very satisfied.
山賊は排除したr先に進むぞ\tThe bandits have been eliminated; let's move forward.
山賊は排除したr先に進むぞ\tThe bandits have been eliminated; let's move forward.
ランス様がお休みの間もr進みましょう\tLet's keep going even while Lord Rance is resting.
目的地であるr前線陣地へ向かうか\tShall we head to the front-line base, our destination?
あめあめざーざー\tRain, rain pouring down.
雨宿りをする\tTake shelter from the rain.
そのまま突っ切る\tKeep going through as is.
目的地を変更rオールドゼスを目指す\tChange destination; aim for Old Zeth.
あつ…\tHot...
あっち\tThat way.
少し休憩にしませんか？\tShall we take a short break?
ガルティア退治を優先する\tPrioritize defeating Galtia.
ひまわり村に行く\tGo to Sunflower Village.
て、冗談だ、一人であってこい\tJust kidding, go meet her alone.
一緒に会いにいく\tLet's go meet her together.
ありがとうございますrランス様\tThank you very much, Lord Rance.
ま、出撃まで体をr休めててくれ\tWell, rest your body until the sortie.
こんなものをr拾ったのですが\tI found something like this.
出発するぞ\tLet's depart.
イモに向かって突撃だ\tCharge towards the Imo.
イモ臭いがr中を進むぞ\tIt smells like potatoes, but let's proceed inside.
（ぬぬ……腹減ってきたな……）\t(Ugh... I'm getting hungry...)
（ふと思う時があるr大事なのは尻）\t(Sometimes I think the important thing is the butt.)
（ふと思う時があるr大事なのはおっぱい）\t(Sometimes I think the important thing is breasts.)
そういえば女の子の使徒だったかrちっ、惜しい\tCome to think of it, was she the female apostle? Tch, so close.
大食いか、楽勝だな\tA big eater, huh? This will be easy.
−−−\t---
勝利　食べきった\tVictory! Finished eating it all.
−−−r※通常\t--- *Normal
勝利　食べきったr※特殊\tVictory! Finished eating it all *Special
ぐぐぐ、もう食えん…\tUgh, I can't eat anymore...
なんか臭いますねr・・・\tSomething smells, huh...
むぐぐぐ・・r早く出たい\tMugugu... I want to get out quickly.
息苦しいrくらくらしてきたぞ\tIt's hard to breathe. I'm starting to feel dizzy.
でろでろりーん\tDero derorin (slimy dripping sound).
ええい、出口は！rどこかにあるはずだ\tWhere is the exit! It must be somewhere.
適当に進むしかないか\tI guess I'll just have to move forward randomly.
生き物の気配がするよ\tI sense the presence of a living creature.
いたっr肌がヒリヒリする\tOuch! My skin is stinging.
・・・・\t....
ランス様……rこのままでは…\tLord Rance... at this rate...
はははははrこれは笑うしかないな\tHahaha, I can only laugh at this.
（まさか…r俺様がバッドエンド…）\t(No way... I could end up with a bad ending...)
ぜえぜえ……r人心地ついたわ\tWhew... I finally feel normal again.
こそこそ……ただいまですー……\tSneaking... I'm home...
そして夜は更けていく\tAnd the night deepens.
すっきりとr朝を迎えた所で出発だ\tFeeling refreshed, we set off at dawn.
ランス様、お水ですだ\tLord Rance, here is some water.
急げ急げr雑魚など無視\tHurry, hurry! Ignore the small fry.
今は時間が必要だr食べ物でも渡しておけ\tWe need time now. Give them some food or something.
正々堂々と戦う\tFight fair and square.
毒大好きちゃんr集合ー\tPoison-loving team, assemble!
カロの毒？rわかった\tKaro's poison? Understood.
ドラゴン級もころりん即死rそんな素敵な毒を用意するね☆\tEven dragon-class foes instantly die with a single hit. Such a wonderful poison you’ve prepared☆
こっちだよ\tThis way.
秘密の谷はr危険な場所なのでr気をつけて進んでね\tThe secret valley is dangerous, so proceed carefully.
むしむしー\tBugs, bugs—
ころりころり\tRolling, rolling.
見た事もないムシrだらけだな……\tIt's full of bugs I've never seen before...
ぐうぐう……\tSnore snore...
帰投する\tReturning to base.
じゃあJAPANに向かうのね\tThen we'll head to JAPAN, right?
はぁい☆rこっちこっち\tYes☆ This way, this way.
暗いな……r松明つけるぜ\tIt's dark... I'll light a torch.
どったんばったんrやかましい\tClatter clatter! So noisy.
毒の準備完了だr帰投するぞ\tPoison is ready. Let's return to base.
出撃準備だr怠るな\tPrepare for sortie! Don't slack off.
ガルティア退治にr出発だー\tWe're heading out to defeat Galtia!
今度こそガルティアをr仕留めるぞ\tThis time we'll finish off Galtia for sure.
敵ですr迂回しましょう\tEnemy ahead. Let's go around.
敵だなr突っ込もう\tIt's an enemy. Let's charge.
敵ですr迂回しましょう\tEnemy ahead. Let's go around.
敵だなr突っ込もう\tIt's an enemy. Let's charge.
断る！\tI refuse!
ガルティアさん…\tMr. Galtia...
仲良くやろうぜ\tLet's get along.
マジックと遊んでrそれから帰る\tPlay with Magic, then return.
このまま連続で魔人を倒すr注意　高難易度です\tKeep defeating the demons in succession. Warning: High difficulty.
そんじゃ、いっちょ行くか\tWell then, shall we go?
反撃開始だ\tStart the counterattack.
マークに凱旋だ\tTriumphant return to Mark.
マジックと遊んだ後、ランス城に戻る\tAfter playing with Magic, return to Rance Castle.
このまま連続で魔人を倒す\tKeep defeating the demons in succession.
敵の首魁は目の前だ　往こう\tThe enemy leader is right in front of us. Let's go.
完・全・勝・利！\tCom·plete·Vic·to·ry!
ゼスに向けてまた進撃だ\tLet's advance once again towards Zeth.
…………ええい、辛気くさい\t...Ugh, how gloomy.
今は進もうか、とにかく\tLet's move forward now, anyway.
けっ。胸糞悪い\tUgh. That's disgusting.
それでは参りましょう\tWell then, let's go.
あっちに進もう\tLet's head that way.
こっちに進もう\tLet's go this way.
あっ、うしが歩いてる\tAh, a cow is walking.
ランス様rマークが見えてきましたよ\tLord Rance, I can see the mark.
休憩だ休憩。寝るぞー\tBreak time, break time. Let's sleep.
ぐうぐう……\tSnore snore...
さあ、出発だ\tAlright, let's depart.
突撃だー\tCharge!
俺様の前に立つ奴はr全て殺す！\tAnyone who stands before me will be killed!
魔物兵だなr蹴散らす\tThose are monster soldiers; let's scatter them.
ランス様rアイテム強化です\tLord Rance, this is item enhancement.
偵察してきたわrこちらの道に宝箱が\tI've scouted ahead. There's a treasure chest on this path.
総統様のお通りじゃー\tThe Supreme Commander is passing through!
撃退しました！\tRepelled them!
バカめr敵将軍はソコだ！\tFool! The enemy general is over there!
えいっr煙幕！\tTake this! Smoke screen!
走れ走れ！　急げ！\tRun, run! Hurry!
かちかちなのれす\tIt's stiff/hard.
砦の中で何か探そう\tLet's look for something inside the fort.
砦で少し休憩しよう\tLet's take a little rest at the fort.
光の落ちた方角へ行くぞ\tLet's go toward the direction where the light fell.
あっちに進もう\tLet's head that way.
こっちに進もう\tLet's go this way.
こっちに進もう\tLet's go this way.
とりあえず戻るか\tFor now, should we head back?
さて一休みするか\tWell, let's take a break.
ん？　ノックの音が……\tHm? There's a knocking sound...
そして、一夜が明け……\tAnd then, dawn broke...
仕方ない、王都へ出発だ\tNo choice, let's set out for the royal capital.
魔軍に発見されないようr迂回していきましょう\tLet's take a detour so we aren't detected by the demon army.
なんだかどろどろですね……\tIt's kind of all gooey...
…………ふふふ\t...Hehehe.
戦闘＝・・・\tBattle = ...
戦闘＝勝利\tBattle = Victory
ぬるぬる、いっぱいだね\tSo slimy, there's a lot of it.
戦闘＝・・・\tBattle = ...
戦闘＝勝利\tBattle = Victory
ねばねばだらけ……\tCovered in sticky goop...
戦闘＝・・・\tBattle = ...
戦闘＝勝利\tBattle = Victory
きゃぁっ！　こ、これ絡まるー！？\tKyaa! I-I'm getting entangled!?
マジックを追うぞ\tLet's chase Magic.
マジックめ、世話の焼ける\tThat Magic, such a handful.
ええいrガーディアンが多い\tUgh, there are too many Guardians.
あっちに進もう\tLet's head that way.
こっちに進もう\tLet's go this way.
急ぎましょう\tLet's hurry.
見えた。あの部屋だ\tI see it. That room.
一件落着かね\tIs it all settled now?
さ……マークに戻りましょ\tWell then... let's return to the mark.
ランス様……rとにかく、少し休んでください\tLord Rance... please, rest a little for now.
すぐに出発だ！\tWe'll depart immediately!
リズナは誰にも渡さんぞ\tI won't give Rizna to anyone.
ぐっぬぬぬ・・\tGhhhnngh...
突っ込め！rまっすぐ最短距離だ\tCharge! Straight ahead, shortest distance.
はぁ……はぁ……r置いていかないで欲しいだ……\tHah... hah... I don't want you to leave me behind...
雑魚に構ってられるか\tI don't have time for small fry.
急いで！r脱落しそうな人を回収して、全速力！\tHurry up! Pick up those about to fall behind, full speed ahead!
ランス様rお水です、給水！\tLord Rance, here's some water, hydrating!
そこだ！\tThere!
戦闘＝・・・r※通常\tBattle = ... *Normal
戦闘＝勝利r※特殊\tBattle = Victory *Special
………………\t..............
ランス様……\tLord Rance...
……\t...
それでは出発です！\tWell then, let's depart!
待っていて下さい……\tPlease wait for me...
怖いです……\tI'm afraid...
視線を感じます……\tI feel someone's gaze...
敵軍、突破します！\tBreaking through enemy forces!
戦闘回避しましょう…\tLet's avoid battle...
戦闘＝勝利\tBattle = Victory
戦闘＝・・・\tBattle = ...
うう……\tUgh...
はあ…ふう…\tHah... phew...
正面をずばーん？\tA straight shot ahead?
迂回ルートかな…\tMaybe a detour route...
戦闘＝勝利\tBattle = Victory
戦闘＝・・・\tBattle = ...
先へ……r進まないと……\tForward... I have to keep going...
−−−\t---
健太郎を保有していた時\tWhen I had Kentarou
よーし、練習終わり！\tAlright, practice is over!
あと少しっ…\tJust a little more...
お嬢様r今参りますぞ！\tMy lady, I am coming now!
ふん、終わったな\tHmph, it's finished.
ゼスの首都に入るぞ\tWe're entering Zeth's capital.
だっ、だめ、こんな時に……rきゃー\tN-no, not now... kyaa!
すっきりすっきり　さあいくぞ\tFeeling refreshed, feeling refreshed. Now let's go.
ナガールモールが怪しい\tNaharl Mall looks suspicious.
いやスリミドだろう\tNo, it's Surimido.
間違いない、イタリアだ\tNo doubt about it, it's Italia.
すごーい、暗い暗い\tAmazing, so dark, so dark.
夜は私の得意分野……r素早く敵を探すわ\tNight is my specialty... I'll quickly search for enemies.
ああ、戻る\tAh, going back.
いーや、戻らない\tNope, not going back.
仕方ない、真面目に探すか\tCan't be helped, I'll look seriously.
逃げろー\tRun away!
……そして、夜は更ける\t...And night deepens.
ちっ。もう寝るか……\tTch. Should I sleep already...
ぐうぐう……ぐおー\t*snore*... *snore*
魔軍を潰して回るぞ\tI'm going to go around crushing the demon army.
暑いなぁ・・rダレてきた\tIt's hot... I'm getting sluggish.
みなさんr水分補給を忘れないでね\tEveryone, don't forget to stay hydrated.
魔軍方面に突っ込む\tCharge towards the demon army.
ハニー方面に突っ込む\tCharge towards the Honey area.
サボる\tSlack off.
よっしゃ！　仕留めたぜ\tAlright! Got them!
・・・・\t....
あれ、そっちに行くのだすか？\tHuh, are you going that way?
戦場からどんどんr離れてるよ\tWe're moving further and further away from the battlefield.
あれ、ランス様は…\tHuh, where is Lord Rance...
ふーい、えがったえがった\tPhew, that was good, that was good.
次は知性派美人を求めてゴーだrがはははは\tNext, let's go seek an intelligent beauty, haha!
むむ！　敵れす、ご主人様ー\tHmm! Enemies, master!
あれ、ランス様は…\tHuh, where is Lord Rance...
ぷはー、余は満足である\tPhew, I am satisfied.
さあ、出発するかーr新たな女の子を求めて\tAlright, shall we depart? Seeking new girls.
今、どこかでr陶器の割れるような音がrしたような……\tJust now, somewhere I thought I heard the sound of pottery breaking...
下衆どもめ、許せん\tThose scoundrels, unforgivable.
出発\tDeparture.
急ぐ前に……r少しだけ、休憩しましょう\tBefore hurrying... let's take a short break.
座標は分かったr突撃！\tCoordinates are known. Charge!
いくぞr戦場に乱入だ！\tLet's go! We're storming the battlefield!
あいやー！　あいやー！　あいやー！rあいやー！　あいやー！　あいやー！\tAiya! Aiya! Aiya! Aiya! Aiya! Aiya!
魔軍が居る方向へ向かう\tHeading towards the direction where the demon army is.
ハニー軍が居る方向へ向かう\tHeading towards the direction where the Honey army is.
ボスはどこだ\tWhere is the boss?
ハニワは放置だ。r一気に親玉を狙うぞ！\tIgnore the haniwa. Let's aim straight for the big boss!
ランス、さんっ……！\tRance, san...!
勝ーーーー利！\tVic-to-ry!
魔軍を撃破してrゼスの連中に恩を売るぞ\tDefeat the demon army and gain favor with the Zeiss folks.
ダイナミックに大部隊を撃破\tDynamically destroy the large enemy forces.
クレバーに小部隊を撃破\tCleverly eliminate the small units.
サクッと潰して回るぞ\tQuickly wipe them out as we move around.
このまま勢いに任せてrぶっ潰す！\tLet's keep up this momentum and crush them!
十分戦果を稼いだ引き上げる\tWe've earned enough battle achievements; let's pull back.
まだまだ、もう少し戦う\tNot yet, we'll fight a little longer.
ふう……だいたい片付いた？\tPhew... is it mostly settled?
ヘルマンへ出発！\tDeparting for Hellman!
どんどん進め！\tAdvance steadily!
どんどん進め！\tAdvance steadily!
どんどん進め！\tAdvance steadily!
目指すは巨大戦艦遺跡\tAiming for the giant battleship ruins.
いくぞ、出撃だ！\tLet's go, sortie!
毘沙門天の加護ぞある！\tWe have the protection of Bishamonten!
あの図体だ……r居れば見つかるはずだが……\tWith that huge size... if it was there, it should be found...
いくぞ、出撃だ！\tLet's go, sortie!
往け、式神！\tGo, Shikigami!
雑兵ばかりか。r面白みのない\tJust fodder soldiers. Uninteresting.
ヘルマンに向けて出発だー\tDeparting towards Hellman.
マルグリッドに寄り道\tStopping by Marguerite.
寄り道をしない\tNot stopping by.
うむ、懐かしい道だ\tYes, this is a nostalgic path.
…この辺じゃなかったか？\t...Wasn't it around here?
あっちに進もう\tLet's go over there.
こっちに進もう\tLet's go this way.
−−−\t---
ツェール姉妹はもう・・・\tThe Zell sisters are already...
ダンジョンクリアー！\tDungeon cleared!
ダンジョンクリアー！\tDungeon cleared!
あ、にゃんにゃんだ\tAh, it's Nyannyan.
む、わんわんか…\tHmm, is that Wanfan...
−−−\t---
ツェール姉妹はもう・・・\tThe Zell sisters are already...
出発だ\tLet's depart.
出発\tDeparture.
うむ、良き道草であった\tYes, that was a good detour.
なんじゃこりゃ\tWhat is this?
出発\tDeparture.
あっちに進もう\tLet's go over there.
こっちに進もう\tLet's go this way.
バボラが見えてきたぞrだいぶ近い\tBabola is coming into view; we're quite close.
巨人めrもう少しだぞ\tThat giant! Just a little further.
ええっと……右です…\tUmm... it's to the right...
バボラどこだ…r近くのはずだが\tWhere is Babora...? He should be nearby.
この地鳴りは…r近いぞ\tThis rumbling... it's close.
戦闘＝勝利r※特殊\tBattle = Victory *Special*
戦闘＝・・・r※通常\tBattle = ... *Normal*
一旦戻るぞ\tLet's head back for now.
その前にちょっと休憩\tBut first, let's take a short break.
行先はツングース高地だぞ\tOur destination is the Tunguska Highlands.
ここを登っていきます\tWe will climb up here.
険しそうな道を行く\tTake the path that looks steep.
緩そうな道を行く\tTake the path that looks gentle.
あっちに進もう\tLet's go over there.
こっちに進もう\tLet's go this way.
あっちに進もう\tLet's go over there.
こっちに進もう\tLet's go this way.
一旦戻るぞ\tLet's head back for now.
シーラ来いr奴隷の時間だ\tSheila, come. It's slave time.
うむ、満足\tMm, I'm satisfied.
今度こそバボラを殺るぞ\tThis time, I'll kill Babora for sure.
こちらの道です\tIt's this way.
とにかくrこの辺りから脱出だ\tAnyway, let's escape from this area.
魔軍だらけだ\tIt's full of Demon Army.
あっちに進もう\tLet's go over there.
こっちに進もう\tLet's go this way.
謙信に同行する\tAccompany Kenshin.
バボラ退治を優先する\tPrioritize exterminating Babora.
ランス殿r助太刀感謝する\tLord Rance, thank you for your help.
外道どもめr征伐してくれる\tThose fiends, I will subdue them.
次の敵はどこだrそこか！\tWhere's the next enemy? Is it there!
あれ、謙信rどっちへ行った？\tHuh, Kenshin, which way did he go?
ランス様r敵が向かってきます\tLord Rance, the enemies are coming.
謙信を追うぞ\tLet's pursue Kenshin.
総員退却せよ\tEveryone, retreat.
ふぅ・・rやっと一息つけました\tPhew... finally caught a breath.
さて、今のうちにrけりをつけてやるか\tNow, while we have the chance, let's settle this.
死ねー！\tDie!
よし、陣に戻るぞ\tAlright, let's return to camp.
よろしくお願いします\tPlease take care of it.
アナセルを追う\tChase after Anacel.
すっきりしたところでr魔人退治だ\tNow that we're refreshed, let's hunt down the demon.
よし、侵入するぞ\tAlright, let's infiltrate.
ランス達はr大きな皿に乗り込んだ\tRance and the others boarded the large saucer.
皿に隠れておく\tHide in the saucer.
バボラは食料満載の皿をr顔の前に持って来た\tBabora brought a food-laden dish right in front of his face.
魔人バボラr撃破だ\tDemon Babora defeated.
このまま連続で魔人を倒す\tKeep defeating demons one after another.
シーラと遊んだ後、ランス城に戻る\tAfter playing with Sheila, return to Rance's castle.
森の奥へ\tInto the depths of the forest.
がはははははrメイドさんゲットー！\tGahahahaha! Got the maid!
謙信と会っている\tMeeting with Kenshin.
アナセルと会っている\tMeeting with Anacel.
行きましょう\tLet's go.
覚えてなさいよ…\tRemember this...
モンスターが居るという街道へ\tTo the highway where monsters are said to be.
街道を迂回する\tDetour around the highway.
がはは、楽勝！\tGahaha, piece of cake!
……ふん\t...Hmph.
出発、魔軍を迎撃する\tDepart, intercept the Demon Army.
迂回だ、迂回\tDetour, detour.
おしっこ\tPee.
ランス様、おにぎり\tLord Rance, rice ball
今から出撃する\tWe will sortie now.
夜まで待って出撃する\tWait until night to sortie.
お夜食用意しました\tI've prepared a midnight snack.
突き進むぞ\tLet's push forward!
おのれケッセルリンク\tDamn you, Kessellink!
おじゃまします\tExcuse me (for disturbing).
階段を降りる\tGo down the stairs.
大きな扉を開ける\tOpen the large door.
右の通路を進む\tProceed down the right corridor.
屋敷の結界r２５％解除済み\tMansion's barrier 25% dismantled.
−−−\t---
あっちに進もう\tLet's go that way.
そっちに進もう\tLet's go that way.
こっちに進もう\tLet's go this way.
屋敷の結界r５０％解除済み\tMansion's barrier 50% dismantled.
−−−\t---
道を引き返す\tRetrace the path.
階段を降りる\tGo down the stairs.
書斎らしき部屋を通る\tPass through a room that looks like a study.
屋敷の結界r７５％解除済み\tMansion's barrier 75% dismantled.
−−−\t---
ケッセルリンクを探すぞ\tLet's search for Kessellink.
よし、ではr魔人を殺すぞ\tAlright, then let's kill the demon god.
くそ、一旦逃げるぞ\tDamn, let's retreat for now.
むう、どうする…\tHmm, what should we do...
数日が過ぎた…\tSeveral days have passed...
マイ奴隷を取り返す\tRetrieve my slave.
戦闘＝・・・r※通常\tBattle = ... (normal)
戦闘＝勝利r※特殊\tBattle = victory (special)
…引き返すぞ\t...Let's retreat.
がははははr復活！\tGahahahaha! Resurrection!
信頼出来る女達をr大量に集めろ\tGather a large number of trustworthy women.
ちょっと無茶だがrペルエレお前でいいや\tIt's a bit reckless, but Peruere, you'll do.
くっくっくr見てろケッセルリンク\tHehehe, watch closely, Kessellink.
準備は整ったr俺様の出陣だ\tThe preparations are complete. It's my marching out.
あれ、どっちだったっけ\tHuh, which way was it again?
そうそう、こっちこっち\tThat's right, this way, this way.
奴は寝ている時間だ\tHe's asleep now.
俺様の勝ちだ\tIt's my victory.
魔人に付く\tSide with the demon god.
人類に付くr条件:全地域健在\tSide with humanity. Condition: all regions intact.
３時のおやつ時間\t3 o'clock snack time.
４時・・\t4 o'clock...
５時・・\t5 o'clock...
そして時間は過ぎ・・\tAnd so time passed...
さすがサテラの使徒だ！\tAs expected of Satella's disciple!
出発\tDeparture.
お、モンスターか\tOh, a monster?
こっちが安全だよ\tThis way is safe.
がははははrゴーだ、ゴー\tGahahahaha! Go, go!
次に進む\tProceed to the next.
魔物か、突っ切るぜ\tA monster, huh? I'll cut through.
面倒なことはしない\tI won't bother with trouble.
次に進む\tProceed to the next.
先に進む\tMove forward.
引き返して戦う\tTurn back and fight.
ニネティー村はr救われた\tNinety Village has been saved.
先に進む\tMove forward.
引き返して戦う\tTurn back and fight.
バース村はr救われた\tBirth Village was saved.
次に進む\tProceed to the next.
先に進む\tGo forward.
引き返して戦う\tRetreat and fight.
大惨事は防がれた\tThe great disaster was prevented.
爆撃隊を全て撃破\tAll bombing units defeated.
−−−\t---
俺たちの勝ちだ！\tWe've won!
軽く魔軍を蹴散らすぞ\tLet's lightly scatter the demon army.
寒い寒い　さっさと回ろう\tIt's cold, cold. Let's hurry and move around.
出来る男の各個撃破。rこれだな\tDefeating enemies one by one like a capable man. This is it.
あの敵を叩く！\tStrike that enemy!
雪に紛れてr魔軍を襲撃\tAmbush the demon army while blending into the snow.
あいつの所に行く\tLet's go to that guy's place.
中止、そんな作戦は駄目だ\tCancel it, such a plan is no good.
作戦を決行する\tExecute the plan.
行くぞ\tLet's go.
あっち\tThat way.
こっち\tThis way.
あっち\tThat way.
こっち\tThis way.
そっち\tOver there.
くそっr無駄に時間を取られた\tDamn it, wasted time.
城内での総戦闘ラウンドがr７以内の場合\tIf the total battle rounds inside the castle are within 7.
−−−\t---
城内での総戦闘ラウンドがr７以内の場合\tIf the total battle rounds inside the castle are within 7.
−−−\t---
城内での総戦闘ラウンドがr７以内の場合\tIf the total battle rounds inside the castle are within 7.
−−−\t---
この奥が怪しいr行くぞ\tIt looks suspicious beyond here. Let's go.
サテラを人質に\tTaking Satera hostage.
俺の肉体を見せつける\tShow off my body.
撤収だー\tRetreat!
雪の行軍r氷を踏んでー\tMarching through snow, stepping on ice.
−−−\t---
アーシーが居るrルーシーが居る\tArchie is here, Lucy is here.
むぐぐ・・r雪ばかりだ\tUgh… it's all snow.
あっちに進もう\tLet's proceed that way.
こっちに進もう\tLet's proceed this way.
一晩過ぎた…\tOne night has passed...
あっちに進もう\tLet's proceed that way.
こっちに進もう\tLet's proceed this way.
さらに一日過ぎた…\tAnother day has passed...
地図によるとrそろそろのはずなのだが…\tAccording to the map, it should be about time, but...
ケイブリスの弱点\tWeakness of Kebirus.
ランス城の動かし方\tHow to operate Rance Castle.
魔王を元に戻す方法\tHow to restore the Demon King.
情報は聞き出したrおさらばだ\tI've extracted the information. Farewell.
情報は聞き出したrおさらばだ\tI've extracted the information. Farewell.
情報は聞き出したrおさらばだ\tI've extracted the information. Farewell.
おら達を部隊編成してからr進みましょう\tLet's organize our squad first, then proceed.
雑魚は殺す、経験値！\tKill the small fry, gain experience!
無益な殺生は控えましょう\tLet's refrain from senseless killing.
こっちに進むかな\tI wonder if we should go this way.
偵察してきたわrこちらの道が安全ね\tI've scouted; this path is safe.
かいもーん\tCome on!
あれが聖女セラクロラスr…がっかりだ\tThat's the saintess Seracloras… I'm disappointed.
そして・・r５ヶ月の月日が流れた\tAnd... five months have passed.
コールドスリープ装置をr開けて人間達を出す\tOpen the cold sleep device and release the humans.
……危険か…rもう少しこのままにする\t...Is it dangerous? Leave them like this a little longer.
そして・・r１年の月日が流れた\tAnd... one year has passed.
さらに・・r２年の月日が流れた\tFurthermore... two years have passed.
さらに・・r長い年月が過ぎた\tYet more... many years have passed.
さらに・・r長い年月が過ぎた\tAgain... many long years have passed.
コールドスリープ装置を開ける\tOpening the cold sleep device.
もう少しこのままにしておく\tI'll leave it like this a little longer.
にっこり\tSmiling.
あー、もうrやってやるさ\tAh, enough already, I'll do it.
ちょっと感動\tA little moved/emotional.
出発しましょう\tLet's depart.
乗り込むぜ！\tLet's board!
慎重にね…\tCarefully now...
まずは深呼吸だ\tFirst, take a deep breath.
突破しますよ！\tWe're breaking through!
大騒ぎになっちまったな\tThis turned into a big fuss.
魔王は何処……で、あるか\tWhere is the Demon King... exactly?
さ、行こう！\tAlright, let's go!
……ッ\t...!
アパッチr任せたぞ\tApache, I'm counting on you.
魔王を手に入れたしrさあ、ずらかるぜ！\tI've got the Demon King, now let's get out of here!
……使命は果たしました\t...The mission has been accomplished.
………\t...
リーザス城に向かえ！\tHead towards Lizas Castle!
まぁいいr次へ進もう\tWell then, let's move on.
戦争の匂いがrぷんぷんれす\tThe scent of war is wafting strongly.
村など無視だ\tIgnore the village.
村に寄っていく\tLet's stop by the village.
次に進む\tProceed next.
ＪＡＰＡＮ陣地にr寄り道するぞ\tWe'll make a detour to the JAPAN camp.
寄り道せず進む\tProceed without detours.
あっ、あそこあそこr頂きれす\tAh, there, there, I've got it!
可愛い武士娘をr２．３人くすねたぜ\tI swiped two or three cute samurai girls.
そろそろrリーザス城だな\tIt's almost Lizas Castle.
一泊ぐっすりrリアとしっぽり\tSleeping soundly for one night, deeply with Ria.
ダーリンさいこーrリア惚れ直しちゃう\tDarling is the best—Ria falls for him all over again.
もう一泊するぞrぐふふふふ\tWe'll stay another night, heheh.
・・・・・・\t......
さてそろそろr出発するか\tWell then, it's about time to depart.
シルキィを倒すr（＝犯す）\tDefeat Silky (＝violate).
ハウゼルを倒すr（＝犯す）\tDefeat Howzel (＝violate).
南部の戦場を目指すrだが寄り道もする\tHeading to the southern battlefield, but will make detours too.
南部の戦場を目指すrまっすぐな\tHeading straight to the southern battlefield.
ちっ、はずれ山賊団かrブスしかいねぇ\tTch, a lousy bandit group—only uglies here.
俺のターゲットはr魔人シルキィちゃん\tMy target is the demon Silky-chan.
危険には近寄らないでr頂きたい\tI'd like you to avoid getting near danger.
何かいるぞ、倒そう\tSomething's there, let's take it down.
魔人シルキィを目指してr前線へゴー\tHead to the front lines aiming for demon Silky.
はい、次へ行きましょう\tAlright, let's move on next.
この先、幽霊街道か……\tAhead is the Ghost Highway, huh...
バレス閣下の陣はこちらです\tLord Bares’s camp is this way.
後５キロほどでrバレス閣下の陣に着きます\tAbout 5 kilometers left until we reach Lord Bares’s camp.
今夜のお相手はr誰にしようかなぁー\tWho should be my companion tonight, I wonder?
む・・感じるr美女が助けを求めている！\tHmm... I sense a beautiful woman is asking for help!
あっ、私ですか…rはい大丈夫です\tAh, me...? Yes, I'm fine.
合戦開始だrまずは見物といこう\tThe battle begins. Let’s start by watching.
いくぞ！r突撃だー\tHere we go! Charge!
がははははr絶好調だ！\tGahahaha! I'm in top form!
魔人シルキィを捜しましょうrこちらかもしれません\tLet's search for demon Silky. It might be this way.
どっちだ？rまっすぐだな\tWhich way? Straight ahead, huh.
シルキィでてこい\tSilky, come out!
くっ、このrさっさとシルキィを追え\tDamn, hurry up and chase after Silky.
シルキィ待ってろr柔肌を傷付けないようにr甲冑剥いでくれるわ\tSilky, wait. I'll strip off your armor carefully so as not to hurt your soft skin.
味方軍の為にもr少しでも魔軍を倒しましょう\tFor the sake of our allies, let's defeat as many demon troops as we can.
マリアの助手か…rむふふふ\tMaria's assistant, huh... hehehe.
シルキィ……rどこに居るんだ\tSilky... where are you?
戦闘＝・・・r※通常\tBattle = ... *Normal
戦闘＝勝利r※特殊\tBattle = Victory *Special
はい、移動します\tAlright, moving now.
今日は撤収だr野営地に戻るぞ\tWe're retreating today. Let's return to the camp.
ランス様r軍議だそうです\tLord Rance, there's a military council.
ランス様お疲れ様ですrへんでろぱ作りました\tLord Rance, thank you for your hard work. I've made some 'Henderopa'.
戦場に出かけるr今日こそ捕まえる\tHeading out to the battlefield. Today, I'll catch her for sure.
少し戦ってやるかrしねー魔物共\tLet's fight a little, you damn monsters.
現れるまで戦う\tFight until she appears.
待機しておく\tRemain on standby.
がんばりましょう\tLet's do our best.
現れるまで戦う\tFight until she appears.
待機しておく\tRemain on standby.
イガイガするr喉かわいたー\tMy throat feels scratchy. I'm thirsty.
あちらの方角r味方部隊が危機です\tIn that direction, our allied unit is in danger.
シルキィを追ってrリーザス城へ向かう\tChasing after Silky, heading towards Lizas Castle.
城が心配ですr急いで下さい\tI'm worried about the castle; please hurry.
（リーザス城がいくら堅固でもr魔人は止められない…）\t(No matter how strong Lizas Castle is, it can't stop the demon lord...)
（リーザス城に来たか……rくく、狙い通り)\t(So they've come to Lizas Castle... heh heh, just as planned.)
玉座を目指すrそこに居るはずだ\tHead for the throne; she should be there.
このアホ娘がrこんな時に余計な事を\tThis foolish girl, doing unnecessary things at a time like this.
とにかく玉座を目指す\tIn any case, head for the throne.
閃いたーrこっちの部屋だ\tI've got it—this is the room.
見切ったrここに隠したな\tI've seen through it; she hid it here.
もう間に合うだろうr休憩しよう\tWe should still make it. Let's take a break.
この階段を上れば玉座だ\tGo up these stairs to reach the throne.
この階段を上れば玉座だ\tGo up these stairs to reach the throne.
この階段を上れば玉座だ\tGo up these stairs to reach the throne.
降伏する\tSurrender.
断る\tRefuse.
俺様の勝ちだ\tI've won.
やっと一勝rと、言ったところか\tFinally, one victory. Or so I'd say.
はふはふrおいしいねえ\tHuff huff, this is delicious.
いろんなお店がrありますねえ\tThere are various kinds of shops here.
人生浪漫通りに行く\tGo to Romance Street of Life.
専門店通りに行く\tGo to the specialty shops street.
おおーr映画館すげー\tOh, wow! The movie theater is awesome.
恋愛運r「微妙」……\tLove fortune: 'So-so'...
わー、紅茶専門店！\tWow, a specialty tea shop!
ほほう、これは…\tOh my, what is this...
あ、この鍋つかみrかわいい\tAh, this pot holder is cute.
いい加減r先に進むぞ\tEnough already; let's move on.
街道沿いに進むか\tShall we proceed along the highway?
少し脇道に行くか\tShall we take a little side road?
そろそろ前線のスケールです\tIt's about time to scale the frontline.
戦場に移動\tMove to the battlefield.
ハウゼルでてこーいr来ないと魔物ぶっ殺す\tHowzell, come out! If you don't, I'll kill the monsters.
ハウゼルちゃん出ておいでr痛くしないから\tHowzell-chan, come out. I won't hurt you.
あの火柱が目印だr走り抜けるぞ\tThat pillar of fire is the landmark. Let's run through.
魔人同士の戦いか…r様子を見るか\tA fight between demon lords...? Let's watch for a moment.
むむ、俺を無視するなr戦うのは俺様だr（無茶ルート）\tHm, don't ignore me; I'm the one who fights. (Reckless path)
戦闘＝勝利r※特殊\tBattle = Victory *Special
戦闘＝・・・r※通常\tBattle = ... *Normal
ハウゼルr見失ってしまった…\tHowzell, I've lost sight of you...
軍同士の戦いなどしった事ではない帰るぞ\tI don't care about fights between armies. Let's go back.
よい風呂であったr↑風呂上がり上機嫌\tThat was a good bath. ↑In a great mood after the bath.
出発だ\tLet's depart.
戦場だーr蹴散らせー\tIt's the battlefield— Scatter them away!
ハウゼルを追え\tChase Hauser.
ハウゼルを追え\tChase Hauser.
飛んでいるハウゼル発見rそっちか追うぞ\tSpotted flying Hauser. There he is, let's chase.
ハウゼルさーんrドラゴンパッチありますよー\tHauser-san— I've got Dragon Patch here!
(さすがに…本が目的ではr無いと思うんだけどなぁ)\t(As expected... I don't think the book is the real goal though.)
ハウゼルrほん、本、本あるぞー\tHauser, there, th-th-there's a book!
今日はもう駄目か帰って寝る\tI guess it's no good today. Going back to sleep.
今日は戦いに出ないrある場所に行くぞrついてこい\tNot going into battle today. Heading to a certain place. Follow me.
おおざっぱにr探索しながら進む\tRoughly exploring while advancing.
適当にr探索しながら進む\tAdvancing while exploring randomly.
うぃぃぃーーーん\tWiiiiirrrrnnn (sound effect).
探索しながら進む\tAdvancing while exploring.
あっ、１０Ｇみっけ\tAh, found 10 G.
ドエススキーをr捜すぞ\tLet's search for Does-ski.
うぃぃぃーーーん\tWiiiiirrrrnnn (sound effect).
大丈夫ですrモンスターは近くに居ません\tIt's okay. No monsters are nearby.
ドエススキーか・・rしらん奴だな\tDoes-ski, huh... That's someone I don't know.
ドエススキーを捜すぞr見つけて本を書かせる\tLet's search for Does-ski. Find him and make him write a book.
置いてけぼりいやれす\tDon't leave me behind, Iyarisu.
うぃぃぃーーーん\tWiiiiirrrrnnn (sound effect).
ドエススキーを捜すぞr見つけて本を書かせる\tLet's search for Does-ski. Find him and make him write a book.
用事は済んだ、帰るぞ\tBusiness is done, let's go home.
なんじゃと無茶言うなーr無理だ無理だ\tWhat the heck, don't say something unreasonable— It's impossible, impossible!
それから３日後…\tThree days later...
新刊即売会の会場ですr沢山の人が集まっていますよ\tThis is the venue of the new publication sales event. Many people have gathered here.
本を見せてやる\tI'll show the book.
本を見せない\tI won't show the book.
がはははは、rハウゼルゲットー！\tGahahahaha, Got Hauser!
リアと遊んだ後rランス城に戻る\tAfter playing with Ria, return to Rance Castle.
このままの勢いでrもう一人のr魔人も倒す\tWith this momentum, defeat the other demon as well.
待ってろよrレキシントンちゃん\tJust wait, Lexington-chan.
むむ、難易度アップしたか\tHmm, has the difficulty increased?
凱旋じゃー！\tTriumphant return!
リーザスに向けてr出発だ\tDeparting towards Leazas.
ちゃっちゃちゃっちゃー\tCha-cha cha-cha (sound effect).
村に寄ってのんびり行くか？\tShould we stop by the village and take it easy?
ちゃっちゃと街道！\tQuickly take the highway!
あえてイバラ道…\tDaringly taking the thorny path...
さあ行くぞ\tAlright, let's go.
←：女モン街道\t←: Female Monster Highway.
→：男モン平野\t→: Male Monster Plains.
城が見えてきたぞー\tThe castle is coming into view!
今日は城に泊まってr出発は明日だ\tStay at the castle tonight. Departure is tomorrow.
カーソンに向けてr出発！\tDeparting towards Carson!
気晴らしになんかしばく\tI'll beat something up to refresh myself.
ちょっとスッキリ\tFeeling a bit refreshed.
出発\tDeparture.
迂回して進む\tDetour and advance.
魔軍陣地を突破する\tBreak through the demon army's camp.
寄り道rアペムンタ村を助けに行く\tTake a detour. Go help Apemunta village.
予定通りに進みrカクテル迷宮に寄る\tProceed as planned. Stop by the Cocktail Labyrinth.
使徒オーロラがいる時\tWhen Apostle Aurora is present.
−−−\t---
さてスケールへ向かうか\tNow then, let's head to Scale.
なむなむ…r可愛い子はいませんよう\tNam nam... (prayer) I hope there are no cute girls.
スペリオールな道\tSuperior path.
エクストラな道\tExtra path.
無印の道\tPath of no mark
よーし、もう一周！\tAlright, one more lap!
スケールに向かうぞ\tLet's head towards Scale.
朝ですよ、ランス様\tIt's morning, Lord Rance.
レキシントンちゃーん\tLexington-chan!
あっちかな？\tIs it over there?
こっちかな？\tOr is it this way?
む、あそこの魔軍がr怪しい\tHmm, the demon army over there looks suspicious.
違った……\tWrong...
野営地を襲撃\tAttack the campsite.
雑魚を蹴散らし前進\tScatter the weaklings and advance.
戦闘＝・・・r※通常\tBattle = ... *Normal
戦闘＝勝利r※特殊\tBattle = Victory *Special
逃げられた……がーん\tThey escaped... gah.
くそ、帰るぞ\tDamn it, let's go back.
無事戻ってこれましたね\tWe've returned safely.
おはようございます\tGood morning.
させるかーーー！\tI won't let you!
よし、ちゃんと歩けるぞ\tAlright, I can walk properly now.
まだ半分ぐらいか…\tOnly about halfway there...
長いわボケー！\tIt's so long, damn it!
おーなんか見えるぞ！\tOh, I can see something!
ミカンの場所に行く\tGo to Mikan's place.
ウィリスの家に行く\tGo to Willis's house.
ああ……もったいない……\tAh... what a waste...
あっ…rこの間違った呪文は…\tAh... this wrong spell is...
作戦成功！\tOperation success!
ランス様、部隊編成をr戻しておきましょう\tLord Rance, let's restore the unit formation.
戦場に戻るぞ\tLet's return to the battlefield.
前方に小隊…戦力温存だ\tA squad ahead... conserve strength.
正面突破！　倒すのみ！\tBreak through the front! Just defeat them!
鬼を３部隊撃破\tDefeated 3 squads of demons.
−−−\t---
くそっr鬼に囲まれた\tDamn, surrounded by demons.
えーい、邪魔だr突破だ、突破\tHey, you're in the way! Break through, break through!
ついでに将軍も狩るぞ！\tWhile we're at it, let's hunt the general too!
うむむむrどこか分からん\tUmmm, I don't know where.
がーーーーー！rまた逃げられただと？\tGahhh! They escaped again?
まあまあ…戦いは無事r終わったんですし…\tWell, well... the battle ended safely, after all...
さて今夜はどの子とヤルか…\tNow, which girl should I do tonight...
ふひーーーーーr満足満足\tFuhihiii~ I'm satisfied, satisfied.
いくぞ、ぶっころーす！\tLet's go, kill them all!
戦闘＝勝利\tBattle = Victory.
戦闘＝・・・\tBattle = ...
−−−\t---
アペムンタ村は健在\tApemunta Village remains intact.
まあいいか、帰ろ\tWell, whatever, let's go home.
さーて最後の仕上げだ\tAlright, time for the final touch.
そういや昨晩の娘r誰だったのだろう？\tCome to think of it, who was the girl last night?
もう一度抱きたいな\tI want to hold her again.
うーんr何かとても気になる\tHmm, something's really on my mind.
今日で決めるぞ\tI'll decide today.
ニミッツ…\tNimitz...
さて、ぐふふr超グラマー魔人ちゃん\tNow then, guhuhu~ super glamorous demon girl.
ようは中身はおっさんだなrなら死ねー\tIn other words, the inside is an old man, huh? Then die!
万事解決\tAll resolved.
お宝れすよ\tHere's the treasure.
もう一つ発見rサービスいいね\tFound another one, nice service.
リッチに出撃\tSortie to Rich.
安全な街道を行こう\tLet's take the safe highway.
自由な平原がいいな\tI like the open plains.
よーし山越えだ\tAlright, let's cross the mountain.
なんだかエロい匂いがする\tI smell something erotic.
なんだか美味しい匂いがする\tI smell something delicious.
この事は後で考えよう\tI'll think about this later.
レイラさん……rリーザス城に戻るぞ\tLayla... Let's return to Leesas Castle.
チルディ保有r同イベントＡ済み\tChildi owned, same event A completed.
−−−\t---
チルディ訓練済みr調教バイブル保有\tChildi trained, holding Training Bible.
−−−\t---
リッチに入るわよ\tI'm entering the lich.
それで頼む\tSo I'm counting on you.
まて、正々堂々と優勝する\tWait, I'll win fair and square.
とっととヨシフの屋敷にr行きますわよ\tI'll head quickly to Yoshif's mansion.
チルディ万全調教\tChildi perfectly trained.
−−−\t---
出発\tDeparture.
がはははrエロ将軍逃がさんぞ\tGahahaha! I won't let the filthy general escape!
大勝利ー！\tGreat victory!
リックと一騎打ち\tA duel with Rick.
戦闘＝・・・\tBattle = ...
戦闘＝勝利\tBattle = Victory.
サクッと潰して回るぞ\tI'll quickly crush them all around.
よし任せたrやれ者ども！\tAlright, I'm counting on you, go for it, warriors!
俺様についてこい\tFollow me.
そろそろボスだな\tIt's about time for the boss.
十分戦果を稼いだ引き上げる\tWe've earned enough battle results, let's withdraw.
まだまだ、もう少し戦う\tNot yet, I'll fight a little more.
起きている奴居ないのか？r捜せ！\tIsn't anyone awake? Search!
ヤル事やったしr次は休憩だな\tWe've done what we needed, next is a break.
休憩もしたしr次は…\tWe had a break, next is...
魔軍を迎撃する\tInterception of the demon army.
お言葉に甘えて撤退する\tI'll take you at your word and retreat.
ワーグを探す\tSearching for Wargs.
ワーグを探す\tSearching for Wargs.
とにかく休もう\tAnyway, let's rest.
夕飯ー\tDinner—
そろそろ夜か…r今夜は誰と…\tIt's almost night... Tonight, with whom...
逃げる\tRun away.
ワーグを捕まえる\tCapture the Warg.
−−−\t---
ランスの☆ランクr３１以上\tRance's ★ rank 31 or above.
−−−\t---
ランスの☆ランクr４１以上\tRance's ★ rank 41 or above.
−−−\t---
ランスの☆ランクr５１以上\tRance's ★ rank 51 or above.
動ける奴で部隊編成をして戦闘だ\tForm a unit with those who can move and fight.
ＺＺＺＺＺＺＺ\tZZZZZZZ
異界ゲートを通る\tGo through the otherworld gate.
ポリゴン狩りだ\tPolygon hunting.
あっちに進もう\tLet's proceed that way.
こっちに進もう\tLet's proceed this way.
それにしてもr殺風景な世界だ\tStill, it's a bleak world.
あっちに進もう\tLet's proceed that way.
こっちに進もう\tLet's proceed this way.
ごはん食べるよー\tTime to eat!
あっちに進もう\tLet's proceed that way.
こっちに進もう\tLet's proceed this way.
こちらです\tThis way.
あっちに進もう\tLet's proceed that way.
こっちに進もう\tLet's proceed this way.
急ぎましょう\tLet's hurry.
大したことなかったなr侵入者\tIt wasn't a big deal, intruder.
カミーラちゃんとご対面だ\tTime to meet Camilla-chan.
よしカミーラゲット\tAlright, got Camilla.
城に戻る\tReturn to the castle.
ビスケッタさんを取り戻す\tRetrieve Biscetta-san.
むむ、r女の子モンスターの匂い…\tHmm, the scent of a girl monster...
ええい、無視だ無視\tUgh, ignore it, ignore it.
正面突破だ\tBreak through the front.
魔物は全員殺す\tKill all the monsters.
ランス様、こちらが手薄です\tLord Rance, this area is thinly guarded.
戦闘＝・・・\tBattle = ...
戦闘＝勝利r※特殊\tBattle = Victory *special*
脱出するぞ\tLet's escape.
脱出するぞ\tLet's escape.
いくぞrかたっぱしから撃墜だ\tLet's go, shoot them down one by one.
城外の敵を倒す\tDefeat the enemies outside the castle.
城内の敵を倒す\tDefeat the enemies inside the castle.
なんだrもう全滅か？\tWhat, they're already wiped out?
なんだrもう全滅か？\tWhat, they're already wiped out?
朝っぱらからなんだなんだ\tWhat's going on this early in the morning?
モンスターかrいい暇潰しだ\tMonsters, huh? A good way to kill time.
奥へ進むぞ\tLet's proceed deeper inside.
ポピンズとの接触有り\tContact with Poppins detected.
−−−\t---
魔物だなんて……怖いでちr東芝様……（ちらっちらっ）\tMonsters... scary, aren't they, Lord Toshiba...? (glance glance)
進もうr地底の果てへ\tLet's go, to the far end of the underground.
ん、そろそろrおっきいの来るね\tHmm, soon the big one will come.
ベズドグ山を目指す\tHead towards Mount Bezudoku.
タンザモンザツリーを目指す\tAim for the Tanzamonza Tree.
慎重に進め\tProceed carefully.
魔軍は気が付いてないなrしめしめ\tThe demon army hasn't noticed, heh heh.
そろそろか・・\tIs it about time...
戦闘＝勝利\tBattle = Victory.
戦闘＝・・・\tBattle = ...
（逃げたい・・r　やばい気がする）\t(I want to run... I have a bad feeling.)
戦闘＝勝利\tBattle = Victory.
戦闘＝・・・\tBattle = ...
この場所、ここの敵r全然可愛くない\tThis place, the enemies here aren't cute at all.
戦闘＝勝利\tBattle = Victory.
戦闘＝・・・\tBattle = ...
さて、次の勇者は・・\tNow, the next hero is...
この感じ・・r敵が強くなったか\tThis feeling... have the enemies gotten stronger?
・・・・\t....
ここまでの道中r敵は逃がしていない\tUp to this point, I haven't let any enemies escape.
−−−\t---
あっちに進もう\tLet's go that way.
こっちに進もう\tLet's go this way.
早くこちらへr急ぎたまえ\tQuickly this way, hurry up.
ほんと暑いですねrふぅふぅ\tIt's really hot, isn't it? Whew, whew.
第２番通路rと書かれた道を行くぞ\tLet's take the path labeled 'Passage No. 2'.
第３番通路rと書かれた道を進むぞ\tProceed along the path labeled 'Passage No. 3'.
第５番通路rと書かれた道が当たりだ\tThe path labeled 'Passage No. 5' is the correct one.
ん？r何か…rいや気のせいか\tHuh? Something... no, must be my imagination.
第７０番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 70'.
第７７番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 77'.
シィル、今の番号rちゃんと記憶したな\tSchill, you properly remembered the number just now, right?
（えっ・・確か・・）\t(Eh... if I remember correctly...)
第６番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 6'.
第６６番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 66'.
第３３番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 33'.
第４０番通路\tPassage No. 40
第４２番通路\tPassage No. 42
第４８番通路\tPassage No. 48
第１０１番通路\tPassage No. 101
第１１１番通路\tPassage No. 111
第９９９番通路\tPassage No. 999
ちょっとだけr涼しくなったわね\tIt's gotten just a little bit cooler, hasn't it?
れすれすr進むれす\tResu Resu, moving forward, Resu.
まったくr敵ながら情けなすぎる\tSeriously, even as an enemy, it's just too pathetic.
こちらの道rすごい物ありますよ\tAlong this path, there's something amazing.
最終決戦は近いr何が必要かよく考えよ\tThe final battle is near. Think carefully about what you'll need.
この中にr美樹ちゃんが\tMiki-chan is inside here.
くー御褒美セックスはr後まわしだ先を急ぐ\tUgh— the reward sex will have to wait, we must hurry ahead.
あっちに進もう\tLet's proceed over there.
こっちに進もう\tLet's proceed this way.
戦闘＝時間切れ\tBattle = Time's up.
戦闘＝勝利\tBattle = Victory.
さすが俺様\tAs expected of me.
通してくれて助かった\tThanks for letting me pass.
ランスがんばれrもう少しだ\tHang in there, Lance, just a little more.
がるるるる\tGrrrllll.
あっ、こんな所にr珍しい薬草が\tAh, rare medicinal herbs here in a place like this.
お前ら倒れるなr俺様について来い\tDon't fall down, you guys. Follow me.
・・・・・r居る、ここだ\t...They're here. This is the place.
戦闘＝・・・r※通常\tBattle = ... (Normal)
戦闘＝勝利r※特殊\tBattle = Victory (Special)
・・・・・・・\t.........
・・・・・・\t......
シャリエラを抱いている\tEmbracing Shaliera.
ケイブニャンを餌付けしている\tFeeding the Cave Nyan.
メリムを保有していた時\tWhen possessing Merim.
−−−\t---
ここ臭いr早く出たい\tThis place smells. I want to get out quickly.
また一緒に戦えてrうれしいぜ\tI'm glad we can fight together again.
雑魚の掃討はrお任せ下さい\tLeave the cleanup of the weaklings to me.
・・・\t...
こちらへr下水道を出ますよ\tThis way, we'll exit the sewer.
ランスr頼むぞ\tLance, I'm counting on you.
がはははははrとどめだー\tGahahahaha! This is the finishing blow!
邪魔が入ったがr今度こそ仕留める\tWe were interrupted, but this time we'll finish it for sure.
・・・・\t....
・・・・\t....
目指せベズドグ山\tHead for Mount Bezdog.
ひー！ひー！\tHii! Hii!
……！\t...!
・・・・\t....
終わらせるぞ\tLet's finish this.
第２番通路rと書かれた道を行くぞ\tLet's go along the path labeled 'Passage No. 2'.
第３番通路rと書かれた道を進むぞ\tProceed along the path labeled 'Passage No. 3'.
第５番通路rと書かれた道が当たりだ\tThe path marked 'Passage No. 5' is the correct one.
敵方依然混乱中…rチャンスです\tThe enemies are still in confusion... This is our chance.
ん？r何か…rいや気のせいか\tHm? Something... No, it must be my imagination.
第７０番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 70'.
第７７番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 77'.
シィル、今の番号rちゃんと記憶したな\tSil, you properly memorized the current number, right?
（えっ・・確か・・）\t(Eh... If I recall correctly...)
第６番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 6'.
第６６番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 66'.
第３３番通路rと書かれた道を進む\tProceed along the path labeled 'Passage No. 33'.
第４０番通路\tPassage No. 40
第４２番通路\tPassage No. 42
第４８番通路\tPassage No. 48
第１０１番通路\tPassage No. 101
第１１１番通路\tPassage No. 111
第９９９番通路\tPassage No. 999
ちょっとだけr涼しくなったわね\tIt's gotten a little cooler, hasn't it?
こちらの道rすごい物ありますよ\tThere's something amazing down this path.
最終決戦は近いr何が必要かよく考えよ\tThe final battle is near. Think carefully about what you need.
うおー！\tWhoa!
この中にr美樹ちゃんが\tMiki-chan is in here.
くー御褒美セックスはr後まわしだ先を急ぐ\tDamn, the reward sex will have to wait. Let's hurry ahead.
あっちに進もう\tLet's proceed that way.
こっちに進もう\tLet's proceed this way.
戦闘＝時間切れ\tBattle = Time's up
戦闘＝勝利\tBattle = Victory
通してくれて助かった\tThanks for letting me through, that helped.
ランスがんばれrもう少しだ\tHang in there, Rance. Just a little more.
お前ら倒れるなr俺様について来い\tDon't fall, you guys. Follow me.
・・・・・r居る、ここだ\t... They're here, right here.
戦闘＝・・・r※通常\tBattle = ... *Normal*
戦闘＝勝利r※特殊\tBattle = Victory *Special*
・・・・・・・\t...........
・・・・・・\t......
シャリエラを抱いている\tHolding Shaliera.
ケイブニャンを餌付けしている\tFeeding Cave-nyan.
メリムを保有していた時\tWhen Merim was held.
−−−\t---
ここ臭いr早く出たい\tThis place smells bad. I want to get out quickly.
・・・・・・\t......
・・・・・\t.....
こちらへr下水道を出ますよ\tThis way, we will exit the sewer.
・・・・・・\t......
がはははははrとどめだー\tGahahahaha! This is the finishing blow!
いくぞ、今度こそr奴を仕留める\tHere we go, this time we'll take that guy down for sure.
・・・・\t....
・・・・\t....
俺様の魔人討伐隊r精鋭メンバーは誰かな\tWho's in my demon extermination squad's elite members?
部隊編成をしてからr出発しましょう\tLet's organize the troops and then depart.
せっかくだから正面突破r(大変ルート)\tSince we're at it, go for a frontal assault (difficult route).
迂回してボスを倒すr(順当ルート)\tTake a detour and defeat the boss (standard route).
裏道を進むぞ\tLet's proceed through the back alley.
慎重に進む\tProceed cautiously.
村に立ち寄る\tStop by the village.
がんばらないと\tI have to do my best.
そろそろ敵本陣が近いはず\tThe enemy's main camp should be close by now.
女の子モンスターだ！\tIt's a girl monster!
魔物将軍を目指す\tAim for the demon general.
ボスはこの先の森だな\tThe boss is in the forest ahead.
ふふふr護衛が少なすぎだなr魔物将軍よ\tHehe, your guards are too few, demon general.
よし、帰るぞ\tAlright, let's go back.
材料探しrお願いするよ\tI'll ask you to gather materials.
さあてr効率のいい狩りルートは……と\tNow then, the most efficient hunting route is... hm.
どうだ、落としたか？r……ちっ、はずれか\tWell? Did it drop? ...Tch, a miss.
次にいこうぜ\tLet's move on to the next one.
材料をrゲットしていきましょう\tLet's get the materials.
……何か取れたか？\t...Did you get something?
うっ♪（楽しそう）\tUh ♪ (Looks like fun)
めっけた？\tDid you find it?
材料は揃った\tThe materials are gathered.
−−−\t---
Mランドへ出発だ\tLet's depart for M Land.
よっしゃr気を取り直していくでー\tAlright, let's pull ourselves together and go!
はあ……頑張らななぁ……\tHaa... I have to do my best...
俺は自由にrこっちを選択だ\tI choose this way freely.
どちらに進もうがr俺様の自由なのだ\tWhichever way I go, it's my freedom.
男の魔人か……つまらん\tA male demon god... how boring.
また男の魔人か……rつまらんつまらん\tAnother male demon god... boring, boring.
悪魔回廊に入るぞ\tEntering the demon corridor.
かなみを差し出す\tOffer Kanami.
リターンデーモンを倒す\tDefeat the Return Demon.
ついでにr悪魔を蹴散らしてrいきましょう\tWhile we're at it, let's scatter the demons and move forward.
さあ、あんなガキは放っておいてr先へ進むぞ\tAlright, let's leave that brat alone and move ahead.
あっち\tThat way.
こっち\tThis way.
あ、出口だよ\tAh, there's the exit.
ひいはあrひ、光が見えただー\tHiihaa... I, I see light!
日が暮れてきたな\tThe sun is setting.
こっち\tThis way.
あっち\tThat way.
そろそろ見えてきたか\tWe're starting to see it soon, huh?
こっちやで\tThis way, you know.
夜れすr寝小便注意\tIt's night — beware of bedwetting.
すっきりぐっすり眠れそうだ\tLooks like we can sleep comfortably and soundly.
カスタムだrマリアに恩を売ろう\tIt's Custom — let's do a favor for Maria.
ジフテリアだr俺様専用船に興味ありだ\tIt's Diphtheria — I'm interested in my exclusive ship.
頑張っちゃうよー！\tI'll do my best!
森に迂回する\tDetour through the forest.
まっすぐ進む\tGo straight ahead.
そろそろ私達の町rカスタムよ\tOur town, Custom, is coming up soon.
まったくマリアは…\tHonestly, Maria is...
地下迷宮に入る\tEnter the underground labyrinth.
なんだ、むかむかするr嫌な感じがしたぞ\tWhat? I feel queasy; it's an unpleasant feeling.
とにかくrマリアを捜すぞ\tAnyway, let's search for Maria.
ランス様、前方に敵rストーンガーディアン\tLord Rance, enemies ahead — Stone Guardian.
マリア、無事だよね？\tMaria, you’re alright, right?
機械油の匂いがする\tI smell machine oil.
用は済んだしＭランドに戻るぞ\tOur business is done; let's return to M Land.
朝だーーーーっ！rしゅっぱーーーつ！\tIt's morning! Let's depart!
…………くだらねェ\t...How meaningless.
そろそろ出発するか\tShall we depart soon?
けっ、気に食わん金ぴかめ\tTch, that flashy gold guy is annoying.
…進むぞ\t...Let's go.
ありがと、ダークランス\tThank you, Dark Rance.
はあ……おっきかったねー\tHaa... that was huge, huh.
用は済んだしＭランドに戻るぞ\tOur business is done; let's go back to M Land.
美女も拾ったしrＭランドに帰ろう\tWe picked up a beautiful woman, so let's return to M Land.
お風呂用意しますね\tI'll prepare a bath.
ランスr今夜うちの所へけぇへん\tRance, won't you come back to my place tonight?
では魔人退治に出発\tThen let's depart to defeat the demon god.
ハイパービルはなr２０１階建やで\tThe Hyper Building has 201 floors.
あっちに進もう\tLet's proceed that way.
そっちに進もう\tLet's go that way.
こっちに進もう\tLet's go this way.
いててr穴に落ちてしまったじゃないか\tOuch! I fell into a hole, didn't I?
地上に戻るぞ\tLet's return to the surface.
突っ走れーr魔人まで一直線だ！\tDash straight ahead — a direct line to the demon god!
このルートだr落ちずに進めるぞ\tThis route is safe — we can proceed without falling.
このルートだr問題無い\tThis is the route; no problem.
体重が影響したり……rしないよな？\tDoes weight affect it... it doesn't, right?
ぐぬぬぬrおのれー\tGnununu, damn you!
経験稼ぎが出来たr最初から狙っていたのだ\tI was able to gain experience. I've been aiming for this from the start.
落ちないように……rそーっと、そーっと\tSo I don't fall... quietly, quietly.
行くぞランス\tHere we go, Rance.
戦闘＝・・・r※通常\tBattle = ... *Normal*
戦闘＝勝利r※特殊\tBattle = Victory *Special*
（ドキドキrちょいやばかった）\t(Heartbeat... That was a bit dangerous.)
さて、どうするか…\tNow, what should I do...
ふぅ、すっきり\tPhew, that feels refreshing.
再度魔人退治に出かけるぞrしゅっぱーつ\tI'm heading out again to hunt the demon. Let's go!
出てこい雷野郎\tCome out, Thunder Guy!
次は勝つrたぶん\tNext time, I'll win. Probably.
ほなゆっくり休んでや\tWell then, take a good rest.
数日が過ぎた…\tSeveral days have passed...
その日の晩…\tThat evening...
さて…\tWell then...
戦闘＝・・・r※通常\tBattle = ... *Normal*
戦闘＝勝利r※特殊\tBattle = Victory *Special*
くっくっく。正義は勝つのだ\tHehehe. Justice will prevail.
…………\t............
翌日\tThe next day.
やったるでえー！\tI'll do it!
敵の情報を精査するrカチューシャ\tInspecting enemy information: Katyusha.
味方の情報を精査するrセシル\tInspecting ally information: Cecil.
がはははは、俺が一枚上手だったな\tGahahahaha, I was one step ahead.
しまった……やりすぎたrまあ気持ちよかったし良いか\tDammit... I overdid it. Well, it felt good so I guess it's fine.
いざ決戦の地rセキガハラへ\tNow, to the battlefield—Sekigahara.
内通者を見つけるぞ\tLet's find the traitor.
エレノアを呼ぶr（カスタム都市長）\tCall Eleanor (Custom City Mayor).
コパンドンを呼ぶr（コパ帝国都市長）\tCall Copandon (Kopa Empire City Mayor).
ビヨンホウを呼ぶr（ジフテリア都市長）\tCall Biyonhou (Jifteria City Mayor).
よし、ではr次の尋問だ\tAlright, then. Next interrogation.
よし、ではr次の尋問だ\tAlright, then. Next interrogation.
よし、ではr次の尋問だ\tAlright, then. Next interrogation.
パパデマスを呼ぶr（ジオ都市長）\tCall Papademas (Geo City Mayor).
ペスポを呼ぶr（ハンナ都市長）\tCall Pespo (Hanna City Mayor).
パトリシアを呼ぶr（アイス都市長）\tCall Patricia (Ice City Mayor).
よし、ではr次の尋問だ\tAlright, then. Next interrogation.
よし、ではr次の尋問だ\tAlright, then. Next interrogation.
よし、ではr次の尋問だ\tAlright, then. Next interrogation.
セシルを呼ぶr（自由都市軍団長）\tCall Cecil (Free City Corps Commander).
篠田を呼ぶr（軍師）\tCall Shinoda (Military Strategist).
朝倉を呼ぶr（ＪＡＰＡＮ援軍）\tCall Asakura (JAPAN Reinforcements).
面談終了r内通者は奴だな\tInterview concluded. The traitor is that one.
面談終了r内通者は奴だな\tInterview concluded. The traitor is that one.
面談終了r内通者は奴だな\tInterview concluded. The traitor is that one.
内通者は分かったr面談した３人の中に居る\tWe've identified the traitor. They're among the three we interviewed.
面談やり直し\tRedo the interview.
うむ？？r内通者は居ない\tHmm?? There's no traitor.
お手並み拝見といこう\tLet's see what you’ve got.
余計な時間を使ったなr寝るか\tWe wasted extra time. Should I sleep?
両軍、睨み合いのままr一日が過ぎた…\tBoth armies remain in a standoff; a day has passed...
がははははr死ねー雑魚どもー\tGahahahaha! Die, you weaklings!
手頃な敵を撃破だ！\tDefeat the manageable enemies!
大物が居るぞr撃破だ！\tThere's a big fish here! Defeat it!
チューリップ、最高！\tTulip is the best!
仕留めました！\tI've taken it down!
内通者……！？　やば……\tA traitor...!? Oh no...
いったん休憩\tTaking a break for now.
こっち\tThis way
裏切り阻止に成功\tSuccessfully prevented the betrayal
−−−\t---
さあ、仕上げといくぞ！\tAlright, let's finish this!
追え！　追ってr奴の血肉を啜らせろ！\tChase them! Pursue and make them taste their own blood and flesh!
追い打ちだrひゃっほー\tPress the attack! Yahoo!
雑魚掃除はr俺様の仕事では無い\tCleaning up small fry isn’t my job.
この喧嘩、うちらの勝ちや！\tWe’ve won this fight!
部下より発見報告r追い詰めるわ\tReceived a discovery report from the subordinates — we're closing in.
カチューシャの様子を見る\tCheck on Katyusha's condition.
−−−\t---
危ない所だった\tThat was close.
この町にいるはずだr捜せ！\tThey should be in this town — search for them!
挑戦ルート：ランスだけで戦う\tChallenge route: Fight using only Rance.
みんなで戦う\tFight with everyone.
…………\t........
どのランス様で戦います？rん？\tWhich version of Lord Rance will you fight as? Hm?
さすがに疲れた\tI'm definitely tired now.
ランスごめんrなんとか逃げて\tSorry, Rance. Somehow, get away.
なんだr雲行きが怪しい\tWhat's this? The clouds look suspicious.
今すぐr逃げて下さい\tPlease run away immediately.
うむ、さすが俺\tHmm, as expected of me.
さーてこの後はどうするか\tNow then, what should I do next?
そういやカチューシャからr誘いを受けていたのだ\tCome to think of it, I received an invitation from Katyusha.
絶好調だrもう一体魔人を倒すぞ\tI'm in top form! Let's defeat another demon.
悪い女の子は倒した後r１００発連続突っ込みの刑\tAfter defeating the bad girl, she gets sentenced to 100 consecutive thrusts.
ロボを追跡だ\tPursue the robot.
お願い、ちゃんと動いてよ〜……\tPlease, work properly...
あの工場に突撃だ\tCharge into that factory!
すごいココr何この材質！\tAmazing! What is this material?
がはははは！　大勝利！\tGahahahaha! Great victory!
うわっ難易度アップrしらんで・・\tWhoa, the difficulty increased — I didn’t know...
悪は滅びた。rがはははははは！\tEvil has been destroyed. Gahahahahaha!
遊園地で遊ぶ\tPlay at the amusement park.
絶好調だrもう一体魔人を倒すぞ\tI'm in perfect form! Let's defeat another demon.
ランス様の英雄譚rはじまり、はじまり\tThe heroic tale of Lord Rance begins!
出発だー\tLet's depart!
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
ズゴゴゴゴrキュルキュル\tZugogogogo, kyurukyuru (mechanical and screeching sounds)
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
ゴゴゴゴゴrスコン・・プスン\tGogogogogo, sukon... pusun (mechanical noises and sudden stop)
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
がははははrこれは便利だな\tGahahahaha! This is convenient.
がんばれr私のチューリップ\tDo your best, my tulip.
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
ゴゴゴゴゴ\tGogogogogo (rumbling sound)
奴らの戦力は分かったr町に戻るぞ\tWe've figured out their forces. Let's return to the town.
戦車はマリアにr任せてご休憩だ\tLeave the tank to Maria and take a break.
一方、その頃……\tMeanwhile, at that time...
………………\t................
今の気分としてはrおっぱい分が欲しい\tRight now, I feel like wanting some breast portion.
・・・ぐぬぬ\t...Gnnn...
ふむふむ（説明を聞いた）\tHmm hmm (listening to the explanation)
ぼんばーーーっ！\tBoommmm!
確かにこの音、気になりますね\tIndeed, this sound is concerning.
りんりんりりーん♪\tRin rin ririn♪ (bell ringing sound)
モンスター発見！r撃てーっ！\tMonster spotted! Shoot!
面倒は無しよ\tNo fuss.
お花よりケーキが良いな\tI'd prefer cake over flowers.
かぶとむしが良いれす\tI like beetles.
皆さん大丈夫ですか？\tIs everyone okay?
まあいい。案内せい\tWell then. Lead the way.
上の階に進む\tProceed to the upper floor.
隔壁右の通路に進む\tGo down the corridor to the right of the partition wall.
よしよし、隔壁が開いたな\tAlright, the partition wall opened.
（これ食べない？r　肉ぅ…じゅるり）\t(Want some of this? Meat... yum.)
ちっ、一旦引き上げだ\tTch, let's pull back for now.
−−−\t---
カチューシャを調べているrセラクロラス(大人)が居る\tThere is an adult Seracloras investigating Katiusha.
セシルを調べている\tInvestigating Cecil.
大人に戻す\tRevert to adult.
少女のままにする\tKeep as a girl.
ぐふふ、これでrカチューシャも俺のものだ\tHehe, with this, Katiusha is mine too.
がはは、これでrカチューシャも俺のものだ\tGahaha, with this, Katiusha is mine too.
レッツゴー\tLet's go.
ぜんざいか……おしるこ……rううん、お団子主体も捨てがたい……\tZenzai... oshiruko... hmm, can't dismiss dango as the main thing either...
な、なんだ！\tW-what is that!?
とにかく逃げれば大丈夫だろ\tAnyway, if we run away, we'll be fine.
あっちに避けるぞ！\tLet's dodge over there!
こっちならセーフ！\tThis way is safe!
さっさと走れ！\tRun quickly!
とにかく走れ！\tJust run!
洞窟にもぐりこめ！\tDive into the cave!
走れー\tRun!
気晴らしにセックス\tSex for a change of pace.
ひんひん……こ、腰が……\tHnn hn... m-my waist...
そして夜が明けた……\tAnd then the night ended...
まずは山の麓を目指してr駆け抜ける\tFirst, aiming for the mountain foot, dash through.
くそ、歩きはダメだrうし車でゴー\tDamn, walking won't do. Let's go by ox cart.
ハイキング開始だ\tHiking begins.
迂回かな\tMaybe a detour?
まっすぐだ\tStraight ahead.
やっぱり撃ってくるなー……rガマンだな\tThey're definitely shooting at us... gotta endure it.
あはははははr超たかーい！\tAhahahahaha! Super high!
そろそろ何か来そうなr気配がしますね\tIt feels like something is about to come soon.
やったーrドラゴンスレイヤー\tYay! Dragon Slayer!
ナギr少しは静かにしなさい\tNagi, be quiet for a bit.
おっ、勲章だrゲット\tOh, a medal! Got it.
嫌な予感するr避けて通ろうぜー\tI have a bad feeling. Let's avoid it.
こんな所に休憩ポイントがrラッキーでしたね\tA rest point in a place like this, we're lucky.
ムシは役に立たんr歩くしかないな\tInsects aren't useful. We'll have to walk.
俺の勘が閃く！rこの道が良い！\tMy intuition flashes! This path is the best!
偵察してきたわrこっちが安全よ\tI've scouted it. This way is safe.
勲章、勲章rやったねー\tMedal, medal! Yay!
ごじからおとこーっ！\tGoji-kara man!
よし、もう一息だrほぼ同高度だ\tAlright, just a bit more. Almost at the same altitude.
あースッキリした\tAh, I feel refreshed.
目的完了、下山する\tObjective complete. Descend the mountain.
せっかくだしr頂上を目指すか\tSince we're here, shall we aim for the summit?
ええーっrまだ登るのかよー！？\tEhh!? We have to climb more?!
ひい、ひい\tHii, hii.
もう無理…\tI can't anymore...
疲れたよーっ\tI'm tired!
つ、つらいです…\tI-it's tough...
なぜ妾がこんな…\tWhy am I like this...
ええと……なんで……r登ってるんだっけ……\tUm... why... am I climbing again...?
もう一息ですよ\tJust a little more to go.
とう…ちゃーく！\tTō…arrived!
下山するぞーrだだだーー\tWe're heading down the mountain—dada-da!
俺が寝ている間にもr部下共は働くのだ\tEven while I'm sleeping, my subordinates are working.
任務完了。rランス城に帰る\tMission complete. Returning to Rance Castle.
あの工場、バラバラに破壊してやる\tI'll smash that factory to pieces.
魔物大将軍ってのがいただろうrついでにあいつも……\tThere was that demon general, right? I'll take him out as well while I'm at it...
そして夜が明けた\tAnd then dawn broke.
で、結局何があったのだ？\tSo, what exactly happened after all?
周囲を探索するぞ\tLet's explore the surroundings.
変な世界\tA strange world.
［４］キー\t[4] Key
［６］キー\t[6] Key
［←］キー\t[←] Key
［→］キー\t[→] Key
クリック、クリック\tClick, click.
スワイプだー\tSwipe!
とにかく敵を狩ればいいんだな\tAnyway, I just have to hunt down the enemies.
クラッキーン\tCrackeen!
こっちはシィルが溺れてるぞrがはは\tHere, Sheel is drowning—gahaha!
［Ａ］キー\t[A] Key
［Ｄ］キー\t[D] Key
どれどれr日記を読んでみるか\tLet's see, shall I read the diary?
コンピューターはrパイアールが作ったのね\tSo, Paiar made the computer, huh?
大物がいるなrちょっと休むか\tThere's a big shot here. Maybe I'll rest a bit.
とにかく狩る\tAnyway, keep hunting.
ふっふっふ、さーてお宝拝見\tHehehe, now then, let's take a look at the treasure.
兵器が作られる前にrパイアールを倒さんと！\tI have to defeat Paiar before the weapons are made!
よしＯＰＥＮだ\tAlright, it's OPEN.
いやＣＬＯＳＥだ\tNo, it's CLOSED.
異界を抜けるぞ！\tLet's get through the otherworld!
よし、急げ！　出撃だ！\tAlright, hurry up! Sortie!
目指すは…そう、あそこだ！\tOur target is... yes, over there!
はーい、こっちでーす！\tOkay, this way!
今視線を感じた\tI just felt someone's gaze.
２階に上がる\tGo up to the second floor.
１階を進む\tProceed on the first floor.
３階に上がる\tGo up to the third floor.
２階を進む\tProceed on the second floor.
１階に戻る\tReturn to the first floor.
見えてきたrそうそう、こっちだ\tI can see it now. Yes, this way.
がはははは、いっただきー！\tGahahahaha, gotcha!
うむ、オードブルは堪能した\tMm, I've enjoyed the appetizer.
魔人パイアールr討ち取ったり\tDemon Paiar has been defeated.
Mランドへ向かうぞ\tHeading towards M Land.
はいr総統閣下を接待しますね\tAlright, I will entertain the Supreme Leader.
勝手なんだから、もう……\tHe's so selfish, geez...
悪魔回廊へゴー\tGo to the Demon Corridor.
のんびり行くぞ、のんびり\tLet's take it easy, take it easy.
回復してr時間を潰す\tRecover and kill time.
戦ってr時間を潰す\tFight and kill time.
行くぞ\tLet's go.
ゴールデンハニーのr巣に向かうぞ\tHeading to the Golden Honey's nest.
あっち\tThat way.
こっち\tThis way.
だーっしゅ！\tDash!
ふん。進むぞ\tHmph. Let's move forward.
ぐすっ、うう……rよかったよぉ……\tSniff, ugh... I'm so glad...
あっち\tThat way.
こっち\tThis way.
じっと通り過ぎるのを待つ\tQuietly wait for them to pass by.
笑いを取る\tGet a laugh.
戦闘＝・・・\tBattle = ...
戦闘＝勝利\tBattle = Victory.
………………\t………………
お疲れ様でしたrランス様\tThank you for your hard work, Lord Rance.
すごかったねー\tThat was amazing.
時間を食ったな　行くぞ\tThat took some time. Let's go.
ダークランスかr大きくなったな\tDark Rance, huh? You've grown.
このフロアを進む\tProceed through this floor.
下の階を進む\tGo down to the lower floor.
おっ、いたいたrアホが罠にかかっている\tOh, there he is! The fool got caught in a trap.
ピサロ頭まてーr頭まてー\tPisaro, wait up! Wait up!
待ちやがれr・・て、あっ\tWait for me... huh?
まぁ任務完了だr帰るか\tWell, the mission is complete. Let's go back.
ここは父親の威厳をr見せつけねばなるまい\tHere, I must show my father's dignity.
さらに本番だr見せつけてやる\tNow for the real thing. I'll show them.
この辺にしてやる\tI'll stop around here.
大丈夫かな、あの子……\tI wonder if she's alright...
・・・・・\t.....
（ダークランス……）\t(Dark Rance...)
（ネプラカス……）\t(Nepracas...)
あとは任せろ\tLeave the rest to me.
よし、かるーくr魔軍をしばくぞ\tAlright, let's lightly thrash the demon army.
大部隊などものの数ではない\tLarge armies are just numbers.
小部隊を確実に仕留めてこそ英雄\tA true hero takes down small squads for sure.
日が暮れてきたな\tThe sun is setting.
夜に乗じて魔物将軍を殺す\tTake advantage of the night to kill the monster generals.
これで片付いたかな\tIs this all cleaned up now?
妖怪退治に出発\tDeparting to exterminate the yokai.
昨晩は堪能した\tI enjoyed last night thoroughly.
ポートピアだ\tPortopia.
少しモンスターをrしばきながら進む\tAdvance while beating up some monsters.
そろそろ死国だr気をつけろ\tWe're approaching the Death Country soon. Be careful.
あっちに進もう\tLet's go that way.
こっちに進もう\tLet's go this way.
戦闘＝・・・\tBattle = ...
戦闘＝勝利r※イレギュラー\tBattle = Victory *Irregular
可愛い子は居るかな\tI wonder if there are any cute girls around.
使える奴が欲しいr戦いにも夜にも\tI want someone useful, both in battle and at night.
レベル９９が欲しいがrさすがに居ないか\tI want a level 99, but I guess there isn't one.
まずはリーザス方面に出撃だ\tFirst, sort out the Lizas direction.
さあ蹴散らすぞ！\tNow, let's scatter them!
よし、次は自由都市方面だ\tAlright, next is the Free City direction.
かかってこーい！\tBring it on!
よ、よし、次はゼスに行くぞ\tO-okay, next let's go to Zeth.
がはは、ほーら敵襲だー！\tGahaha, look, an enemy attack!
ヘル……マン……いくぞ……\tHell...man... let's go...
ぎゃおーっ！\tGyaaah!
もう…無理…\tI can't... anymore...
おっと、この部屋は……\tOops, this room is...
思いついた、かもしれない\tMaybe I just thought of something.
これをこうして…\tDo this like this...
あれをああして…\tDo that like that...
…………\t............
地下迷宮に出発\tDeparting to the underground labyrinth.
結局、どんな方達なんでしょう\tIn the end, what kind of people are they?
小人……わくわく\tDwarfs... exciting.
お、お祭りってなによー\tW-what is a festival?
くんくん、食べ物の匂い\tSniff sniff, the smell of food.
俺様は、偉いrふふふふふ\tI am mighty, hehehehe.
乱交パーティはどこだ！\tWhere's the orgy party!
くそっ、残念だ……\tDamn, what a pity...
キナニ砂漠に向かうか\tShall we head to the Kinani Desert?
砂漠案内人に接触するぞ\tLet's make contact with the desert guide.
…………クソ暑い……\t......Damn hot......
目的地に進む\tProceed to the destination.
砂漠でモンスター退治\tHunt monsters in the desert.
いったん城に戻るr疲れた\tReturn to the castle for now; I'm tired.
とりあえず休憩ね\tLet's take a break for now.
アニャガス王国に出発！\tDeparting for An’yagas Kingdom!
よーし、ダンジョンアタックだ\tAlright, dungeon attack!
声をかけて合流する\tCall out and join up.
放置する\tLeave it alone.
彼らも被害者よね……\tThey are victims too, right...
もが…もが…っ！\tStruggle... struggle...!
王子を救いに……行くか\tShall we go rescue the prince...
王子ではモチベあがらんなぁr王女だったらいいのに\tI'm not motivated by a prince... wish it was a princess instead.
あれは女箱！\tThat's a female box!
さあ、日立姫のところへ！\tNow, to Princess Hitachi's place!
ブレイブ号、出発！\tBrave ship, depart!
よし計算通りの性能だrぐんぐん潜れるぞ\tGood, performance matches calculations; we can dive steadily.
行け！　ブレイブ号！\tGo! Brave ship!
進め！　ブレイブ号！\tAdvance! Brave ship!
地底にもモンスターr沢山いますね\tThere are lots of monsters underground as well.
ハニーの気配を追いかけてr誤魔化そう\tLet's follow Honey's trail and deceive them.
ウルザを襲うしかない！　rぐふふ\tWe have no choice but to attack Urza! Hehehe.
魔人……魔人だと……？\tA demon... you say it's a demon...?
こんな奴どうでもいい。無視だ\tI don't care about this guy. Ignore him.
敵になるならぶち殺す\tIf it becomes an enemy, I'll kill it.
戦闘=時間切れ\tBattle = time out.
戦闘＝勝利\tBattle = victory.
儂、まんぞくー\tI'm satisfied.
ハニワくさいエリアを抜けたなr進め進め\tWe've passed the terracotta statue-smelly area. Move on, move on.
やばそうなのでr道を変える\tIt's looking dangerous, so we'll change the path.
振動の方に近寄る\tApproach the direction of the vibrations.
戦闘＝勝利\tBattle = victory.
戦闘＝・・・\tBattle = ...
へっぷしゅん！\tAchoo!
どんどん潜るよ\tDiving deeper and deeper.
よし、その空洞をr左に進め\tAlright, take that hollow and proceed to the left.
もっと潜れr地の底まで目指せー\tDive deeper; aim for the bottom of the earth!
ふむふむ……rこうやって動くのか……メモメモ\tHmm hmm... so it moves like this... note note.
艦首下げrさらに地下に潜るよ\tLower the bow; we'll dive further underground.
仕方ないな、進路を変える\tCan't be helped; change course.
もちろん突き進む\tOf course, charge forward.
私達は未知の地底をr進んでいるんだ\tWe are advancing into unknown underground territory.
進路を変える\tChange course.
行く手を邪魔する物はrたたき潰すのみ\tAnything blocking the way will be crushed.
戦闘=時間切れ\tBattle = time out.
条件＝勝利\tCondition = victory.
付近を調べてみようr何かあるかもしれん\tLet's investigate nearby; there might be something.
これは・・\tThis is...
地上に向けてr出発します\tDeparting towards the surface.
岩盤を突き破るよr対ショック防御\tBreaking through the bedrock; anti-shock defense.
なんかr息苦しくない？\tDon't you feel a bit suffocated?
なんだなんだ！？\tWhat is it, what is it!?
一件落着…ですかね\tCase closed... I guess.
がははははrごーごー\tGahahahaha, go go!
わ、わ、潜っていきますよ\tI-I'm diving down now.
あっ、ハニーの化石……\tAh, Honey's fossil...
おやすみ、すやすや……\tGood night, sound asleep...
針路このまま。掘削進行\tKeep this course. Proceed with excavation.
がははははははr明日の晩は誰にするかな\tGahahahaha! Who should I choose for tomorrow night?
ひっr今、ドクロと目が合って……\tEek! I just made eye contact with a skull...
ぐああああr結局ババ引いたー\tGuaaah! I ended up drawing the bad card after all!
っ…………！r今すれ違った貝は、まさか――\t...! That shell we just passed, could it be—
美樹ちゃん……大丈夫かな\tMiki-chan... I wonder if she's okay.
うんしょ　うんしょ\tHeave-ho, heave-ho.
…………\t........
美樹さんっ……！\tMiki-san...!
ランス様っ…！\tLord Rance...!
リーザス、自由都市rここで徴兵だ\tLizas, Free Cityr, conscription here.
ヘルマン、ゼスrここで徴兵だ\tHellman, Zesr, conscription here.
リーザス地方に行くr徴兵するぞー\tHeading to the Lizas regionr, conducting conscription!
自由都市地方に行くr徴兵するぞー\tHeading to the Free City regionr, conducting conscription!
リーザス地方に行くr徴兵するぞー\tHeading to the Lizas regionr, conducting conscription!
自由都市地方に行くr徴兵するぞー\tHeading to the Free City regionr, conducting conscription!
ヘルマン地方に行くrがっつり徴兵\tHeading to the Hellman regionr, thoroughly conscripting.
ゼス地方に行くrがっつり徴兵\tHeading to the Zes regionr, thoroughly conscripting.
ヘルマン地方に行くr赤紙を蒔く\tHeading to the Hellman regionr, distributing red notices.
ゼス地方に行くr赤紙を蒔く\tHeading to the Zes regionr, distributing red notices.
がははははrジジイも戦え！\tGahahahaha! Old men, fight too!
がははははrガキも戦えーい！\tGahahahaha! Kids, fight as well!
がははははrゴロツキをコキ使ってやるぞ\tGahahahaha! I'll make those ruffians work for me!
がははははr野盗どもは最前線だ！\tGahahahaha! Bandits, to the front lines!
がははははr貧農も戦え戦え！\tGahahahaha! Poor farmers, fight, fight!
がはははははは！r凶悪犯は使い潰すに限る\tGahahahahaha! It's best to wear out the vicious criminals.
がははははr戯けた奴らめ　前線送りだ\tGahahahaha! Those fools, send them to the front line.
がはははははrろくでなしは戦えー\tGahahahaha! Good-for-nothings, fight!
出発するぜ\tLet's depart.
寒いな……シーラ、上着よこせ\tIt's cold... Sheila, give me a jacket.
ようし、迷宮探索だ\tAlright, time to explore the labyrinth.
ずんずん行くぞ\tLet's keep going steadily.
こそこそ行くぞ\tLet's move stealthily.
これ……思い出しますr闘神都市……\tThis... reminds me of the Battle God City...
ガラクタ共は蹴散らして進むぞ\tLet's kick away the junk and move forward.
うっ……（残念そう）\tUgh... (looking disappointed)
先を急ぐぞ\tLet's hurry ahead.
まずは昼休みだ\tFirst, let's take a lunch break.
待てー！\tWait!
あっちへ行ったぞ！\tIt went that way!
そっちへ追い込め！\tDrive it over there!
あれ、どっち行ったの！？\tHuh, which way did it go?!
逃がすかーーーーー！！\tI won't let you escape!!!
闘将かrま、こき使ってやろう\tA battle commander, huh? Well, I'll put you to work.
なにやってたっけ？rおおそうだ、だんごを…\tWhat was I doing? Oh right, the dumplings...
何か動いた！　あっちだ！\tSomething moved! Over there!
静けさが怪しい…こっちか？\tThe silence is suspicious... Could it be this way?
お宝の気配が…さては！\tThe presence of treasure... Could it be!
ふわー　鬼ごっこつよーい！\tWow, tag is really strong!
あっちがだんごくさい！\tThat way smells like dumplings!
こっちがだんごっぽい！\tThis way seems dumpling-y!
む…もうこんな時間か\tHmm... Is it already this late?
そろそろ見つけたいねrだんご　だんご\tIt's about time to find them, dumplings, dumplings.
お、見覚えのある扉が……\tOh, a door that looks familiar...
言う事きかんならブッ壊す！\tIf it doesn't obey me, I'll smash it!
追え追えーー！\tChase it, chase it!
逃がさーーーん！\tI won't let you escape!
神妙にお縄を頂戴しろ！\tBehave and accept your arrest!
聖櫃ゲーーット！\tGot the Ark!
えーと、この先だったか\tUmm, was it ahead from here?
よし、帰還するぞ\tAlright, let's return.
防衛戦だr俺の城を守れ\tIt's a defense battle! Protect my castle!
おはようございますrランス様\tGood morning, Lord Rance.
魔人討伐隊出撃r俺様に続け！\tDemon hunting squad, sortie! Follow me!
あっちに進もう\tLet's proceed over there.
こっちに進もう\tLet's proceed this way.
一旦、城に戻るぞ\tLet's return to the castle for now.
シィルと休憩する\tTake a break with Sheila.
サーナキアの見舞い\tVisit Sarnacia.
再び出撃だr俺の城に近づかせるな\tSortie again! Don't let them approach my castle!
倒しながら進む\tAdvance while defeating enemies.
魔軍を避ける\tAvoid the demon army.
一度戻るぞ\tLet's return once.
シィルと休憩する\tTake a break with Sheila.
パステルの見舞い\tVisit Pastel.
魔人レッドアイが居たかrよし向かうぞ\tRed-Eye the Demon was here? Alright, let's go.
戦闘＝勝利r※特殊\tBattle = Victory (Special)
戦闘＝・・・r※通常\tBattle = ... (Normal)
やれやれや\tGood grief.
魔人レッドアイr次こそ倒す\tRed-Eye the Demon, next time I'll defeat you.
戦闘＝勝利\tBattle = Victory
戦闘＝・・・\tBattle = ...
出撃\tSortie
やだrスチールホラーに行く\tNo way, I'm going to Steel Horror.
しゅっぱーつr俺に続けー\tLet's go! Follow me!
東京に行って総理大臣に会う\tGo to Tokyo and meet the Prime Minister.
大阪市長で妥協する\tSettle for the Mayor of Osaka.
な、なんだー！？\tW-What is this!?
この野蛮人共めrぶっ殺す\tYou barbarians, I'll kill you all!
ムーブ！ムーブ！\tMove! Move!
私達の世界にr帰りましょう\tLet's return to our world.
駄目r不許可\tNo, not permitted.
許可する\tGranted permission.
適当に冒険に出かける\tSet out on an adventure casually.
あちらに何かありそう\tThere seems to be something over there.
むこうはどうでしょうか？\tWhat about over there?
スルメ山に出発\tDepart for Surume Mountain.
慎重に進むぞ\tAdvance cautiously.
道がよく見えない・・こっちか\tCan't see the path well... Is it this way?
迷子になったか・・こっちだろ\tAre we lost...? It should be this way.
意表をついてこっちかー\tTaking an unexpected route, is it this way?
逃がしたか\tDid it escape?
道がよく見えない・・こっちか\tCan't see the path well... Is it this way?
迷子になったか・・こっちだろ\tAre we lost...? It should be this way.
意表をついてこっちかー\tTaking an unexpected route, is it this way?
道がよく見えない・・こっちか\tCan't see the path well... Is it this way?
意表をついてこっちかー\tTaking an unexpected route, is it this way?
休憩したいぞ…r眠くなってきた…\tI want to take a break... I'm getting sleepy...
こっち、こっちrカブトムシ！\tThis way, this way! A rhinoceros beetle!
健太郎を助け起こす\tHelp Kentaro get up.
健太郎を殺す\tKill Kentaro.
お城に帰りましょう\tLet's go back to the castle.
ケイブリスを討つぞ\tLet's defeat the Cave Lis.
ケイブリスはどこだ\tWhere is the Cave Lis?
えーい、まだ戦うぞ\tHey! I'm still going to fight.
きりが無いr撤収だ\tThis is endless. Retreat!
よし、行くぞ\tAlright, let's go.
戦略的後進だ！\tStrategic retreat!
先制攻撃のチャンス！\tChance for a preemptive strike!
明日も探索だ\tWe'll explore again tomorrow.
全軍出撃！\tAll forces, sortie!
先陣はお任せを！\tLeave the vanguard to me!
毘沙門天の、加護ぞある！\tWe have the blessing of Bishamonten!
突っ込むわよ！r数百年分、やり返す！\tCharge in! I'll make up for hundreds of years!
１５ターン\t15 turns
−−−\t---
……間に合いませんでした\t...We didn't make it in time.
戦闘＝勝利\tBattle = Victory
戦闘＝・・・\tBattle = ...
蹴散らすぞ、突き進め！\tWe'll scatter them, push forward!
……未だ残る勝機を……rいや、言うまい\t...There is still a chance to win... No, I won't say it.
兵力１００万以下の時\tWhen forces fall below 1 million
−−−\t---
撤退です……残念ですが\tRetreat... It's unfortunate, but.
その後\tAfter that
この時が……来てしまいました\tThis moment... has come.
そして、時間が流れ……\tAnd time passed...
戦闘＝勝利\tBattle = Victory
戦闘＝・・・\tBattle = ...
鬼より怖い両王手r味わってみよ\tExperience the double check more terrifying than a demon.
全力で探すわ！r絶対に見つけてみせる！\tI'll search with all my might! I'll definitely find it!
行き先は決まったみたいねr全軍、ダーリンに続きなさい！\tIt looks like the destination is decided. All forces, follow Darling!
ここに隠れているのかr探し出せ、殺せ\tAre they hiding here? Find them, kill them.
最後の戦いですr皆さん、進んでください\tThis is the final battle. Everyone, move forward.
前進……それでも前進、ですっ\tAdvance... Still, advance!
まだまだ……！\tNot yet...!
急げ　急げ　間に合うはずだr俺が、魔王に……！\tHurry, hurry, I should make it in time. I will be the Demon King...!
あっちに進もう\tLet's go over there.
こっちに進もう\tLet's go this way.
俺様の！r勝ちだ！\tIt's my victory!
どっちかというならrそうだな……\tIf I had to choose, well...
トッポスなぞ楽勝\tToppos is a piece of cake.
アニスならよろしくしてやろう\tIf it's Anise, I'll take care of her.
ほんと、r困った弟子だわ……\tTruly, what a troublesome apprentice...
……なんかr街燃えてません？\t...Isn't the town burning or something?
労働にはご褒美があるべきだrそうだな？\tWork should have rewards, right?
うむうむrよし、またそのうち……rいや、もうやってはいかんぞ\tHmm, hmm. Alright, maybe again sometime... No, we really shouldn't do it anymore.
ではトッポスさんの所へr向かいましょう\tThen, let's head to Toppos' place.
伝説の魔物退治か……r流石アニキだぜ\tTaking down a legendary monster... As expected of big bro.
ああ……楽しかったr今度はソロがいいな\tAh... That was fun. Next time, I want to go solo.
お疲れ様でした\tGood work, everyone.
がははははははrやはり俺は天才だな！\tGahahahaha! As I thought, I am a genius!`
    .split("\n")
    .map(l => l.split("\t"))
    .map(([jpn, eng]) => ({ jpn, eng }));

const questDataText = await fs.readFile("Rance10EX/5_クエストデータ.x", "utf-8");
let translatedQuestDataText = questDataText;

const matches = questDataText.matchAll(/説明 = (".*")/g);
for (const match of [...matches].reverse()) {
    const [whole, capture] = match;
    const jpn = JSON.parse(capture);
    const eng = translations.find(t => t.jpn === jpn).eng;
    const normalized = replaceUnicode(eng)
        .replace(/[^\x00-\x7F♪☆○Σ]/g, ".")
        .replace(/r/g, "R"); // it's very stupid, but the engine interprets "r" as a line break, so we are replacing it with "R" everywhere
    const precedingText = translatedQuestDataText.slice(0, match.index);
    const replacedText = "説明 = " + JSON.stringify(wrapAt(normalized, "Let's oRganize the tRoops and"));
    const followingText = translatedQuestDataText.slice(match.index + whole.length);
    translatedQuestDataText = precedingText + replacedText + followingText;
}

await fs.writeFile("ololo_quest_data_translated.x", translatedQuestDataText);

// console.log([...matches].map(m => JSON.parse(m[1])).join("\n"));