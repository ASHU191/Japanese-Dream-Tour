const User = require("../models/User");

// Register a new user
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
