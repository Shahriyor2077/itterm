const { Schema, model } = require("mongoose");

const topicSchema = new Schema({
  author_id: [{ type: Schema.Types.ObjectId, ref: "author" }],
  topic_title: { type: String },
  topic_text: { type: String },
  created_date: { type: Date },
  updated_date: { type: Date },
  is_checked: { type: String },
  is_approved: { type: String },
  expert_id: { type: Schema.Types.ObjectId, ref: "author" },
});

module.exports = model("topic", topicSchema);
