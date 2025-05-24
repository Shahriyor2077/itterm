const Joi = require("joi");

exports.synonimValidation = (body) => {
  const schema = Joi.object({
    desc_id: Joi.string().required(),
    dict_id: Joi.string(),
  });
  return schema.validate(body);
};
