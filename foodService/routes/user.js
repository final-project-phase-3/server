const routes = require("express").Router();
const UserController = require("../controllers/userController");

routes.post("/", UserController.createUser);

module.exports = routes;
