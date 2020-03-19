const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  refrigerator: [
    {
      name: {
        type: String,
        required: [true, "Name of Ingredient is required"]
      },
      image_url: {
        type: String,
        required: [true, "Image Path of Ingredient is required"]
      },
      id: { type: String, required: [true, "Id of ingredient is required"] }
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
