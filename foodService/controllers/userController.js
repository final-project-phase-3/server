const User = require("../models/User");
const { generateToken } = require("../helper/jwt");
const { comparePassword } = require("../helper/bcrypt");

class userController {
  static login(req, res, next) {
    const {username, email, password} = req.body
    User.findOne({
      $or: [
        { email },
        { username }
      ]
    })
      .then(exists => {
        if(exists && comparePassword(password,exists.password)){
          const token = generateToken(
            { id: exists._id },
            process.env.JWT_SECRET
          );
          const userData = {
            username: exists.username,
            email: exists.email,
            refrigerator: exists.refrigerator,
          };
          res.status(200).json({ userData, token })
        }else{
          if(username === undefined){
            console.log("user")
            throw {
              status: 400,
              message: "Email or Password is wrong"
            }
          }else{
            throw {
              status: 400,
              message: "Username or Password is wrong"
            }
          }
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
