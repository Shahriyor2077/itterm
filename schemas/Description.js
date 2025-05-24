const { Schema, model } = require("mongoose");

const descSchema = new Schema({
    category_id: [{type: Schema.Types.ObjectId, ref: "category"}],
    desc: {type:String }
})


module.exports = model("description", descSchema);
