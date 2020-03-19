const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "name of recipe is required"]
  },
  cook_time: {
    type: String
  },
  nutrition: {
    type: Map,
    of: String
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
