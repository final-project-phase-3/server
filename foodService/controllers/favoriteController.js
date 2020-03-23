const Recipe = require("../models/Recipe");

class FavoriteController {
  static addToFav(req, res, next) {
    Recipe.find({ idAPI: req.params.idAPI })
      .then(found => {
        if (found.length > 0) {
          throw { status: 400, message: "You have favorited this recipe" };
        } else {
          return Recipe.create({
            title: req.body.title,
            readyInMinutes: req.body.readyInMinutes,
            cookingSteps: req.body.cookingSteps,
            userId: req.payload.id,
            idAPI: req.params.idAPI,
            image: req.body.image,
            nutritions: req.body.nutritions,
            missedIngredients: req.body.missedIngredients,
            usedIngredients: req.body.usedIngredients
          });
        }
      })
      .then(addedToFav => {
        res.status(201).json(addedToFav);
      })
      .catch(err => {
        next(err);
      });
  }

  static removeFromFav(req, res, next) {
    console.log(req.params);
    Recipe.findOneAndDelete({ idAPI: req.params.idAPI })
      .then(found => {
        if (found) {
          res.status(200).json(found);
        } else {
          throw {
            status: 400,
            message: "This recipe is not in your favorite list"
          };
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static getMyFavs(req, res, next) {
    Recipe.find({ userId: req.payload.id })
      .then(allFavorites => {
        res.status(200).json(allFavorites);
      })
      .catch(err => {
        /* istanbul ignore next */
        next(err);
      });
  }
}

module.exports = FavoriteController;
