const Comment = require("../models/comment");
const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.comment_list = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: { message: "Post not found" } });
    }
    const comments = await Comment.find({ post: post._id }).populate("user");
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
};

exports.comment_create = [
  body("content", "Comment can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ error: { message: "User is not authenticated" } });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped);
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      res.status(404).json({ error: { message: "Post not found" } });
    }

    let comment = new Comment({
      user: req.user._id,
      post: post._id,
      content: req.body.content,
    });

    try {
      comment = await comment.save();
      return res
        .status(200)
        .json({ success: "Comment created Sucessfully", id: comment.id });
    } catch (err) {
      return next(err);
    }
  },
];

exports.comment_get = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: { message: "Comment not found" } });
    }
    return res.status(200).json(comment);
  } catch (err) {
    return next(err);
  }
};

exports.comment_delete = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: { message: "User is not authenticated" } });
    }

    const comment = await Comment.findById(req.params.commentId).populate(
      "user"
    );
    if (!comment) {
      return res.status(404).json({ error: { message: "Comment not found" } });
    }

    if (req.user._id != comment.user._id) {
      return res
        .status(403)
        .json({ error: { message: "User is not the author of the comment" } });
    }

    await comment.deleteOne();
    res.status(200).json({ success: "Comment deleted successfully" });
  } catch (err) {
    return next(err);
  }
};
