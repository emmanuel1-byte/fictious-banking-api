import Joi from "joi";

/**
 * @type {import('joi').ObjectSchema<SignUpSchema>}
 * @description Joi schema for user sign-up.
 */
export const signUpSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().required()
})

/**
 * @type {import('joi').ObjectSchema<SignInSchema>}
 * @description Joi schema for user sign-in.
 */
export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

