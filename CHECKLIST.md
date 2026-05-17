# Celeste Harbor 点検チェックリスト

Celeste Harbor の実装・運用点検用チェックリストです。

README.md は「現在の仕様」をまとめる場所。  
CHANGELOG.md は「いつ、何を、なぜ変えたか」を残す場所。  
この CHECKLIST.md は「何を確認すべきか」を残す場所です。
# Celeste Harbor 点検チェックリスト

Celeste Harbor の実装・運用点検用チェックリストです。

README.md は「現在の仕様」をまとめる場所。  
CHANGELOG.md は「いつ、何を、なぜ変えたか」を残す場所。  
この CHECKLIST.md は「何を確認すべきか」を残す場所です。

---

## 基本方針

Celeste Harbor は、静かな航海を続けるための個人的な港です。

点検時の基本方針：

- [ ] 便利にしすぎない
- [ ] 報酬ゲームに寄せすぎない
- [ ] 管理画面にしすぎない
- [ ] 未開放のものは見せすぎない
- [ ] 取得済み・発見済みのものは静かに確認できるようにする
- [ ] 画像は体験を補助するが、主役にしすぎない
- [ ] 内部確率や保証はユーザーに直接見せすぎない

---

## 公開ページ

### `/`

- [ ] Googleログインが表示される
- [ ] Aboutリンクが表示される
- [ ] 内部ページへの不要な導線が出ていない
- [ ] ログイン済みユーザーが適切に `/log/` へ進める

### `/about/`

- [ ] Celeste Harbor の説明が表示される
- [ ] Harbor Cat の説明が表示される
- [ ] Presence AI の説明が表示される
- [ ] 公開ページとしてログイン不要で閲覧できる

### `/voyage/`

- [ ] Moonlit Voyage の公開案内が表示される
- [ ] 書籍・改訂版に関する案内が表示される
- [ ] ログイン不要で閲覧できる

---

## 認証・ルート保護

### ログイン必須ページ

以下がログイン必須になっていること。

- [ ] `/log/`
- [ ] `/timeline/`
- [ ] `/items/`
- [ ] `/vessels/`
- [ ] `/map/`
- [ ] `/account/`
- [ ] `/tickets/`
- [ ] `/special-voyage/`
- [ ] `/fragments/`
- [ ] `/archive/`
- [ ] `/harbor/`

### 未ログイン時

- [ ] 未ログインで内部ページを開くと `/` へ戻る
- [ ] `body.auth-locked .wrap { visibility:hidden; }` が機能している
- [ ] 一瞬だけ内部ページが見える状態になっていない

### ログアウト

- [ ] 内部ページのヘッダーにログアウトがある
- [ ] 本文内に不要なログアウトボタンが残っていない
- [ ] ログアウト後は `/` へ戻る
- [ ] `logoutLink` の処理が正常に動く

---

## 共通ヘッダー

内部ページのヘッダーに以下があること。

- [ ] Voyage Log
- [ ] Cabin Log
- [ ] Items
- [ ] Vessels
- [ ] Map
- [ ] Tickets
- [ ] Account
- [ ] ログアウト

対象ページ：

- [ ] `/log/`
- [ ] `/timeline/`
- [ ] `/items/`
- [ ] `/vessels/`
- [ ] `/map/`
- [ ] `/tickets/`
- [ ] `/account/`
- [ ] `/special-voyage/`
- [ ] `/fragments/`
- [ ] `/archive/`

---

## `/log/` Voyage Log

### 基本動作

- [ ] 航海記録を書ける
- [ ] 保存ボタンが「航海記録を残す」になっている
- [ ] 保存後に Harbor Cat の応答が返る
- [ ] Recent Logs に保存内容が反映される
- [ ] エラー時に画面が崩れない

### Harbor Cat

- [ ] Harbor Cat の巻物が表示される
- [ ] 応答が診断・助言・評価になりすぎていない
- [ ] 短く静かな Presence として表示される
- [ ] Harbor Find 通知が必要に応じて巻物内に表示される
- [ ] Drift Ticket 通知が必要に応じて巻物内に表示される
- [ ] 返答表示中は自動で閉じない
- [ ] 返答表示完了後、約7秒で自動的に閉じる
- [ ] Harbor Find / Drift Ticket 通知が追加された場合、最後の通知から約7秒で閉じる
- [ ] 手動で閉じた場合、自動クローズタイマーが解除される
- [ ] 次の返答が始まった場合、前の自動クローズタイマーが解除される

### Harbor Weather

- [ ] 開放済み海域に応じて文言が変わる
- [ ] harbor の文言が表示される
- [ ] silent_water の文言が表示される
- [ ] lighthouse_coast の文言が表示される
- [ ] fog_sea の文言が表示される
- [ ] moonlit_sea の文言が表示される
- [ ] deep_current の文言が表示される
- [ ] unnamed_waters の文言が表示される

### Harbor Find カード

- [ ] 初期状態が Quiet として表示される
- [ ] Checking 状態が表示される
- [ ] Found 状態が表示される
- [ ] 何も届かなかった場合、静かな文言になる
- [ ] 漂着物が届いた場合、内容が表示される
- [ ] カード全体をクリックできる
- [ ] 詳細モーダルが開く
- [ ] 画像が表示される
- [ ] アイテム名が表示される
- [ ] description が表示される
- [ ] origin_text が表示される
- [ ] rarity が表示される
- [ ] area_hint が表示される
- [ ] status が表示される

### Drift Ticket カード

- [ ] 初期状態が Quiet として表示される
- [ ] Checking 状態が表示される
- [ ] Granted 状態が表示される
- [ ] Drift Ticket が届いた場合、カードに反映される
- [ ] カード全体をクリックできる
- [ ] 詳細モーダルが開く
- [ ] チケット説明が表示される
- [ ] duration が表示される
- [ ] status が表示される

---

## `/timeline/` Cabin Log

### 表示

- [ ] イベントカードが表示される
- [ ] 初期表示が5件になっている
- [ ] Read more で全件表示できる
- [ ] Show less で5件表示に戻せる
- [ ] 日付表示が崩れていない

### 画像

- [ ] Harbor Find イベントに漂着物画像が出る
- [ ] Drift Ticket イベントにチケット画像が出る
- [ ] Vessel acquired イベントに船画像が出る
- [ ] Sea Area opened イベントに海図画像が出る
- [ ] image_path がない場合、フォールバック表示になる
- [ ] 壊れた画像でレイアウトが崩れない

### 種別表示

- [ ] harbor_find が漂着物らしい見た目になる
- [ ] ticket_drifted が控えめなチケット表示になる
- [ ] vessel_acquired が船取得として表示される
- [ ] sea_area_opened が海域開放として表示される

---

## `/items/` Harbor Finds

### 基本表示

- [ ] 発見済みアイテムだけが表示される
- [ ] 未発見アイテム名は表示されない
- [ ] 未開放海域は「霧の向こう」として表示される
- [ ] 解放済み海域はアイテム一覧が表示される
- [ ] 画像が表示される
- [ ] 画像クリックで拡大モーダルが開く
- [ ] 背景クリックで閉じる
- [ ] Escapeキーで閉じる

### quantity の扱い

- [ ] `quantity > 0` のアイテムが表示される
- [ ] `quantity = 0` のアイテムも、発見済みとして表示される
- [ ] quantity が現在所持数として表示される
- [ ] first_found_at が保持されている

### 発見数

- [ ] 分母は `area_item_pools` の該当エリア item_key 数である
- [ ] 分子は、その item_key のうち `user_harbor_items` に存在する数である
- [ ] 他エリアのアイテムが現在エリアの発見数に混ざらない
- [ ] `6 / 4` のような不正表示が出ない
- [ ] harbor は最大 `4 / 4` になる
- [ ] moon_shell は Harbor ではなく Moonlit Sea に属する
- [ ] sea_glass は Harbor ではなく Moonlit Sea に属する

### 進捗バー

- [ ] 発見数に応じて進捗バーが変化する
- [ ] 0件でもレイアウトが崩れない
- [ ] 全発見済みでも過剰表示にならない

---

## `/vessels/` 船

### 現在の船

- [ ] 現在の船が表示される
- [ ] 船画像が表示される
- [ ] 船画像拡大モーダルが開く
- [ ] 船詳細モーダルが開く
- [ ] この船で開いた海域が表示される

### 次の船

- [ ] 次の船は取得前なら「霧の向こう」として表示される
- [ ] 必要素材だけ表示される
- [ ] 実名が表示されない
- [ ] 実画像が表示されない
- [ ] Cabin が表示されない
- [ ] 詳細が表示されない
- [ ] `image pending` が表示されない
- [ ] `/images/vessels/vessel-fog.png` が表示される

### 所有済み船

- [ ] 所有済み船は画像・実名・説明を表示する
- [ ] 所有済み船は Cabin を表示する
- [ ] 所有済み船は開放海域を表示する
- [ ] 船コレクションが9隻分表示される

### 未開放船

- [ ] 未開放船は「霧の向こう」として表示される
- [ ] 実画像が出ない
- [ ] vessel_key が出ない
- [ ] Cabin が出ない
- [ ] `image pending` が表示されない
- [ ] `/images/vessels/vessel-fog.png` が表示される

### 霧の向こう画像

- [ ] `/images/vessels/vessel-fog.png` が存在する
- [ ] 直接URLで `/images/vessels/vessel-fog.png` が開ける
- [ ] 次の船カードで霧画像が表示される
- [ ] 未開放船カードで霧画像が表示される
- [ ] 次の船の詳細モーダルで霧画像が表示される
- [ ] 未開放船の詳細モーダルで霧画像が表示される
- [ ] 所有済み船では実画像が表示される
- [ ] 現在の船では実画像が表示される
- [ ] 次の船・未開放船で実名や詳細が見えすぎていない

---

## `/map/` Sea Chart

### 基本表示

- [ ] 海図画像が表示される
- [ ] 海図拡大モーダルが開く
- [ ] 開放済み海域カードが表示される
- [ ] 未開放海域カードが表示される
- [ ] 海域ごとの気配が表示される

### 風景モーダル

- [ ] harbor の風景画像が表示される
- [ ] silent_water の風景画像が表示される
- [ ] lighthouse_coast の風景画像が表示される
- [ ] fog_sea の風景画像が表示される
- [ ] moonlit_sea の風景画像が表示される
- [ ] deep_current の風景画像が表示される
- [ ] unnamed_waters の風景画像が表示される

### 未開放海域

- [ ] 未開放海域をクリックすると霧カードが表示される
- [ ] 未開放海域では風景画像を見せない
- [ ] 「まだ、この海は姿を見せていません」の文言が表示される

---

## `/tickets/`

### 表示

- [ ] Harbor Cat 画像が表示される
- [ ] Drift Ticket 画像が表示される
- [ ] Special Voyage Ticket 画像が表示される
- [ ] Deep Sea Ticket 画像が表示される
- [ ] 統一されたチケットカードUIになっている

### 文言

- [ ] Drift Ticket が販売導線のように見えない
- [ ] Drift Ticket が「流れ着いたもの」として説明されている
- [ ] Special Ticket が10分・20分の2種類として説明されている
- [ ] 15分・30分が表示されていない
- [ ] Deep Sea Ticket が体験として説明されている
- [ ] 内部設計や販売方針が出すぎていない

---

## `/account/`

### チケット概要

- [ ] Drift Ticket 数が表示される
- [ ] Special Ticket 数が表示される
- [ ] Deep Sea Ticket 数が表示される
- [ ] チケット画像が表示される
- [ ] チケット状態が表示される
- [ ] Special Voyage への導線がある

### 状態

- [ ] available のチケットが表示される
- [ ] used のチケットが有効チケットとして扱われない
- [ ] expires_at がある場合、期限切れ表示が正しく動く

---

## `/special-voyage/`

### チケット表示

- [ ] 有効なチケットが表示される
- [ ] 複数チケットが表示される
- [ ] Drift Ticket が表示される
- [ ] Special 10分 Ticket が表示される
- [ ] Special 20分 Ticket が表示される
- [ ] Deep Sea Ticket が表示される
- [ ] チケット種別ごとに入口文言が変わる
- [ ] Drift Ticket を Special Ticket のように見せていない

### 航海開始

- [ ] `ticket_id` を指定して開始できる
- [ ] チケットが `used` になる
- [ ] `used_at` が入る
- [ ] `voyage_sessions` が作成される
- [ ] `session_type` が正しく入る
- [ ] `duration_minutes` が正しく入る
- [ ] `started_at` が入る
- [ ] `ends_at` が入る
- [ ] 航海中画面が表示される

### 航海終了

- [ ] 10分チケットは10分後に終了扱いになる
- [ ] 20分チケットは20分後に終了扱いになる
- [ ] セッションが `expired` になる
- [ ] チケットは `used` のまま保持される
- [ ] 終了後の表示が崩れない

### 航海記録

- [ ] ボタン文言が「航海記録を残す」になっている
- [ ] `special-voyage-reply` に `session_id` を渡している
- [ ] 返答が返る
- [ ] non-2xx が出ない
- [ ] 返答文が Celeste Harbor らしい雰囲気になっている

---

## Special Voyage / Harbor Find 抽選

### ticket_rule 解決

- [ ] `session_type = drift` → `drift`
- [ ] `session_type = special` + `duration_minutes = 10` → `special_10`
- [ ] `session_type = special` + `duration_minutes = 20` → `special_20`
- [ ] `session_type = deep_sea` → `deep_sea`
- [ ] 存在しない `ticket_type` カラムを参照していない

### Drift Ticket

- [ ] 最大1個
- [ ] 取得は確定ではない
- [ ] roll が1行記録される
- [ ] 取得なしでも正常
- [ ] 取得ありなら `user_harbor_items` に付与される

### Special 10分

- [ ] 最大1個
- [ ] 取得は確定ではない
- [ ] roll が1行記録される
- [ ] 取得なしでも正常
- [ ] 取得ありなら `user_harbor_items` に付与される

### Special 20分

- [ ] 最大2個
- [ ] roll が2行記録される
- [ ] grant_index 1 が存在する
- [ ] grant_index 2 が存在する
- [ ] 2個目は低確率
- [ ] 取得なしでも正常
- [ ] 取得ありなら `user_harbor_items` に付与される

### Deep Sea Ticket

- [ ] 最大2個
- [ ] roll が2行記録される
- [ ] Deep Sea 系アイテムの抽選率が高い
- [ ] abyss_note が抽選対象に入る
- [ ] deep_blue_pearl が抽選対象に入る
- [ ] sunken_star が抽選対象に入る
- [ ] 複数取得が可能
- [ ] 取得ありなら `user_harbor_items` に付与される

---

## 1セッション1回抽選

### 基本

- [ ] 同じ `voyage_session` で初回のみ抽選される
- [ ] 2回目以降は既存の `voyage_session_find_rolls` を再利用する
- [ ] 2回目以降に新しいrollが増えない
- [ ] 2回目以降に `user_harbor_items` が二重付与されない

### 表示

- [ ] 初回は「見つかりました」と表示される
- [ ] 2回目以降は「すでに船に収められています」と表示される
- [ ] 既存の漂着物は再表示される
- [ ] 新しく見つかったような表現になっていない

---

## `voyage_session_find_rolls`

### 保存

- [ ] `user_id` が入る
- [ ] `session_id` が入る
- [ ] `grant_index` が入る
- [ ] `ticket_rule` が入る
- [ ] `roll_passed` が入る
- [ ] `found` が入る
- [ ] `result` がJSONで入る
- [ ] `created_at` が入る

### result

`result` に以下が入ること。

- [ ] `found`
- [ ] `roll_passed`
- [ ] `roll_value`
- [ ] `grant_index`
- [ ] `ticket_rule`
- [ ] `item`

### エラー回避

- [ ] `user_id` null で失敗しない
- [ ] 存在しない `voyage_replies` に書き込まない
- [ ] insert 失敗時にログが出る
- [ ] 失敗しても画面が過剰に壊れない

---

## `user_harbor_items`

### 付与

- [ ] 未所持なら insert される
- [ ] 所持済みなら quantity が +1 される
- [ ] `first_found_at` が入る
- [ ] `updated_at` が更新される
- [ ] `unique(user_id, item_key)` が機能している

### 再利用時

- [ ] 既存roll再利用時に再付与されない
- [ ] quantity が不自然に増えない
- [ ] 同じ航海で複数回記録しても、付与は初回だけ

---

## Special Voyage 漂着物プール

以下がすべて `harbor_items` に存在すること。

- [ ] `moon_shell`
- [ ] `driftwood`
- [ ] `sea_glass`
- [ ] `lighthouse_shard`
- [ ] `fog_compass`
- [ ] `quiet_chart`
- [ ] `deep_blue_pearl`
- [ ] `sunken_star`
- [ ] `abyss_note`

以下がすべて `area_item_pools` に登録されていること。

- [ ] `moon_shell` → `moonlit_sea`
- [ ] `driftwood` → `harbor`
- [ ] `sea_glass` → `moonlit_sea`
- [ ] `lighthouse_shard` → `lighthouse_coast`
- [ ] `fog_compass` → `fog_sea`
- [ ] `quiet_chart` → `fog_sea`
- [ ] `deep_blue_pearl` → `deep_current`
- [ ] `sunken_star` → `deep_current`
- [ ] `abyss_note` → `deep_current`

---

## Special Voyage 漂着物画像

以下のファイルが存在すること。

- [ ] `/images/items/moon-shell.png`
- [ ] `/images/items/driftwood.png`
- [ ] `/images/items/sea-glass.png`
- [ ] `/images/items/lighthouse-shard.png`
- [ ] `/images/items/fog-compass.png`
- [ ] `/images/items/quiet-chart.png`
- [ ] `/images/items/deep-blue-pearl.png`
- [ ] `/images/items/sunken-star.png`
- [ ] `/images/items/abyss-note.png`

以下の `image_path` がDBに設定されていること。

- [ ] `moon_shell` → `/images/items/moon-shell.png`
- [ ] `driftwood` → `/images/items/driftwood.png`
- [ ] `sea_glass` → `/images/items/sea-glass.png`
- [ ] `lighthouse_shard` → `/images/items/lighthouse-shard.png`
- [ ] `fog_compass` → `/images/items/fog-compass.png`
- [ ] `quiet_chart` → `/images/items/quiet-chart.png`
- [ ] `deep_blue_pearl` → `/images/items/deep-blue-pearl.png`
- [ ] `sunken_star` → `/images/items/sunken-star.png`
- [ ] `abyss_note` → `/images/items/abyss-note.png`

---

## item_key 統一

### driftwood

- [ ] `small_driftwood` を使っていない
- [ ] 抽選コードでは `driftwood` を使っている
- [ ] `driftwood` は `harbor_items` に存在する
- [ ] `driftwood` は `area_item_pools` の `harbor` に登録されている
- [ ] `driftwood` に画像がある

### sea_glass

- [ ] `sea_glass` は `harbor_items` に存在する
- [ ] `sea_glass` は `area_item_pools` の `moonlit_sea` に登録されている
- [ ] `sea_glass` に画像がある

### moon_shell

- [ ] `moon_shell` は `harbor_items` に存在する
- [ ] `moon_shell` は `area_item_pools` の `moonlit_sea` に登録されている
- [ ] `moon_shell` に画像がある
- [ ] 月光の海が未開放の場合、`/items/` に表示されなくても正常

---

## 画像表示

### `/items/`

- [ ] 発見済みアイテム画像が表示される
- [ ] 画像がない場合、image pending 表示になる
- [ ] 画像ファイル追加後、Ctrl+F5 で反映される
- [ ] 未開放海域のアイテムは表示されない
- [ ] image_path と実ファイル名が一致している

### `/log/`

- [ ] HARBOR FIND 詳細モーダルで画像が出る
- [ ] HARBOR FIND 詳細モーダルで rarity が出る
- [ ] HARBOR FIND 詳細モーダルで area_hint が出る
- [ ] DRIFT TICKET 詳細モーダルが出る

### `/special-voyage/`

- [ ] HARBOR FIND 報酬カードで画像が出る
- [ ] HARBOR FIND 報酬カードで詳細が出る
- [ ] DRIFT TICKET 報酬カードで詳細が出る

### `/vessels/`

- [ ] 所有済み船画像が表示される
- [ ] 現在の船画像が表示される
- [ ] 次の船で霧画像が表示される
- [ ] 未開放船で霧画像が表示される
- [ ] 次の船・未開放船で `image pending` が出ない

---

## Supabase 確認SQL

### Special Voyage 漂着物プール確認

```sql
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

 全 item_key が存在する
 全 image_path が入っている
 全 area_key が入っている
最新 Special Voyage セッション確認
select
  id,
  user_id,
  ticket_id,
  session_type,
  status,
  duration_minutes,
  started_at,
  ends_at,
  created_at
from voyage_sessions
order by created_at desc
limit 10;

確認項目：

 session_type が正しい
 duration_minutes が正しい
 status が正しい
 ends_at が正しい
Special Voyage roll 確認
select
  id,
  user_id,
  session_id,
  grant_index,
  ticket_rule,
  roll_passed,
  found,
  result,
  created_at
from voyage_session_find_rolls
order by created_at desc
limit 20;

確認項目：

 ticket_rule が正しい
 grant_index が正しい
 result に roll_value が入っている
 item が正しい
 同一セッションで不要に増えていない
所持アイテム確認
select
  uhi.user_id,
  uhi.item_key,
  hi.name_ja,
  uhi.quantity,
  uhi.first_found_at,
  uhi.updated_at
from user_harbor_items uhi
join harbor_items hi
  on hi.item_key = uhi.item_key
where uhi.user_id = 'USER_ID_HERE'
order by uhi.updated_at desc;

確認項目：

 取得アイテムが追加されている
 所持済みなら quantity が増えている
 quantity = 0 でも行が残っている
エリア別 item pool 確認
select
  area_key,
  item_key
from area_item_pools
order by area_key, item_key;

確認項目：

 Harbor の item_key が正しい
 Moonlit Sea の item_key が正しい
 Deep Current の item_key が正しい
 Fog Sea の item_key が正しい
 Lighthouse Coast の item_key が正しい
回帰確認セット

大きな変更後は、以下を確認します。

最小セット
 /log/ で航海記録を残す
 Harbor Cat が返る
 Harbor Cat が約7秒後に自動で閉じる
 Harbor Find カードが崩れない
 Drift Ticket カードが崩れない
 /items/ が表示される
 /vessels/ が表示される
 /special-voyage/ が開く
 /account/ が開く
Special Voyage セット
 テスト用チケットを付与する
 /special-voyage/ に表示される
 航海開始できる
 航海記録を残せる
 non-2xx が出ない
 voyage_session_find_rolls に記録される
 user_harbor_items に付与される
 2回目以降にrollが増えない
画像セット
 /items/ で画像が出る
 /log/ の詳細モーダルで画像が出る
 /timeline/ で画像が出る
 /special-voyage/ の報酬詳細で画像が出る
 /vessels/ の次の船で霧画像が出る
 /vessels/ の未開放船で霧画像が出る
デプロイ後確認

デプロイ後に見ること：

 ブラウザで Ctrl+F5
 画像パスが反映されている
 古いJSがキャッシュされていない
 console に ReferenceError が出ていない
 Edge Function non-2xx が出ていない
 Supabase Logs に fatal が出ていない

よく見るエラー：

extractHarborFindNotices is not defined
session_id_required
null value in column "user_id"
relation "voyage_replies" does not exist
Edge Function returned a non-2xx status code
メモ

点検は、機能を増やすためではなく、静けさを壊さないために行う。

Celeste Harbor は、便利な管理画面ではなく、航海の記録が静かに積もる港であること。

船は、まだ進んでいる。
---

## 基本方針

Celeste Harbor は、静かな航海を続けるための個人的な港です。

点検時の基本方針：

- 便利にしすぎない
- 報酬ゲームに寄せすぎない
- 管理画面にしすぎない
- 未開放のものは見せすぎない
- 取得済み・発見済みのものは静かに確認できるようにする
- 画像は体験を補助するが、主役にしすぎない
- 内部確率や保証はユーザーに直接見せすぎない

---

## 公開ページ

### `/`

- [ ] Googleログインが表示される
- [ ] Aboutリンクが表示される
- [ ] 内部ページへの不要な導線が出ていない
- [ ] ログイン済みユーザーが適切に `/log/` へ進める

### `/about/`

- [ ] Celeste Harbor の説明が表示される
- [ ] Harbor Cat の説明が表示される
- [ ] Presence AI の説明が表示される
- [ ] 公開ページとしてログイン不要で閲覧できる

### `/voyage/`

- [ ] Moonlit Voyage の公開案内が表示される
- [ ] 書籍・改訂版に関する案内が表示される
- [ ] ログイン不要で閲覧できる

---

## 認証・ルート保護

### ログイン必須ページ

以下がログイン必須になっていること。

- [ ] `/log/`
- [ ] `/timeline/`
- [ ] `/items/`
- [ ] `/vessels/`
- [ ] `/map/`
- [ ] `/account/`
- [ ] `/tickets/`
- [ ] `/special-voyage/`
- [ ] `/fragments/`
- [ ] `/archive/`
- [ ] `/harbor/`

### 未ログイン時

- [ ] 未ログインで内部ページを開くと `/` へ戻る
- [ ] `body.auth-locked .wrap { visibility:hidden; }` が機能している
- [ ] 一瞬だけ内部ページが見える状態になっていない

### ログアウト

- [ ] 内部ページのヘッダーにログアウトがある
- [ ] 本文内に不要なログアウトボタンが残っていない
- [ ] ログアウト後は `/` へ戻る
- [ ] `logoutLink` の処理が正常に動く

---

## 共通ヘッダー

内部ページのヘッダーに以下があること。

- [ ] Voyage Log
- [ ] Cabin Log
- [ ] Items
- [ ] Vessels
- [ ] Map
- [ ] Tickets
- [ ] Account
- [ ] ログアウト

対象ページ：

- [ ] `/log/`
- [ ] `/timeline/`
- [ ] `/items/`
- [ ] `/vessels/`
- [ ] `/map/`
- [ ] `/tickets/`
- [ ] `/account/`
- [ ] `/special-voyage/`
- [ ] `/fragments/`
- [ ] `/archive/`

---

## `/log/` Voyage Log

### 基本動作

- [ ] 航海記録を書ける
- [ ] 保存ボタンが「航海記録を残す」になっている
- [ ] 保存後に Harbor Cat の応答が返る
- [ ] Recent Logs に保存内容が反映される
- [ ] エラー時に画面が崩れない

### Harbor Cat

- [ ] Harbor Cat の巻物が表示される
- [ ] 応答が診断・助言・評価になりすぎていない
- [ ] 短く静かな Presence として表示される
- [ ] Harbor Find 通知が必要に応じて巻物内に表示される
- [ ] Drift Ticket 通知が必要に応じて巻物内に表示される

### Harbor Weather

- [ ] 開放済み海域に応じて文言が変わる
- [ ] harbor の文言が表示される
- [ ] silent_water の文言が表示される
- [ ] lighthouse_coast の文言が表示される
- [ ] fog_sea の文言が表示される
- [ ] moonlit_sea の文言が表示される
- [ ] deep_current の文言が表示される
- [ ] unnamed_waters の文言が表示される

### Harbor Find カード

- [ ] 初期状態が Quiet として表示される
- [ ] Checking 状態が表示される
- [ ] Found 状態が表示される
- [ ] 何も届かなかった場合、静かな文言になる
- [ ] 漂着物が届いた場合、内容が表示される
- [ ] カード全体をクリックできる
- [ ] 詳細モーダルが開く
- [ ] 画像が表示される
- [ ] アイテム名が表示される
- [ ] description が表示される
- [ ] origin_text が表示される
- [ ] rarity が表示される
- [ ] area_hint が表示される
- [ ] status が表示される

### Drift Ticket カード

- [ ] 初期状態が Quiet として表示される
- [ ] Checking 状態が表示される
- [ ] Granted 状態が表示される
- [ ] Drift Ticket が届いた場合、カードに反映される
- [ ] カード全体をクリックできる
- [ ] 詳細モーダルが開く
- [ ] チケット説明が表示される
- [ ] duration が表示される
- [ ] status が表示される

---

## `/timeline/` Cabin Log

### 表示

- [ ] イベントカードが表示される
- [ ] 初期表示が5件になっている
- [ ] Read more で全件表示できる
- [ ] Show less で5件表示に戻せる
- [ ] 日付表示が崩れていない

### 画像

- [ ] Harbor Find イベントに漂着物画像が出る
- [ ] Drift Ticket イベントにチケット画像が出る
- [ ] Vessel acquired イベントに船画像が出る
- [ ] Sea Area opened イベントに海図画像が出る
- [ ] image_path がない場合、フォールバック表示になる
- [ ] 壊れた画像でレイアウトが崩れない

### 種別表示

- [ ] harbor_find が漂着物らしい見た目になる
- [ ] ticket_drifted が控えめなチケット表示になる
- [ ] vessel_acquired が船取得として表示される
- [ ] sea_area_opened が海域開放として表示される

---

## `/items/` Harbor Finds

### 基本表示

- [ ] 発見済みアイテムだけが表示される
- [ ] 未発見アイテム名は表示されない
- [ ] 未開放海域は「霧の向こう」として表示される
- [ ] 解放済み海域はアイテム一覧が表示される
- [ ] 画像が表示される
- [ ] 画像クリックで拡大モーダルが開く
- [ ] 背景クリックで閉じる
- [ ] Escapeキーで閉じる

### quantity の扱い

- [ ] `quantity > 0` のアイテムが表示される
- [ ] `quantity = 0` のアイテムも、発見済みとして表示される
- [ ] quantity が現在所持数として表示される
- [ ] first_found_at が保持されている

### 発見数

- [ ] 分母は `area_item_pools` の該当エリア item_key 数である
- [ ] 分子は、その item_key のうち `user_harbor_items` に存在する数である
- [ ] 他エリアのアイテムが現在エリアの発見数に混ざらない
- [ ] `6 / 4` のような不正表示が出ない
- [ ] harbor は最大 `4 / 4` になる
- [ ] moon_shell は Harbor ではなく Moonlit Sea に属する
- [ ] sea_glass は Harbor ではなく Moonlit Sea に属する

### 進捗バー

- [ ] 発見数に応じて進捗バーが変化する
- [ ] 0件でもレイアウトが崩れない
- [ ] 全発見済みでも過剰表示にならない

---

## `/vessels/` 船

### 現在の船

- [ ] 現在の船が表示される
- [ ] 船画像が表示される
- [ ] 船画像拡大モーダルが開く
- [ ] 船詳細モーダルが開く
- [ ] この船で開いた海域が表示される

### 次の船

- [ ] 次の船は取得前なら「霧の向こう」として表示される
- [ ] 必要素材だけ表示される
- [ ] 実名が表示されない
- [ ] 画像が表示されない
- [ ] Cabin が表示されない
- [ ] 詳細が表示されない

### 所有済み船

- [ ] 所有済み船は画像・実名・説明を表示する
- [ ] 所有済み船は Cabin を表示する
- [ ] 所有済み船は開放海域を表示する
- [ ] 船コレクションが9隻分表示される

### 未開放船

- [ ] 未開放船は「霧の向こう」として表示される
- [ ] 実画像が出ない
- [ ] vessel_key が出ない
- [ ] Cabin が出ない

---

## `/map/` Sea Chart

### 基本表示

- [ ] 海図画像が表示される
- [ ] 海図拡大モーダルが開く
- [ ] 開放済み海域カードが表示される
- [ ] 未開放海域カードが表示される
- [ ] 海域ごとの気配が表示される

### 風景モーダル

- [ ] harbor の風景画像が表示される
- [ ] silent_water の風景画像が表示される
- [ ] lighthouse_coast の風景画像が表示される
- [ ] fog_sea の風景画像が表示される
- [ ] moonlit_sea の風景画像が表示される
- [ ] deep_current の風景画像が表示される
- [ ] unnamed_waters の風景画像が表示される

### 未開放海域

- [ ] 未開放海域をクリックすると霧カードが表示される
- [ ] 未開放海域では風景画像を見せない
- [ ] 「まだ、この海は姿を見せていません」の文言が表示される

---

## `/tickets/`

### 表示

- [ ] Harbor Cat 画像が表示される
- [ ] Drift Ticket 画像が表示される
- [ ] Special Voyage Ticket 画像が表示される
- [ ] Deep Sea Ticket 画像が表示される
- [ ] 統一されたチケットカードUIになっている

### 文言

- [ ] Drift Ticket が販売導線のように見えない
- [ ] Drift Ticket が「流れ着いたもの」として説明されている
- [ ] Special Ticket が10分・20分の2種類として説明されている
- [ ] 15分・30分が表示されていない
- [ ] Deep Sea Ticket が体験として説明されている
- [ ] 内部設計や販売方針が出すぎていない

---

## `/account/`

### チケット概要

- [ ] Drift Ticket 数が表示される
- [ ] Special Ticket 数が表示される
- [ ] Deep Sea Ticket 数が表示される
- [ ] チケット画像が表示される
- [ ] チケット状態が表示される
- [ ] Special Voyage への導線がある

### 状態

- [ ] available のチケットが表示される
- [ ] used のチケットが有効チケットとして扱われない
- [ ] expires_at がある場合、期限切れ表示が正しく動く

---

## `/special-voyage/`

### チケット表示

- [ ] 有効なチケットが表示される
- [ ] 複数チケットが表示される
- [ ] Drift Ticket が表示される
- [ ] Special 10分 Ticket が表示される
- [ ] Special 20分 Ticket が表示される
- [ ] Deep Sea Ticket が表示される
- [ ] チケット種別ごとに入口文言が変わる
- [ ] Drift Ticket を Special Ticket のように見せていない

### 航海開始

- [ ] `ticket_id` を指定して開始できる
- [ ] チケットが `used` になる
- [ ] `used_at` が入る
- [ ] `voyage_sessions` が作成される
- [ ] `session_type` が正しく入る
- [ ] `duration_minutes` が正しく入る
- [ ] `started_at` が入る
- [ ] `ends_at` が入る
- [ ] 航海中画面が表示される

### 航海終了

- [ ] 10分チケットは10分後に終了扱いになる
- [ ] 20分チケットは20分後に終了扱いになる
- [ ] セッションが `expired` になる
- [ ] チケットは `used` のまま保持される
- [ ] 終了後の表示が崩れない

### 航海記録

- [ ] ボタン文言が「航海記録を残す」になっている
- [ ] `special-voyage-reply` に `session_id` を渡している
- [ ] 返答が返る
- [ ] non-2xx が出ない
- [ ] 返答文が Celeste Harbor らしい雰囲気になっている

---

## Special Voyage / Harbor Find 抽選

### ticket_rule 解決

- [ ] `session_type = drift` → `drift`
- [ ] `session_type = special` + `duration_minutes = 10` → `special_10`
- [ ] `session_type = special` + `duration_minutes = 20` → `special_20`
- [ ] `session_type = deep_sea` → `deep_sea`
- [ ] 存在しない `ticket_type` カラムを参照していない

### Drift Ticket

- [ ] 最大1個
- [ ] 取得は確定ではない
- [ ] roll が1行記録される
- [ ] 取得なしでも正常
- [ ] 取得ありなら `user_harbor_items` に付与される

### Special 10分

- [ ] 最大1個
- [ ] 取得は確定ではない
- [ ] roll が1行記録される
- [ ] 取得なしでも正常
- [ ] 取得ありなら `user_harbor_items` に付与される

### Special 20分

- [ ] 最大2個
- [ ] roll が2行記録される
- [ ] grant_index 1 が存在する
- [ ] grant_index 2 が存在する
- [ ] 2個目は低確率
- [ ] 取得なしでも正常
- [ ] 取得ありなら `user_harbor_items` に付与される

### Deep Sea Ticket

- [ ] 最大2個
- [ ] roll が2行記録される
- [ ] Deep Sea 系アイテムの抽選率が高い
- [ ] abyss_note が抽選対象に入る
- [ ] deep_blue_pearl が抽選対象に入る
- [ ] sunken_star が抽選対象に入る
- [ ] 複数取得が可能
- [ ] 取得ありなら `user_harbor_items` に付与される

---

## 1セッション1回抽選

### 基本

- [ ] 同じ `voyage_session` で初回のみ抽選される
- [ ] 2回目以降は既存の `voyage_session_find_rolls` を再利用する
- [ ] 2回目以降に新しいrollが増えない
- [ ] 2回目以降に `user_harbor_items` が二重付与されない

### 表示

- [ ] 初回は「見つかりました」と表示される
- [ ] 2回目以降は「すでに船に収められています」と表示される
- [ ] 既存の漂着物は再表示される
- [ ] 新しく見つかったような表現になっていない

---

## `voyage_session_find_rolls`

### 保存

- [ ] `user_id` が入る
- [ ] `session_id` が入る
- [ ] `grant_index` が入る
- [ ] `ticket_rule` が入る
- [ ] `roll_passed` が入る
- [ ] `found` が入る
- [ ] `result` がJSONで入る
- [ ] `created_at` が入る

### result

`result` に以下が入ること。

- [ ] `found`
- [ ] `roll_passed`
- [ ] `roll_value`
- [ ] `grant_index`
- [ ] `ticket_rule`
- [ ] `item`

### エラー回避

- [ ] `user_id` null で失敗しない
- [ ] 存在しない `voyage_replies` に書き込まない
- [ ] insert 失敗時にログが出る
- [ ] 失敗しても画面が過剰に壊れない

---

## `user_harbor_items`

### 付与

- [ ] 未所持なら insert される
- [ ] 所持済みなら quantity が +1 される
- [ ] `first_found_at` が入る
- [ ] `updated_at` が更新される
- [ ] `unique(user_id, item_key)` が機能している

### 再利用時

- [ ] 既存roll再利用時に再付与されない
- [ ] quantity が不自然に増えない
- [ ] 同じ航海で複数回記録しても、付与は初回だけ

---

## Special Voyage 漂着物プール

以下がすべて `harbor_items` に存在すること。

- [ ] `moon_shell`
- [ ] `driftwood`
- [ ] `sea_glass`
- [ ] `lighthouse_shard`
- [ ] `fog_compass`
- [ ] `quiet_chart`
- [ ] `deep_blue_pearl`
- [ ] `sunken_star`
- [ ] `abyss_note`

以下がすべて `area_item_pools` に登録されていること。

- [ ] `moon_shell` → `moonlit_sea`
- [ ] `driftwood` → `harbor`
- [ ] `sea_glass` → `moonlit_sea`
- [ ] `lighthouse_shard` → `lighthouse_coast`
- [ ] `fog_compass` → `fog_sea`
- [ ] `quiet_chart` → `fog_sea`
- [ ] `deep_blue_pearl` → `deep_current`
- [ ] `sunken_star` → `deep_current`
- [ ] `abyss_note` → `deep_current`

---

## Special Voyage 漂着物画像

以下のファイルが存在すること。

- [ ] `/images/items/moon-shell.png`
- [ ] `/images/items/driftwood.png`
- [ ] `/images/items/sea-glass.png`
- [ ] `/images/items/lighthouse-shard.png`
- [ ] `/images/items/fog-compass.png`
- [ ] `/images/items/quiet-chart.png`
- [ ] `/images/items/deep-blue-pearl.png`
- [ ] `/images/items/sunken-star.png`
- [ ] `/images/items/abyss-note.png`

以下の `image_path` がDBに設定されていること。

- [ ] `moon_shell` → `/images/items/moon-shell.png`
- [ ] `driftwood` → `/images/items/driftwood.png`
- [ ] `sea_glass` → `/images/items/sea-glass.png`
- [ ] `lighthouse_shard` → `/images/items/lighthouse-shard.png`
- [ ] `fog_compass` → `/images/items/fog-compass.png`
- [ ] `quiet_chart` → `/images/items/quiet-chart.png`
- [ ] `deep_blue_pearl` → `/images/items/deep-blue-pearl.png`
- [ ] `sunken_star` → `/images/items/sunken-star.png`
- [ ] `abyss_note` → `/images/items/abyss-note.png`

---

## item_key 統一

### driftwood

- [ ] `small_driftwood` を使っていない
- [ ] 抽選コードでは `driftwood` を使っている
- [ ] `driftwood` は `harbor_items` に存在する
- [ ] `driftwood` は `area_item_pools` の `harbor` に登録されている
- [ ] `driftwood` に画像がある

### sea_glass

- [ ] `sea_glass` は `harbor_items` に存在する
- [ ] `sea_glass` は `area_item_pools` の `moonlit_sea` に登録されている
- [ ] `sea_glass` に画像がある

### moon_shell

- [ ] `moon_shell` は `harbor_items` に存在する
- [ ] `moon_shell` は `area_item_pools` の `moonlit_sea` に登録されている
- [ ] `moon_shell` に画像がある
- [ ] 月光の海が未開放の場合、`/items/` に表示されなくても正常

---

## 画像表示

### `/items/`

- [ ] 発見済みアイテム画像が表示される
- [ ] 画像がない場合、image pending 表示になる
- [ ] 画像ファイル追加後、Ctrl+F5 で反映される
- [ ] 未開放海域のアイテムは表示されない
- [ ] image_path と実ファイル名が一致している

### `/log/`

- [ ] HARBOR FIND 詳細モーダルで画像が出る
- [ ] HARBOR FIND 詳細モーダルで rarity が出る
- [ ] HARBOR FIND 詳細モーダルで area_hint が出る
- [ ] DRIFT TICKET 詳細モーダルが出る

### `/special-voyage/`

- [ ] HARBOR FIND 報酬カードで画像が出る
- [ ] HARBOR FIND 報酬カードで詳細が出る
- [ ] DRIFT TICKET 報酬カードで詳細が出る

---

## Supabase 確認SQL

### Special Voyage 漂着物プール確認

```sql
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

 全 item_key が存在する
 全 image_path が入っている
 全 area_key が入っている
最新 Special Voyage セッション確認
select
  id,
  user_id,
  ticket_id,
  session_type,
  status,
  duration_minutes,
  started_at,
  ends_at,
  created_at
from voyage_sessions
order by created_at desc
limit 10;

確認項目：

 session_type が正しい
 duration_minutes が正しい
 status が正しい
 ends_at が正しい
Special Voyage roll 確認
select
  id,
  user_id,
  session_id,
  grant_index,
  ticket_rule,
  roll_passed,
  found,
  result,
  created_at
from voyage_session_find_rolls
order by created_at desc
limit 20;

確認項目：

 ticket_rule が正しい
 grant_index が正しい
 result に roll_value が入っている
 item が正しい
 同一セッションで不要に増えていない
所持アイテム確認
select
  uhi.user_id,
  uhi.item_key,
  hi.name_ja,
  uhi.quantity,
  uhi.first_found_at,
  uhi.updated_at
from user_harbor_items uhi
join harbor_items hi
  on hi.item_key = uhi.item_key
where uhi.user_id = 'USER_ID_HERE'
order by uhi.updated_at desc;

確認項目：

 取得アイテムが追加されている
 所持済みなら quantity が増えている
 quantity = 0 でも行が残っている
エリア別 item pool 確認
select
  area_key,
  item_key
from area_item_pools
order by area_key, item_key;

確認項目：

 Harbor の item_key が正しい
 Moonlit Sea の item_key が正しい
 Deep Current の item_key が正しい
 Fog Sea の item_key が正しい
 Lighthouse Coast の item_key が正しい
回帰確認セット

大きな変更後は、以下を確認します。

最小セット
 /log/ で航海記録を残す
 Harbor Cat が返る
 Harbor Find カードが崩れない
 Drift Ticket カードが崩れない
 /items/ が表示される
 /special-voyage/ が開く
 /account/ が開く
Special Voyage セット
 テスト用チケットを付与する
 /special-voyage/ に表示される
 航海開始できる
 航海記録を残せる
 non-2xx が出ない
 voyage_session_find_rolls に記録される
 user_harbor_items に付与される
 2回目以降にrollが増えない
画像セット
 /items/ で画像が出る
 /log/ の詳細モーダルで画像が出る
 /timeline/ で画像が出る
 /special-voyage/ の報酬詳細で画像が出る
デプロイ後確認

デプロイ後に見ること：

 ブラウザで Ctrl+F5
 画像パスが反映されている
 古いJSがキャッシュされていない
 console に ReferenceError が出ていない
 Edge Function non-2xx が出ていない
 Supabase Logs に fatal が出ていない

よく見るエラー：

extractHarborFindNotices is not defined
session_id_required
null value in column "user_id"
relation "voyage_replies" does not exist
Edge Function returned a non-2xx status code
メモ

点検は、機能を増やすためではなく、静けさを壊さないために行う。

Celeste Harbor は、便利な管理画面ではなく、航海の記録が静かに積もる港であること。

船は、まだ進んでいる。
