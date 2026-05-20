# Celeste Harbor

Celeste Harbor は、航海の記録を残し、小さな気配を受け取り、漂着物を集め、船を整え、新しい海域を開いていくための静かなWebの港です。

このプロジェクトは、SNSでも、チャットボットでも、生産性ダッシュボードでもありません。  
静かな航海を続けるための、個人的な港です。

---

## 公開ページ

公開ページは、意図的に小さく保ちます。

### `/`

公開入口ページ。

表示するもの：

- Googleログイン
- Aboutリンク

### `/about/`

公開説明ページ。

Celeste Harbor、Harbor Cat、Presence AI、港の目的を説明します。

### `/voyage/`

公開用の Moonlit Voyage ページ。

書籍や改訂版の案内を置くための公開ページです。

---

## ログイン必須ページ

港の内部ページは、すべてGoogleログイン必須です。

### `/log/`

Voyage Log。

今日の航海記録を書くための中心ページです。

`/log/` は、港の状態をすべて見る場所ではなく、  
今夜の航海を残すための入力中心ページとして扱います。

含まれるもの：

- Voyage Log 保存
- Harbor Cat 応答
- Harbor Find
- Harbor Find 表示カード
- Harbor Find 詳細モーダル
- Drift Ticket 表示カード
- Drift Ticket 詳細モーダル
- Tonight's Harbor
- Harbor Weather
- 開放済み海域に連動した Harbor Weather
- Recent Logs
- 全体 Voyage Log ダウンロード

`/log/` には、日々の記録を書くために必要なものを残します。

港の灯り、今の航海の気配、Last Voyage、Memory Tide は、  
`/harbor-status/` に移動します。

これにより、`/log/` は「今日の航海を書く場所」として軽く保ちます。


### `/harbor-status/`

Harbor Status。

今の港に残っている気配を確認するための内部ページです。

`/log/` が「今日の航海を書く場所」であるのに対して、  
`/harbor-status/` は「今の港の状態を眺める場所」として扱います。

含まれるもの：

- 港の灯り
- 今の航海の気配
- Last Voyage
- Memory Tide
- Voyage Log への導線
- Voyage Archive への導線

役割：

```txt
/log/
  今日の航海を書く場所

/harbor-status/
  今の港の状態を見る場所

/voyage-archive/
  月ごとに航海を見返す場所

/timeline/
  出来事を時系列で見返す場所

/harbor-status/ は、ユーザーを評価・分類・管理するためのページではありません。
最近の記録から、港に残っている灯りや気配を静かに示すためのページです。


---

## 3. 「港の灯り / 今の航海の気配」セクションを差し替え

README.md 内のこの見出しを探してください。

```md
## 港の灯り / 今の航海の気配

そのセクション全体を、下に差し替えてください。

## 港の灯り / 今の航海の気配

`/harbor-status/` には、ユーザーを急かさずに「最近、港へ戻ってきた気配」を示すための小さな表示を置きます。

これは Streak や称号システムではありません。  
連続日数やランクではなく、航海記録の余韻として扱います。

### 港の灯り

港の灯りは、一般的な Voyage Streak ではありません。

過去7日間のうち、Voyage Log を残した日数を、港に残る灯りとして表示します。

目的は、ユーザーに毎日の記録を促すことではなく、  
最近、港に戻ってきた気配を静かに示すことです。

表示例：

```txt
港の灯り：1
港の灯りが、静かにひとつ残っています。

港の灯り：3
港の灯りが、まだ消えずに残っています。

港の灯り：5
港の灯りが、いくつも水面に映っています。

表示方針：

連続日数として扱わない
記録が途切れても失敗扱いしない
0 の場合は強く表示しない
毎日の記録を強制しない
ユーザーを急かさない

港の灯りは、達成状況ではなく、港に残る小さな明かりです。

今の航海の気配

今の航海の気配は、最近の Voyage Log のタグ傾向から表示します。

これは「称号」ではありません。
ユーザーを分類したり、評価したり、ランク付けしたりするものではなく、
最近の記録に漂っている気配を短く表すものです。

表示例：

今の航海の気配

霧の中で舵を保つ人
最近の記録には、見えないまま進む静かな強さがあります。

灯台を見失わない人
最近の記録には、遠くの小さな光を頼りにする気配があります。

静かな潮を渡る人
最近の記録には、穏やかな水面をゆっくり進む気配があります。

判定方針：

直近14日以内の Voyage Log を見る
その中から最大7件を対象にする
タグの出現数が多いものを優先する
同数の場合は、より新しい記録に近いタグを優先する
ログがない場合は表示しない

現在の主な対応タグ：

Moonlit
  月明かりの道を進む人

Fog
  霧の中で舵を保つ人

Lighthouse
  灯台を見失わない人

Storm
  波の中で船を離さない人

Deep Current
  深い潮を渡る人

Calm Tide
  静かな潮を渡る人

Drift
  流れの中で言葉を拾う人

Return
  港へ戻る道を知る人

Harbor
  港の灯りを守る人

表示方針：

「称号」と呼ばない
ランクにしない
固定称号にしない
優劣をつけない
ユーザーを分類しすぎない
最近の記録に応じて静かに変わる
設計意図

/harbor-status/ は、今の港の状態を感じる場所です。

それぞれの役割：

Tonight's Harbor
  /log/ に表示する、今夜の港の空気

港の灯り
  /harbor-status/ に表示する、最近港に戻ってきた気配

今の航海の気配
  /harbor-status/ に表示する、最近の記録に漂う傾向

Last Voyage / Memory Tide
  /harbor-status/ に表示する、過去の言葉の余韻

これらは、ユーザーを管理・評価するための機能ではありません。
港に戻ってきた時、少しだけ「まだ灯りがある」と感じられるための表示です。


---

## 4. 「現在のページ構成」に `/harbor-status/` を追加

README.md の「現在のページ構成」に、`/log/` の直後あたりでこれを追加してください。

```md
/harbor-status/
  Harbor Status
  港の灯り
  今の航海の気配
  Last Voyage
  Memory Tide
5. 「表示・操作機能」の /log/ を軽く修正

「表示・操作機能」の /log/ 部分があれば、以下のようにしてください。

/log/
  Tonight's Harbor
  Harbor Weather
  開放済み海域に連動した Harbor Weather
  Harbor Cat 巻物
  Harbor Find 表示カード
  Harbor Find 詳細モーダル
  Drift Ticket 表示カード
  Drift Ticket 詳細モーダル
  Recent Logs
  全体 Voyage Log ダウンロード

その近くに /harbor-status/ を追加します。

/harbor-status/
  港の灯り
  今の航海の気配
  Last Voyage
  Memory Tide
  Voyage Log への導線
  Voyage Archive への導線


### `/timeline/`

Cabin Log。

ログ保存、Harbor Find、船、チケット、海域開放、航海イベントを時系列で記録するページです。

含まれるもの：

- 画像付きイベントカード
- Harbor Find のアイテム画像
- Drift Ticket 画像
- 船取得画像
- 海域 / 海図画像
- イベント種別ごとの色分け
- Read more / Show less 表示

### `/voyage-archive/`

Voyage Archive。

Voyage Log を月ごとに見返すための内部アーカイブページです。

含まれるもの：

- 月別の Voyage Log 一覧
- 月ごとの記録数
- 月ごとの多かった気配
- 最後の記録日時
- 月を選択した時のログ一覧表示

`/archive/` は旧Celeste記録への内部アーカイブ入口として残し、  
Voyage Log の月次アーカイブは `/voyage-archive/` に分けて管理します。

### Voyage Archive の月別ダウンロード

`/voyage-archive/` では、選択中の月の Voyage Log を `.txt` 形式でダウンロードできます。

この機能は `/log/` の全体ダウンロードとは役割を分けています。

```txt
/log/
  全期間の Voyage Log をダウンロードする場所

/voyage-archive/
  選択した月の Voyage Log をダウンロードする場所

どちらも、ユーザー自身の記録を外部ファイルとして保存する操作です。
そのため、Celeste Harbor ではダウンロード前に登録メールアドレスの確認を必須にします。

月別ダウンロードの流れ：

月を選択
↓
「この月をダウンロード」
↓
登録メールアドレスを入力
↓
アカウントのメールアドレスと一致するか確認
↓
対象月・記録数・期間・多かった気配・ファイル名を表示
↓
ユーザーが最終確認
↓
.txt ファイルをダウンロード

出力内容：

Celeste Harbor
Voyage Archive Monthly Export

出力日時
対象月
記録数
多かった気配

Monthly Afterglow
Monthly Tags
Voyage Logs

月別ダウンロードは、バックアップというよりも「その月の航海を静かに保存する」ための機能です。
ただし、記録の扱いは /log/ の全体ダウンロードと同じく慎重に扱います。

実装上の注意：

メール確認を省略しないこと。
ログイン済みであっても、ダウンロード前には登録メールアドレス確認を行うこと。
対象は選択中の月の Voyage Log のみとすること。
/log/ の全体ダウンロード機能とは統合しないこと。


## 港の灯り / 今の航海の気配

`/log/` には、ユーザーを急かさずに「最近、港へ戻ってきた気配」を示すための小さな表示を置きます。

これは Streak や称号システムではありません。  
連続日数やランクではなく、航海記録の余韻として扱います。

### 港の灯り

港の灯りは、一般的な Voyage Streak ではありません。

過去7日間のうち、Voyage Log を残した日数を、港に残る灯りとして表示します。

目的は、ユーザーに毎日の記録を促すことではなく、  
最近、港に戻ってきた気配を静かに示すことです。

表示例：

```txt
港の灯り：1
港の灯りが、静かにひとつ残っています。

港の灯り：3
港の灯りが、まだ消えずに残っています。

港の灯り：5
港の灯りが、いくつも水面に映っています。

表示方針：

連続日数として扱わない
記録が途切れても失敗扱いしない
0 の場合は強く表示しない
毎日の記録を強制しない
ユーザーを急かさない

港の灯りは、達成状況ではなく、港に残る小さな明かりです。

今の航海の気配

今の航海の気配は、最近の Voyage Log のタグ傾向から表示します。

これは「称号」ではありません。
ユーザーを分類したり、評価したり、ランク付けしたりするものではなく、
最近の記録に漂っている気配を短く表すものです。

表示例：

今の航海の気配

霧の中で舵を保つ人
最近の記録には、見えないまま進む静かな強さがあります。

灯台を見失わない人
最近の記録には、遠くの小さな光を頼りにする気配があります。

静かな潮を渡る人
最近の記録には、穏やかな水面をゆっくり進む気配があります。

判定方針：

直近14日以内の Voyage Log を見る
その中から最大7件を対象にする
タグの出現数が多いものを優先する
同数の場合は、より新しい記録に近いタグを優先する
ログがない場合は表示しない

現在の主な対応タグ：

Moonlit
  月明かりの道を進む人

Fog
  霧の中で舵を保つ人

Lighthouse
  灯台を見失わない人

Storm
  波の中で船を離さない人

Deep Current
  深い潮を渡る人

Calm Tide
  静かな潮を渡る人

Drift
  流れの中で言葉を拾う人

Return
  港へ戻る道を知る人

Harbor
  港の灯りを守る人

表示方針：

「称号」と呼ばない
ランクにしない
固定称号にしない
優劣をつけない
ユーザーを分類しすぎない
最近の記録に応じて静かに変わる
設計意図

/log/ は、単に記録を書く場所ではなく、今の港の状態を感じる場所です。

それぞれの役割：

Tonight's Harbor
  今夜の港の空気

港の灯り
  最近、港に戻ってきた気配

今の航海の気配
  最近の記録に漂う傾向

Last Voyage / Memory Tide
  過去の言葉の余韻

これらは、ユーザーを管理・評価するための機能ではありません。
港に戻ってきた時、少しだけ「まだ灯りがある」と感じられるための表示です。


### `/items/`

Harbor Finds。

発見済みの漂着物を、海域ごとに表示します。

含まれるもの：

- 海域別表示
- 海域ごとの発見数
- 発見数の進捗バー
- アイテム画像表示
- アイテム画像拡大モーダル

未発見アイテム名は表示しません。  
探索感は出しつつ、ネタバレは避けます。

数量が `0` のアイテムも、一度発見済みであれば表示します。  
`quantity` は現在の所持数であり、発見済み状態そのものは `user_harbor_items` に行が存在することで判断します。

## 船建造・海域開放の節目演出

船の建造と海域開放は、Celeste Harbor における大きな節目です。

この処理は、単にDB上の所有船や開放海域を増やすだけではなく、  
ユーザーが「航海が次の段階へ進んだ」と感じられるように、中央モーダルで表示します。

### 表示順

船の建造によって海域が開放されるため、節目演出は必ず以下の順で表示します。

```txt
New Vessel
↓
New Sea Area

### `/items/` の海域ごとの航海の記憶

`/items/` では、発見済みの漂着物を海域ごとに整理して表示します。

`/map/` の Sea Area Journal が「その海を眺める場所」であるのに対して、  
`/items/` は「その海に残った漂着物を整理して見返す場所」として扱います。

各開放済み海域には、発見数に応じた `航海の記憶` を表示します。

```txt
0個
  まだ静かな海

1〜2個
  気配が残り始めた海

3〜4個
  航海を覚え始めた海

5個以上
  記憶が深まった海

この表示は、実績・達成率・ランキングではありません。
その海に、どれだけ航海の跡が残り始めているかを静かに表すためのものです。

表示方針：

開放済み海域だけに表示する
未開放海域には表示しない
未発見アイテム名は表示しない
未開放海域名や未開放数は表示しない
rarity / item_key / area_key などの内部情報は表示しない

/items/ の各開放済み海域には、この海を海図で見る 導線を置きます。

/items/
  海域ごとの漂着物を整理して見る

/map/
  その海そのものを眺める
  Sea Area Journal を見る

これにより、ユーザーは /items/ で見つけたものを確認し、
必要に応じて /map/ でその海の記憶や気配を見返すことができます。

/items/ と Sea Area Journal の関係

Sea Area Journal Phase 1 では、/map/ の開放済み海域モーダル内に、その海に残った漂着物・記憶ステージ・節目文を表示します。

/items/ 側では、その内容を一覧として整理し、海域ごとの収集記録として見せます。

役割の違い：

/map/
  海域を選び、その海の気配・章・Journal を見る場所

/items/
  発見済み漂着物を、海域ごとに整理して見返す場所

どちらもゲーム性を高めるための表示ですが、
報酬画面や達成率画面には寄せすぎません。

Celeste Harbor では、探索のゲーム性を
「数字を埋めること」ではなく、
「開いた海に記録が積もっていくこと」として表現します。


### `/map/`

Sea Chart。

開放済み・未開放の海域を表示します。

含まれるもの：

- 海図画像
- 海域カード
- 海域ごとの「気配」表示
- 海図拡大モーダル
- 海域カードタップ時の風景モーダル
- 未開放海域タップ時の霧カード

### `/account/`

アカウントと航海券の確認ページ。

含まれるもの：

- 有効なチケットの概要
- Drift / Special / Deep Sea のチケット数
- チケット画像表示
- チケット状態表示
- Special Voyage への導線

### `/tickets/`

チケット説明ページ。

含まれるもの：

- Harbor Cat 画像
- Drift Ticket 画像
- Special Voyage Ticket 画像
- Deep Sea Ticket 画像
- 統一されたチケットカードUI
- Drift Ticket の控えめな表示調整

### `/special-voyage/`

時間制の特別航海入口および、航海中のインターフェース。

チケット種別に応じて入口文言を変えます。

含まれるもの：

- Drift Ticket / Special Ticket / Deep Sea Ticket の複数表示
- チケット選択
- 航海開始
- 航海中画面
- 航海記録入力
- Special Voyage 用の Harbor Find 抽選
- 報酬カード表示
- Harbor Find 詳細モーダル
- Drift Ticket 詳細モーダル

### `/fragments/`

港内部の Fragment Archive。

### `/archive/`

旧Celeste記録への内部アーカイブ入口。

### `/harbor/`

旧 Harbor ルート。

認証状態に応じてリダイレクトします。

```txt
ログイン済み   → /log/
未ログイン     → /
Legacyページ

旧 Celeste Console 系ページは、以下に保存します。

/legacy/

Legacyページはログイン必須ではありません。
ただし、検索エンジンにはインデックスさせません。

各Legacyページには以下を入れます。

<meta name="robots" content="noindex, nofollow">

現在のLegacyファイル：

/legacy/about.html
/legacy/philosophy.html
/legacy/silent-structure.html
/legacy/vision.html
/legacy/who-i-am.html
/legacy/who-this-is-for.html
/legacy/faq.html
/legacy/timeline.html
/legacy/README.md

ルート直下の旧HTMLページは、対応するLegacyページへリダイレクトします。

/about.html              → /legacy/about.html
/philosophy.html         → /legacy/philosophy.html
/silent-structure.html   → /legacy/silent-structure.html
/vision.html             → /legacy/vision.html
/who-i-am.html           → /legacy/who-i-am.html
/who-this-is-for.html    → /legacy/who-this-is-for.html
/faq.html                → /legacy/faq.html
/timeline.html           → /legacy/timeline.html

/auth/ は / へリダイレクトします。

基本ループ

Celeste Harbor の基本ループは以下です。

Voyage Log
↓
Harbor Cat response
↓
Harbor Find
↓
Items
↓
Vessels
↓
Sea Area Unlock
↓
Map
↓
Cabin Log

ユーザーは Voyage Log を書きます。
Harbor Cat は、助言や診断ではなく、短い静かな応答を返します。
ときどき、何かが港へ漂着します。
漂着物は、船を整えるために使われます。
船が増えると、新しい海域が開きます。
海域が広がると、漂着物の可能性も広がります。
重要な出来事は Cabin Log に記録されます。

海域が開くことによる体験変化

海域開放は、単なるDB上のフラグではありません。
ユーザーにとっては、港の空気や見える景色が少しずつ変わる体験です。

海域が開くことで変わるもの：

開放海域が増える
↓
Harbor Find の抽選対象 item pool が広がる
↓
新しい漂着物が出る
↓
新しい船の条件が進む
↓
次の船が開く
↓
さらに海域が開く

ユーザーには以下のように感じてもらうことを目指します。

「あ、港の外が少し広がった」
「拾えるものの気配が変わった」
「次の船に近づいた」
「今日は少し違う海にいる」

現在は以下で体験変化を出しています。

/log/ の Harbor Weather が開放済み海域に連動
/map/ に海域ごとの気配を表示
/map/ で海域カードをタップすると風景画像を表示
未開放海域をタップすると霧カードを表示
/items/ に海域ごとの発見数を表示
/vessels/ に船と開放海域の対応を表示
固定仕様
船

船は9隻です。

船の作成は、漂着物の消費によって行います。
船は、ユーザーの成長記録の一部です。

/vessels/ に表示するもの：

現在の船
次の船に必要な漂着物
所有済みの船コレクション
霧に包まれた未開放の船
船画像
船画像拡大モーダル
船詳細モーダル
船と開放海域の対応

表示ルール：

所有済み船
  → 画像・実名・説明・Cabin・開いた海域を表示

次の船
  → 霧の向こうとして表示
  → 必要素材だけ表示
  → 画像・実名・説明・Cabinは見せない

未開放船
  → 霧の向こうとして表示
  → 画像・実名・説明・Cabinは見せない

この方針により、取得前の船の情報を見せすぎず、船の記録と次の船の表示の矛盾を避けます。

漂着物

漂着物は25種類を基本とします。
Special Voyage 用の追加・連動漂着物は、harbor_items と area_item_pools に整合させます。

/items/ は、発見済みの漂着物だけを表示します。

漂着物は海域ごとにグループ化します。
未発見の漂着物は表示しません。
未開放の海域は 霧の向こう として表示します。

/items/ に含まれるもの：

画像表示
画像拡大モーダル
海域別表示
海域ごとの発見数
進捗バー

数量が 0 のアイテムも、一度発見済みであれば表示します。
これは「現在所持していないが、過去に見つけたことがある」状態を表します。

アイテム欄の発見数

/items/ のエリア別発見数は、area_item_pools を基準に計算します。

各エリアごとの計算：

分母：
area_item_pools に登録されている、そのエリアの item_key 数

分子：
その item_key のうち、user_harbor_items に存在する数

これにより、以下のような不正な表示を防ぎます。

発見済み 6 / 4

他エリアのアイテムは、そのエリアの発見数に含めません。

海域

初期海域は以下です。

harbor
silent_water
lighthouse_coast
fog_sea
moonlit_sea
deep_current
unnamed_waters

海域は /map/ に表示します。

未開放の海域は以下のように表示します。

霧の向こう

/map/ に含まれるもの：

海図画像
開放済み / 未開放の海域カード
海域ごとの気配
海図拡大モーダル
海域風景モーダル
未開放海域の霧カード
船と海域の対応

船の stage と海域の sort_order を対応させます。

現在の基本ルール：

Stage 1 → harbor
Stage 2 → silent_water
Stage 3 → lighthouse_coast
Stage 4 → fog_sea
Stage 5 → moonlit_sea
Stage 6 → deep_current
Stage 7 → unnamed_waters


## Sea Area Journal

Sea Area Journal は、`/map/` の開放済み海域モーダル内に表示される、海域ごとの小さな探索記録です。

海域は、ただ開放されるだけの場所ではありません。  
そこに漂着物が残り、記録が積もり、少しずつ「航海の跡」が見える場所として扱います。

### 表示場所

Sea Area Journal は、`/map/` で開放済み海域カードをタップした時に表示します。

表示されるもの：

```txt
海域画像
章番号つき海域名
章ごとの余韻文
海域説明
気配
Sea Area Journal
未開放海域には表示しません。
未開放海域は引き続き 霧の向こう として扱います。

表示内容

Sea Area Journal には、以下を表示します。

この海に残った漂着物数
航海の記憶ステージ
海域ごとのJournal文言
この海に残っている漂着物一覧
各漂着物の短い説明
この海の節目
今後も何かが流れ着くかもしれない余韻文

表示する漂着物は、ユーザーがすでに発見済みのものだけです。

未発見アイテム名は表示しません。
未開放海域名や未開放数も表示しません。

航海の記憶ステージ

発見済み漂着物数に応じて、その海の記憶状態を表示します。

0個
  まだ静かな海

1〜2個
  気配が残り始めた海

3〜4個
  航海を覚え始めた海

5個以上
  記憶が深まった海

これは実績やランクではありません。
海そのものに航海の跡が少しずつ積もっていく表現です。

海域ごとのJournal文言

Sea Area Journal の文言は、海域ごとに変えます。

例：

静かな水域
  静かな水域には、いくつかの漂着物が記録されています。
  穏やかな波の中にも、航海は少しずつ跡を残しています。

灯台海岸
  灯台海岸には、いくつかの漂着物が記録されています。
  遠い光の近くに、航海の道しるべが少しずつ集まっています。

霧の海
  霧の海には、いくつかの漂着物が記録されています。
  視界が閉じていても、航海はそこで止まってはいません。

同じ発見数でも、海域ごとに異なる気配を出します。

漂着物一覧

Sea Area Journal では、その海域で発見済みの漂着物を表示します。

表示するもの：

漂着物画像
漂着物名
短い説明

各漂着物はクリックできます。
クリックすると、その場でアイテム詳細モーダルを開きます。

アイテム詳細モーダルに表示するもの：

漂着物画像
漂着物名
説明文
由来文

表示しないもの：

rarity
item_key
area_key
area_hint
roll_value
session_id
ticket_id
内部DBキー
この海の節目

Sea Area Journal には、発見数に応じた小さな節目文を表示します。

例：

最初の漂着物が、この海に記録されました。
ここはもう、ただ通り過ぎるだけの海ではありません。

この海には、いくつかの航海の跡が残っています。
漂着物は、ここを通った夜の小さな証です。

月明かりの海には、夜の航路を照らすものが集まり始めています。
静かな光の中で、航海の記憶が深まっています。

節目文は、報酬演出ではなく、海域に航海の記憶が残っていく感覚を出すためのものです。

設計方針

Sea Area Journal は、ゲーム性を高めるための機能ですが、
ランキング・実績・達成率のようには扱いません。

目的は、以下の体験を強めることです。

開いた海に意味が残る
漂着物がその海の記録になる
海域ごとに個性が出る
発見済みのものが少しずつ蓄積される
ユーザーが自分の海を探索している感覚を得る

Celeste Harbor では、探索のゲーム性を「報酬の強化」ではなく、
港と海に記録が積もっていく感覚として表現します。


/vessels/ では以下を表示します。

現在の船
  → この船で開いた海域

次の船
  → この船で開く海域は霧の向こう

船の記録
  → 所有済み船ごとに Opened Sea を表示

取得済みの船だけが、開いた海域と結びついて見えます。
未取得の船は、船も海域も霧の向こうとして扱います。

海域ごとの気配

/map/ の海域カードには、説明とは別に「気配」を表示します。

現在の気配：

harbor
  木片、古い道具、浅瀬に残る小さな漂着物の気配。

silent_water
  低い波、静かな水面、港の外へ出るための軽い素材の気配。

lighthouse_coast
  遠い光、古い金具、方角を思い出させるものの気配。

fog_sea
  白い霧、湿った布、見えない流れと羅針盤の影。

moonlit_sea
  月光、銀色の水面、静かに進むための印。

deep_current
  重い素材、深い潮、沈まないためのものの気配。

unnamed_waters
  海図の外側、まだ名のない漂着物、遠い光の気配。

未開放海域の場合：

まだ霧の向こうにあります。
海域風景画像

/map/ では、海域カードをタップすると海域の風景画像をモーダル表示します。

保存場所：

/images/areas/

確定済み画像：

/images/areas/harbor.png
/images/areas/fog-sea.png
/images/areas/moonlit-sea.png
/images/areas/lighthouse-coast.png
/images/areas/silent-water.png
/images/areas/deep-current.png
/images/areas/unnamed-waters.png

海域ごとの画像方針：

harbor
  静かな夜の港。桟橋、月明かり、小さな船。

silent_water
  静かな海面。低い波、穏やかな月光、港の外の近海。

lighthouse_coast
  遠くの灯台。細い光、岩場の海岸、方角の気配。

fog_sea
  霧に包まれた海。見えない水平線、かすかな航路。

moonlit_sea
  月光が水面に道を作る海。銀色の光と静かな航路。

deep_current
  荒波と深い潮。水面下の重い流れを感じる海。

unnamed_waters
  荒波立つ外洋。海図の外側へ続く未知の海。

開放済み海域：

風景画像を表示
海域名、説明、気配を表示

未開放海域：

霧カードを表示
風景画像は見せない
「まだ、この海は姿を見せていません」と表示

未開放海域の霧カード文言：

霧の向こう

まだ、この海は姿を見せていません。
船が整い、次の航路が開くまで、
その景色は静かに霧の中にあります。
Harbor Weather

/log/ の Harbor Weather は、開放済み海域に連動します。

目的：

書く場所の空気を変える
海域が開いたことを体感させる
記録行為に小さな変化を持たせる

現在の海域別 Weather：

harbor
  今夜の港は静かです。
  まだ、すべては岸の近くにあります。

silent_water
  静かな水域に、低い波が広がっています。
  港の外へ出ても、まだ海は穏やかです。

lighthouse_coast
  遠くの灯台が、今夜の海に細い光を落としています。
  近づくためではなく、方角を失わないための光です。

fog_sea
  霧が出ています。
  見えない海にも、道は続いています。

moonlit_sea
  月光が、水面に細い道を描いています。
  どこへ続くか分からなくても、その道は確かにあります。

deep_current
  水面は静かですが、深いところで潮が動いています。
  見えているものより、見えない流れが船を運ぶ夜です。

unnamed_waters
  名前のない海域の方から、遠い光が揺れています。
  終点ではなく、まだ外へ続く入口のようです。
Harbor Find

Harbor Find は、Voyage Log 保存後に、港へ何かが漂着する仕組みです。

通常の Voyage Log：

12%

Special Voyage：

40%

Deep Sea Voyage：

60%

初回 Harbor Find は、ユーザーごとに1回だけ必ず発生します。

タグは、そのログの「気配」や「天候」として扱います。
アイテム抽選の重み付けに軽く影響しますが、未開放の海域を開くことはありません。

UIでは、内部の確率や保証を直接見せすぎないようにします。
Harbor Find は報酬ダッシュボードではなく、港からの静かな気配として扱います。

/log/ の現在の表示文言：

何かが流れ着く夜もあれば、ただ波だけが残る夜もあります。
Drift Ticket 表示

/log/ には Drift Ticket 表示カードがあります。

Harbor Find カードの下に表示します。

現在の表示状態：

Quiet
Checking
Granted

内部ルールを直接見せすぎないようにします。

現在の初期文言：

小さな航海券が流れ着く夜があります。
それは、少しだけ深い海へ降りるための合図です。

Voyage Log 保存後：

チケット確認中は Checking
Drift Ticket が付与された場合は Granted
何も届かなかった場合は Quiet

Drift Ticket の通知は Harbor Cat の巻物内にも表示されることがあります。

報酬詳細表示

/log/ および /special-voyage/ の報酬カードはクリックできます。

対応カード：

HARBOR FIND
DRIFT TICKET

HARBOR FIND の詳細モーダルには以下を表示します。

アイテム画像
アイテム名
説明文
由来文
レアリティ
エリアヒント
状態

DRIFT TICKET の詳細モーダルには以下を表示します。

チケット名
航海時間
状態
簡単な説明
チケット種別

Celeste Harbor では、現在3種類のチケットを扱います。

Drift Ticket

Voyage Log 保存後に、港へ漂着することがある無料チケットです。

販売導線ではなく、港からの小さな気配として扱います。

現在の表示文言：

小さな航海券が流れ着く夜があります。
それは、少しだけ深い海へ降りるための合図です。

画像パス：

/images/tickets/drift-ticket.svg

表示方針：

Drift Ticket は控えめに表示する
強い購入バナーのように見せない
「流れ着いたもの」として扱う
Special Voyage Ticket

ユーザーが自分で選んで入る Special Voyage 用の有料予定チケットです。

Special Voyage Ticket は以下の2種類です。

10分
20分

15分・30分の Special Voyage Ticket は作りません。

現在の表示文言：

チケットは 10分 と 20分 の2種類です。

画像パス：

/images/tickets/special-voyage-ticket.svg
Deep Sea Ticket

さらに深く静かな海へ降りるための限定チケットです。

ユーザー向けには、内部設計や販売方針ではなく、体験として説明します。

現在のユーザー向け文言：

いつもの港よりも、さらに深い海へ降りるための航海券です。
静かな夜に、言葉をもう少し奥まで沈めたいときのためにあります。

すべての夜に必要なものではありません。
必要だと感じる時だけ、深い海への入口として開きます。

画像パス：

/images/tickets/deep-sea-ticket.svg
チケット利用時の漂着物取得ルール

チケットは、漂着物の取得を保証するものではありません。
ただし、通常の Voyage Log よりも、漂着物が届く気配を強めます。

報酬を確定させるための仕組みではなく、
少し深い海へ降りることで、届く可能性が変わる仕組みとして扱います。

Drift Ticket
最大取得数：1個
取得は確定ではない
無料で少し深い海を試すための短い航海
通常の Voyage Log より、漂着物が届く気配が少し強まる
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

実装方針：

Drift Ticket
  → 最大1個

Special Voyage Ticket 10分
  → 最大1個

Special Voyage Ticket 20分
  → 最大2個
  → 2個目は低確率

Deep Sea Ticket
  → 最大2個
  → 深海系アイテムの抽選率を高める

Deep Sea Ticket は、単に取得数を増やすためのチケットではありません。
深い海域に属する漂着物が選ばれやすくなるチケットとして扱います。

Special Voyage

/special-voyage/ は、有効な航海券を使って時間制の航海へ入るページです。

現在の挙動：

有効なチケットを確認する
チケットがあれば航海入口を表示する
複数チケットを表示できる
選択された ticket_id で航海を開始する
航海開始時にチケットを使用済みにする
制限時間内だけ特別航海UIを表示する
終了後は Voyage Log へ戻す

チケット種別ごとの入口表示：

Drift Ticket
  → 漂着チケットの入口

Special Voyage Ticket
  → 特別航海の入口

Deep Sea Ticket
  → 深海航海の入口

Drift Ticket を Special Voyage Ticket のように見せないこと。
それぞれのチケットが持つ意味に合わせて表示文言を変えること。

Special Voyage / Harbor Find 実装仕様
チケット種別と抽選ルール
チケット	session_type	duration_minutes	漂着物ルール
Drift Ticket	drift	5	最大1個。確定ではない
Special Ticket 10分	special	10	最大1個。確定ではない
Special Ticket 20分	special	20	最大2個。2個目は低確率
Deep Sea Ticket	deep_sea	20	最大2個。深海系アイテムの抽選率が高い
チケット判定

special-voyage-reply では、DB上の session_type と duration_minutes から ticket_rule を解決します。

session_type = drift
  → drift

session_type = special
duration_minutes = 10
  → special_10

session_type = special
duration_minutes = 20
  → special_20

session_type = deep_sea
  → deep_sea
セッション単位の抽選ルール

漂着物抽選は、1つの voyage_session につき1回だけ実行します。

同じ航海中に複数回「航海記録を残す」を行った場合：

既存の voyage_session_find_rolls を再利用する
新しい漂着物抽選は行わない
すでに見つかった漂着物を「船に収められているもの」として再表示する
アイテムの二重付与は行わない

これにより、Deep Sea Ticket などで「記録を書くたびに報酬が増える」状態を防ぎます。

Special Voyage 抽選ログ

Special Voyage の漂着物抽選結果は、以下のテーブルに保存します。

voyage_session_find_rolls

主なカラム：

カラム	用途
user_id	航海セッションの所有者
session_id	voyage_sessions.id との紐づけ
grant_index	抽選枠番号
ticket_rule	drift, special_10, special_20, deep_sea など
roll_passed	確率判定に成功したか
found	漂着物が見つかったか
result	アイテム情報・乱数値・メタ情報を含むJSON

例：

{
  "found": true,
  "roll_passed": true,
  "roll_value": 0.1954615022296824,
  "grant_index": 1,
  "ticket_rule": "special_20",
  "item": {
    "item_key": "moon_shell",
    "item_name": "月明かりの貝殻",
    "rarity": "common",
    "family": "surface"
  }
}
Special Voyage アイテム付与

新しく漂着物が見つかった場合、以下のテーブルに付与します。

user_harbor_items

付与ルール：

未所持アイテムの場合、新規行を追加する
既に所持している場合、quantity を +1 する
quantity = 0 のアイテムも「過去に発見済み」としてアイテム欄に表示する
既存rollを再利用する場合、再付与は行わない

一意制約：

unique(user_id, item_key)
special-voyage-reply の返却形式

special-voyage-reply Edge Function は、以下のような形式で返却します。

{
  "ok": true,
  "reply": "...",
  "message": "...",
  "session_id": "...",
  "ticket_id": "...",
  "session_type": "...",
  "duration_minutes": 20,
  "ticket_rule": "deep_sea",
  "find_rolls": [],
  "found_items": [],
  "roll_insert_results": [],
  "grant_results": [],
  "reused_existing_rolls": false
}

フロント側では、必ず session_id を渡します。

const { data, error } = await client.functions.invoke("special-voyage-reply", {
  body: {
    session_id: activeSession.id,
    message
  }
});

session_id がない場合、以下を返します。

{
  "ok": false,
  "error": "session_id_required"
}
現在の Special Voyage 漂着物プール

現在、Special Voyage の漂着物抽選で使用するアイテムは以下です。

item_key	日本語名	エリア
moon_shell	月明かりの貝殻	Moonlit Sea
driftwood	漂流木	Harbor
sea_glass	波に削られた硝子片	Moonlit Sea
lighthouse_shard	灯台のかけら	Lighthouse Coast
fog_compass	霧の羅針盤	Fog Sea
quiet_chart	静かな海図	Fog Sea
deep_blue_pearl	深海の青い真珠	Deep Current
sunken_star	沈んだ星	Deep Current
abyss_note	深海からの記録片	Deep Current

これらのアイテムは、以下の両方に登録されている必要があります。

harbor_items
area_item_pools

また、各アイテムには有効な image_path を設定します。

Special Voyage 漂着物画像パス
item_key	image_path
moon_shell	/images/items/moon-shell.png
driftwood	/images/items/driftwood.png
sea_glass	/images/items/sea-glass.png
lighthouse_shard	/images/items/lighthouse-shard.png
fog_compass	/images/items/fog-compass.png
quiet_chart	/images/items/quiet-chart.png
deep_blue_pearl	/images/items/deep-blue-pearl.png
sunken_star	/images/items/sunken-star.png
abyss_note	/images/items/abyss-note.png
Special Voyage 整合性確認SQL

抽選対象アイテムの登録状態を確認するSQLです。

select
  hi.item_key,
  hi.name_ja,
  hi.rarity,
  hi.area_hint,
  hi.image_path,
  aip.area_key
from harbor_items hi
left join area_item_pools aip
  on aip.item_key = hi.item_key
where hi.item_key in (
  'moon_shell',
  'driftwood',
  'sea_glass',
  'lighthouse_shard',
  'fog_compass',
  'quiet_chart',
  'deep_blue_pearl',
  'sunken_star',
  'abyss_note'
)
order by hi.item_key, aip.area_key;

期待状態：

すべての item_key が harbor_items に存在する
すべての item_key に image_path がある
すべての item_key が area_item_pools に登録済み
Cabin Log / Timeline 表示

/timeline/ は、港で起きた出来事の視覚的な記録です。

現在の表示：

イベントを画像付きカードとして表示
初期表示は5件
Read more で全件表示
Show less で5件表示へ戻す
イベントは user_timeline_events_view から取得する

現在の画像表示：

Harbor Find      → 漂着物画像
Drift Ticket     → チケット画像
Vessel acquired  → 船画像
Sea Area opened  → 海図画像
Fallback         → 静かなアイコン

user_timeline_events_view で対応する画像列：

image_path
image_alt

フロント側では以下のフォールバック画像列も見ます。

item_image_path
harbor_item_image_path
vessel_image_path
ticket_image_path
related_image_path

イベント種別ごとの見た目：

harbor_find      → 緑系 / 漂着物
ticket_drifted   → 控えめな紫系 / チケット
vessel_acquired  → 金色系 / 船
sea_area_opened  → 海図画像

Drift Ticket 画像は、アイテムや船イベントより目立ちすぎないように控えめに表示します。

Harbor Cat

### Harbor Cat の画像と出現場面

Harbor Cat は、Celeste Harbor に常駐する小さな気配です。

出現頻度を減らすのではなく、場面ごとに画像・文言・タイミングを変えることで、港に自然に存在しているように扱います。

Harbor Cat は、ユーザーを評価したり、診断したり、強く助言したりしません。  
ただ、記録を受け取り、漂着に気づき、航海券を見つけ、帰ってきた船を静かに迎えます。

#### 使用画像

現在の Harbor Cat 画像と用途：

```txt
/images/harbor-cat/cat-reading-map-warm.png
  通常の Voyage Log 保存時。
  Harbor Cat が記録を読み、静かに受け取る場面。

/images/harbor-cat/cat-found-drift.png
  Harbor Find、漂着物、アイテム取得時。
  Harbor Cat が流れ着いたものに気づく場面。

/images/harbor-cat/cat-found-drift-close.png
  Harbor Find、漂着物、アイテム取得時の別バリエーション。
  少し発見感を強めたい場面。

/images/harbor-cat/cat-ticket-glow.png
  Drift Ticket / Special Voyage Ticket / Deep Sea Ticket など、
  航海券が届いた時。
  Harbor Cat が光るチケットに気づく場面。

/images/harbor-cat/cat-welcome-home.png
  Special Voyage 終了後、/log/ に戻った時。
  Harbor Cat が帰港した船を出迎える場面。
現在の出現場面

Harbor Cat は以下の場面で表示されます。

通常の Voyage Log 保存後
Harbor Find または漂着物取得時
Drift Ticket などの航海券取得時
Special Voyage から /log/ に戻った時

Harbor Cat は、現在の設計では「出現を最小化する対象」ではありません。
港にいる小さな存在として、出来事に応じて自然に姿を見せます。

Special Voyage 帰港時の動作

Special Voyage 終了後に /log/ へ戻った場合、以下の順で表示します。

Special Voyage Afterglow を表示
↓
Afterglow が約8秒で消える
↓
少し間を置く
↓
Harbor Cat が cat-welcome-home.png で出迎える
↓
短い帰港メッセージを表示
↓
約7秒で自動クローズ

この演出は、報酬表示ではなく「港へ戻ってきた余韻」として扱います。

実装メモ

Harbor Cat の画像モードは catIcons で管理します。

想定するモード：

reading
found
ticket
welcome
reply
fallback

setCatIcon(mode) は上記のモードに対応させます。

Special Voyage 帰港時は、sessionStorage を使って Afterglow と Harbor Cat 出迎えを連動させます。

使用する sessionStorage key：

celeste_special_voyage_afterglow
celeste_special_voyage_welcome_cat

注意点：

cat-welcome-home.png が未アップロードの場合、Special Voyage 帰港時の Harbor Cat 画像は表示されません。
画像パスは /images/harbor-cat/cat-welcome-home.png に統一します。
設計方針

Harbor Cat の表示が重く感じられる場合でも、原則として出現頻度そのものを削るのではなく、以下を調整します。

文言を短くする
表示時間を調整する
画像の明るさや印象を整える
表示タイミングを少し遅らせる
アニメーションを控えめにする

以前検討した「1回の保存で最大1回だけ表示する」方針は、現在は採用しません。

Harbor Cat は機能ではなく、港にいる気配です。

Harbor Cat は、診断・助言・評価・解決をしません。

Voyage Log 保存後に、短い静かなPresenceを返します。

現在の動作：

Voyage Log 保存後に表示される
巻物を読むような演出で表示される
短い静かな応答を返す
Harbor Find の通知を巻物内に表示することがある
Drift Ticket の通知を巻物内に表示することがある

Harbor Cat は「助手」ではなく「気配」として扱います。

重要なSupabaseテーブル

主要テーブル：

vessels
harbor_items
vessel_requirements
sea_areas
area_item_pools
user_vessels
user_harbor_items
user_sea_areas
voyage_logs
voyage_tickets
voyage_sessions
voyage_session_find_rolls
user_timeline_events
重要なView

現在使っている主な表示用View：

user_current_vessel_view
next_vessel_requirements_view
user_harbor_items_view
user_open_area_item_pools_view
user_timeline_events_view
user_max_vessel_stage_view
user_vessels_collection_view
vessel_requirements_display_view

一部のコレクション表示は、ViewだけではなくRPCで処理しています。

user_timeline_events_view

user_timeline_events_view は /timeline/ で使います。

イベント情報に加えて、画像表示用の列も返す必要があります。

期待する列：

id
user_id
event_type
event_key
title
body
metadata
created_at
image_path
image_alt

画像解決方針：

metadata に画像パスがあれば優先する
Harbor Find は metadata.item_key で harbor_items と結合する
船イベントは metadata.vessel_key または vessel id 系で vessels と結合する
チケットイベントは固定画像パスを使ってよい
海域開放イベントは海図画像を使ってよい

metadata 例：

{
  "item_key": "driftwood",
  "item_name_ja": "漂流木",
  "area_key": "harbor",
  "area_name_ja": "港"
}

固定画像パス例：

/images/tickets/drift-ticket.svg
/images/tickets/special-voyage-ticket.svg
/images/tickets/deep-sea-ticket.svg
/images/sea-chart-z.png
/images/harbor-cat/cat-harbor-main.png
重要なRPC関数
ensure_user_vessel()

初期船とユーザーの港状態を用意します。

使用ページ：

/log/
/vessels/
check_and_unlock_next_vessel()

次の船に必要な漂着物が揃っているか確認します。

条件を満たした場合：

必要な漂着物を消費
次の船を解放
Timeline に記録

使用ページ：

/vessels/
check_and_unlock_sea_areas()

所有している船の数に応じて、海域を開放します。

現在のルール：

1 vessel  → harbor
2 vessels → silent_water
3 vessels → lighthouse_coast
4 vessels → fog_sea
5 vessels → moonlit_sea
6 vessels → deep_current
7 vessels → unnamed_waters

使用ページ：

/map/
/vessels/
grant_random_harbor_find(p_tag, p_context, p_force)

通常の Voyage Log における Harbor Find の抽選処理を行います。

機能：

通常漂着率：12%
Special Voyage 後：40%
Deep Sea Voyage 後：60%
初回 Harbor Find 保証
開放済み海域の item pool のみ使用
rarity による重み付け
tag による軽い海域ブースト
user inventory 更新
timeline event 作成

使用ページ：

/log/

現在のUI挙動：

結果は Harbor Cat の巻物内に表示
結果は /log/ の Harbor Find カードにも表示
結果は /timeline/ に漂着物画像付きで表示
内部の保証や確率はユーザーに直接見せない
special-voyage-reply

Special Voyage 中の航海記録に対して、返信生成・漂着物抽選・所持品付与を行います。

機能：

session_id を必須とする
voyage_sessions からチケット種別を解決する
voyage_session_find_rolls を確認する
既存rollがあれば再利用する
新規rollがあれば voyage_session_find_rolls に保存する
見つかったアイテムを user_harbor_items に付与する
既存roll再利用時は再付与しない
返答文と報酬情報をフロントに返す

使用ページ：

/special-voyage/
get_user_vessels_collection()

ユーザーの9隻すべての船情報を返します。

返す内容：

所有状態
現在の船
霧に包まれた未開放状態
船の詳細
画像パス
stage order

使用ページ：

/vessels/
認証方針

公開ページは以下のみです。

/
/about/
/voyage/

それ以外の有効な港ページは、Googleログイン必須です。

保護ページでは以下を使います。

<body class="auth-locked">
body.auth-locked .wrap{
  visibility:hidden;
}

未ログインユーザーは以下へ戻します。

/

ログアウト後も以下へ戻します。

/
SEO方針

sitemap.xml には公開ページのみを含めます。

/
/about/
/voyage/

robots.txt では公開ページを許可し、内部ページとLegacyページを拒否します。

公開：

/
/about/
/voyage/

Disallow：

/log/
/timeline/
/items/
/vessels/
/map/
/account/
/tickets/
/special-voyage/
/fragments/
/archive/
/harbor/
/auth/
/legacy/

Legacyページにも以下を入れます。

<meta name="robots" content="noindex, nofollow">
完了済み

完了済み：

DB正式リセット
9隻の船を登録
25種類の漂着物を登録
船の必要漂着物を登録
7海域を登録
area item pools を登録
初期 user_sea_areas 挙動
主要表示View
ensure_user_vessel()
check_and_unlock_next_vessel()
check_and_unlock_sea_areas()
grant_random_harbor_find()
get_user_vessels_collection()
/log/ の正式RPC接続
Voyage Log 保存
Harbor Cat 応答
Harbor Find
Harbor Find 表示カード
Harbor Find 詳細モーダル
Drift Ticket 表示カード
Drift Ticket 詳細モーダル
/log/ Harbor Weather の海域連動
Recent Logs
/timeline/ Cabin Log 分離
/timeline/ 画像付きイベントカード
/timeline/ Harbor Find 画像表示
/timeline/ Drift Ticket 画像表示
/timeline/ 船取得画像表示
/timeline/ 海域画像表示
/timeline/ Read more / Show less
/account/ 軽量ページ
/account/ チケット概要表示
/account/ チケット画像カード
/items/ 海域別表示
/items/ 海域ごとの発見数
/items/ 進捗バー
/items/ 画像表示
/items/ 画像拡大モーダル
/items/ 発見数カウント修正
/vessels/ 船コレクション表示
/vessels/ 船画像拡大モーダル
/vessels/ 船詳細モーダル
/vessels/ 船と開放海域の対応表示
/vessels/ 次の船・未開放船の霧表示統一
/map/ 海図
/map/ 海域カード
/map/ 海域ごとの気配表示
/map/ 海域風景モーダル
/map/ 未開放海域の霧カード
/map/ 7海域分の風景画像
/map/ 海図拡大モーダル
/tickets/ チケット説明ページ
/tickets/ 統一チケット画像レイアウト
/tickets/ Drift / Special / Deep Sea チケット画像
Special Voyage Ticket は 10分 / 20分 の2種類に固定
チケット利用時の漂着物取得ルールを定義
Deep Sea Ticket のユーザー向け文言調整
/special-voyage/ チケット種別ごとの入口表示
/special-voyage/ 複数チケット表示
/special-voyage/ ticket_id 指定による航海開始
/special-voyage/ session_id 渡し
/special-voyage/ special-voyage-reply non-2xx 解消
Special Voyage 漂着物roll保存
Special Voyage 1セッション1回抽選
Special Voyage 既存roll再利用
Special Voyage アイテム付与
Special Voyage 報酬詳細モーダル
Special Voyage 漂着物画像整備
small_driftwood を driftwood に統一
公開 / 非公開ルート整理
Legacy移行
sitemap / robots 整理
README 作成・更新
README 日本語化
現在のページ構成
/
  公開入口

/about/
  公開説明ページ

/voyage/
  公開 Moonlit Voyage ページ

/log/
  Voyage Log
  Harbor Cat
  Harbor Find 表示カード
  Harbor Find 詳細モーダル
  Drift Ticket 表示カード
  Drift Ticket 詳細モーダル
  Tonight's Harbor
  Harbor Weather
  海域連動 Weather

/timeline/
  Cabin Log
  画像付きイベントカード
  Read more / Show less

/items/
  海域別 Harbor Finds
  海域ごとの発見数
  アイテム画像モーダル

/vessels/
  現在の船
  次の船
  所有済みの船
  船詳細モーダル
  船画像モーダル
  船と開放海域の対応

/map/
  Sea Chart
  海図モーダル
  海域風景モーダル
  未開放海域の霧カード

/account/
  Account and tickets
  チケット概要
  チケット画像カード

/tickets/
  チケット説明
  チケット画像カード

/special-voyage/
  Special Voyage
  チケット種別ごとの入口
  航海中画面
  航海記録
  Special Voyage Harbor Find

/fragments/
  内部 Fragment Archive

/archive/
  内部 Archive 入口

/legacy/
  旧Celeste記録
表示・操作機能

現在実装済みの表示機能：

/items/
  アイテム画像
  アイテム画像拡大モーダル
  海域ごとの発見数
  進捗バー

/vessels/
### Vessel Memory（保留中）

Vessel Memory は、所有済みの船ごとに、その船が開いた海域や航海上の役割を短く表示する構想です。

現時点では `/vessels/` の構造が以下の機能と密接に関係しているため、実装は保留します。

```txt
現在の船表示
次の船表示
船コレクション
船詳細モーダル
船建造
海域開放
New Vessel / New Sea Area モーダル

将来的に実装する場合は、いきなり既存の船詳細モーダルへ組み込まず、まずは独立した小さな表示関数として設計します。

表示方針：

所有済み船だけに表示する
未開放船には表示しない
未開放海域名は表示しない
次以降の船情報は出さない
内部キーは表示しない

構想例：

Vessel Memory

この船は、港の外へ出る最初の航路を開きました。
第二章　静かな水域は、岸辺を離れた航海の静かな始まりです。

Vessel Memory は報酬演出ではなく、船が航海の中で果たした役割を静かに記録するための機能です。

  現在の船画像
  所有済み船画像
  船コレクション画像
  船画像拡大モーダル
  船詳細モーダル
  所有済み船だけ実情報を表示
  次の船と未開放船は霧表示

/map/
  海図画像
  海域カード
  海域ごとの気配
  海域風景画像
  未開放海域の霧カード
  海図拡大モーダル

/log/
  Tonight's Harbor
  Harbor Weather
  開放済み海域に連動した Harbor Weather
  Harbor Cat 巻物
  Harbor Find 表示カード
  Harbor Find 詳細モーダル
  Drift Ticket 表示カード
  Drift Ticket 詳細モーダル

/timeline/
  画像付きイベントカード
  Harbor Find アイテム画像
  Drift Ticket 画像
  船取得画像
  海域画像
  Read more / Show less

/account/
  Drift / Special / Deep Sea チケット概要
  チケット画像カード
  有効チケット状態
  Special Voyage 導線

/tickets/
  Harbor Cat 画像
  Drift Ticket 画像
  Special Voyage Ticket 画像
  Deep Sea Ticket 画像
  統一チケットカードレイアウト
  Drift Ticket の控えめな表示

/special-voyage/
  複数チケット表示
  チケット別入口
  航海中画面
  航海記録入力
  報酬カード
  報酬詳細モーダル

画像モーダルの基本挙動：

クリックで開く
閉じるボタン
背景クリックで閉じる
Escapeキーで閉じる
object-fit: contain
スマホでも崩れにくい表示

Timelineカードの基本挙動：

初期表示は5件
Read more で全件表示
Show less で折りたたみ
image_path がない・壊れている場合はアイコンへフォールバック
Drift Ticket 画像は控えめに表示
Storage / 画像パス メモ

現在使う画像パス例：

/images/sea-chart-z.png
/images/harbor-cat/cat-harbor-main.png
/images/tickets/drift-ticket.svg
/images/tickets/special-voyage-ticket.svg
/images/tickets/deep-sea-ticket.svg
/images/areas/harbor.png
/images/areas/fog-sea.png
/images/areas/moonlit-sea.png
/images/areas/lighthouse-coast.png
/images/areas/silent-water.png
/images/areas/deep-current.png
/images/areas/unnamed-waters.png

漂着物画像は harbor_items.image_path に保存します。

船画像は vessels.image_path に保存します。

Timeline画像は user_timeline_events_view.image_path から取得します。

海域風景画像は /images/areas/ に保存します。

画像が見つからない場合は、以下にフォールバックします。

シンボルアイコン
image pending テキスト
静かなプレースホルダー
海域風景画像の場合は海図画像

Special Voyage 漂着物画像：

/images/items/moon-shell.png
/images/items/driftwood.png
/images/items/sea-glass.png
/images/items/lighthouse-shard.png
/images/items/fog-compass.png
/images/items/quiet-chart.png
/images/items/deep-blue-pearl.png
/images/items/sunken-star.png
/images/items/abyss-note.png
今後の候補

今後できること：

/log/ Harbor Weather 文言調整
/map/ カード位置・スマホ表示調整
/vessels/ コレクション表示の微調整
船取得Timelineの表現をさらに豊かにする
Ticket UX 改善
有料 Special Voyage Ticket 実装
optional sound の導入
管理・メンテナンス用メモ追加
DB schema backup 作成
development changelog 作成
Special Voyage の追加チケット種別検討
報酬詳細モーダルの表現統一
保留アイデア

以下は意図的に保留中です。

音

音は将来追加してもよいですが、現在は未実装です。

方向性：

静かな港の環境音
小さな波音
遠い風
かすかな木造船の軋み
ユーザー操作による Sound On / Off のみ

音は、ユーザー操作なしで自動再生しません。

より豊かなアニメーション

将来的な候補：

Harbor Find の控えめな光
船解放時の淡い演出
Map の霧が晴れる表現
アイテム発見時の静かなReveal
Timelineイベントの表示演出
船詳細モーダルの静かなReveal
Special Voyage 出航時の控えめな演出
報酬カード表示時の小さな光

アニメーションは静かで最小限にします。

メモ

Celeste Harbor は静かであること。

このシステムを、生産性ダッシュボード、SNS、最適化ツールにしないこと。

中心体験は、ユーザーが港へ戻り、記録を書き、流れ着いたものに気づき、航海を続けることです。

船は、まだ進んでいる。
