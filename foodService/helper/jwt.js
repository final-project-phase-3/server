var jwt = require('jsonwebtoken');
module.exports = {
  generateToken (obj,secret){
    return jwt.sign(obj,secret)
  },
  decodeToken (token, secret){
    return jwt.verify(token, secret)
  }
}