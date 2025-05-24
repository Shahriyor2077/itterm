const Joi = require("joi");

exports.socialValidation = (body) => {
  const schema = Joi.object({
    social_name: Joi.string().min(2).max(50).required(),

    social_icon_file: Joi.string().uri().required(),
  });

  return schema.validate(body);
};
