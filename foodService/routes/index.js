const routes = require("express").Router();
const userRoute = require("./userRoute")
const foodRoute = require("./foodRoute")

routes.use('/user',userRoute)
routes.use('/food',foodRoute)

module.exports = routes;
