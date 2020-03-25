const axios = require("axios");
const baseUrl = 'https://api.spoonacular.com/recipes/'
let keys = process.env.API_KEY.split(',')
let api_key = keys[Math.floor(Math.random()*keys.length)]

class FoodController{
  static findRecipe(req,res,next) {
    const combinedRecipesData = []
    const promiseRecipes = []
    const promiseNutritions = []
    // console.log(req.body)
    const combineIngridients = req.body.data.join(",+")
    // console.log(combineIngridients)
    axios({
      url: `${baseUrl}findByIngredients?ingredients=${combineIngridients}&number=2&apiKey=${api_key}`,
      method: 'get'
    })
      .then(resp=>{
        for(let i = 0; i < resp.data.length; i++) {
          // console.log(resp.data[i])
          combinedRecipesData.push(resp.data[i])
          promiseRecipes.push(
            axios({
              url: `${baseUrl}${resp.data[i].id}/analyzedInstructions?apiKey=${api_key}`,
              method: "get"
            })
          );
          promiseNutritions.push(
            axios({
              url: `${baseUrl}${resp.data[i].id}/information?includeNutrition=true&apiKey=${api_key}`,
              method: 'get'
            })
          );
        }
        return Promise.all(promiseRecipes)
      })
      .then(steprecipe => {
        // console.log("masuk",steprecipe.length,combinedRecipesData.length)
        for (let i = 0; i < steprecipe.length; i++) {
          // console.log(steprecipe[i],"step")
          if(steprecipe[i].data.length === 0){
            combinedRecipesData[i].cookingSteps = [];
          }else{
            combinedRecipesData[i].cookingSteps = steprecipe[i].data[0].steps;
          }
        }
        // console.log(combinedRecipesData,"withstep")
        return Promise.all(promiseNutritions)
      })
      .then(foodNutritions=>{
        for(let i = 0; i < foodNutritions.length; i++) {
          // console.log(foodNutritions[i],"nutri")
          combinedRecipesData[i].nutritions = foodNutritions[i].data.nutrition.nutrients
          combinedRecipesData[i].readyInMinutes = foodNutritions[i].data.readyInMinutes
        }
        if(combinedRecipesData.length === 0){
          throw {
            status:404,
            message:"Recipe Not Found"
          }
        }
        res.status(200).json({ payload: combinedRecipesData });
      })
      .catch(error => {
        // console.log("error");
        next(error);
      });
  }
  static searchRecipe(req,res,next) {
    // console.log(req.body.data)
    const combinedRecipesData = []
    const promiseRecipes = []
    const promiseNutritions = []
    let query = req.body.data
    axios({
      // url: `https://api.spoonacular.com/recipes/search?query=cheese&number=2&apiKey=${api_key}`,
      url: `${baseUrl}search?query=${query}&number=2&apiKey=${api_key}`,
      method: 'get'
    })
      .then(recipes=>{
        const shortAccess = recipes.data.results 
        for(let i = 0; i < shortAccess.length; i++){
          combinedRecipesData.push(shortAccess[i])
          promiseRecipes.push(
            axios({
              url: `${baseUrl}${shortAccess[i].id}/analyzedInstructions?apiKey=${api_key}`,
              method: "get"
            })
          );
          promiseNutritions.push(
            axios({
              url: `${baseUrl}${shortAccess[i].id}/information?includeNutrition=true&apiKey=${api_key}`,
              method: 'get'
            })
          );
        }
        return Promise.all(promiseRecipes)
        // console.log(combinedRecipesData)
      })
      .then(steprecipe => {
        // console.log("masuk",steprecipe.length,combinedRecipesData.length)
        for (let i = 0; i < steprecipe.length; i++) {
          // console.log(steprecipe[i],"step")
          if(steprecipe[i].data.length === 0){
            combinedRecipesData[i].cookingSteps = [];
          }else{
            combinedRecipesData[i].cookingSteps = steprecipe[i].data[0].steps;
          }
        }
        // console.log(combinedRecipesData,"withstep")
        return Promise.all(promiseNutritions)
      })
      .then(foodNutritions=>{
        for(let i = 0; i < foodNutritions.length; i++) {
          // console.log(foodNutritions[i].data.nutrition.ingredients,"from nutri")
          // console.log(foodNutritions[i].data.extendedIngredients,"from extend")
          combinedRecipesData[i].nutritions = foodNutritions[i].data.nutrition.nutrients
          combinedRecipesData[i].ingredients = foodNutritions[i].data.extendedIngredients        
        }
        // console.log(combinedRecipesData,"<<<result");
        if(combinedRecipesData.length === 0){
          throw {
            status:404,
            message:"Recipe Not Found"
          }
        }
        res.status(200).json({ payload: combinedRecipesData });
      })
      .catch(error=>{
        // console.log(error)
        next(error)
      })
  }
  static randomRecipe(req,res,next){
    const combinedRecipesData = []
    // const promiseRecipes = []
    const promiseNutritions = []
    axios({
      url: `${baseUrl}random?includeNutrition=true&number=1&apiKey=${api_key}`,
      method: 'get'
    })
      .then(recipes=>{
        const shortAccess = recipes.data.recipes
        for(let i = 0; i < shortAccess.length; i++){
          combinedRecipesData.push(shortAccess[i])
          combinedRecipesData[i].cookingSteps = shortAccess[i].analyzedInstructions[0].steps;
          combinedRecipesData[i].ingredients = shortAccess[i].extendedIngredients        

          // promiseRecipes.push(
          //     axios({
          //         url: `${baseUrl}${shortAccess[i].id}/analyzedInstructions?apiKey=${api_key}`,
          //         method: "get"
          //       })
          //     );
          promiseNutritions.push(
            axios({
              url: `${baseUrl}${shortAccess[i].id}/information?includeNutrition=true&apiKey=${api_key}`,
              method: 'get'
            })
          );
        }
        return Promise.all(promiseNutritions)
      })
      .then(foodNutritions=>{
        for(let i = 0; i < foodNutritions.length; i++) {
          // console.log(foodNutritions[i].data.nutrition.ingredients,"from nutri")
          // console.log(foodNutritions[i].data.extendedIngredients,"from extend")
          combinedRecipesData[i].nutritions = foodNutritions[i].data.nutrition.nutrients
        }
        res.status(200).json({ payload: combinedRecipesData });
      })
      .catch(error=>{
        /* istanbul ignore next */
        next(error)
      })
  }
}

module.exports = FoodController;
