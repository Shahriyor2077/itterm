const Joi = require("joi");

const auhtorSocialValidation=(body)=>{
  const schema=Joi.object({
    author_id: Joi.string().required(),
    social_id: Joi.string().required(),
    social_link: Joi.string().required(),
  });
  return schema.validate(body);
}
module.exports=auhtorSocialValidation;


