const {Schema, model} = require('mongoose');

const questionAnswerSchema=new Schema({
    question: {type: String, required: true},
    answer: {type: String},
    created_date: {type: Date},
    updated_date: {type: Date},
    is_checked: {type: String},
    user_id: {type: String},
    expert_id: {type: String},
})

module.exports=model("question", questionAnswerSchema)