const routes = require("express").Router();
const userRoute = require("./userRoute");
const foodRoute = require("./foodRoute");
const favoriteRoute = require("./favorite");
const refrigeratorRoute = require("./refrigerator");
const processImage = require("./processImage")


routes.use("/user", userRoute);
routes.use("/food", foodRoute);
routes.use("/favorites", favoriteRoute);
routes.use("/refrigerator", refrigeratorRoute);
routes.use('/processImage',processImage)


module.exports = routes;
