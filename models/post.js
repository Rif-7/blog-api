const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, minLength: 2 },
  content: { type: String, required: true, minLength: 2 },
  timestamp: { type: Date, default: Date.now, required: true },
});

PostSchema.virtual("time_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this.id}`;
});

module.exports = mongoose.model("Post", PostSchema);
