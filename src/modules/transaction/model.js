import mongoose, { Schema } from 'mongoose'

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