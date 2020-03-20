var jwt = require('jsonwebtoken');
module.exports = {
  generateToken (obj,secret){
    console.log(obj,secret)
    return jwt.sign(obj,secret)
  },
  decodeToken (token, secret){
    return jwt.verify(token, secret)
  }
}