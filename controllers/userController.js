const User = require("../models/user");
const { comparePassword, createHash } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config({ path: "../.env" });

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

exports.sign_up = [
  body("username", "Username should be atleast 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password should be atleast 6 character")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body.username);
    console.log(req.body.password);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const hashedPassword = await createHash(req.body.password);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      }).save();
      const payload = {
        id: user.id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.json({ message: "Sign Up Successful", token });
    } catch (err) {
      return next(err);
    }
  },
];
