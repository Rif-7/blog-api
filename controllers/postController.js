const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.post_list = async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (err) {
    return next(err);
  }
};

exports.post_create = [
  body("title", "Title should have atlease 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),
  body("content", "Content should have atleast 2 characters")
    .trim()
    .isLength({ min: 2 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.mapped());
    }
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(401)
        .json({ error: { message: "User isn't authorized to create posts" } });
    }

    try {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
      });
      await post.save();
      return res.status(200).json({ message: "Post created successfully" });
    } catch (err) {
      return next(err);
    }
  },
];

exports.post_delete = async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ error: { message: "User is not authenticated" } });
    }

    const post = await Post.findById(req.params.postId).populate("user");
    if (!post) {
      return res.status(404).json({ error: { message: "Post not found" } });
    }

    if (req.user._id != post.user._id) {
      return res
        .status(403)
        .json({ error: { message: "User is not the author" } });
    }

    await post.deleteOne();
    return res.status(200).json({ success: "Post deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

exports.post_details = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: { message: "Post not found" } });
    }
    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

exports.post_toggle_publish = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(401)
        .json({ error: { message: "User is not authorized to edit posts" } });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: { message: "Post not found" } });
    }

    post.isPublished = !post.isPublished;
    await post.save();

    const message = post.isPublished
      ? "Post published successfully"
      : "Post unpublished successfully";
    return res.status(200).json({ success: message });
  } catch (err) {
    return next(err);
  }
};
