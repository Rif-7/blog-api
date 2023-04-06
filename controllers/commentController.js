const Comment = require("../models/comment");

exports.comment_create = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: { message: "User is not authenticated" } });
  }
};
