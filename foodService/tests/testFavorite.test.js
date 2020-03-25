const request = require("supertest");
const app = require("../app");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzQ0NWNhM2MzOTAxMjU3ZDBlNDg2MSIsImlhdCI6MTU4NDY3ODM0Nn0.vDZ90GAsiI3xGrV2Yed2Rb3TTzX5Nowz8A7-eCIPGj4";
const Recipe = require("../models/Recipe");

var recipe = {
  id: "14998",
  title: "rendang",
  readyInMinutes: 45,
  cookingSteps: [
    {
      number: 1,
      step: "cut dice",
      ingredients: [
        {
          id: 11215,
          name: "garlic"
        }
      ],
      equipment: [
        {
          name: "knife"
        }
      ]
    }
  ],
  nutritions: [
    {
      title: "Calories",
      amount: 584.46,
      unit: "cal",
      percentOfDailyNeeds: 29.22
    }
  ]
};

beforeAll(() => {
  Recipe.deleteMany({})
    .then(() => {
      console.log("user deleted before test");
    })
    .catch(err => {
      console.log(err);
    });
});

describe("Favorite route", () => {
  describe("POST /favorites/:idAPI", () => {
    it("should return status code 201 when favorite is added", async () => {
      const result = await request(app)
        .post(`/favorites/${recipe.id}`)
        .set("token", token)
        .send({
          cookingSteps: recipe.cookingSteps,
          title: recipe.title,
          readyInMinutes: recipe.readyInMinutes,
          nutritions: recipe.nutritions
        });
      expect(typeof result).toBe("object");
      expect(result.status).toBe(201);
      expect(typeof result.body).toBe("object");
      expect(result.body.title).toBe("rendang");
      expect(result.body.readyInMinutes).toBe(45);
      expect(typeof result.body.cookingSteps).toBe("object");
      expect(result.body.cookingSteps[0].number).toBe(1);
      expect(result.body.cookingSteps[0]).toHaveProperty("equipment");
      expect(result.body.cookingSteps[0]).toHaveProperty("ingredients");
      expect(result.body.cookingSteps[0]).toHaveProperty("step");
    });

    it("should return status code 403 when token is not set", async () => {
      const result = await request(app)
        .post(`/favorites/${recipe.id}`)
        .send({
          cookingSteps: recipe.cookingSteps,
          title: recipe.title,
          readyInMinutes: recipe.readyInMinutes,
          nutritions: recipe.nutritions
        });
      expect(result.status).toBe(403);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Please login first");
    });

    it("should return status code 400 when favorited recipe is added again", async () => {
      const result = await request(app)
        .post(`/favorites/${recipe.id}`)
        .set("token", token)
        .send({
          cookingSteps: recipe.cookingSteps,
          title: recipe.title,
          readyInMinutes: recipe.readyInMinutes,
          nutritions: recipe.nutritions
        });
      expect(result.status).toBe(400);
      expect(typeof result.body).toBe("object");
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("You have favorited this recipe");
    });

    it("should return status code 500 when required field is not set", async () => {
      const result = await request(app)
        .post(`/favorites/${recipe.id}1`)
        .set("token", token)
        .send({
          cookingSteps: recipe.cookingSteps,
          readyInMinutes: recipe.readyInMinutes,
          nutritions: recipe.nutritions
        });
      expect(result.status).toBe(500);
      expect(typeof result.body).toBe("object");
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe(
        "Recipe validation failed: title: title of recipe is required"
      );
    });
  });

  describe("GET /favorites", () => {
    it("Should return status code 200 when user wants to see their favorite recipe", async () => {
      const result = await request(app)
        .get("/favorites")
        .set("token", token);
      expect(result.status).toBe(200);
      expect(result.body[0]).toHaveProperty("cookingSteps");
      expect(result.body[0]).toHaveProperty("userId");
      expect(result.body[0]).toHaveProperty("readyInMinutes");
    });

    it("Should return status code 403 when token is not set", async () => {
      const result = await request(app).get("/favorites");
      expect(result.status).toBe(403);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Please login first");
    });
  });

  describe("DELETE /favorites:/id", () => {
    it("Should return status code 200 when favorite is successfully removed", async () => {
      const result = await request(app)
        .delete(`/favorites/${recipe.id}`)
        .set("token", token);
      expect(result.status).toBe(200);
      expect(typeof result.body).toBe("object");
      expect(typeof result.body).toBe("object");
      expect(result.body.title).toBe("rendang");
      expect(typeof result.body.cookingSteps).toBe("object");
      expect(result.body.cookingSteps[0].number).toBe(1);
      expect(result.body.cookingSteps[0]).toHaveProperty("equipment");
      expect(result.body.cookingSteps[0]).toHaveProperty("ingredients");
      expect(result.body.cookingSteps[0]).toHaveProperty("step");
    });

    it("should return status code 403 when token is not set", async () => {
      const result = await request(app).delete(`/favorites/${recipe.id}`);

      expect(result.status).toBe(403);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Please login first");
    });

    it("should return status code 400 when recipe is not on the favorite list", async () => {
      const result = await request(app)
        .delete(`/favorites/${recipe.id}`)
        .set("token", token);
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("This recipe is not in your favorite list");
    });
    it("should return status code 401 when failed to authenticate", async () => {
      const result = await request(app)
        .delete(`/favorites/${recipe.id}`)
        .set("token", `${token}dummy`);
      expect(result.status).toBe(401);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Failed to authenticate");
    });
  });
});
