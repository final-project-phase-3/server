const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "name of recipe is required"]
  },
  servingTime: {
    type: String
  },
  nutrition: [
    {
      title: String,
      amount: Number,
      unit: String,
      percentOfDailyNeeds: Number
    }
  ],
  image_url_recipe: {
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
          id: Number,
          name: String
        }
      ],
      equipment: [
        {
          id: Number,
          name: String
        }
      ]
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
