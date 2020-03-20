const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
let token = "";
let idToDelete;

let ingredient = {
  name: "bawang",
  image_url:
    "https://prokabar.com/wp-content/uploads/2018/05/Bawang-Merah-2-768x512-1.jpg"
};
beforeAll(async () => {
  let user = await User.create({
    username: "kiki",
    email: "kiki@mail.com",
    refrigerator: []
  });
  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
});

describe("Refrigerator routes", () => {
  describe("POST /refrigerator", () => {
    it("should return status code 201 when ingredient is successfully added to the refrigerator", async () => {
      // console.log(token, "AAAAAAAAAAAAAAAAAAAAAAA");
      const result = await request(app)
        .post("/refrigerator")
        .set("token", token)
        .send({ ingredient });
      expect(result.status).toBe(201);
      expect(typeof result.body).toBe("object");
      expect(result.body).toHaveProperty("email");
      expect(result.body).toHaveProperty("username");
      expect(result.body).toHaveProperty("refrigerator");
      expect(typeof result.body.refrigerator).toBe("object");
      expect(result.body.email).toBe("kiki@mail.com");
      expect(result.body.username).toBe("kiki");
      expect(result.body.refrigerator[0]).toHaveProperty("image_url");
      expect(result.body.refrigerator[0]).toHaveProperty("name");
      // expect(result.body.ref).toBe(",");
      idToDelete = result.body.refrigerator[0]._id;
    });

    it("should return status code 403 when token is not set", async () => {
      const result = await request(app)
        .post("/refrigerator")
        .send({ ingredient });
      expect(result.status).toBe(403);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Please login first");
    });
  });

  describe("DELETE /refrigerator", () => {
    it("should return status code 200 if deleted successfully", async () => {
      const result = await request(app)
        .delete(`/refrigerator/${idToDelete}`)
        .set("token", token);
      expect(result.status).toBe(200);
      expect(result.body.refrigerator.length).toBe(0);
    });
  });
});

afterAll(() => {
  User.deleteMany({})
    .then(() => {
      //   console.log("deleted all user after test");
    })
    .catch(err => {
      console.log(err);
    });
});
