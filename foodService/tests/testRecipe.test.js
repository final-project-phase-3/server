const request = require("supertest");
const app = require("../app");
const ingredients = [
  "potato",
  "carrot"
]
const noStepIngredient = [
  "egg",
  "tomato"
]
const query = "potato"
const noStepQuery = "Fried Green Tomatoes"



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
    },15000);
  });
  describe("POST /food/recipe", () => {
    it("should return status code 200 when get the data from API but without step", async () => {
      const result = await request(app)
      .post("/food/recipe")
      .send({ data: noStepIngredient });
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
    },150000);
  });
  describe("POST /food/recipe", () => {
    it("should return status code 404 when recipe not found by ingredient", async () => {
      const result = await request(app)
      .post("/food/recipe")
      .send({ data: ["eiwbuedoweu"] });
      // console.log(result, "res");
      expect(result.status).toBe(404);
      expect(typeof result.body).toBe("object");
    },15000);
  });
  describe("POST /food/searchRecipe", () => {
    it("should return status code 200 when get the data from API", async () => {
      const result = await request(app)
      .post("/food/searchRecipe")
      .send({ data: query });
      // console.log(result, "res");
      expect(result.status).toBe(200);
      expect(typeof result.body).toBe("object");
    },15000);
  });
  describe("GET /food/randomRecipe", () => {
    it("should return status code 200 when get the data from API", async () => {
      const result = await request(app)
      .get("/food/randomRecipe")
      .send({ data: query });
      // console.log(result, "res");
      expect(result.status).toBe(200);
      expect(typeof result.body).toBe("object");
    },15000);
  });
  describe("POST /food/searchRecipe", () => {
    it("should return status code 404 when recipe not found", async () => {
      const result = await request(app)
      .post("/food/searchRecipe")
      .send({ data: "wiehfoqudhejf9832731323" });
      // console.log(result, "res");
      expect(result.status).toBe(404);
      // expect(typeof result.body).toBe("object");
      // expect(result.body.payload[0]).toHaveProperty("title");
      // expect(result.body.payload[0]).toHaveProperty("cookingSteps");
      // expect(result.body.payload[0]).toHaveProperty("image");
      // expect(result.body.payload[0]).toHaveProperty("ingredients");
      // expect(result.body.payload[0]).toHaveProperty("readyInMinutes");
      // expect(result.body.payload[0]).toHaveProperty("nutritions");
    },15000);
  });
  describe("POST /food/searchRecipe", () => {
    it("should return status code 200 when get the data from API", async () => {
      const result = await request(app)
      .post("/food/searchRecipe")
      .send({ data: noStepQuery });
      // console.log(result, "res");
      expect(result.status).toBe(200);
      expect(typeof result.body).toBe("object");
      expect(result.body.payload[0]).toHaveProperty("title");
      expect(result.body.payload[0]).toHaveProperty("cookingSteps");
      expect(result.body.payload[0]).toHaveProperty("image");
      expect(result.body.payload[0]).toHaveProperty("ingredients");
      expect(result.body.payload[0]).toHaveProperty("readyInMinutes");
      expect(result.body.payload[0]).toHaveProperty("nutritions");
    },15000);
  });
  describe("POST /food/recipe", () => {
    it("should return status code 500 when input data is not array", async () => {
      const result = await request(app)
      .post("/food/recipe")
      .send({ data: "buakan array" });
      // console.log(result, "res");
      expect(result.status).toBe(500);
      expect(typeof result.body).toBe("object");
    },15000);
  });
});