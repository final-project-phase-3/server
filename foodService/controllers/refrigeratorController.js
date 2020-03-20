const User = require("../models/User");

class RefrigeratorController {
  static addToRefrigerator(req, res, next) {
    User.findById(req.payload.id).then(userFound => {
      console.log(ingredient);
      //   let fridgeBaru = userFound.refrigerator.push(re)
      //   console.log(fridgeBaru);
    });
  }
}

module.exports = RefrigeratorController;
