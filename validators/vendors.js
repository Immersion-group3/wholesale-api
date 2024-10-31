import Joi from "joi";

export const registerVendorValidator = Joi.object({
    businessName: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),

})

export const loginVendorValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const updateProfileValidator = Joi.object({
    businessName: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string()
})