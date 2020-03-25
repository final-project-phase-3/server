const userRoute = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

userRoute.get("/", authentication, userController.getUser);
userRoute.post('/login',userController.login)
userRoute.post("/createtoken", userController.createTestToken);
userRoute.post("/register", userController.register);

module.exports = userRoute;
