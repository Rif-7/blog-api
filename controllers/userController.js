const User = require("../models/user");
const { comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "Cannot find user" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    const payload = {
      id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json({ message: "Login Successful", token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error occurred while finding user" });
  }
};
