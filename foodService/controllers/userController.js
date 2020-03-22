const User = require('../models/User')
const {generateToken} = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library')

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
    User.findById(req.payload.id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        next(err);
      });
  }
  /* istanbul ignore next */
  static createTestToken(req,res,next){
    const { id } = req.body
    let token = generateToken({id:mongoose.Types.ObjectId(id)}, process.env.JWT_SECRET);
    res.status(200).json({token})
  }
}

module.exports = userController;
