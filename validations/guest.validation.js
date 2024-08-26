const Joi = require("joi");

exports.adminValidation = (data) => {
  const schemaGuest = Joi.object({
    guest_ip: Joi.string().pattern(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/),
    guest_os: Joi.string(),
    guest_browser: Joi.string(),
    guest_device: Joi.string(),
    guest_reg_date: Joi.date().default(Date.now),
  });
  return schemaGuest.validate(data, { abortEarly: false });
};
