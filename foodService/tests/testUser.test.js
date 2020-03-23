const request = require("supertest");
const app = require("../app");
const wrongtoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..vDZ90GAsiI3xGrV2Yed2Rb3TTzX5Nowz8A7-eCIPGj4";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNzg3OWE3M2EyMzE4MDhhMGZmZmNjYSIsImlhdCI6MTU4NDk1NDk4Mn0.JP2FvRPtaDN0fJsiqF8gyAGHOlw7wojCmbugrKYdgPA"
jest.mock("google-auth-library");
const { OAuth2Client } = require('google-auth-library');
const setCredentialsMock = jest.fn();
const getAccessTokenMock = jest.fn();
OAuth2Client.mockImplementation(() => {
  return {
    setCredentials: setCredentialsMock,
    getAccessToken: getAccessTokenMock
  }
});

describe("User route", () => {
  describe("POST /user", () => {
    // console.log(new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, ""))
    // it("should return status code 400 when google payload is correct", async () => {
    //   console.log("testttt")
      
    //   const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "");
    //   oAuth2Client.setCredentials({ userData: {
    //     name: "cool",
    //     email: "cool@gmail.com"
    //   }});
    //   console.log(oAuth2Client)
      // const respData = {
      //   name: "",
      //   email: ""
      // }
      // const result = await request(app)
      //   .get(`/user/login`)
      //   .send({
      //   });


    

    // });

    it("should return status code 403 when token is not set", async () => {
      const result = await request(app)
        .get(`/user`)
      expect(result.status).toBe(403);
      expect(result.body).toHaveProperty("msg");
      expect(typeof result.body.msg).toBe("string");
      expect(result.body.msg).toBe("Please login first");
    });
    it("should return status code 400 when using wrong token", async () => {
      const result = await request(app)
      .get(`/user`)
      .set("token", wrongtoken)
      expect(typeof result).toBe("object");
      expect(result.status).toBe(401);
      expect(typeof result.body).toBe("object");
    })
    it("should return status code 200 when user found", async () => {
      console.log("ppppppppppp")
      const result = await request(app)
        .get(`/user`)
        .set("token", token)
      expect(typeof result).toBe("object");
      expect(result.status).toBe(200);
      expect(typeof result.body).toBe("object");
    })
  })
});
