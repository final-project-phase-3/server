const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "title of recipe is required"]
  },
  servingTime: {
    type: String
  },
  nutritions: [
    {
      title: String,
      amount: Number,
      unit: String,
      percentOfDailyNeeds: Number
    }
  ],
  image: {
    type: String
  },
  idAPI: {
    type: String,
    required: [true, "id of recipe is required"]
  },
  cookingSteps: [
    {
      number: Number,
      step: String,
      ingredients: [
        {
          name: String
        }
      ],
      equipment: [
        {
          name: String
        }
      ]
    }
  ],
  usedIngredients: [
    {
      name: String
    }
  ],
  missedIngredients: [
    {
      name: String
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
