/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("shopping_list").del();
  await knex("shopping_list").insert([
    { item: "食パン", quantity: 3 },
    { item: "牛乳", quantity: 1 },
  ]);
};
