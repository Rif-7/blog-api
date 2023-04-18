const Post = require("../models/post");
const { body, validationResult } = require("express-validator");

exports.post_list_published = async (req, res, next) => {
  try {
    const posts = await Post.find({ isPublished: true }).sort({
      timestamp: -1,
    });
    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

exports.post_list_unPublished = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(401).json({
        error: {
          message: "User if not authorized to view unpublished posts",
        },
      });
    }
    const posts = await Post.find({ isPublished: false }).sort({
      timestamp: -1,
    });
    return res.status(200).json(posts);
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
      return res.status(400).json({ error: errors.array() });
    }
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(401)
        .json({ error: [{ msg: "User is not authorized to create posts" }] });
    }

    try {
      let post = new Post({
        title: req.body.title,
        content: req.body.content,
      });
      post = await post.save();
      return res
        .status(200)
        .json({ message: "Post created successfully", id: post.id });
    } catch (err) {
      return next(err);
    }
  },
];

exports.post_delete = async (req, res, next) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res
        .status(401)
        .json({ error: { message: "User is not authorized to delete posts" } });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: { message: "Post not found" } });
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
    console.log(req.user);
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
