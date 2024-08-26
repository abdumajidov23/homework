const Joi = require("joi");

exports.categoryValidation = (data) => {
    const schemaCategory = Joi.object({
        category_name: Joi.string()
        .min(2)
        .message("Category name is short..")
        .max(100)
        .required()
        .messages({
            "string.empty": "Category name is required...",
            "any.required": "Category name must be entered..."
        }),
        parent_category_id: Joi.string().alphanum().message("invalide id")
    });
    return schemaCategory.validate(data,{abortEarly: false});
}