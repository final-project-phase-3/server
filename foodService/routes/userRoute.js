const userRoute = require("express").Router();
const userController = require("../controllers/userController")

userRoute.use('/login',userController.loginGoogle)

module.exports = userRoute;