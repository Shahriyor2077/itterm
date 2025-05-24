const Joi = require("joi");

exports.categoryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .message("Kategoriya 5ta harfdan kam bo'lmasligi kerak")
      .required()
      .trim()
      .messages({
        "string.empty": "Kategoriya bo'sh bo'lishi mumkin emas",
        "any.required": "Kategoriya kirilitlishi shart",
      }),
    parent_category_id: Joi.string().required().messages({
      "string.empty": "Kategoriya id bo'sh bo'lishi mumkin emas",
      "any.required": "Kategoriya id kirilitlishi shart",
    }),
  });
  return schema.validate(body);
};

