const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  info: { type: String },
  photo: { type: String },
  created_date: { type: Date },
  updated_date: { type: Date },
  user_is_active: { type: Boolean },
  refreshToken: { type: String },
});

module.exports = model("user", userSchema);
