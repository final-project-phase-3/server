const routes = require("express").Router();
const authentication = require("../middlewares/authentication");
const refrigeratorController = require("../controllers/refrigeratorController");

routes.post("/", authentication, refrigeratorController.addToRefrigerator);

module.exports = routes;
