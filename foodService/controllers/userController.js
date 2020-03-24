const User = require("../models/User");
const { generateToken } = require("../helper/jwt");
const { OAuth2Client } = require("google-auth-library");

class userController {
  static login(req, res, next) {
    console.log(req.body)
    const {username, password} = req.body
    User.findOne({username},"password")
      .then(exists => {
        console.log(exists)
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
          return User.findOne({ username: req.body.username });
        }
      })
      .then(usernameFound => {
        if (usernameFound) {
          throw { status: 400, message: "Username is taken!" };
        } else {
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
