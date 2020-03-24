const User = require("../models/User");
const { generateToken } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");

class userController {
  /* istanbul ignore next */
  static loginGoogle(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let username;
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
          let obj = {
            id: exists._id,
            username: exists.username,
            email: exists.email,
            refrigerator: exists.refrigerator
          };
          let token = generateToken(obj, process.env.JWT_SECRET);
          res.status(200).json({ accessToken: token });
        }
      })
      .catch(error => {
        next(error);
      });
  }

  static getUser(req, res, next) {
    console.log(req.payload);
    User.findById(req.payload.id)
      .then(user => {
        console.log(user);
        if (user) {
          res.status(200).json(user);
        } else {
          throw {
            status: 404,
            message: "User Not Found"
          };
        }
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
  /* istanbul ignore next */
  static createTestToken(req, res, next) {
    const { id } = req.body;
    let token = generateToken({ id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  }

  static register(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(found => {
        if (found) {
          throw { status: 400, message: "Email already registered" };
        } else {
          if (req.body.password) {
            if (req.body.password.length < 6) {
              throw {
                status: 400,
                message: "Minimal character for password is 6"
              };
            }
          }
          return User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            refrigerator: []
          });
        }
      })
      .then(userRegistered => {
        const token = generateToken(
          { id: userRegistered._id },
          process.env.JWT_SECRET
        );
        const outputUser = {
          username: userRegistered.username,
          refrigerator: userRegistered.refrigerator,
          email: userRegistered.email
        };
        res.status(201).json({ userRegistered: outputUser, token });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = userController;
