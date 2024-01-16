import mongoose, { Schema } from 'mongoose'
/**
 * @typedef {Object} Account
 * @property {mongoose.Schema.Types.ObjectId} user_id - The user ID associated with the account. References 'User' model.
 * @property {number} account_number - The unique account number. Required and must be unique.
 * @property {string} account_name - The unique account name.
 * @property {mongoose.Types.Decimal128} balance - The balance of the account. Required.
 * @property {('savings' | 'current')} account_type - The type of the account. Should be one of 'savings' or 'current'.
 * @property {Date} createdAt - The timestamp representing when the account was created. Automatically generated.
 * @property {Date} updatedAt - The timestamp representing when the account was last updated. Automatically generated.
 */
const accountSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    account_number: { type: Number, required: true, unique: true },
    account_name: { type: String,  unique: true },
    balance: { type: mongoose.Types.Decimal128, required: true },
    account_type: { type: String, enum: ['savings', 'current'] }
}, { autoIndex: false, autoCreate: false, timestamps: true })

export const Account = mongoose.model('Account', accountSchema)