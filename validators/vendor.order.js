import Joi from "joi";

export const addOrderValidator = Joi.object({
  orderId: Joi.string().required(),
  date: Joi.string().required(),
  amount: Joi.number().required(),
  status: Joi.string().valid("in preparation", "in transit", "delivered"),
});

export const updateOrderValidator = Joi.object({
  orderId: Joi.string().required(),
  date: Joi.string().required(),
  amount: Joi.number().required(),
  status: Joi.string().valid("in preparation", "in transit", "delivered"),
});
