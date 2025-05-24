const { Schema, model } = require("mongoose");

const synonimSchema = new Schema({
  desc_id: [{ type: Schema.Types.ObjectId, ref: "description" }],
  dict_id: [{ type: Schema.Types.ObjectId, ref: "Dictionary" }],
});

module.exports = model("synonim", synonimSchema);
