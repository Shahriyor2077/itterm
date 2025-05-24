const Joi = require("joi");

exports.descValidation = (body) => {
  const schema = Joi.object({
    category_id: Joi.string().required(),
    desc: Joi.string(),
  });
  return schema.validate(body);
};

