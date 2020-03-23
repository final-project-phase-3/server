const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

let token = "";

beforeAll(async () => {
  let user = await User.create({
    username: "kiki",
    email: "kiki@mail.com",
    refrigerator: []
  });
  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
});

describe("Process image route", () => {
  describe("POST /processImage", () => {
    it("should return status code 403", async () => {
      // console.log(token, "AAAAAAAAAAAAAAAAAAAAAAA");
      const result = await request(app)
        .post("/processImage")

      expect(result.status).toBe(403);
      
    });

    it("should return status code 200", async () => {
      // console.log(token, "AAAAAAAAAAAAAAAAAAAAAAA");
      const result = await request(app)
        .post("/processImage")
        .set("token",token)

      expect(result.status).toBe(200);
      
    });
  })

  describe("GET /processImage", () => {
    it("should return status code 403", async () => {
      // console.log(token, "AAAAAAAAAAAAAAAAAAAAAAA");
      const result = await request(app)
        .get("/processImage")

      expect(result.status).toBe(403);
      
    });

    it("should return status code 200", async () => {
      // console.log(token, "AAAAAAAAAAAAAAAAAAAAAAA");
      const result = await request(app)
        .get("/processImage")
        .set("token",token)
        .send({
          imageUrl: "https://api.time.com/wp-content/uploads/2019/11/gettyimages-459761948.jpg?quality=85&crop=0px%2C74px%2C1024px%2C536px&resize=1200%2C628&strip"
        })
        console.log(result.body)
      expect(typeof result.body).toBe("object")
    },10000);

    it("no imageUrl should return status code 400", async () => {
      console.log("AAAAAAAAAAAAAAAAAAAAAAA");
      const result = await request(app)
        .get("/processImage")
        .set("token",token)
      expect(result.status).toBe(400);
      expect(typeof result.body).toBe("object")
    });
  })
})