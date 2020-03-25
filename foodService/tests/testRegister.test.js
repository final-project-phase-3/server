const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

beforeAll(() => {
  User.deleteMany({});
});

let user = {
  username: "lili",
  email: "lili@mail.com",
  password: "secret"
};
describe("User Register Route", () => {
  it("should return status code 201 and object of user registered and token when succesfully registered", async () => {
    const result = await request(app)
      .post("/user/register")
      .send(user);
    expect(result.status).toBe(201);
    expect(typeof result.body).toBe("object");
    expect(result.body).toHaveProperty("userRegistered");
    expect(result.body.userRegistered).toHaveProperty("token");
    expect(typeof result.body.userRegistered.token).toBe("string");
    expect(typeof result.body.userRegistered).toBe("object");
    expect(result.body.userRegistered).toHaveProperty("username");
    expect(result.body.userRegistered).toHaveProperty("email");
    expect(result.body.userRegistered).toHaveProperty("refrigerator");
    expect(result.body.userRegistered.username).toBe("lili");
    expect(result.body.userRegistered.email).toBe("lili@mail.com");
    expect(result.body.userRegistered.refrigerator.length).toBe(0);
  });
  it("should return status code 400 when registering a registered email", async () => {
    const result = await request(app)
      .post("/user/register")
      .send(user);
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("msg");
    expect(typeof result.body.msg).toBe("string");
    expect(result.body.msg).toBe("Email already registered");
  });
  it("should return status code 400 when registering a registered username", async () => {
    const result = await request(app)
      .post("/user/register")
      .send({
        username: "lili",
        email: "lili1@mail.com",
        password: "secret"
      });
    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("msg");
    expect(typeof result.body.msg).toBe("string");
    expect(result.body.msg).toBe("Username is taken!");
  });
  it("should return status code 400 when username is not set", async () => {
    const result = await request(app)
      .post("/user/register")
      .send({
        email: "lili@mail4.com",
        username: null,
        password: "mamama"
      });
    expect(typeof result.body).toBe("object");
    expect(result.body).toHaveProperty("msg");
    expect(typeof result.body.msg).toBe("string");
    expect(result.body.msg).toBe(
      "User validation failed: username: Username is required"
    );
  });

  it("should return status code 500 when email is not set", async () => {
    const result = await request(app)
      .post("/user/register")
      .send({
        username: "lili123",
        password: "mamama"
      });
    expect(result.status).toBe(500);
    expect(typeof result.body).toBe("object");
    expect(result.body).toHaveProperty("msg");
    expect(typeof result.body.msg).toBe("string");
    expect(result.body.msg).toBe(
      "User validation failed: email: Email is required"
    );
  });
  it("should return status code 500 when email is not valid", async () => {
    const result = await request(app)
      .post("/user/register")
      .send({
        username: "lili1234",
        password: "mamama",
        email: "mamammama"
      });
    expect(result.status).toBe(500);
    expect(typeof result.body).toBe("object");
    expect(result.body).toHaveProperty("msg");
    expect(typeof result.body.msg).toBe("string");
    expect(result.body.msg).toBe(
      "User validation failed: email: Please input valid email"
    );
  });

  it("should return status code 500 when password is not set", async () => {
    const result = await request(app)
      .post("/user/register")
      .send({
        username: "lili12345",
        email: "lili1@mail.com",
        password: ""
      });
    expect(result.status).toBe(500);
    expect(typeof result.body).toBe("object");
    expect(result.body).toHaveProperty("msg");
    expect(typeof result.body.msg).toBe("string");
    expect(result.body.msg).toBe(
      "User validation failed: password: Password is required"
    );
  });

  it("should return status code 400 when password is less than 6 characters", async () => {
    const result = await request(app)
      .post("/user/register")
      .send({
        username: "lili123456",
        password: "ma",
        email: "lili123@mail.com"
      });
    expect(result.status).toBe(400);
    expect(typeof result.body).toBe("object");
    expect(result.body).toHaveProperty("msg");
    expect(typeof result.body.msg).toBe("string");
    expect(result.body.msg).toBe("Minimal character for password is 6");
  });
});

afterAll(() => {
  User.deleteMany({})
    .then(() => {})
    .catch(err => {});
});
