const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//Register new user
const registerNewUser = async (req, res) => {
  if (req.body) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
    });
    try {
      const newUser = await user.save();
      res.status(201).json( newUser );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};


//Login for the user
const loginOfUsers = async (req, res) => {
  const user =await  User.findOne({username:req.body.username});
  if (user == null) {
    return res.send("Unauthorized");
  }
  try {

    const state = await bcrypt.compare(req.body.password, user.password);
    if (state) {
      res.status(200).json(user.username);
    } else {
      res.send("Unauthorized");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerNewUser,
  loginOfUsers,
};
