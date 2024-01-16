import mongoose, { Schema } from 'mongoose'

/**
 * @typedef {Object} Transaction
 * @property {mongoose.Types.ObjectId} user_id - The ID of the user associated with the transaction.
 * @property {mongoose.Types.ObjectId} account_id - The ID of the account associated with the transaction.
 * @property {string} from - The source of the transaction (e.g., user, account, etc.).
 * @property {string} to - The destination of the transaction (e.g., user, account, etc.).
 * @property {mongoose.Types.Decimal128} amount - The amount involved in the transaction.
 * @property {string} transaction_type - The type of the transaction (e.g., "transfer", "withdrawal", "deposit").
 * @property {string} [remark] - Additional remarks or notes about the transaction.
 * @property {Date} createdAt - The timestamp when the transaction was created.
 * @property {Date} updatedAt - The timestamp when the transaction was last updated.
 */
const transactionSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    from: { type: String },
    to: { type: String },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    transaction_type: { type: String, enum: ["transfer", "withdrawal", "deposit"], required: true },
    remark: { type: String }
}, { autoIndex: false, autoCreate: false, timestamps: true })

export const Transaction = mongoose.model('Transaction', transactionSchema)