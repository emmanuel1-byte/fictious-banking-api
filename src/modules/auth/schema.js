import Joi from "joi";

export const signUpSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().required()
})

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

