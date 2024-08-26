const Joi = require("joi")

exports.adminValidation = (data) => {
    const schemaAdmin = Joi.object({
        admin_name: Joi.string(),
        admin_email: Joi.string().email().lowercase(),
        admin_phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),
        admin_password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
        confirm_password: Joi.ref("admin_password"),
        admin_is_active: Joi.boolean().default(false),
        admin_is_creater: Joi.boolean().default(false),
        created_date: Joi.date().default(Date.now),
        updated_date: Joi.date().default(Date.now),
    });
    return schemaAdmin.validate(data,{abortEarly: false});
}