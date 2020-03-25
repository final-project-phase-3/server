const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of ingredient is required"]
  },
  image_url: {
    type: String,
    required: [true, "Image URL of ingredient is requires"]
  }
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
