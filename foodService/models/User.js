const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hashPassword } = require("../helper/bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please input valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Minimal characters for password is 6"]
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
      tags: {
        type: Array
      }
    }
  ]
});

userSchema.pre("save", function() {
  let hashedPassword = hashPassword(this.password);
  this.password = hashedPassword;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
