const routes = require("express").Router();
const authentication = require("../middlewares/authentication");
const refrigeratorController = require("../controllers/refrigeratorController");

routes.post("/", authentication, refrigeratorController.addToRefrigerator);
routes.delete(
  "/:id",
  authentication,
  refrigeratorController.deleteFromRefrigerator
);

module.exports = routes;
