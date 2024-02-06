const chai = require("chai");
const chaiHttp = require("chai-http");
const { setupServer } = require("../server");
chai.should();
chai.use(chaiHttp);

const server = setupServer();

describe("The express server", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /api/shopping-lists", () => {
    it("should return latest list", async () => {
      const res = await request.get("/api/shopping-lists");
      const expected = [
        { id: 1, item: "食パン", quantity: 3 },
        { id: 2, item: "牛乳", quantity: 1 },
      ];
      res.should.have.status(200);
      res.should.be.json;
      JSON.parse(res.text).should.deep.equal(expected);
    });
  });

  describe("POST /api/shopping-lists", () => {
    it("should add items to list", async () => {
      const newItem = { item: "トマト", quantity: 10 };
      const res = await request.post("/api/shopping-lists").send(newItem);
      res.should.be.json;
      JSON.parse(res.text).should.have.property("item").equal(newItem.item);
      JSON.parse(res.text)
        .should.have.property("quantity")
        .equal(newItem.quantity);
    });
  });

  describe("PATCH /api/shopping-lists/:id", () => {
    it("should change items by id", async () => {
      const patchData = { quantity: 10 };
      const res = await request.patch("/api/shopping-lists/3").send(patchData);
      res.should.be.json;
      JSON.parse(res.text).quantity.should.equal(10);
    });
  });

  describe("DELETE /api/shopping-lists/:id", () => {
    it("should delete items by id", async () => {
      const res = await request.delete("/api/shopping-lists/3");
      res.should.have.status(200);
      res.body.should.have.property("success").equal(true);
      res.body.should.have.property("message").equal("request successfull!!");
    });
  });
});
