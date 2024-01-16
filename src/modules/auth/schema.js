import Joi from "joi";

/**
 * @typedef {Object} SignUpSchema
 * @property {string} full_name - The full name of the user. Required.
 * @property {string} email - The email address of the user. Must be a valid email format. Required.
 * @property {string} phone_number - The phone number of the user. Required.
 * @property {string} password - The password of the user. Required.
 */

/**
 * @constant
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
 * @typedef {Object} SignInSchema
 * @property {string} email - The email address of the user. Must be a valid email format. Required.
 * @property {string} password - The password of the user. Required.
 */

/**
 * @constant
 * @type {import('joi').ObjectSchema<SignInSchema>}
 * @description Joi schema for user sign-in.
 */
export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

