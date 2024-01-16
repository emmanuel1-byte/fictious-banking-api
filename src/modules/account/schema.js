import Joi from "joi";

/**
 * Joi schema for transferring funds.
 * @type {Joi.ObjectSchema<TransferSchema>}
 */
export const transferSchema = Joi.object({
    accountNumber: Joi.number().required(),
    accountName: Joi.string().required(),
    amount: Joi.number().required(),
    remark: Joi.string()
})

/**
 * Joi schema for depositing funds.
 * @type {Joi.ObjectSchema<DepositSchema>}
 */
export const depositSchema = Joi.object({
    accountNumber: Joi.number().required(),
    amount: Joi.number().required()
})

/**
 * Joi schema for withdrawing funds.
 * @type {Joi.ObjectSchema<WithdrawalSchema>}
 */
export const withdrawalSchema = Joi.object({
    accountNumber: Joi.number().required(),
    amount: Joi.number().required()
})