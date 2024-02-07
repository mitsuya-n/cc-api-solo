# 目次
- [API概要](#API概要)
- [使用方法](#使用方法)
  - [リポジトリのクローン](#### "1.リポジトリのクローン")
- [DB設計](#DB設計)
- [エンドポイント](#エンドポイント)
- [テスト実行](#テスト実行)

# cc-api-solo
My first solo project!!

# API概要
このAPIでは買い物リストを作ることができ、購入した商品はリストから削除することができます</br>
これを使えば外出時の買い忘れはなくなるでしょう！

# 使用方法
#### 1.リポジトリのクローン</br>
```
git clone https://github.com/mitsuya-n/cc-api-solo.git
```

#### 2.依存関係のインストール
```
npm install
```

#### 3.マイグレーションの実行
```
npm migrate
npm seed
```

#### 4.サーバーへの接続
```
npm  dev
```

# DB設計
- DB：shopping_lists
- テーブル：shopping_list
- テーブル詳細
  | カラム名 | タイプ | キー |
  ----|----|----
  | id | increments | 〇 |
  | item | character |  |
  | id | integer |  |

# エンドポイント
- `GET /api/shopping-lists`</br>
  成功：ステータス200、失敗：ステータス500</br>
  最新の買い物リストを取得することができる</br>
  
- `POST /api/shopping-lists`</br>
  成功：ステータス201、失敗：ステータス500</br>
  買い物リストに商品、数量を追加することができる</br>
  リクエスト時のボディに`item`と`quantity`が必要！</br>
  
- `PATCH /api/shopping-lists/:id`</br>
  成功：ステータス200、失敗：ステータス500</br>
  リクエスト時に指定した商品の`item`または`quantity`を修正することができる</br>
  以下3通りのリクエストが可能！</br>
  ①ボディに`item`だけを指定</br>
  ③ボディに`quantity`だけを指定</br>
  ③ボディに`item`と`quantity`を指定</br>
- `DELETE /api/shopping-lists/:id`</br>
  成功：ステータス200、対象商品がない：ステータス404、失敗：ステータス500</br>
  リクエスト時に指定した`id`の商品をリストから削除することができる</br>

# テスト実行
`npm run test`</br>
※コマンドを実行した後`ctrl+c`にてサーバーを停止する必要があります
