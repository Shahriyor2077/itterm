const Joi = require('joi');

const questionAnswer=(body)=>{
    const schema=Joi.object({
        question: Joi.string().required(),
        answer: Joi.string(),
        created_date: Joi.date(),
        upadated_date: Joi.date(),
        is_checked: Joi.date(),
        user_id: Joi.string(),
        expert_id: Joi.string(),
    });
    return schema.validate(body);
}
module.exports=questionAnswer