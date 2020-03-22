const request = require("supertest");
const app = require("../app");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzQ0NWNhM2MzOTAxMjU3ZDBlNDg2MSIsImlhdCI6MTU4NDY3ODM0Nn0.vDZ90GAsiI3xGrV2Yed2Rb3TTzX5Nowz8A7-eCIPGj4";

// userRoute.get("/", authentication, userController.getUser);
// userRoute.use('/login',userController.loginGoogle)
// userRoute.post("/createtoken",userController.createTestToken)


describe("User route", () => {
  describe("POST /user", () => {
    it("should return status code 400 when user not found", async () => {
      const result = await request(app)
        .post(`/user}`)
        .send({
          id: '342243242'
        })
        .set("token", token)
      expect(typeof result).toBe("object");
      expect(result.status).toBe(404);
      expect(typeof result.body).toBe("object");
    });

    it("should return status code 403 when token is not set", async () => {
      const result = await request(app)
        .get(`/user`)
        .send({
          id: '23423423'
        });
      expect(result.status).toBe(403);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Please login first");
    });

    // it("should return status code 500 when using wrong google token", async () => {
    //   const result = await request(app)
    //     .post(`/user/login`)
    //     .send({
    //       token: "onfiewf28392743foi43f9h"
    //     });
    //   expect(result.status).toBe(500);
    //   expect(typeof result.body).toBe("object");
    //   expect(result.body).toHaveProperty("msg");
    //   expect(typeof result.body.msg).toBe("string");
    // });
  })
});
