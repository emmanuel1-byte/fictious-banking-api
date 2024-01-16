import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    refresh_token: { type: String }
}, { autoIndex: false, autoCreate: false, timestamps: true })


const blacklistSchema = new Schema({
    token: { type: String, required: true },
}, { autoIndex: false, autoCreate: false, timestamps: true })

const tokenSchema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    expiration_time: {
        type: Date, default: function () {
            const date = new Date()
            date.setHours(date.getHours() + 1)
            return date
        }
    }
})

export const User = mongoose.model('User', userSchema)

export const BlackList = mongoose.model('Blacklist', blacklistSchema)

export const Token = mongoose.model('Token', tokenSchema)