import Joi from "joi";

export const addProductValidator = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    icon: Joi.string().required(),
    category: Joi.string().required(),
    availability: Joi.string().required(),
    
});

export const updateProductValidator = Joi.object({
    title: Joi.string(),
    media: Joi.string(),
    description: Joi.string(),
    price: Joi.string(),
    category: Joi.string(),

});