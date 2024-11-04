import Joi from "joi";

export const signupClientValidator = Joi.object({
    businessName: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    // confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        // 'any.only': 'Passwords do not match'
    // }),
    // role: Joi.string().valid("client", "vendor").default("client")
    // confirmPassword: Joi.string().required,
    // role: Joi.string().valid("client", "vendor")

})

export const signinClientValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const updateProfileValidator = Joi.object({
    businessName: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string()
})