import Joi from "joi";


export const addDeliveryDateValidator = Joi.object({
  productId: Joi.string(),
  deliveryDate: Joi.alternatives()
    .try(
      Joi.date(), // Single date
      Joi.array().items(Joi.date()) // Array of dates
    )
    .required(),
});

