const Joi = require("joi");

exports.topicValidation = (body) => {
  const schema = Joi.object({
    author_id: Joi.string().required(),
    topic_title: Joi.string().min(5).max(50).required(),
    topic_text: Joi.string().min(25).max(450).required(),
    created_date: Joi.date().required(),
    updated_date: Joi.date().required(),
    is_checked: Joi.string().valid("Ha", "Yo'q").required(),
    is_approved: Joi.string().valid("Ha", "Yo'q").required(),
    expert_id: Joi.string().required()
  });
  return schema.validate(body);
};


