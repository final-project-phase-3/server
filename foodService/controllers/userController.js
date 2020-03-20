const User = require('../models/User')
const {generateToken} = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library')
var mongoose = require('mongoose');

class userController {
  static loginGoogle(req, res, next) {
    console.log("login");
    const client = new OAuth2Client(process.env.CLIENT_ID);
    console.log(client, "<<<");
    let name;
    let email;
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID
      });
      const payload = ticket.getPayload();
      return payload;
    }
    verify()
      .then(data => {
        console.log(data);
        username = data.name;
        email = data.email;
        return User.findOne({
          email: data.email
        });
      })
      .then(exists => {
        if (exists == null) {
          User.insertOne({
            username,
            email,
            refrigerator: []
          });
        } else {
          console.log("ada");
          let obj = {
            id: exists.id,
            username: exists.username,
            email: exists.email,
            refrigerator: exists.refrigerator
          };
          let token = generateToken(obj, process.env.JWT_SECRET);
          console.log(token, "<<");
          res.status(200).json({ accessToken: token });
        }
      })
      .catch(error => {
        next(error);
      });
  }

  static getUser(req, res, next) {
    User.findById(req.payload.id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        next(err);
      });
  }
  static createTestToken(req,res,next){
    const { id } = req.body
    User
      .findById(mongoose.Types.ObjectId(id))
      .then(user => {
        console.log(user)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = userController;
