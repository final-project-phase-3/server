<<<<<<< HEAD
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
=======
const User = require('../models/User')
const {generateToken} = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library')
>>>>>>> uncomment feature

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
        console.error;
        next(error);
      });
  }
}

module.exports = userController;
