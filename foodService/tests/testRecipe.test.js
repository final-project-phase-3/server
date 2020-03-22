const request = require("supertest");
const app = require("../app");
const ingredients =[
  "potato",
  "carrot"
]
const query = "potato"


describe("Food routes", () => {
  describe("POST /food/recipe", () => {
    it("should return status code 200 when get the data from API", async () => {
      const result = await request(app)
      .post("/food/recipe")
      .send({ data: ingredients });
      // console.log(result, "res");
      expect(result.status).toBe(200);
      expect(typeof result.body).toBe("object");
      expect(result.body.payload[0]).toHaveProperty("title");
      expect(result.body.payload[0]).toHaveProperty("cookingSteps");
      expect(result.body.payload[0]).toHaveProperty("image");
      expect(result.body.payload[0]).toHaveProperty("usedIngredients");
      expect(result.body.payload[0]).toHaveProperty("missedIngredients");
      expect(result.body.payload[0]).toHaveProperty("readyInMinutes");
      expect(result.body.payload[0]).toHaveProperty("nutritions");
    },10000);
  });
  describe("POST /food/searchRecipe", () => {
    it("should return status code 200 when get the data from API", async () => {
      const result = await request(app)
      .post("/food/searchRecipe")
      .send({ data: query });
      // console.log(result, "res");
      expect(result.status).toBe(200);
      expect(typeof result.body).toBe("object");
      expect(result.body.payload[0]).toHaveProperty("title");
      expect(result.body.payload[0]).toHaveProperty("cookingSteps");
      expect(result.body.payload[0]).toHaveProperty("image");
      expect(result.body.payload[0]).toHaveProperty("ingredients");
      expect(result.body.payload[0]).toHaveProperty("readyInMinutes");
      expect(result.body.payload[0]).toHaveProperty("nutritions");
    },10000);
  });
});