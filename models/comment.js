const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date, default: Date.now, required: true },
});

CommentSchema.virtual("url").get(function () {
  return `/posts/${this.post.toString()}/comments/${this.id}`;
});

CommentSchema.virtual("time_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Comment", CommentSchema);
