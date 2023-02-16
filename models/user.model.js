const mongoose = require("mongoose");

//Database schema of the user
const userSchema = new mongoose.Schema({

  firstname: {
    type: String,
    trime: true,
    required: true,
  },
  lastname: {
    type: String,
    trime: true,
    required: true,
  },
  username: {
    type: String,
    trime: true,
    required: true,
  },
  password: {
    type: String,
    trime: true,
    required: true
  }
   
});

module.exports = mongoose.model("user", userSchema);