const foodRoute = require("express").Router();
const foodController = require("../controllers/foodController");

foodRoute.post('/recipe', foodController.findRecipe)
foodRoute.post('/searchRecipe', foodController.searchRecipe)


module.exports = foodRoute;