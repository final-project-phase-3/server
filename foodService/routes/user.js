const routes = require("express").Router();
const UserController = require("../controllers/userController");

routes.post("/", UserController.createUser);
routes.post("/createtoken",UserController.createTestToken)

module.exports = routes;
