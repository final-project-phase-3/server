const foodRoute = require("express").Router();
const foodController = require("../controllers/foodController");

foodRoute.post('/recipe', foodController.findRecipe)


module.exports = foodRoute;