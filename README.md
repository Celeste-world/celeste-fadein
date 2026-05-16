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

Celeste Harbor の中心となる私的な記録ページです。

含まれるもの：

- Voyage Log 保存
- Harbor Cat 応答
- Harbor Find
- Harbor Find 表示カード
- Drift Ticket 表示カード
- Tonight's Harbor
- Harbor Weather
- 開放済み海域に連動した Harbor Weather
- Recent Logs

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

### `/items/`

Harbor Finds。

発見済みの漂着物を、海域ごとに表示します。

含まれるもの：

- 海域別表示
- アイテム画像表示
- アイテム画像拡大モーダル

### `/vessels/`

船の記録。

表示するもの：

- 現在の船
- 次の船に必要な漂着物
- 所有済みの船コレクション
- 霧に包まれた未開放の船
- 船画像拡大モーダル

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
```

---

## Legacyページ

旧 Celeste Console 系ページは、以下に保存します。

```txt
/legacy/
```

Legacyページはログイン必須ではありません。  
ただし、検索エンジンにはインデックスさせません。

各Legacyページには以下を入れます。

```html
<meta name="robots" content="noindex, nofollow">
```

現在のLegacyファイル：

```txt
/legacy/about.html
/legacy/philosophy.html
/legacy/silent-structure.html
/legacy/vision.html
/legacy/who-i-am.html
/legacy/who-this-is-for.html
/legacy/faq.html
/legacy/timeline.html
/legacy/README.md
```

ルート直下の旧HTMLページは、対応するLegacyページへリダイレクトします。

```txt
/about.html              → /legacy/about.html
/philosophy.html         → /legacy/philosophy.html
/silent-structure.html   → /legacy/silent-structure.html
/vision.html             → /legacy/vision.html
/who-i-am.html           → /legacy/who-i-am.html
/who-this-is-for.html    → /legacy/who-this-is-for.html
/faq.html                → /legacy/faq.html
/timeline.html           → /legacy/timeline.html
```

`/auth/` は `/` へリダイレクトします。

---

## 基本ループ

Celeste Harbor の基本ループは以下です。

```txt
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
```

ユーザーは Voyage Log を書きます。  
Harbor Cat は、助言や診断ではなく、短い静かな応答を返します。  
ときどき、何かが港へ漂着します。  
漂着物は、船を整えるために使われます。  
船が増えると、新しい海域が開きます。  
海域が広がると、漂着物の可能性も広がります。  
重要な出来事は Cabin Log に記録されます。

---

## 海域が開くことによる体験変化

海域開放は、単なるDB上のフラグではありません。  
ユーザーにとっては、港の空気や見える景色が少しずつ変わる体験です。

海域が開くことで変わるもの：

```txt
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
```

ユーザーには以下のように感じてもらうことを目指します。

```txt
「あ、港の外が少し広がった」
「拾えるものの気配が変わった」
「次の船に近づいた」
「今日は少し違う海にいる」
```

現在は以下で体験変化を出しています。

- `/log/` の Harbor Weather が開放済み海域に連動
- `/map/` に海域ごとの気配を表示
- `/map/` で海域カードをタップすると風景画像を表示
- 未開放海域をタップすると霧カードを表示

---

## 固定仕様

### 船

船は9隻です。

船の作成は、漂着物の消費によって行います。  
船は、ユーザーの成長記録の一部です。

`/vessels/` に表示するもの：

- 現在の船
- 次の船に必要な漂着物
- 所有済みの船コレクション
- 霧に包まれた未開放の船
- 船画像
- 船画像拡大モーダル

### 漂着物

漂着物は25種類です。

`/items/` は、発見済みの漂着物だけを表示します。

漂着物は海域ごとにグループ化します。  
未発見の漂着物は表示しません。  
未開放の海域は `霧の向こう` として表示します。

`/items/` に含まれるもの：

- 画像表示
- 画像拡大モーダル
- 海域別表示

### 海域

初期海域は以下です。

```txt
harbor
silent_water
lighthouse_coast
fog_sea
moonlit_sea
deep_current
unnamed_waters
```

海域は `/map/` に表示します。

未開放の海域は以下のように表示します。

```txt
霧の向こう
```

`/map/` に含まれるもの：

- 海図画像
- 開放済み / 未開放の海域カード
- 海域ごとの気配
- 海図拡大モーダル
- 海域風景モーダル
- 未開放海域の霧カード

---

## 海域ごとの気配

`/map/` の海域カードには、説明とは別に「気配」を表示します。

現在の気配：

```txt
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
```

未開放海域の場合：

```txt
まだ霧の向こうにあります。
```

---

## 海域風景画像

`/map/` では、海域カードをタップすると海域の風景画像をモーダル表示します。

保存場所：

```txt
/images/areas/
```

確定済み画像：

```txt
/images/areas/harbor.png
/images/areas/fog-sea.png
/images/areas/moonlit-sea.png
/images/areas/lighthouse-coast.png
/images/areas/silent-water.png
/images/areas/deep-current.png
/images/areas/unnamed-waters.png
```

海域ごとの画像方針：

```txt
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
```

開放済み海域：

- 風景画像を表示
- 海域名、説明、気配を表示

未開放海域：

- 霧カードを表示
- 風景画像は見せない
- 「まだ、この海は姿を見せていません」と表示

未開放海域の霧カード文言：

```txt
霧の向こう

まだ、この海は姿を見せていません。
船が整い、次の航路が開くまで、
その景色は静かに霧の中にあります。
```

---

## Harbor Weather

`/log/` の Harbor Weather は、開放済み海域に連動します。

目的：

- 書く場所の空気を変える
- 海域が開いたことを体感させる
- 記録行為に小さな変化を持たせる

現在の海域別 Weather：

```txt
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
```

---

## Harbor Find

Harbor Find は、Voyage Log 保存後に、港へ何かが漂着する仕組みです。

通常の Voyage Log：

```txt
12%
```

Special Voyage：

```txt
40%
```

Deep Sea Voyage：

```txt
60%
```

初回 Harbor Find は、ユーザーごとに1回だけ必ず発生します。

タグは、そのログの「気配」や「天候」として扱います。  
アイテム抽選の重み付けに軽く影響しますが、未開放の海域を開くことはありません。

UIでは、内部の確率や保証を直接見せすぎないようにします。  
Harbor Find は報酬ダッシュボードではなく、港からの静かな気配として扱います。

`/log/` の現在の表示文言：

```txt
何かが流れ着く夜もあれば、ただ波だけが残る夜もあります。
```

---

## Drift Ticket 表示

`/log/` には Drift Ticket 表示カードがあります。

Harbor Find カードの下に表示します。

現在の表示状態：

```txt
Quiet
Checking
Granted
```

内部ルールを直接見せすぎないようにします。

現在の初期文言：

```txt
小さな航海券が流れ着く夜があります。
それは、少しだけ深い海へ降りるための合図です。
```

Voyage Log 保存後：

- チケット確認中は `Checking`
- Drift Ticket が付与された場合は `Granted`
- 何も届かなかった場合は `Quiet`

Drift Ticket の通知は Harbor Cat の巻物内にも表示されることがあります。

---

## チケット種別

Celeste Harbor では、現在3種類のチケットを扱います。

### Drift Ticket

Voyage Log 保存後に、港へ漂着することがある無料チケットです。

販売導線ではなく、港からの小さな気配として扱います。

現在の表示文言：

```txt
小さな航海券が流れ着く夜があります。
それは、少しだけ深い海へ降りるための合図です。
```

画像パス：

```txt
/images/tickets/drift-ticket.svg
```

表示方針：

- Drift Ticket は控えめに表示する。
- 強い購入バナーのように見せない。
- 「流れ着いたもの」として扱う。

### Special Voyage Ticket

ユーザーが自分で選んで入る Special Voyage 用の有料予定チケットです。

Special Voyage Ticket は以下の2種類です。

```txt
10分
20分
```

15分・30分の Special Voyage Ticket は作りません。

現在の表示文言：

```txt
チケットは 10分 と 20分 の2種類です。
```

画像パス：

```txt
/images/tickets/special-voyage-ticket.svg
```

### Deep Sea Ticket

さらに深く静かな海へ降りるための限定チケットです。

ユーザー向けには、内部設計や販売方針ではなく、体験として説明します。

現在のユーザー向け文言：

```txt
いつもの港よりも、さらに深い海へ降りるための航海券です。
静かな夜に、言葉をもう少し奥まで沈めたいときのためにあります。

すべての夜に必要なものではありません。
必要だと感じる時だけ、深い海への入口として開きます。
```

画像パス：

```txt
/images/tickets/deep-sea-ticket.svg
```

---

## Special Voyage

`/special-voyage/` は、有効な航海券を使って時間制の航海へ入るページです。

現在の挙動：

- 有効なチケットを確認する
- チケットがあれば航海入口を表示する
- 航海開始時にチケットを使用済みにする
- 制限時間内だけ特別航海UIを表示する
- 終了後は Voyage Log へ戻す

チケット種別ごとの入口表示：

```txt
Drift Ticket
  → 漂着チケットの入口

Special Voyage Ticket
  → 特別航海の入口

Deep Sea Ticket
  → 深海航海の入口
```

Drift Ticket を Special Voyage Ticket のように見せないこと。  
それぞれのチケットが持つ意味に合わせて表示文言を変えること。

---

## Cabin Log / Timeline 表示

`/timeline/` は、港で起きた出来事の視覚的な記録です。

現在の表示：

- イベントを画像付きカードとして表示
- 初期表示は5件
- `Read more` で全件表示
- `Show less` で5件表示へ戻す
- イベントは `user_timeline_events_view` から取得する

現在の画像表示：

```txt
Harbor Find      → 漂着物画像
Drift Ticket     → チケット画像
Vessel acquired  → 船画像
Sea Area opened  → 海図画像
Fallback         → 静かなアイコン
```

`user_timeline_events_view` で対応する画像列：

```txt
image_path
image_alt
```

フロント側では以下のフォールバック画像列も見ます。

```txt
item_image_path
harbor_item_image_path
vessel_image_path
ticket_image_path
related_image_path
```

イベント種別ごとの見た目：

```txt
harbor_find      → 緑系 / 漂着物
ticket_drifted   → 控えめな紫系 / チケット
vessel_acquired  → 金色系 / 船
sea_area_opened  → 海図画像
```

Drift Ticket 画像は、アイテムや船イベントより目立ちすぎないように控えめに表示します。

---

## Harbor Cat

Harbor Cat は、診断・助言・評価・解決をしません。

Voyage Log 保存後に、短い静かなPresenceを返します。

現在の動作：

- Voyage Log 保存後に表示される
- 巻物を読むような演出で表示される
- 短い静かな応答を返す
- Harbor Find の通知を巻物内に表示することがある
- Drift Ticket の通知を巻物内に表示することがある

Harbor Cat は「助手」ではなく「気配」として扱います。

---

## 重要なSupabaseテーブル

主要テーブル：

```txt
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
user_timeline_events
```

---

## 重要なView

現在使っている主な表示用View：

```txt
user_current_vessel_view
next_vessel_requirements_view
user_harbor_items_view
user_timeline_events_view
user_max_vessel_stage_view
user_vessels_collection_view
vessel_requirements_display_view
```

一部のコレクション表示は、ViewだけではなくRPCで処理しています。

---

## `user_timeline_events_view`

`user_timeline_events_view` は `/timeline/` で使います。

イベント情報に加えて、画像表示用の列も返す必要があります。

期待する列：

```txt
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
```

画像解決方針：

- metadata に画像パスがあれば優先する
- Harbor Find は `metadata.item_key` で `harbor_items` と結合する
- 船イベントは `metadata.vessel_key` または vessel id 系で `vessels` と結合する
- チケットイベントは固定画像パスを使ってよい
- 海域開放イベントは海図画像を使ってよい

metadata 例：

```json
{
  "item_key": "driftwood",
  "item_name_ja": "漂流木",
  "area_key": "harbor",
  "area_name_ja": "港"
}
```

固定画像パス例：

```txt
/images/tickets/drift-ticket.svg
/images/tickets/special-voyage-ticket.svg
/images/tickets/deep-sea-ticket.svg
/images/sea-chart-z.png
/images/harbor-cat/cat-harbor-main.png
```

---

## 重要なRPC関数

### `ensure_user_vessel()`

初期船とユーザーの港状態を用意します。

使用ページ：

```txt
/log/
/vessels/
```

---

### `check_and_unlock_next_vessel()`

次の船に必要な漂着物が揃っているか確認します。

条件を満たした場合：

- 必要な漂着物を消費
- 次の船を解放
- Timeline に記録

使用ページ：

```txt
/vessels/
```

---

### `check_and_unlock_sea_areas()`

所有している船の数に応じて、海域を開放します。

現在のルール：

```txt
1 vessel  → harbor
2 vessels → silent_water
3 vessels → lighthouse_coast
4 vessels → fog_sea
5 vessels → moonlit_sea
6 vessels → deep_current
7 vessels → unnamed_waters
```

使用ページ：

```txt
/map/
/vessels/
```

---

### `grant_random_harbor_find(p_tag, p_context, p_force)`

Harbor Find の抽選処理を行います。

機能：

- 通常漂着率：12%
- Special Voyage 後：40%
- Deep Sea Voyage 後：60%
- 初回 Harbor Find 保証
- 開放済み海域の item pool のみ使用
- rarity による重み付け
- tag による軽い海域ブースト
- user inventory 更新
- timeline event 作成

使用ページ：

```txt
/log/
```

現在のUI挙動：

- 結果は Harbor Cat の巻物内に表示
- 結果は `/log/` の Harbor Find カードにも表示
- 結果は `/timeline/` に漂着物画像付きで表示
- 内部の保証や確率はユーザーに直接見せない

---

### `get_user_vessels_collection()`

ユーザーの9隻すべての船情報を返します。

返す内容：

- 所有状態
- 現在の船
- 霧に包まれた未開放状態
- 船の詳細
- 画像パス
- stage order

使用ページ：

```txt
/vessels/
```

---

## 認証方針

公開ページは以下のみです。

```txt
/
/about/
/voyage/
```

それ以外の有効な港ページは、Googleログイン必須です。

保護ページでは以下を使います。

```html
<body class="auth-locked">
```

```css
body.auth-locked .wrap{
  visibility:hidden;
}
```

未ログインユーザーは以下へ戻します。

```txt
/
```

ログアウト後も以下へ戻します。

```txt
/
```

---

## SEO方針

`sitemap.xml` には公開ページのみを含めます。

```txt
/
/about/
/voyage/
```

`robots.txt` では公開ページを許可し、内部ページとLegacyページを拒否します。

公開：

```txt
/
/about/
/voyage/
```

Disallow：

```txt
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
```

Legacyページにも以下を入れます。

```html
<meta name="robots" content="noindex, nofollow">
```

---

## 完了済み

完了済み：

- DB正式リセット
- 9隻の船を登録
- 25種類の漂着物を登録
- 船の必要漂着物を登録
- 7海域を登録
- area item pools を登録
- 初期 `user_sea_areas` 挙動
- 主要表示View
- `ensure_user_vessel()`
- `check_and_unlock_next_vessel()`
- `check_and_unlock_sea_areas()`
- `grant_random_harbor_find()`
- `get_user_vessels_collection()`
- `/log/` の正式RPC接続
- Voyage Log 保存
- Harbor Cat 応答
- Harbor Find
- Harbor Find 表示カード
- Drift Ticket 表示カード
- `/log/` Harbor Weather の海域連動
- Recent Logs
- `/timeline/` Cabin Log 分離
- `/timeline/` 画像付きイベントカード
- `/timeline/` Harbor Find 画像表示
- `/timeline/` Drift Ticket 画像表示
- `/timeline/` 船取得画像表示
- `/timeline/` 海域画像表示
- `/timeline/` Read more / Show less
- `/account/` 軽量ページ
- `/account/` チケット概要表示
- `/account/` チケット画像カード
- `/items/` 海域別表示
- `/items/` 画像表示
- `/items/` 画像拡大モーダル
- `/vessels/` 船コレクション表示
- `/vessels/` 船画像拡大モーダル
- `/map/` 海図
- `/map/` 海域カード
- `/map/` 海域ごとの気配表示
- `/map/` 海域風景モーダル
- `/map/` 未開放海域の霧カード
- `/map/` 7海域分の風景画像
- `/map/` 海図拡大モーダル
- `/tickets/` チケット説明ページ
- `/tickets/` 統一チケット画像レイアウト
- `/tickets/` Drift / Special / Deep Sea チケット画像
- Special Voyage Ticket は 10分 / 20分 の2種類に固定
- Deep Sea Ticket のユーザー向け文言調整
- `/special-voyage/` チケット種別ごとの入口表示
- 公開 / 非公開ルート整理
- Legacy移行
- sitemap / robots 整理
- README 作成・更新
- README 日本語化

---

## 現在のページ構成

```txt
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
  Drift Ticket 表示カード
  Tonight's Harbor
  Harbor Weather
  海域連動 Weather

/timeline/
  Cabin Log
  画像付きイベントカード
  Read more / Show less

/items/
  海域別 Harbor Finds
  アイテム画像モーダル

/vessels/
  現在の船
  次の船
  所有済みの船
  船画像モーダル

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

/fragments/
  内部 Fragment Archive

/archive/
  内部 Archive 入口

/legacy/
  旧Celeste記録
```

---

## 表示・操作機能

現在実装済みの表示機能：

```txt
/items/
  アイテム画像
  アイテム画像拡大モーダル

/vessels/
  現在の船画像
  次の船画像
  船コレクション画像
  船画像拡大モーダル

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
  Drift Ticket 表示カード

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
```

画像モーダルの基本挙動：

- クリックで開く
- 閉じるボタン
- 背景クリックで閉じる
- Escapeキーで閉じる
- `object-fit: contain`
- スマホでも崩れにくい表示

Timelineカードの基本挙動：

- 初期表示は5件
- `Read more` で全件表示
- `Show less` で折りたたみ
- `image_path` がない・壊れている場合はアイコンへフォールバック
- Drift Ticket 画像は控えめに表示

---

## Storage / 画像パス メモ

現在使う画像パス例：

```txt
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
```

漂着物画像は `harbor_items.image_path` に保存します。

船画像は `vessels.image_path` に保存します。

Timeline画像は `user_timeline_events_view.image_path` から取得します。

海域風景画像は `/images/areas/` に保存します。

画像が見つからない場合は、以下にフォールバックします。

- シンボルアイコン
- image pending テキスト
- 静かなプレースホルダー
- 海域風景画像の場合は海図画像

---

## 今後の候補

今後できること：

- `/items/` に海域ごとの発見数を表示
- `/special-voyage/` の現在挙動を実機確認
- `/log/` Harbor Weather 文言調整
- `/map/` カード位置・スマホ表示調整
- `/vessels/` コレクション表示の微調整
- 船取得Timelineの表現をさらに豊かにする
- Ticket UX 改善
- 有料 Special Voyage Ticket 実装
- Deep Sea Ticket 挙動実装
- optional sound の導入
- 管理・メンテナンス用メモ追加
- DB schema backup 作成
- development changelog 作成

---

## 保留アイデア

以下は意図的に保留中です。

### 音

音は将来追加してもよいですが、現在は未実装です。

方向性：

- 静かな港の環境音
- 小さな波音
- 遠い風
- かすかな木造船の軋み
- ユーザー操作による Sound On / Off のみ

音は、ユーザー操作なしで自動再生しません。

### より豊かなアニメーション

将来的な候補：

- Harbor Find の控えめな光
- 船解放時の淡い演出
- Map の霧が晴れる表現
- アイテム発見時の静かなReveal
- Timelineイベントの表示演出

アニメーションは静かで最小限にします。

---

## メモ

Celeste Harbor は静かであること。

このシステムを、生産性ダッシュボード、SNS、最適化ツールにしないこと。

中心体験は、ユーザーが港へ戻り、記録を書き、流れ着いたものに気づき、航海を続けることです。

船は、まだ進んでいる。
