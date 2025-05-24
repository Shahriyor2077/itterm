const { Schema, model } = require("mongoose");

const catSchema = new Schema({
  name: { type: String, required: true, trim: true },
  parent_category_id: {type: Schema.Types.ObjectId, ref: "category"}
});

module.exports = model("category", catSchema)