import Joi from "joi";

export const subcribeValidator = Joi.object({
    email: Joi.string().required(),
    

})
