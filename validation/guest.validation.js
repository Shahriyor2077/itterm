const Joi = require('joi');

const guestValidation=(body)=>{
    const schema=Joi.object({
        guest_ip: Joi.string().required(),
        guest_os: Joi.string(),
        guest_browser: Joi.string(),
        guest_reg_date: Joi.date()
    });
    return schema.validate(body)
}
module.exports=guestValidation