const { generateToken,decodeToken } = require('../helper/jwt')

describe("Test jwt", () => {
  let token
  describe("generate token", () => {
    it("should return token", async () => {
      token = generateToken({id:1},'test')
      expect(typeof token).toBe("string");
    });
  })

  describe("decode token", () => {
    it("should return object", async () => {
      expect(typeof decodeToken(token,'test')).toBe("object");
    });
  })
})