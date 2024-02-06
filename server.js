const express = require("express");
const db = require("./db/db");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// テーブルイメージ
// const shoppingList = [
//   { id: 1, item: "食パン", quantity: 3 },
//   { id: 2, item: "牛乳", quantity: 1 },
// ];

// 最新の買い物リストを取得（GET）
app.get("/api/shopping-lists", async (req, res) => {
  try {
    // 成功の場合はステータス200を返す
    // patchでid順ではなくなる可能性があるため、GETの際にidでソート
    const shoppingLists = await db
      .select("*")
      .from("shopping_list")
      .orderBy("id");
    res.status(200).json(shoppingLists);
  } catch {
    // 失敗した場合はステータス500を返す
    res.status(500).json({ error: "request failed" });
  }
});

// 買い物リストに商品を追加（POST）
app.post("/api/shopping-lists", async (req, res) => {
  const { item, quantity } = req.body;
  try {
    // 成功の場合はステータス201を返し、配列の先頭に追加
    const newItem = await db("shopping_list").insert({ item, quantity }, [
      "item",
      "quantity",
    ]);
    res.status(201).json(newItem[0]);
  } catch {
    res.status(500).json({ error: "request failed" });
  }
});
// 買い物リストの一部を修正（PATCH）
// itemだけ修正、quantityだけ修正、両方を修正→3つのメソッドが必要？
app.patch("/api/shopping-lists/:id", async (req, res) => {
  const { id } = req.params;
  const { item, quantity } = req.body;
  try {
    // 後から代入するからlet
    let updateItem = {};
    // itemの有無を確認
    if (item) {
      updateItem.item = item;
    }
    // quantityの有無を確認
    if (quantity) {
      updateItem.quantity = quantity;
    }

    // updateItemを使ってupdate
    const updatedItem = await db("shopping_list")
      .where({ id })
      .update(updateItem, ["id", "item", "quantity"]);
    res.status(200).json(updatedItem[0]);
  } catch {
    res.status(500).json({ error: "request failed" });
  }
});

// 購入済みのアイテムを買い物リストから削除（DELETE）
app.delete("/api/shopping-lists/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // 削除対象が見つかったか判断するため、カウントする
    const delCount = await db("shopping_list").where({ id }).delete();

    if (delCount > 0) {
      // カウントできているため、成功を返す
      res.status(200).json({ success: true, message: "request successfull!!" });
    } else {
      // カウントできていないため、削除対象なし
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch {
    res.status(500).json({ error: "request failed" });
  }
});

// ポート3000でリクエストを受け付けてもらう
app.listen(3000, () => {
  console.log("Server running on port 3000!!");
});
