const {Schema, model} = require('mongoose');

const descQaSchema=new Schema({
    qa_id: {type: String, required: true},
    desc_id: {type: String, required: true},
})
module.exports=model("descQa", descQaSchema)