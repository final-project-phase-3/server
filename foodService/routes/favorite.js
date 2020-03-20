const routes = require("express").Router();
const favoriteController = require("../controllers/favoriteController");
const authentication = require("../middlewares/authentication");

routes.get("/", authentication, favoriteController.getMyFavs);
routes.post("/:idAPI", authentication, favoriteController.addToFav);
routes.delete("/:idAPI", authentication, favoriteController.removeFromFav);

module.exports = routes;
