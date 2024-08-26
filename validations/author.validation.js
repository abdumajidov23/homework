const Joi = require("joi")

const fullName = (parent) => parent.first_name + " " + parent.last_name

exports.authorValidation = (data) => {
    const schemaAuthor = Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        full_name: Joi.string().default(fullName),
        nick_name: Joi.string(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")),
        confirm_password: Joi.ref("password"),
        email: Joi.string().email().lowercase(),
        phone: Joi.string().pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/),
        info: Joi.string(),
        position: Joi.string(),
        photo: Joi.string().default("/author/avatar.png"),
        is_expert: Joi.boolean().default(false),
        is_active: Joi.boolean().default(false)
    });
    return schemaAuthor.validate(data,{abortEarly: false});
}
       
       