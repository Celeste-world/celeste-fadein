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
未ログイン時は /
ログイン済みは /log/
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
未開放海域は 霧の向こう として表示。
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
未開放船は 霧の向こう として表示。
次の船も、取得前は 霧の向こう として表示。
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
2026-05-17 時点の主要完成状態
/log/
  記録、Harbor Cat、Harbor Find、Drift Ticket、海域連動Weather

/timeline/
  画像付きイベントカード、Read more

/items/
  海域別表示、発見数、画像モーダル

/vessels/
  船詳細モーダル、船と海域の対応、霧表示統一

/map/
  海域の気配、風景モーダル、霧カード

/tickets/
  3種チケット説明と画像

/account/
  所持チケット確認

/special-voyage/
  チケット種別ごとの入口
今後の候補
/special-voyage/ の実機動作確認
/map/ のスマホ表示微調整
/vessels/ の船詳細モーダルの見た目調整
船取得Timelineの演出強化
Deep Sea Ticket の実際の挙動実装
有料 Special Voyage Ticket 実装
DB schema backup 作成
development changelog の継続更新
optional sound の再検討
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
