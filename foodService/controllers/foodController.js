// const mongoose = require('mongoose');
// const Recipe = mongoose.model('Recipe');
const axios = require('axios')


class FoodController{
  static findRecipe(req,res,next) {
    const combinedRecipesData = []
    const promiseRecipes = []
    const promiseNutritions = []
    // const combineIngridients = req.body.ingridients.join(",+")
    axios({
      url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=${process.env.API_KEY}`,
      method: 'get'
    })
      .then(resp=>{
        for(let i = 0; i < resp.data.length; i++) {
          combinedRecipesData.push(resp.data[i])
          promiseRecipes.push(
            axios({
              url: `https://api.spoonacular.com/recipes/${resp.data[i].id}/analyzedInstructions?apiKey=${process.env.API_KEY}`,
              method: 'get'
            })
          )
          promiseNutritions.push(
            axios({
              url: `https://api.spoonacular.com/recipes/716429/information?includeNutrition=true&apiKey=${process.env.API_KEY}`,
              method: 'get'
            })
          )
        }
        // console.log(promiseRecipes,"<<<promise")
        return Promise.all(promiseRecipes)
      })
      .then(steprecipe=>{
        for(let i = 0; i < steprecipe.length; i++) {
          combinedRecipesData[i].cookingSteps = steprecipe[i].data[0].steps
        }
        return Promise.all(promiseNutritions)
        // console.log(combinedRecipesData)
      })
      .then(foodNutritions=>{
        for(let i = 0; i < foodNutritions.length; i++) {
          // console.log(foodNutritions[i].data,"<<nutri")
          combinedRecipesData[i].nutritions = foodNutritions[i].data.nutrition.nutrients
          combinedRecipesData[i].servingTime = foodNutritions[i].data.readyInMinutes
        }
        console.log(combinedRecipesData)
        res.status(200).json({payload: combinedRecipesData})
      })
      .catch(error=>{
        console.log(error)
        next(error)
      })
  }
}

module.exports = FoodController