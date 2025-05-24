const Joi = require("joi");

const userValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email(),
    password: Joi.string().min(5).max(50).required(),
    info: Joi.string().min(2).max(250).required(),
    photo: Joi.string(),
    created_date: Joi.date(),
    updated_date: Joi.date(),
    user_is_active: Joi.string().valid("true", "false"),
  });
  return schema.validate(body);
};

module.exports = userValidation