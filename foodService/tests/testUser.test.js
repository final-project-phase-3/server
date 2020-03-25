const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const trueEmail = "kevin@mail.com"
const wrongEmail = "gaknemu@mail.com"
const trueUsername = "kevin"
const wrongUsername = "salahalamat"
const truePassword = "cocolaja"
const wrongPassword = "cocolsalah"
const wrongtoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..vDZ90GAsiI3xGrV2Yed2Rb3TTzX5Nowz8A7-eCIPGj4";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzg5ODMzZmEyNDE3MmQ0MTBmOTRhYSIsImlhdCI6MTU4NDk1NDk4Mn0.eqJxExDEzCsGfLZ1HJpDjyUzn0_ZVeSOWGC9m88BnJE"
jest.mock("google-auth-library");
let wrongIdToken = jwt.sign({ id: '5e7481e312af324e6a4ce406'}, process.env.JWT_SECRET);
// let newtoken = jwt.sign({ id: '5e7a0a07dc8e032b4c3b0e74'}, process.env.JWT_SECRET);
beforeAll(() => {
  User.create({
    username: trueUsername,
    password: truePassword,
    email: trueEmail,
    refrigerator: []
  });
});
describe("User route", () => {
  describe(" GET /user", () => {
    it("should return status code 403 when token is not set", async () => {
      const result = await request(app)
        .get(`/user`)
      expect(result.status).toBe(403);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Please login first");
    });
    it("should return status code 401 when using wrong token", async () => {
      const result = await request(app)
      .get(`/user`)
      .set("token", wrongtoken)
      expect(typeof result).toBe("object");
      expect(result.status).toBe(401);
      expect(typeof result.body).toBe("object");
    })
    it("should return status code 404 when using wrong id token", async () => {
      const result = await request(app)
      .get(`/user`)
      .set("token", wrongIdToken)
      expect(typeof result).toBe("object");
      expect(result.status).toBe(404);
      expect(typeof result.body).toBe("object");
    })
  })
  describe(" POST /user", () => {
    it("should return status code 200 when password is true", async () => {
      const result = await request(app)
        .post(`/user/login`)
        .send({
          "input": trueUsername,
          "password": truePassword
        })
      expect(result.status).toBe(200);
      expect(typeof result.body).toBe("object");
      expect(result.body).toHaveProperty("userData");
      expect(result.body.userData).toHaveProperty("token");
      expect(typeof result.body.userData.token).toBe("string");
      expect(typeof result.body.userData).toBe("object");
      expect(result.body.userData).toHaveProperty("username");
      expect(result.body.userData).toHaveProperty("email");
      expect(result.body.userData).toHaveProperty("refrigerator");
      expect(result.body.userData.username).toBe("kevin");
      expect(result.body.userData.email).toBe("kevin@mail.com");
      expect(result.body.userData.refrigerator.length).toBe(0);
    });
    it("should return status code 400 when email is wrong", async () => {
      const result = await request(app)
        .post(`/user/login`)
        .send({
          "input": wrongEmail,
          "password": truePassword
        })
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Email or Password is wrong");
    });
    it("should return status code 400 when username is wrong", async () => {
      const result = await request(app)
        .post(`/user/login`)
        .send({
          "input": wrongUsername,
          "password": truePassword
        })
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Username or Password is wrong");
    });
    it("should return status code 400 when password is wrong", async () => {
      const result = await request(app)
        .post(`/user/login`)
        .send({
          "input": trueUsername,
          "password": wrongPassword
        })
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Username or Password is wrong");
    });
    
  })
});

afterAll(() => {
  User.deleteMany({})
});
