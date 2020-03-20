const userRoute = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

userRoute.use("/login", userController.loginGoogle);
userRoute.get("/", authentication, userController.getUser);

module.exports = userRoute;
