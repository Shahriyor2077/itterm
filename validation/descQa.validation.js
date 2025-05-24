const Joi = require('joi');

const descQaValidation=(body)=>{
    const schema=Joi.object({
        qa_id: Joi.string().required(),
        desc_id: Joi.string().required()
    });
    return schema.validate(body);
}
module.exports=descQaValidation

