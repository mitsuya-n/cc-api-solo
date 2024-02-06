// knexをrequire
const knex = require("knex");
// knexfile.jsをrequire
const knexConfig = require("../knexfile");

// developmentに対応するデータベースへの接続
const db = knex(knexConfig["development"]);
// exportsして他で使用できるようにする
module.exports = db;
