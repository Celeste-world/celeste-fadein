# Celeste Harbor 開発メモ 最新版

更新日：2026-05-29  
状態：主要ページ文言整理完了 / スマホ表示点検完了 / Voyage Archive 強化完了 / 課金DB土台整備完了

---

# 1. Celeste Harbor の基本定義

Celeste Harbor は、航海の記録を残し、小さな気配を受け取り、漂着物を集め、船を整え、新しい海域を開いていくための静かなWebの港です。

このプロジェクトは、SNSでも、チャットボットでも、生産性ダッシュボードでもありません。

日々の言葉が港に残り、  
ときどき漂着物が届き、  
船が整い、  
海域が少しずつ開いていく、  
個人的な航海記録のための場所です。

Celeste Harbor の中心は、ゲーム攻略ではなく、日記と余韻です。

---

# 2. 現在の設計方針

Celeste Harbor では、以下を大切にします。

```txt
書く
探す
振り返る
残す
静かに集まる
少しずつ開く
```

一方で、以下には寄せすぎません。

```txt
攻略
達成率
ランキング
報酬の強調
確率の明示
課金圧
ユーザー評価
```

漂着物、船、海域、チケットはゲーム的な要素を持ちますが、  
ユーザーには「条件」「取得」「確率」として強く見せず、  
「気配」「記録」「航海の入口」として扱います。

---

# 3. 用語統一方針

## 基本用語

```txt
Voyage Log
  今日の言葉を残す場所

Voyage Archive
  航海記録を探す・振り返る場所

Lantern Mark
  あとで読み返すしるし

Cabin Log
  港で起きた出来事の履歴

Items
  漂着物を確認する場所

Vessels
  航海をともにする船

Map
  海域と気配を見る場所

Tickets
  深く振り返るための航海券

Harbor Status
  今の港の状態を眺める場所

Harbor Letter
  港へ便りを送る場所

Harbor Store
  航海券や支援を確認する場所
```

## 表記統一

```txt
深い潮
  使用しない

深潮
  使用する
```

対象：

```txt
/map/
/items/
/vessels/
/timeline/
/harbor-status/
/voyage-archive/
```

`deep_current` の日本語表記は、すべて「深潮」に統一します。

---

# 4. 公開ページ

公開ページは、意図的に小さく保ちます。

## `/`

公開入口ページ。

表示するもの：

```txt
Googleログイン
Aboutリンク
```

## `/about/`

公開説明ページ。

Celeste Harbor、Harbor Cat、Presence AI、港の目的を説明します。

## `/voyage/`

公開用の Moonlit Voyage ページ。

書籍や改訂版の案内を置くための公開ページです。

---

# 5. ログイン必須ページ

港の内部ページは、すべて Google ログイン必須です。

---

# 6. `/help/`

Help / Navigation Guide。

Celeste Harbor の各ページの役割を確認する場所です。

## First Voyage Guide 導線

Help / Navigation Guide には、First Voyage Guide への導線を置きます。

方針：

```txt
/log/ に再表示ボタンは増やさない
Help 側に導線を置く
/log/ へ強制遷移させない
/help/first-voyage/ で案内を確認する
```

Navigation Guide 内の First Voyage Guide 文言：

```txt
Celeste Harbor の基本的な使い方を、初回チュートリアルと同じ流れで確認できます。
はじめての方や、使い方をもう一度見直したいときに開いてください。
```

Help は、迷った時に戻ってこられる場所として扱います。

---

# 7. `/log/`

Voyage Log。

今日の航海記録を書くための中心ページです。

`/log/` は、港の状態をすべて見る場所ではなく、  
今夜の航海を残すための入力中心ページとして扱います。

## 含まれるもの

```txt
Voyage Log 保存
タグ選択
タグガイド
今日のひとこと導線
Monthly log limit
Harbor Cat 応答
Harbor Find
Harbor Find 表示カード
Harbor Find 詳細モーダル
Drift Ticket 表示カード
Drift Ticket 詳細モーダル
Tonight's Harbor
Harbor Weather
開放済み海域に連動した Harbor Weather
Recent Logs
全体 Voyage Log ダウンロード
First Tutorial
```

## 文言方針

`/log/` では、日記を書く心理的ハードルを下げます。

表示例：

```txt
一言だけでも大丈夫です。
今日の気配を少し置くだけでも、航海記録になります。
```

placeholder：

```txt
一言だけでも大丈夫です。今日の気配を少し置いてください...
```

## First Tutorial

First Tutorial は Navigation Guide と文言を揃えます。

主な説明：

```txt
Celeste Harbor は、日々の言葉を静かな航海記録として残す日記アプリです。
長い文章でなくても大丈夫です。
一言だけでも、今日の気配は港に残ります。
```

## Recent Logs 表記

英語表記は日本語化します。

```txt
Recent Logs
  → 最近の航海記録

Read more
  → 記録をさらに表示

Show less
  → 記録を少なく表示
```

## `/log/` に置かないもの

以下は `/harbor-status/` に置きます。

```txt
港の灯り
今の航海の気配
Last Voyage
Memory Tide
```

これにより、`/log/` は「今日の航海を書く場所」として軽く保ちます。

---

# 8. `/harbor-status/`

Harbor Status。

今の港に残っている気配を確認するための内部ページです。

`/log/` が「今日の航海を書く場所」であるのに対して、  
`/harbor-status/` は「今の港の状態を眺める場所」として扱います。

## 含まれるもの

```txt
港の灯り
今の航海の気配
Last Voyage
Memory Tide
Voyage Log への導線
Voyage Archive への導線
Tickets への導線
```

## 港の灯り

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
```

表示方針：

```txt
連続日数として扱わない
記録が途切れても失敗扱いしない
0 の場合は強く表示しない
毎日の記録を強制しない
ユーザーを急かさない
```

港の灯りは、達成状況ではなく、港に残る小さな明かりです。

## 今の航海の気配

今の航海の気配は、最近の Voyage Log のタグ傾向から表示します。

これは「称号」ではありません。

ユーザーを分類したり、評価したり、ランク付けしたりするものではなく、  
最近の記録に漂っている気配を短く表すものです。

判定方針：

```txt
直近14日以内の Voyage Log を見る
その中から最大7件を対象にする
タグの出現数が多いものを優先する
同数の場合は、より新しい記録に近いタグを優先する
ログがない場合は静かな案内を表示する
```

対応タグ：

```txt
Moonlit
  月明かりの道を進む人

Fog
  霧の中で舵を保つ人

Lighthouse
  灯台を見失わない人

Storm
  波の中で船を離さない人

Deep Current
  深潮を渡る人

Calm Tide
  静かな潮を渡る人

Drift
  流れの中で言葉を拾う人

Return
  港へ戻る道を知る人

Harbor
  港の灯りを守る人
```

Memory Tide 側も以下に統一します。

```txt
深潮に沈んでいた言葉が、静かに戻ってきました。
```

---

# 9. `/voyage-archive/`

Voyage Archive。

Voyage Log を月ごとに見返すための内部アーカイブページです。

## 含まれるもの

```txt
Supabase検索
AND検索
タグ絞り込み
Lantern Mark
Lantern Mark のみ
Monthly Summary
Monthly Afterglow
Monthly Tags
月別の Voyage Log 一覧
月ごとの記録数
月ごとの多かった気配
最後の記録日時
月を選択した時のログ一覧表示
月別 Voyage Log ダウンロード
検索結果の追加読み込み
```

`/archive/` は旧Celeste記録への内部アーカイブ入口として残し、  
Voyage Log の月次アーカイブは `/voyage-archive/` に分けて管理します。

## 文言整理

```txt
Read more
  → 月をさらに表示
  → 記録をさらに表示

Lantern Marks only
  → Lantern Mark のみ

検索 placeholder
  → 探したい言葉を入力する...
```

## 役割

```txt
/log/
  全期間の Voyage Log をダウンロードする場所

/voyage-archive/
  選択した月の Voyage Log をダウンロードする場所
```

## Voyage Archive の検索・追加読み込み

`/voyage-archive/` の検索結果は、Supabase から 200件ずつ取得します。

検索条件がある場合、最初に最新200件を表示します。  
検索結果が200件を超える場合は、`検索結果をさらに読み込む` ボタンを表示し、押すたびに次の200件を追加取得します。

対象：

```txt
キーワード検索
タグ検索
Lantern Mark のみ
上記の組み合わせ
```

検索解除時には、以下をリセットします。

```txt
archiveSearchOffset
archiveSearchTotalCount
archiveSearchHasMore
archiveSearchLogs
isArchiveSearching
```

この機能は、長期利用で航海記録が増えた場合でも、Archive を重くしすぎず、必要な分だけ過去の記録を広げて見返すためのものです。

## Monthly Summary の Lantern Marks

`/voyage-archive/` の Monthly Summary には、以下の4項目を表示します。

```txt
Logs
Days
Main Tag
Lantern Marks
```

`Lantern Marks` は、その月にあとで読み返すしるしが残された記録数です。

これは達成率や評価ではなく、ユーザー自身があとで戻りたいと思った言葉の灯りとして扱います。

Monthly Summary の余韻文では、Lantern Mark が1件以上ある月の場合、以下のような文言を優先して表示します。

```txt
この月には、あとで読み返すための灯りが ○件残されています。
```

Lantern Mark がない月では、Main Tag に応じた月ごとの余韻文を表示します。

## Voyage Archive の月別ダウンロード

`/voyage-archive/` では、選択中の月の Voyage Log を `.txt` 形式でダウンロードできます。

この機能は `/log/` の全体ダウンロードとは役割を分けています。

どちらも、ユーザー自身の記録を外部ファイルとして保存する操作です。  
そのため、Celeste Harbor ではダウンロード前に登録メールアドレスの確認を必須にします。

月別ダウンロードの流れ：

```txt
月を選択
↓
この月をダウンロード
↓
登録メールアドレスを入力
↓
アカウントのメールアドレスと一致するか確認
↓
対象月・記録数・期間・多かった気配・Lantern Marks・ファイル名を表示
↓
ユーザーが最終確認
↓
.txt ファイルをダウンロード
```

出力内容：

```txt
Celeste Harbor
Voyage Archive Monthly Export

出力日時
対象月
記録数
多かった気配
Lantern Marks

Monthly Afterglow
Monthly Tags
Lantern Marks
Voyage Logs
```

## Monthly Export の Lantern Marks

月別 `.txt` ダウンロードには、Lantern Mark 情報も含めます。

ヘッダーに以下を出力します。

```txt
Lantern Marks：○件
```

また、`Monthly Tags` の後に `Lantern Marks` セクションを追加し、しるしが残された記録だけを先に一覧表示します。

Lantern Mark がない場合は、以下を出力します。

```txt
Lantern Mark が残された記録はありません。
```

その後、通常通り `Voyage Logs` セクションで、その月の全記録を出力します。

Lantern Mark 付きの記録は、`Lantern Marks` セクションと `Voyage Logs` セクションの両方に出る場合があります。  
これは重複ではなく、先に読み返したい記録をまとめて見せるための仕様です。

月別ダウンロードは、バックアップというよりも「その月の航海を静かに保存する」ための機能です。  
ただし、記録の扱いは `/log/` の全体ダウンロードと同じく慎重に扱います。

実装上の注意：

```txt
メール確認を省略しないこと
ログイン済みであっても、ダウンロード前には登録メールアドレス確認を行うこと
対象は選択中の月の Voyage Log のみとすること
/log/ の全体ダウンロード機能とは統合しないこと
Monthly Summary の Lantern Marks 件数と、Monthly Export の Lantern Marks 件数を一致させること
```

## 今後候補

```txt
月ごとのよく使った言葉
タグの変化
去年の同じ時期の記録
```

ただし、分析アプリに寄せすぎないこと。

---

# 10. `/timeline/`

Cabin Log。

港で起きた出来事を時系列で見返す場所です。

## 含まれるもの

```txt
画像付きイベントカード
Harbor Find のアイテム画像
Drift Ticket 画像
船取得画像
海域 / 海図画像
イベント種別ごとの色分け
記録をさらに表示
記録を少なく表示
詳細モーダル
関連導線
```

## Cabin Log の位置づけ

Cabin Log は、進行ログではありません。

港で起きた出来事を、あとから静かに開き直せる記録棚として扱います。

対象イベント：

```txt
Harbor Find
Special Voyage Find
Vessel acquired
Sea Area opened
Drift Ticket
Special Voyage started / ended
Voyage Log
Harbor Cat
```

## 詳細モーダル

表示するもの：

```txt
イベント種別
タイトル
発生日時
画像
本文
関連導線
```

関連導線：

```txt
Harbor Find / Special Voyage Find
  → この漂着物を見る
  → /items/

Vessel acquired / Vessel unlocked
  → この船の記録を見る
  → /vessels/

Sea Area opened / Sea Area unlocked
  → この海の記憶を見る
  → /map/

Drift Ticket / Ticket granted
  → 航海券を見る
  → /tickets/

Special Voyage started / ended
  → Voyage Log へ
  → /log/
```

## 表示しないもの

```txt
未開放船名
未開放海域名
未開放数
rarity
item_key
area_key
roll_value
session_id
ticket_id
内部DBキー
```

## deep_current 表記

```txt
第六章　深い潮
  → 第六章　深潮

見えている波よりも、深い潮の流れを感じる章です。
  → 見えている波よりも、深潮の流れを感じる章です。
```

---

# 11. `/items/`

Harbor Finds。

発見済みの漂着物を、海域ごとに表示します。

## 含まれるもの

```txt
海域別表示
海域ごとの発見数
発見数の進捗バー
漂着物画像表示
漂着物画像拡大モーダル
漂着物詳細モーダル
Special Voyage Finds
```

## 表示方針

未発見アイテム名は表示しません。

探索感は出しつつ、ネタバレは避けます。

数量が `0` のアイテムも、一度発見済みであれば表示します。  
`quantity` は現在の所持数であり、発見済み状態そのものは `user_harbor_items` に行が存在することで判断します。

## Found Record 表記

```txt
Found Record
  → 漂着の記録

流れ着いた時
  → 港へ届いた時
```

## deep_current 表記

```txt
第六章　深い潮
  → 第六章　深潮
```

## `/items/` と `/map/` の関係

```txt
/items/
  海域ごとの漂着物を整理して見る場所

/map/
  その海そのものを眺める場所
  Sea Area Journal を見る場所
```

Celeste Harbor では、探索のゲーム性を  
「数字を埋めること」ではなく、  
「開いた海に記録が積もっていくこと」として表現します。

---

# 12. `/vessels/`

Vessels。

現在の船、次の船、所有済みの船を確認するページです。

## 含まれるもの

```txt
現在の船
次の船
所有済みの船
船画像拡大モーダル
船詳細モーダル
船と開放海域の対応
次の船に必要な漂着物
材料アイコン
必要数 / 所持数
```

## Acquired Record 表記

```txt
Acquired Record
  → 船の記録

現在の船：はい
  → いま航海をともにしている船です。
```

状態表示は `vesselStatusLabel(status)` を通して日本語寄せします。

例：

```js
function vesselStatusLabel(status){
  const value = String(status || "");

  if(value === "owned"){
    return "港に加わっています";
  }

  if(value === "current"){
    return "現在の船です";
  }

  if(value === "locked"){
    return "まだ霧の向こうにあります";
  }

  return value;
}
```

## deep_current 表記

```txt
第六章　深い潮
  → 第六章　深潮

深い潮が、海の下でゆっくりと動き始めました。
  → 深潮が、海の下でゆっくりと動き始めました。
```

## 節目演出

船の建造と海域開放は、Celeste Harbor における大きな節目です。

表示順：

```txt
New Vessel
↓
New Sea Area
```

船の建造によって海域が開放されるため、必ずこの順で表示します。

---

# 13. `/map/`

Sea Chart。

開放済み・未開放の海域を表示します。

## 含まれるもの

```txt
海図画像
海図拡大モーダル
海域カード
海域ごとの気配表示
海域カードタップ時の風景モーダル
未開放海域タップ時の霧カード
Drift Signs
Sea Area Journal
```

## Drift Signs 表示方針

Drift Signs は攻略条件ではありません。

表示文言：

```txt
Drift Signs は、その海域に漂う気配です。
必ず何かが流れ着く合図ではありません。
```

使わない表現：

```txt
出ます
入手できます
確率が上がります
条件です
確定です
```

使う表現：

```txt
気配があります
漂っています
流れ着きそうです
静かに残っています
```

## deep_current 表記

```txt
深い潮には
  → 深潮には
```

deep_current description：

```txt
海の下で深い流れが動く場所。重い船体と、沈まないための素材が集まります。
  → 海の下で深い流れが動く場所。沈まないための静かな重さが、少しずつ集まっていきます。
```

---

# 14. `/tickets/`

Tickets。

チケット説明ページです。

## 含まれるもの

```txt
Harbor Cat 画像
Drift Ticket 画像
Special Voyage Ticket 画像
Deep Sea Ticket 画像
統一されたチケットカードUI
Drift / Special / Deep Sea の説明
航海の深さ
Next Voyage 導線
```

## チケット表示方針

Celeste Harbor のチケットは、在庫管理や課金アイテムとして強く見せすぎません。

チケットは、必要な夜に少し深い海へ降りるための「航海の入口」として扱います。

同じ種類のチケット保持上限は1枚です。

統一表記：

```txt
同じ航海券は1枚まで
```

使わない表記：

```txt
保持1枚まで
複数保持不可
上限1
```

## Drift / Special / Deep の表現

```txt
Drift Ticket
  通常の記録よりも、漂着物が届く気配が少し強まる

Special Voyage Ticket
  通常の記録よりも、漂着物が届く気配がはっきり強まる

Deep Sea Ticket
  漂着物が届く気配が、より深く濃くなる
```

確率や報酬ではなく、気配として説明します。

---

# 15. `/account/`

Account。

アカウントと航海券の確認ページです。

## 含まれるもの

```txt
現在のアカウント
Tide Letters
手元の航海券
有効なチケットカード
チケット種別
航海時間
期限
入手元
同じ航海券は1枚まで
Special Voyage への導線
Harbor Store への導線
```

## 文言整理

```txt
Available Tickets
  → 手元の航海券

Harbor Store
  → Harbor Store を見る

桟橋へ行く
  → 桟橋へ向かう
```

## 表示しないもの

```txt
Drift 0
Special 1
Deep Sea 0
available などの内部状態表示
```

`/account/` では、チケットを数量管理として見せるのではなく、  
今手元に残っている航海の入口として表示します。

---

# 16. `/harbor-letter/`

Harbor Letter。

港へ便りを送るページです。

## 含まれるもの

```txt
便りの送信
便りの種類
送信済みの便り一覧
港からの返事
未読返信表示
Googleログイン導線
```

## 文言整理

```txt
すぐに返事ができないこともありますが、届いた便りは確認します。
  → すぐに返事が届かないこともありますが、届いた便りは確認します。

更新
  → 便りを更新

便りを送るにはログインが必要です。
  → 港へ便りを送るには、ログインが必要です。
```

送信後メッセージ：

```txt
港への便りを受け取りました。
届いた内容は、あとで静かに確認します。
```

## Harbor Letter 通知仕様

```txt
ユーザーは /harbor-letter/ から便りを送る
管理者は /admin/feedback/ で確認・返信する
返信あり + user_read_at null の場合、主要ページで Letter が光る
ユーザーが /harbor-letter/ を開くと user_read_at が入る
補助ページには通知を広げすぎない
```

---

# 17. `/pricing/`

Harbor Store。

航海券や、港を静かに続けるための支援を置く場所です。

現時点では準備中であり、購入や決済は行われません。

## 表示方針

課金ページでは、世界観よりも誤解がないことを優先します。

ただし、表現は Celeste Harbor の「気配」方針に合わせます。

## 文言整理

Free：

```txt
Harbor Find が届く可能性
  → Harbor Find が届く気配

Drift Ticket が流れ着く可能性
  → Drift Ticket が流れ着く気配
```

Special Voyage Ticket 10分 / 20分：

```txt
漂着物の取得は保証されません
  → 漂着物が必ず届くものではありません
```

Deep Sea Ticket：

```txt
深海系の漂着物が選ばれやすくなる
  → 深海にまつわる漂着物の気配が、より深く濃くなります

漂着物の取得は保証されません
  → 漂着物が必ず届くものではありません
```

## 準備中表示

以下はそのままでよいです。

```txt
Available
Preparing
Limited
現在準備中
```

---

# 18. `/special-voyage/`

Special Voyage。

時間制の特別航海入口および、航海中のインターフェースです。

## 含まれるもの

```txt
Drift Ticket / Special Ticket / Deep Sea Ticket の複数表示
チケット選択
ticket_id 指定による航海開始
session_id 渡し
航海開始
航海中画面
Current Depth
航海記録入力
Special Voyage 用の Harbor Find 抽選
Special Voyage 1セッション1回抽選
既存roll再利用
アイテム付与
報酬カード表示
Harbor Find 詳細モーダル
Drift Ticket 詳細モーダル
```

## Special Voyage 中の応答

Special Voyage 中にユーザーが航海記録を送信した場合、返答なしにはしません。

この返答は Harbor Cat の返答ではなく、  
Special Voyage 中の「海そのものの応答」として扱います。

Harbor Cat は港側の存在です。  
Special Voyage 中の主な返答者は Harbor Cat ではなく、航海中の海です。

## 応答の基本構造

```txt
海が言葉を受け取った
↓
その言葉への具体的な応答
↓
航海としての余韻
↓
漂着物がある場合は、その知らせ
```

単なる「受け取りました」だけでは不十分です。  
ユーザーが入力した言葉に対して、海が確かに応答したと感じられる内容にします。

## チケット種別ごとの応答量

```txt
Drift Ticket
  無料配布の短い航海券
  応答は最大3行

Special Voyage Ticket 10分
  応答は5行前後
  短いながらも、ユーザーの言葉に対して明確な海の応答を返す

Special Voyage Ticket 20分
  応答は5行前後
  10分より少し深く、言葉の奥にある揺れや余韻に静かに触れる

Deep Sea Ticket
  応答は6〜8行程度
  未整理の言葉や、まだ形にならないものを急がず受け止める
```

Drift Ticket は無料配布券なので、返答は短くします。  
ただし短くても、ユーザーの入力内容に対する具体的な応答を必ず含めます。

---

# 19. Voyage Log 月間回数制限

Celeste Harbor では、Voyage Log の保存回数を月単位で管理します。

これは単なる利用制限ではなく、課金プラン・航海燃料・港の維持灯と連動する基盤です。

## 基本方針

Voyage Log は、保存が成立した時点で今月の航海回数として数えます。

```txt
Voyage Log 保存成功
↓
今月の consumed_count を +1
```

一度保存した航海記録は、あとから削除しても consumed_count は戻しません。

理由：

```txt
記録を書く
↓
Harbor Find / Drift Ticket 抽選が発生する
↓
ログを削除して回数を戻す
```

という抜け道を防ぐためです。

ユーザー向け説明：

```txt
航海の記録は削除できますが、
その夜に航海した事実は今月の回数に残ります。
```

## monthly_log_allowances

管理するもの：

```txt
user_id
month_key
base_limit
support_bonus
fuel_bonus
total_limit
consumed_count
```

`month_key` は JST 基準の月として扱います。

例：

```txt
2026-05
```

## 回数計算

```txt
base_limit
  無料枠。基本は10回。

support_bonus
  港の維持灯による追加枠。+30回。

fuel_bonus
  航海燃料による追加枠。1回購入ごとに +50回。

total_limit
  base_limit + support_bonus + fuel_bonus
```

例：

```txt
無料のみ
  10回

港の維持灯
  10 + 30 = 40回

航海燃料1回
  10 + 50 = 60回

港の維持灯 + 航海燃料1回
  10 + 30 + 50 = 90回

港の維持灯 + 航海燃料2回
  10 + 30 + 100 = 140回
```

## consumed_count

```txt
保存成功時に +1
削除しても戻さない
保存失敗時は増やさない
空欄・文字数エラーでは増やさない
```

この値は、現在残っているログ件数ではありません。  
「その月に航海した回数」として扱います。

## ensure_monthly_log_allowance()

役割：

```txt
今月の allowance 行を用意する
港の維持灯が active なら support_bonus を反映する
航海燃料購入分を fuel_bonus に反映する
total_limit を再計算する
consumed_count はリセットしない
```

## save_voyage_log_with_limit()

処理順：

```txt
入力チェック
↓
今月の allowance を確認
↓
上限に達していなければ voyage_logs に保存
↓
保存成功後に consumed_count を +1
↓
保存結果を返す
```

保存に失敗した場合、consumed_count は増やしません。

---

# 20. 課金設計

Celeste Harbor の課金は、単に機能を増やすためではなく、  
ユーザーがどの深さで港と関わるかを選べるようにするためのものです。

## 課金分類

```txt
無料
  港に入る基本体験

港の維持灯
  港を支える月額支援
  Voyage Log の記録回数を増やす

航海燃料
  多く記録を残す月のための追加燃料
  Voyage Log の記録回数をさらに増やす

随時課金チケット
  必要な夜だけ、少し深い航海へ入る

潮の便り
  毎月、港から航海券と小さな便りが届く月額プラン
```

課金は、ユーザーを急かしたり、競わせたり、報酬で煽るためのものではありません。

Celeste Harbor では、課金を「強くなるため」ではなく、  
より深く航海するための入口として扱います。

---

# 21. 課金商品

## 港の入口

```txt
商品ID：なし
価格：無料
種別：無料プラン
Voyage Log：月10回まで
```

含まれるもの：

```txt
Voyage Log 月10回
Harbor Cat
Harbor Find
Drift Ticket が流れ着く気配
Items / Vessels / Map / Cabin Log
Harbor Letter
```

無料でも、Celeste Harbor の基本体験は成立させます。

## 港の維持灯

```txt
商品ID：harbor_light_monthly
価格：月額480円
種別：月額支援
付与内容：Voyage Log 航海回数 +30回
```

港の維持灯は、港を静かに続けるための月額支援です。

単なる回数追加ではなく、  
「港を支えること」を主目的とし、  
お礼として毎月の Voyage Log 記録枠を +30回します。

注意：

```txt
Special Voyage Ticket は含まれません。
潮の便りとは別の月額プランです。
```

## 航海燃料

```txt
商品ID：voyage_fuel_50
価格：580円
種別：単発購入
付与内容：購入月のみ Voyage Log 航海回数 +50回
```

航海燃料は、航海を多く残したい月のための追加燃料です。

注意：

```txt
購入月のみ有効です。
翌月への繰り越しはありません。
Special Voyage Ticket は含まれません。
```

## Special Voyage Ticket 10分

```txt
商品ID：special_ticket_10
価格：180円
種別：単品チケット
付与内容：Special Voyage Ticket 10分を1枚付与
有効期限：購入日から15日
保持上限：同じ航海券は1枚まで
```

注意：

```txt
漂着物が必ず届くものではありません。
同じ航海券は1枚まで保持できます。
```

## Special Voyage Ticket 20分

```txt
商品ID：special_ticket_20
価格：320円
種別：単品チケット
付与内容：Special Voyage Ticket 20分を1枚付与
有効期限：購入日から15日
保持上限：同じ航海券は1枚まで
```

注意：

```txt
漂着物が必ず届くものではありません。
最大2個まで届く可能性がありますが、2個目は低確率です。
同じ航海券は1枚まで保持できます。
```

## Deep Sea Ticket

```txt
商品ID：deep_sea_ticket
価格：480円
種別：単品チケット
付与内容：Deep Sea Ticket を1枚付与
有効期限：購入日から15日
保持上限：同じ航海券は1枚まで
```

注意：

```txt
漂着物が必ず届くものではありません。
深海にまつわる漂着物の気配が、より深く濃くなります。
同じ航海券は1枚まで保持できます。
```

## 潮の便り

```txt
商品ID：tide_letter_monthly
価格：月額680円
種別：月額プラン
付与内容：毎月、航海券1枚 + 小さな便り
Voyage Log 回数：増えない
```

潮の便りは、毎月、港から航海券と小さな便りが届く月額プランです。

Voyage Log の記録回数を増やすものではありません。  
毎月の航海体験を受け取るための別軸のプランとして扱います。

抽選比率案：

```txt
Special Voyage Ticket 10分
  70%

Special Voyage Ticket 20分
  25%

Deep Sea Ticket
  5%
```

Drift Ticket は配布対象に含めません。

---

# 22. 航海燃料の month_key 仕様

航海燃料は、購入した月に限り Voyage Log の航海回数を +50回する単発購入です。

この「購入月」は、`billing_purchases.month_key` に保存された値を基準に判定します。

`created_at` から都度月を推定しません。

## 理由

Stripe の決済完了時刻、Webhook の受信時刻、Supabase への記録時刻には差が出る可能性があります。

特に月末・月初の決済では、`created_at` から月を推定すると、  
ユーザーが購入したつもりの月と、DB上で反映される月がずれる可能性があります。

そのため、航海燃料では購入処理時に JST 基準の `month_key` を固定して保存します。

例：

```txt
2026年5月の航海燃料として購入
month_key = 2026-05
```

## 反映条件

```txt
billing_purchases.product_key = voyage_fuel_50
billing_purchases.status = granted
billing_purchases.month_key = 対象月
```

`status = paid` の段階では、まだ月間回数には反映しません。

Supabase 側で付与処理が完了し、`granted` になったものだけを反映します。

## 重要仕様

```txt
created_at から月を推定しない
month_key を購入時に固定する
status = granted のものだけ +50回に反映する
```

---

# 23. 課金DB設計

Celeste Harbor の課金機能は、Stripe 等の決済サービスと接続する前に、  
Supabase 側で「誰が、何を、いつ購入し、何が付与されたか」を安全に記録できる形にします。

購入ボタンを押しただけで付与処理を行いません。

必ず決済完了イベントを確認したあとで、Supabase 側へ反映します。

## 作成済みの課金テーブル

```txt
billing_customers
  Supabase user_id と Stripe customer_id を結びつける

user_subscriptions
  港の維持灯 / 潮の便り の月額契約状態を保存する

billing_purchases
  航海燃料 / 単品チケット の購入履歴を保存する

billing_events
  Stripe Webhook イベントを保存して二重処理を防ぐ
```

## 連携する既存テーブル

```txt
monthly_log_allowances
  Voyage Log 月間回数の反映先

voyage_tickets
  Drift / Special / Deep Sea などの航海券の付与先

voyage_fuel_purchases
  旧仕様・暫定仕様の航海燃料購入記録
```

`user_special_tickets` は使用しません。  
実際の航海券テーブルは `voyage_tickets` です。

## billing_customers

役割：

```txt
user_id と stripe_customer_id を対応させる
同じユーザーに複数の Stripe Customer が作られないようにする
将来の購入・契約・請求履歴を追えるようにする
```

主なカラム：

```txt
id
user_id
stripe_customer_id
email
created_at
updated_at
```

## user_subscriptions

対象：

```txt
harbor_light_monthly
tide_letter_monthly
```

status：

```txt
active
trialing
past_due
canceled
incomplete
expired
```

## billing_purchases

対象：

```txt
voyage_fuel_50
special_ticket_10
special_ticket_20
deep_sea_ticket
```

status：

```txt
pending
paid
granted
failed
refunded
canceled
```

`billing_purchases` を単発購入履歴の正とします。

今後の新規単発購入は、基本的に `billing_purchases` に記録します。  
航海燃料も、将来的には `billing_purchases.product_key = voyage_fuel_50` を正として扱います。

## billing_events

役割：

```txt
Stripe Webhook の二重処理を防ぐ
同じ event_id を複数回処理しない
処理成功・失敗を記録する
後からトラブル調査できるようにする
```

status：

```txt
received
processed
failed
ignored
```

## voyage_tickets

航海券の付与先です。

主なカラム：

```txt
id
user_id
ticket_type
source
duration_minutes
status
expires_at
used_at
billing_purchase_id
created_at
updated_at
```

`billing_purchase_id` は `billing_purchases.id` への外部キーです。

単品チケット購入が `granted` になった場合、`voyage_tickets` に航海券を付与します。

対応：

```txt
special_ticket_10
  ticket_type = special
  duration_minutes = 10
  source = purchase
  billing_purchase_id = billing_purchases.id

special_ticket_20
  ticket_type = special
  duration_minutes = 20
  source = purchase
  billing_purchase_id = billing_purchases.id

deep_sea_ticket
  ticket_type = deep_sea
  duration_minutes = 20 または実装側の既定値
  source = purchase
  billing_purchase_id = billing_purchases.id
```

## voyage_fuel_purchases

`voyage_fuel_purchases` は既存の航海燃料購入テーブルです。

主なカラム：

```txt
id
user_id
month_key
fuel_units
added_count
status
provider
provider_payment_id
purchased_at
expires_at
created_at
```

今後の新規Stripe購入では、`billing_purchases` を購入履歴の正とします。

`voyage_fuel_purchases` は以下の扱いにします。

```txt
既存データがある場合は参照用に残す
旧仕様・暫定仕様として扱う
新規Stripe購入では基本的に使用しない
削除はまだしない
```

削除しない理由：

```txt
既存コードが参照している可能性がある
過去の航海燃料購入履歴を失わないため
移行前に影響範囲を確認する必要がある
```

## GRANT 方針

課金テーブルでは、Supabase Data API / supabase-js からのアクセスに備え、明示的なGRANTを設定済みです。

方針：

```txt
anon
  権限なし

authenticated
  billing_customers / user_subscriptions / billing_purchases を SELECT のみ
  billing_events は見せない

service_role
  課金4テーブルを全操作可能

postgres
  管理者として全操作可能
```

現在の期待状態：

```txt
billing_customers
  authenticated: SELECT
  service_role: ALL
  postgres: ALL

user_subscriptions
  authenticated: SELECT
  service_role: ALL
  postgres: ALL

billing_purchases
  authenticated: SELECT
  service_role: ALL
  postgres: ALL

billing_events
  authenticated: 権限なし
  service_role: ALL
  postgres: ALL
```

## RLS 方針

RLSは有効化済みです。

ユーザーが読めるのは、自分の課金情報だけです。

作成済み policy：

```txt
billing_customers
  Users can read own billing customer
  SELECT
  auth.uid() = user_id

user_subscriptions
  Users can read own subscriptions
  SELECT
  auth.uid() = user_id

billing_purchases
  Users can read own purchases
  SELECT
  auth.uid() = user_id
```

`billing_events` はユーザーに見せないため、ユーザー向けpolicyは作成しません。

## 外部キー整理

外部キーは整理済みです。

期待状態：

```txt
monthly_log_allowances.user_id
  → auth.users

voyage_fuel_purchases.user_id
  → auth.users

voyage_tickets.user_id
  → auth.users

voyage_tickets.billing_purchase_id
  → billing_purchases.id
```

重複していた `_auth_user_id_fkey` 側の外部キーは削除済みです。

---

# 24. Webhook 処理の基本流れ

将来 Stripe と接続する場合、付与処理は必ず Webhook 側で行います。

```txt
Stripe Checkout 完了
↓
Webhook 受信
↓
billing_events に stripe_event_id を保存
↓
同じ event_id が処理済みでないか確認
↓
product_key / price_id を確認
↓
user_id を特定
↓
billing_purchases または user_subscriptions を更新
↓
商品に応じた付与処理を実行
↓
billing_events を processed に更新
```

フロント側では、決済完了画面へ戻ってきても、直接チケットや回数を付与しません。

## 二重付与防止

保存するもの：

```txt
stripe_event_id
stripe_checkout_session_id
stripe_payment_intent_id
stripe_subscription_id
```

基本方針：

```txt
同じ stripe_event_id は1回だけ処理する
同じ checkout_session_id に対して複数回付与しない
同じ payment_intent_id に対して複数回付与しない
同じ subscription_id は user_subscriptions で更新扱いにする
```

## Voyage Log 回数への反映

`harbor_light_monthly` が `active` の場合：

```txt
monthly_log_allowances.support_bonus = 30
```

`billing_purchases` に `voyage_fuel_50` が `granted` で存在し、同じ `month_key` の場合：

```txt
monthly_log_allowances.fuel_bonus = granted voyage_fuel_50 件数 × 50
```

再計算：

```txt
base_limit = 10
support_bonus = active harbor_light_monthly があれば 30
fuel_bonus = granted voyage_fuel_50 の件数 × 50
total_limit = base_limit + support_bonus + fuel_bonus
```

## 航海券への反映

単品チケット購入が `granted` になったら、`voyage_tickets` に付与します。

```txt
special_ticket_10
  voyage_tickets.ticket_type = special
  duration_minutes = 10
  source = purchase
  billing_purchase_id = billing_purchases.id
  expires_at = 購入日から15日

special_ticket_20
  voyage_tickets.ticket_type = special
  duration_minutes = 20
  source = purchase
  billing_purchase_id = billing_purchases.id
  expires_at = 購入日から15日

deep_sea_ticket
  voyage_tickets.ticket_type = deep_sea
  duration_minutes = 20 または実装側の既定値
  source = purchase
  billing_purchase_id = billing_purchases.id
  expires_at = 購入日から15日
```

---

# 25. 購入前の制御

チケットは最大1枚まで保持できるため、購入前に確認します。

確認対象は `voyage_tickets` です。

```txt
special_ticket_10
  voyage_tickets に ticket_type = special
  duration_minutes = 10
  status = available
  のチケットがあれば購入不可

special_ticket_20
  voyage_tickets に ticket_type = special
  duration_minutes = 20
  status = available
  のチケットがあれば購入不可

deep_sea_ticket
  voyage_tickets に ticket_type = deep_sea
  status = available
  のチケットがあれば購入不可
```

表示文言：

```txt
同じ航海券をすでに持っています。
その航海券を使うと、また購入できるようになります。
```

航海燃料は複数回購入可能です。

```txt
voyage_fuel_50
  同じ月に複数回購入可能
  fuel_bonus は購入回数ごとに +50
```

Webhook 側でも二重付与防止として、`billing_purchase_id` を使って確認します。

---

# 26. 実装順

課金機能は、以下の順番で進めます。

```txt
1. 課金DB 4テーブル作成
2. 明示的な GRANT 設定
3. RLS 有効化
4. ユーザー本人の SELECT policy 作成
5. monthly_log_allowances / voyage_tickets / voyage_fuel_purchases との接続確認
6. 外部キー整理
7. 管理者だけが確認できる簡易 billing admin を作る
8. Stripe 商品ID / Price ID を作る
9. Checkout 作成 Edge Function を作る
10. Webhook Edge Function を作る
11. テストモードで付与確認
12. 本番決済へ切り替え
```

完了済み：

```txt
課金DB 4テーブル作成
GRANT 整理
RLS policy 整理
monthly_log_allowances 連携確認
voyage_tickets 連携確認
voyage_fuel_purchases 整理方針確認
外部キー整理
```

次に進む工程：

```txt
Billing Admin の設計
```

決済接続はまだ行いません。

---

# 27. スマホ表示点検

スマホ表示の総点検は完了済みです。

確認結果：

```txt
特に大きく気になる箇所なし
主要ページのボタン崩れなし
文言の大きな尻切れなし
モーダル表示に重大な問題なし
```

今後もデプロイごとに、以下を軽く確認します。

```txt
/log/
  入力欄、タグ、Recent Logs

/voyage-archive/
  検索欄、タグ、Lantern Mark、月一覧、月詳細、月別ダウンロード

/map/
  Drift Signs、海域カード、モーダル

/items/
  漂着物カード、詳細モーダル

/vessels/
  材料アイコン、船詳細モーダル

/timeline/
  Cabin Log カード、詳細モーダル

/tickets/
  チケットカード

/account/
  Tide Letters、手元の航海券

/harbor-letter/
  送信フォーム、送った便り

/pricing/
  プランカード
```

---

# 28. 今回完了した文言・機能整理

完了済み：

```txt
First Voyage Guide 導線整理
Navigation Guide 文言整理
/log/ First Tutorial 文言統一
/log/ Recent Logs / Read more / Show less 日本語化
/voyage-archive/ Read more 日本語化
/voyage-archive/ Lantern Mark のみ
/voyage-archive/ 検索 placeholder 調整
/voyage-archive/ 検索結果をさらに読み込む実装
/voyage-archive/ Monthly Summary に Lantern Marks 追加
/voyage-archive/ Monthly Export に Lantern Marks 追加
/map/ Drift Signs 文言調整
/items/ Found Record → 漂着の記録
/vessels/ Acquired Record → 船の記録
/timeline/ deep_current 表記統一
/tickets/ 確率・報酬寄り表現を気配へ調整
/harbor-status/ Deep Current 表記統一
/account/ Available Tickets → 手元の航海券
/harbor-letter/ 便り文言調整
/pricing/ 課金ページ文言調整
スマホ表示総点検
課金DB 4テーブル作成
課金DB GRANT 整理
課金DB RLS policy 整理
monthly_log_allowances 連携確認
voyage_tickets 連携確認
voyage_fuel_purchases 整理方針確認
外部キー整理
```

---

# 29. 今後の優先タスク

## 優先度1：Billing Admin

管理者だけが確認できる簡易 billing admin を作ります。

表示候補：

```txt
ユーザー
契約状態
購入履歴
付与状態
Webhook イベント
エラー
```

対象テーブル：

```txt
billing_customers
user_subscriptions
billing_purchases
billing_events
monthly_log_allowances
voyage_tickets
```

目的：

```txt
決済接続前に、DB上で課金状態を安全に確認できるようにする
Webhook 実装後の付与確認に使えるようにする
エラー調査の入口を作る
```

## 優先度2：Stripe 商品ID / Price ID 設計

対象：

```txt
harbor_light_monthly
voyage_fuel_50
special_ticket_10
special_ticket_20
deep_sea_ticket
tide_letter_monthly
```

この段階では、まだ本番決済へ接続しません。  
まずはテストモードで商品・価格IDを整理します。

## 優先度3：Checkout 作成 Edge Function

役割：

```txt
ログイン中ユーザーを確認する
billing_customers を取得または作成する
購入前制御を行う
Stripe Checkout Session を作成する
billing_purchases に pending を作成する
Checkout URL を返す
```

## 優先度4：Webhook Edge Function

役割：

```txt
Stripe Webhook を受信する
billing_events に記録する
二重処理を防ぐ
billing_purchases / user_subscriptions を更新する
monthly_log_allowances / voyage_tickets に付与を反映する
billing_events を processed / failed に更新する
```

## 優先度5：Monthly Summary 追加強化

候補：

```txt
月ごとのよく使った言葉
タグの変化
去年の同じ時期の記録
```

ただし、分析アプリに寄せすぎないこと。

## 優先度6：Special Voyage 体験調整

候補：

```txt
チケット種別ごとの応答文量の再調整
Deep Sea Ticket の余韻強化
Drift Ticket の短文応答確認
Special Voyage 終了時の案内文調整
```

---

# 30. 最終方針

Celeste Harbor は、機能を増やすだけの段階から、  
「迷わず戻ってこられる港」に整える段階へ入っています。

今後も、判断に迷った場合は次の優先順位で決めます。

```txt
1. 日記としての使いやすさ
2. 迷わない導線
3. 世界観の静けさ
4. 内部仕様の安全性
5. ゲーム要素の楽しさ
6. 課金導線の明確さ
```

Celeste Harbor の魅力は、勝つことではなく、  
日々の言葉が港に残っていく感覚にあります。

この方針は、今後の開発でも維持します。
