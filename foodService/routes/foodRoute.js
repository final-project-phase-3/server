const foodRoute = require("express").Router();
const foodController = require("../controllers/foodController");

foodRoute.get('/recipe', foodController.findRecipe)


module.exports = foodRoute;