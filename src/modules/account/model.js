import mongoose, { Schema } from 'mongoose'

const accountSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    account_number: { type: Number, required: true, unique: true },
    account_name: { type: String,  unique: true },
    balance: { type: mongoose.Types.Decimal128, required: true },
    account_type: { type: String, enum: ['savings', 'current'] }
}, { autoIndex: false, autoCreate: false, timestamps: true })

export const Account = mongoose.model('Account', accountSchema)