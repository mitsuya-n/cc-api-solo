# 目次
- [API概要](#API概要)
- [使用方法](#使用方法)
- [DB設計](#DB設計)
- [エンドポイント](#エンドポイント)
- [テスト実行](#テスト実行)

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

#### 3.データベースの作成
postgresを起動した状態で以下コマンドを実行
```
create database shopping_lists;
```

#### 4.マイグレーション、シードの実行
```
npm run migrate
npm run seed
```

#### 5.サーバーへの接続
```
npm run dev
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
### GET /api/shopping-lists</br>
最新の買い物リストを返します</br>
（成功：ステータス200、失敗：ステータス500）</br>
  
### POST /api/shopping-lists</br>
買い物リストにリクエストボディに指定された商品、数量を登録します</br>
（成功：ステータス201、失敗：ステータス500）</br>
リクエスト時のボディは以下のように指定します</br>
```
{
    "item": 商品名,
    "quantity": 数量
}
```
  
### PATCH /api/shopping-lists/:id</br>
指定されたIDの商品をリクエストボディの内容で更新します
（成功：ステータス200、失敗：ステータス500）</br>
リクエスト時のボディは以下のように指定します</br>
＜商品名のみ修正したい場合＞
```
{
    "item": 商品名
}
```
＜数量のみ修正したい場合＞
```
{
    "quantity": 数量
}
```
＜商品名、数量の両方を修正したい場合＞
```
{
    "item": 商品名,
    "quantity": 数量
}
```

### DELETE /api/shopping-lists/:id</br>
指定されたIDの商品を削除します</br>
（成功：ステータス200、対象商品がない：ステータス404、失敗：ステータス500）</br>

# テスト実行
`npm run test`</br>
※コマンドを実行した後`ctrl+c`にてサーバーを停止する必要があります
