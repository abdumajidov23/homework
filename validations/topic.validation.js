const Joi = require("joi");

exports.topicValidation = (data) => {
  const schemaTopic = Joi.object({
    author_id: Joi.string().required(),
    topic_title: Joi.string().required(),
    topic_text: Joi.string().required(),
    created_date: Joi.date().default(Date.now),
    updated_date: Joi.date().default(Date.now),
    is_checked: Joi.boolean().default(false),
    is_approved: Joi.boolean().default(false),
    expert_id: Joi.types.ObjectId().default(null),
  });
  return schemaTopic.validate(data, { abortEarly: false });
};
