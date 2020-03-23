const User = require("../models/User");
const mongoose = require("mongoose");

class RefrigeratorController {
  static addToRefrigerator(req, res, next) {
    User.findById(req.payload.id)
      .then(userFound => {
        if (!req.body.ingredient.name) {
          throw { status: 400, message: "Please input your ingredient" };
        }
        if (typeof req.payload.id === "string") {
          req.payload.id = mongoose.Types.ObjectId(req.payload.id);
        }
        let fridgeBaru = userFound.refrigerator;
        if (userFound.refrigerator.length === 0) {
          fridgeBaru = [req.body.ingredient];
        } else {
          fridgeBaru.push(req.body.ingredient);
        }
        return User.findByIdAndUpdate(
          req.payload.id,
          {
            refrigerator: fridgeBaru
          },
          { new: true }
        );
      })
      .then(added => {
        res.status(201).json(added);
      })
      .catch(err => {
        next(err);
      });
  }
  static deleteFromRefrigerator(req, res, next) {
    User.findById(req.payload.id)
      .then(userFound => {
        let fridge = userFound.refrigerator;
        let fridgeBaru = fridge.filter(el => {
          if (el !== null) {
            return String(el._id) !== req.params.id;
          }
        });
        if (fridge.length === fridgeBaru.length) {
          throw {
            status: 400,
            message: "You don't have this ingredient on your refridgerator"
          };
        }
        return User.findByIdAndUpdate(
          req.payload.id,
          { refrigerator: fridgeBaru },
          { new: true }
        );
      })
      .then(removed => {
        res.status(200).json(removed);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = RefrigeratorController;
