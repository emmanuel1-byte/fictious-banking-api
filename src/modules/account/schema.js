import Joi from "joi";

export const transferSchema = Joi.object({
    accountNumber: Joi.number().required(),
    accountName: Joi.string().required(),
    amount: Joi.number().required(),
    remark: Joi.string()
})

export const depositSchema = Joi.object({
    accountNumber: Joi.number().required(),
    amount: Joi.number().required()
})

export const withdrawalSchema = Joi.object({
    accountNumber: Joi.number().required(),
    amount: Joi.number().required()
})