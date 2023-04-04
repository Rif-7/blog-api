var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "Hello" });
});

router.post("/login", userController.login);
router.post("/sign-up", userController.sign_up);

router.get("/posts", postController.post_list);
router.post("/posts", postController.post_create);
router.get("/posts/:id", postController.post_details);

module.exports = router;
