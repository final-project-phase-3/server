const userRoute = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

userRoute.get("/", authentication, userController.getUser);
userRoute.use('/login',userController.loginGoogle)
userRoute.post("/createtoken",userController.createTestToken)

module.exports = userRoute;
