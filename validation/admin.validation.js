const Joi = require("joi");

exports.adminValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\+?[1-9]\d{1,14}$/)
      .required(),
    password: Joi.string().min(8).required(),
    is_active: Joi.boolean().default(false),
    is_creator: Joi.boolean().default(false),
    created_date: Joi.date(),
    updated_date: Joi.date(),
  });
  return schema.validate(body);
};


