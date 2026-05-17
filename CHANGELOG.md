# Celeste Harbor 開発変更履歴

Celeste Harbor の開発変更履歴です。

README.md は「現在の仕様」をまとめる場所。  
CHECKLIST.md は「点検項目」をまとめる場所。  
この CHANGELOG.md は「いつ、何を、なぜ変えたか」を残す場所です。

---

## 2026-05-16

### 全体方針

Celeste Harbor を、単に記録を書くだけの場所ではなく、  
記録・漂着物・船・海域・チケットが静かにつながる港として整理した。

特に以下の体験を強化した。

```txt
記録を書く
↓
気配が返る
↓
何かが漂着する
↓
漂着物が船につながる
↓
船が海域を開く
↓
海域が新しい漂着物を呼ぶ
↓
その記録が Cabin Log に残る
公開ページ・認証まわり
完了
公開ページを / /about/ /voyage/ のみに整理。
/log/ /timeline/ /items/ /vessels/ /map/ /account/ /tickets/ /special-voyage/ /fragments/ /archive/ /harbor/ をログイン必須化。
/harbor/ は旧入口として維持。
未ログイン時は / へ戻す。
ログイン済みは /log/ へ送る。
/auth/ は / へリダイレクト。
旧Celeste系ページを /legacy/ 配下へ移動。
/legacy/* は noindex, nofollow。
ルート直下の旧HTMLは /legacy/... へリダイレクト。
sitemap.xml は / /about/ /voyage/ のみ。
robots.txt は内部ページと /legacy/ を Disallow。
意図

公開領域と内部領域を明確に分けるため。
Celeste Harbor は私的な港であり、内部ページを検索流入させないため。

README / CHECKLIST / CHANGELOG
完了
README.md を新規作成。
旧READMEを /legacy/README.md に保存。
READMEを日本語化。
全体チェックリストを作成。
CHANGELOG.md の初版を作成。
意図

英語READMEでは、後から自分で読んだときに負荷が高かったため、日本語化した。
自分が理解できないREADMEは、存在していないのと同じという判断。

DB / 基本機能
完了
vessels 9隻登録。
harbor_items 25種登録。
sea_areas 7海域登録。
area_item_pools 設定。
ensure_user_vessel() 実装・利用。
check_and_unlock_next_vessel() 実装・利用。
check_and_unlock_sea_areas() 実装・利用。
grant_random_harbor_find() 実装・利用。
get_user_vessels_collection() 実装・利用。
意図

漂着物、船、海域の基本ループを成立させるため。

/log/ Voyage Log
追加
Harbor Find 表示カードを追加。
Drift Ticket 表示カードを追加。
Harbor Weather を開放済み海域に連動させた。
Harbor Cat の巻物に Harbor Find / Drift Ticket 通知を追加。
Recent Logs を維持。
変更
Harbor Find の初回保証などの内部仕様はユーザー向けに出さない方針に変更。
Harbor Find 初期文言を以下に調整。
何かが流れ着く夜もあれば、ただ波だけが残る夜もあります。
Drift Ticket 初期文言を以下に調整。
小さな航海券が流れ着く夜があります。
それは、少しだけ深い海へ降りるための合図です。
意図

単に記録するだけではなく、港に何かが返ってくる体験を作るため。
ただし、報酬ゲームのようには見せないため。

/timeline/ Cabin Log
追加
画像付きイベントカードを実装。
Harbor Find は漂着物画像を表示。
Drift Ticket はチケット画像を表示。
Vessel acquired は船画像を表示。
Sea Area opened は海図画像を表示。
Read more / Show less を追加。
初期表示は5件。
変更
user_timeline_events_view に image_path / image_alt を追加。
Harbor Find の画像解決を metadata.item_key で行うよう調整。
Drift Ticket 画像は目立ちすぎないよう控えめに調整。
意図

Cabin Log を単なる文字ログではなく、港に積もっていく記録として見せるため。

/items/ Harbor Finds
追加
海域別表示を実装。
アイテム画像表示を実装。
アイテム画像拡大モーダルを実装。
海域ごとの発見数を表示。
進捗バーを追加。
変更
未発見アイテム名は表示しない方針。
未開放海域は「霧の向こう」として表示。
意図

探索感を出しつつ、未発見アイテムのネタバレを避けるため。

/vessels/ 船
追加
船画像拡大モーダルを実装。
船詳細モーダルを実装。
現在の船に「この船で開いた海域」を表示。
次の船に「必要素材」を表示。
船の記録一覧に Opened Sea を表示。
変更
所有済み船だけ、画像・実名・説明・Cabinを表示する方針に変更。
未開放船は「霧の向こう」として表示。
次の船も、取得前は「霧の向こう」として表示。
次の船の画像・実名・説明・Cabinは取得まで見せない。
次の船では必要素材だけ表示する。
未開放船のモーダルで実画像や vessel_key が出ていた問題を修正。
モーダル内の不自然な改行を修正。
意図

船の記録と次の船の表示が矛盾しないようにするため。
船は取得して初めて姿を見せる、という体験に統一するため。

/map/ Sea Chart
追加
海図画像表示。
海図拡大モーダル。
海域カード。
海域ごとの「気配」表示。
海域カードタップ時の風景モーダル。
未開放海域タップ時の霧カード。
追加した海域風景画像
/images/areas/harbor.png
/images/areas/fog-sea.png
/images/areas/moonlit-sea.png
/images/areas/lighthouse-coast.png
/images/areas/silent-water.png
/images/areas/deep-current.png
/images/areas/unnamed-waters.png
変更
海域が開くことを、単なるDBフラグではなく「見える景色が増える体験」として扱うように変更。
未開放海域はクリックしても無反応ではなく、霧カードを表示するように変更。
意図

海域開放に体験上の意味を持たせるため。
「書き続けるだけ」ではなく、港の外が広がっていく感覚を作るため。

/tickets/
追加
Harbor Cat / Drift / Special / Deep Sea の画像付きカードを実装。
3種類のチケットSVGを作成。
/images/tickets/drift-ticket.svg
/images/tickets/special-voyage-ticket.svg
/images/tickets/deep-sea-ticket.svg
変更
Special Voyage Ticket は 10分 / 20分 の2種類に確定。
15分 / 30分の Special Voyage Ticket は作らない。
Deep Sea Ticket の文言を開発者向けからユーザー向けへ変更。
Drift Ticket は販売導線ではなく「港に漂着するもの」として表現。
意図

チケットの意味をユーザーに自然に伝えるため。
チケットページが設計メモではなく、ユーザー向けの案内になるようにするため。

/account/
追加
Available Tickets の概要表示。
Drift / Special / Deep Sea のチケット数表示。
チケット画像カード。
有効チケット状態表示。
Special Voyage への導線。
意図

/log/ で届いたチケットが、どこで確認できるのかを明確にするため。
チケット体験の流れを閉じるため。

/log/
  Drift Ticket が届く

/tickets/
  チケットの意味が分かる

/timeline/
  チケット漂着が記録される

/account/
  所持チケットが見える

/special-voyage/
  チケットを使う
/special-voyage/
追加
チケット種別ごとの入口表示。
Drift Ticket は「漂着チケットの入口」。
Special Voyage Ticket は「特別航海の入口」。
Deep Sea Ticket は「深海航海の入口」。
変更
Drift Ticket を Special Voyage Ticket のように見せない方針へ変更。
source: random_drift などの開発者向け表示をユーザー向け表現に変更。
created: を 届いた日： に変更。
チケット種別ごとに説明文を分岐。
意図

ユーザーが、どのチケットでどの海へ入ろうとしているのか分かるようにするため。

画像・見た目
完了
船9隻画像アップロード済み。
Harbor items 25種の image_path 設定済み。
チケット3種のSVG作成。
海域7種の風景画像作成。
/items/ /vessels/ /map/ /timeline/ /account/ /tickets/ で画像表示を強化。
方針
画像は主役にしすぎない。
ただし、文字だけの画面にはしない。
Celeste Harbor の静かな海の気配を補強するために使う。
Drift Ticket は目立たせすぎない。
未開放のものは霧で隠す。
2026-05-17
内部ページ共通ヘッダー整理
完了

内部ページのログアウト導線を整理した。

対象ページ：

/log/
/timeline/
/items/
/vessels/
/map/
/tickets/
/account/
/special-voyage/
/fragments/
/fragments/harbor-remained-quiet/
/fragments/fog-signal/
/fragments/pier-footsteps/
/archive/

以下の方針に統一した。

ヘッダー：
Voyage Log / Cabin Log / Items / Vessels / Map / Tickets / Account / ログアウト

本文内：
ログアウトボタンは削除
そのページに必要な主要導線のみ残す
変更
各内部ページの本文内にあった「ログアウト」ボタンを削除。
ヘッダーに ログアウト リンクを追加。
JS側のログアウト処理を logoutBtn から logoutLink に統一。
共通ナビに Tickets を追加。
フッターにも必要に応じて Tickets を追加。
スマホ表示時、本文内ボタンが押しやすいよう一部ページで幅100%に調整。
意図

ログアウトボタンが各ページ本文にあると、記録・漂着物・船・海域を見る体験よりも、管理画面のような印象が強くなるため。

ログアウトは必要な機能だが、ページごとの主役ではない。
そのため、共通ヘッダーに静かに集約した。

Voyage Log 表記統一
完了

/log/ の保存ボタン表記を以下に統一した。

Save Log
↓
航海記録を残す

/special-voyage/ の航海中の送信ボタンも、体験上の意味に合わせて以下に統一した。

航海記録を残す
意図

Save Log は機能名としては分かりやすいが、Celeste Harbor の世界観では少し管理画面寄りに見えるため。

「航海記録を残す」とすることで、機能と世界観の両方を保つ。

Fragments / Archive 整理
完了

Fragments 系ページのヘッダーとログアウト導線を整理した。

対象：

/fragments/
/fragments/harbor-remained-quiet/
/fragments/fog-signal/
/fragments/pier-footsteps/

変更内容：

内部ページ共通ヘッダーに統一。
Tickets をナビに追加。
ヘッダーに ログアウト を追加。
本文内ログアウトボタンを削除。
Fragment 個別ページの本文導線を Fragmentsへ / Cabin Logへ / Voyage Logへ に整理。

Archive ページも同じ内部ページ方針に揃えた。

対象：

/archive/

変更内容：

内部ページ共通ヘッダーに統一。
Tickets をナビとフッターに追加。
本文内ログアウトボタンを削除。
JS側のログアウト処理を logoutLink に統一。
意図

Fragments と Archive は、現在の港の周辺にある記録領域として扱うため。
ログイン必須ページである以上、ナビゲーションとログアウト導線は他の内部ページと揃えた。

Legacy / Redirect 整理
完了

Legacy ページの扱いを整理した。

方針：

/legacy/ 配下はログイン不要
検索エンジンには index させない
<meta name="robots" content="noindex, nofollow"> を入れる

対象：

/legacy/about.html
/legacy/philosophy.html
/legacy/silent-structure.html
/legacy/vision.html
/legacy/who-i-am.html
/legacy/who-this-is-for.html
/legacy/faq.html
/legacy/timeline.html
/legacy/README.md

ルート直下の旧HTMLページは、対応する Legacy ページへリダイレクトする方針を確認した。

/about.html              → /legacy/about.html
/philosophy.html         → /legacy/philosophy.html
/silent-structure.html   → /legacy/silent-structure.html
/vision.html             → /legacy/vision.html
/who-i-am.html           → /legacy/who-i-am.html
/who-this-is-for.html    → /legacy/who-this-is-for.html
/faq.html                → /legacy/faq.html
/timeline.html           → /legacy/timeline.html

/auth/ は / へリダイレクトする。

/auth/ → /
修正

/vision.html のリダイレクト先に誤りがあったため修正。

誤：/legacy/Xvision.html
正：/legacy/vision.html
意図

旧Celeste Console 系ページは、現在の Harbor とは役割が異なるため、/legacy/ に静かに保存する。

ただし、検索流入させるページではないため noindex, nofollow とする。

チケット利用時の漂着物取得ルール
完了

Drift Ticket / Special Voyage Ticket / Deep Sea Ticket 利用時の漂着物取得ルールを定義した。

仕様
Drift Ticket
  最大取得数：1個
  取得は確定ではない
  無料で少し深い海を試すための短い航海

Special Voyage Ticket 10分
  最大取得数：1個
  取得は確定ではない
  通常の Voyage Log より、漂着物が届きやすい

Special Voyage Ticket 20分
  最大取得数：2個
  1個目も確定ではない
  2個目は低確率
  10分チケットより、少しだけ深く届きやすい

Deep Sea Ticket
  最大取得数：2個
  取得は確定ではない
  深海系アイテムの抽選率を高める
  2個目も確定ではない
共通方針

チケットは、漂着物の取得を保証するものではない。
ただし、通常の Voyage Log よりも、漂着物が届く気配を強める。

報酬を確定させるための仕組みではなく、
少し深い海へ降りることで、届く可能性が変わる仕組みとして扱う。

意図

チケットに価値を持たせつつ、報酬ゲームのように見せすぎないため。

Deep Sea Ticket は、単に取得数を増やすためのものではなく、
深い海域に属する漂着物が選ばれやすくなるチケットとして扱う。

Special Voyage 実装
追加
voyage_sessions による時間制航海を使用。
voyage_tickets.ticket_id を指定して Special Voyage を開始する流れを実装。
/special-voyage/ で複数チケット表示に対応。
Drift / Special 10分 / Special 20分 / Deep Sea Ticket の航海開始を確認。
航海中画面を表示。
航海記録送信時に special-voyage-reply を呼び出す流れを整理。
変更
start-special-voyage を ticket_id を受け取る版に変更。
special-voyage-reply を安全版に差し替え。
フロント側で special-voyage-reply 呼び出し時に session_id を渡すよう修正。
const { data, error } = await client.functions.invoke("special-voyage-reply", {
  body: {
    session_id: activeSession.id,
    message
  }
});
修正
session_id が渡されず session_id_required となり、Edge Function non-2xx になる問題を修正。
voyage_sessions に ticket_type カラムが存在せず、実際には session_type を使う必要がある問題を修正。
special の 10分 / 20分 判定を duration_minutes で行うよう修正。
voyage_session_find_rolls への insert 時に user_id が null になり、not-null 制約で失敗する問題を修正。
存在しない voyage_replies テーブルへ書き込もうとして失敗する問題を回避。
意図

Special Voyage を通常の Voyage Log とは別の、時間制の静かな航海として成立させるため。
また、チケット種別ごとの意味を保ちながら、実装上は安全に session_id と ticket_id で紐づけるため。

Special Voyage Harbor Find 抽選
追加
voyage_session_find_rolls テーブルを使用した抽選記録を追加。
Drift / Special 10分 / Special 20分 / Deep Sea Ticket ごとの抽選ルールを実装。
Special 20分で2枠抽選が記録されることを確認。
Deep Sea Ticket で2枠抽選が記録されることを確認。
Deep Sea Ticket で深海系アイテムが出ることを確認。
abyss_note / 深海からの記録片 が取得可能であることを確認。
仕様
Drift Ticket
  最大1個
  確定ではない

Special 10分
  最大1個
  確定ではない

Special 20分
  最大2個
  2個目は低確率

Deep Sea Ticket
  最大2個
  深海系アイテム抽選率を高める
セッション単位の抽選

漂着物抽選は、1つの voyage_session につき1回だけ実行する仕様に変更した。

同じ航海中に複数回「航海記録を残す」を押した場合：

既存の voyage_session_find_rolls を再利用する
新しいrollは作成しない
既存の漂着物を「すでに船に収められているもの」として再表示する
アイテムの二重付与は行わない
修正
航海記録を書くたびに、Deep Sea Ticket の漂着物が2個ずつ増える問題を修正。
既存roll再利用時に「新しく見つかった」と表示される表現を修正。
既存roll再利用時は「この航海で見つかった漂着物は、すでに船に収められています」と表示する方針に変更。
意図

Deep Sea Ticket が「記録を書くたびに報酬が増えるチケット」にならないようにするため。
漂着物は、1つの航海の中で一度だけ海から届くものとして扱うため。

Special Voyage アイテム付与
追加
Special Voyage で見つかった漂着物を user_harbor_items に付与する処理を追加。
未所持アイテムは新規追加。
既存アイテムは quantity を +1。
unique(user_id, item_key) を利用して安全に所持品を更新。
既存roll再利用時には再付与しない。
修正
返答文には漂着物が出るが、/items/ に表示されない問題を修正。
voyage_session_find_rolls には記録されるが、user_harbor_items に付与されていなかった問題を修正。
harbor_items に存在しない item_key があると表示できない問題を確認し、抽選対象アイテムのマスタ登録を整理。
確認
sea_glass / 波に削られた硝子片 が user_harbor_items に付与されることを確認。
/items/ に付与済みアイテムが表示されることを確認。
quantity = 0 のアイテムも一度発見済みであれば表示する仕様であることを再確認。
意図

Special Voyage の報酬を、その場の文章だけで終わらせず、実際の港の所持品として残すため。

報酬詳細モーダル
追加
/special-voyage/ の HARBOR FIND 報酬カードをクリック可能にした。
/special-voyage/ の DRIFT TICKET 報酬カードをクリック可能にした。
/log/ の HARBOR FIND カードをクリック可能にした。
/log/ の DRIFT TICKET カードをクリック可能にした。
HARBOR FIND の詳細モーダルで画像を表示。
HARBOR FIND の詳細モーダルで rarity / area_hint を表示。
DRIFT TICKET の詳細モーダルでチケット説明を表示。
表示内容

HARBOR FIND：

アイテム画像
アイテム名
説明文
由来文
rarity
area_hint
status

DRIFT TICKET：

チケット名
duration
status
説明文
修正
/log/ 側でカードではなく文字だけがクリック対象になっていた問題を修正。
/log/ の HARBOR FIND モーダルで画像が出ない問題を修正。
/log/ の HARBOR FIND モーダルで common や Silent Water などのタグが出ない問題を修正。
/special-voyage/ 側で extractHarborFindNotices is not defined となる問題を修正。
意図

漂着物やチケットを「ただの通知」ではなく、手に取って確認できるものとして扱うため。
港に届いたものの存在感を少しだけ強めるため。

/items/ 発見数カウント修正
修正
/items/ で港エリアの発見数が 6 / 4 になる問題を修正。
分母と分子の基準がズレていたため、area_item_pools を基準に統一。
他エリアのアイテムが現在エリアの発見数に混ざらないよう修正。
正しい計算
分母：
area_item_pools に登録された、そのエリアの item_key 数

分子：
その item_key のうち、user_harbor_items に存在する数
確認

港エリアでは以下のみをカウント対象とする。

chart_fragment
driftwood
lantern_fragment
old_rope

moon_shell や sea_glass は moonlit_sea に属するため、港の発見数には含めない。

意図

発見数は「そのエリアで見つかるべきもの」に対する進捗であり、
単なる所持品数ではないため。

Special Voyage 漂着物マスタ整備
追加・整理

Special Voyage の抽選対象アイテムを harbor_items と area_item_pools に登録し、画像パスを設定した。

現在の Special Voyage 漂着物プール：

item_key	日本語名	エリア	image_path
moon_shell	月明かりの貝殻	Moonlit Sea	/images/items/moon-shell.png
driftwood	漂流木	Harbor	/images/items/driftwood.png
sea_glass	波に削られた硝子片	Moonlit Sea	/images/items/sea-glass.png
lighthouse_shard	灯台のかけら	Lighthouse Coast	/images/items/lighthouse-shard.png
fog_compass	霧の羅針盤	Fog Sea	/images/items/fog-compass.png
quiet_chart	静かな海図	Fog Sea	/images/items/quiet-chart.png
deep_blue_pearl	深海の青い真珠	Deep Current	/images/items/deep-blue-pearl.png
sunken_star	沈んだ星	Deep Current	/images/items/sunken-star.png
abyss_note	深海からの記録片	Deep Current	/images/items/abyss-note.png
追加した画像
/images/items/moon-shell.png
/images/items/sea-glass.png
/images/items/lighthouse-shard.png
/images/items/quiet-chart.png
/images/items/abyss-note.png
/images/items/deep-blue-pearl.png
/images/items/sunken-star.png
修正
moon_shell が area_item_pools に未登録だったため、moonlit_sea に登録。
sea_glass が area_item_pools に未登録だったため、moonlit_sea に登録。
abyss_note / deep_blue_pearl / sunken_star を deep_current に登録。
lighthouse_shard を lighthouse_coast に登録。
quiet_chart を fog_sea に登録。
image_path = null だったアイテムに画像パスを設定。
実画像ファイルを /images/items/ に配置。
意図

抽選で出たアイテムが、返答・所持品・アイテム欄・画像表示まで一貫してつながるようにするため。

small_driftwood 統一
変更
small_driftwood を廃止。
Special Voyage の抽選コードでは、既存の driftwood を使用するよう変更。
driftwood は既に画像・マスタ・所持品が整っているため、そちらに統一。
状態
small_driftwood：廃止
driftwood：継続使用
意図

似たアイテムを増やしすぎず、既存の画像付き漂着物に統一するため。
「小さな流木」と「漂流木」を別アイテムとして扱う必要性が低いため。

2026-05-17 時点の主要完成状態
/log/
  航海記録、Harbor Cat、Harbor Find、Drift Ticket、海域連動Weather
  HARBOR FIND / DRIFT TICKET 詳細モーダル
  ヘッダーにログアウト統一
  保存表記は「航海記録を残す」

/timeline/
  画像付きCabin Log、Read more / Show less
  ヘッダーにログアウト統一

/items/
  海域別Harbor Finds、発見数、進捗バー、画像モーダル
  発見数カウント修正済み
  quantity = 0 も発見済みとして表示
  ヘッダーにログアウト統一

/vessels/
  船詳細モーダル、船と開放海域の対応、霧表示統一
  ヘッダーにログアウト統一

/map/
  海域の気配、海域風景モーダル、霧カード、海図モーダル
  ヘッダーにログアウト統一

/tickets/
  3種チケット説明と画像
  ヘッダーにログアウト統一

/account/
  所持チケット確認
  チケット概要・画像カード・Special Voyage導線
  ヘッダーにログアウト統一

/special-voyage/
  チケット種別ごとの入口
  複数チケット表示
  ticket_id 指定で航海開始
  航海中の記録導線を「航海記録を残す」に統一
  special-voyage-reply 連携
  1セッション1回の漂着物抽選
  報酬詳細モーダル

/fragments/
  Fragment一覧
  内部ページ共通ヘッダーに統一

/archive/
  旧Celeste記録への入口
  内部ページ共通ヘッダーに統一

/legacy/
  ログイン不要
  noindex, nofollow
  旧Celeste Console系ページを保存
確認済み
Drift Ticket
航海開始できることを確認。
航海記録への返答が返ることを確認。
voyage_session_find_rolls にrollが記録されることを確認。
最大1個、確定ではない仕様を確認。
Special Ticket 10分
航海開始できることを確認。
航海記録への返答が返ることを確認。
voyage_session_find_rolls にrollが記録されることを確認。
最大1個、確定ではない仕様を確認。
Special Ticket 20分
航海開始できることを確認。
航海記録への返答が返ることを確認。
2枠分のrollが記録されることを確認。
1個目が成功し得ることを確認。
2個目が低確率であることを確認。
20分経過後、セッションが expired になることを確認。
Deep Sea Ticket
航海開始できることを確認。
航海記録への返答が返ることを確認。
2枠分のrollが記録されることを確認。
Deep Sea 系アイテムが抽選対象に入ることを確認。
abyss_note / 深海からの記録片 が取得可能であることを確認。
1回の Deep Sea 航海で複数漂着物が見つかることを確認。
同じ航海中に再度記録を書いても、追加rollが作成されないことを確認。
アイテム表示
見つかった漂着物が user_harbor_items に付与されることを確認。
付与されたアイテムが /items/ に表示されることを確認。
quantity = 0 のアイテムも発見済みとして表示されることを確認。
image_path が存在し、画像ファイルが配置されていれば画像表示されることを確認。
今後の候補
全内部ページのヘッダー実機確認
README / CHECKLIST の更新反映
robots.txt / sitemap.xml の最終確認
/map/ のスマホ表示微調整
/vessels/ の船詳細モーダルの見た目調整
船取得Timelineの演出強化
有料 Special Voyage Ticket 実装
development changelog の継続更新
optional sound の再検討
Special Voyage の追加チケット種別検討
報酬詳細モーダルの表現統一
DB schema backup 作成
保留
音

音の導入は保留。

理由：

実装よりも、まず視覚体験と基本ループを整える方が優先。
自動再生は避ける。
導入するなら、ユーザー操作による Sound On / Off のみ。

候補：

静かな港の環境音
小さな波音
遠い風
木造船の軋み
メモ

Celeste Harbor は静かな港であること。

便利にしすぎない。
報酬ゲームに寄せすぎない。
管理画面にしすぎない。

ユーザーが、記録を書き、流れ着いたものに気づき、船を整え、少しずつ海が広がっていくこと。

船は、まだ進んでいる。
