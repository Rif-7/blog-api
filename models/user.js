const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 3 },
  password: { type: String, required: true },
  isAdmin: { type: String, default: false },
});

UserSchema.virtual("url").get(function () {
  return `/users/${this.id}`;
});

module.exports = mongoose.model("User", UserSchema);
