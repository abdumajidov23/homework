const Joi = require("joi")
exports.userValidation = (data) => {
    const schemaUser = Joi.object({
        user_name: Joi.string(),
        user_email: Joi.string().email().lowercase(),
        user_password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
        confirm_password: Joi.ref("user_password"),
        user_info: Joi.string(),
        user_photo: Joi.string().default("/user/user.png"),
        user_is_active: Joi.boolean().default(false)
    });
    return schemaUser.validate(data,{abortEarly: false});
}