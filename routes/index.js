var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/posts");
});

router.post("/login", userController.login);
router.post("/sign-up", userController.sign_up);
router.post("/sign-up/admin", userController.sign_up_admin);

router.get("/posts", postController.post_list);
router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postController.post_create
);

router.get("/posts/:postId", postController.post_details);
router.delete(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.post_delete
);
router.put(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  postController.post_toggle_publish
);

router.get("/posts/:postId/comments", commentController.comment_list);
router.post(
  "/posts/:postId/comments",
  passport.authenticate("jwt", { session: false }),
  commentController.comment_create
);
router.get("/posts/:postId/comments/:commentId", commentController.comment_get);
router.delete(
  "/posts/:postId/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentController.comment_delete
);

module.exports = router;
