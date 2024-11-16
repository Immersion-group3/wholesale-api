import Joi from "joi";

export const addProductValidator = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    icon: Joi.string().required(),
    availability: Joi.string().required(),
    deliveryDate: Joi.string().required()
    
});

export const updateProductValidator = Joi.object({
    title: Joi.string(),
    icon: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    deliveryDate: Joi.date()

});