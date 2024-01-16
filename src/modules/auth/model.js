import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

/**
 * User schema definition.
 *
 * @typedef {Object} UserSchema
 * @property {string} full_name - The full name of the user.
 * @property {string} email - The email address of the user. (unique, required)
 * @property {number} phone_number - The phone number of the user. (unique, required)
 * @property {string} password - The hashed password of the user. (required)
 * @property {string} refresh_token - The refresh token associated with the user.
 * @property {Date} createdAt - The timestamp when the user was created.
 * @property {Date} updatedAt - The timestamp when the user was last updated.
 */
const userSchema = new Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    refresh_token: { type: String }
}, { autoIndex: false, autoCreate: false, timestamps: true })

/**
 * Pre-save middleware for hashing the user's password before saving.
 *
 * @memberof UserSchema
 * @function
 * @name preSave
 * @param {function} next - Callback function to be called after pre-save operations.
 */
userSchema.pre('save', async function (next) {
    let self = this
    if (!self.isModified('password')) return next()
    try {
        const hashedPassword = await bcrypt.hash(self.password, 10)
        self.password = hashedPassword
        next()
    } catch (err) {
        return next(err)
    }
})

export const User = mongoose.model('User', userSchema)

/**
 * Blacklist schema definition.
 *
 * @typedef {Object} BlacklistSchema
 * @property {string} token - The token to be blacklisted. (required)
 * @property {Date} createdAt - The timestamp when the blacklist entry was created.
 * @property {Date} updatedAt - The timestamp when the blacklist entry was last updated.
 */
const blacklistSchema = new Schema({
    token: { type: String, required: true },
}, { autoIndex: false, autoCreate: false, timestamps: true })

export const BlackList = mongoose.model('Blacklist', blacklistSchema)

/**
 * Token schema definition.
 *
 * @typedef {Object} TokenSchema
 * @property {string} email - The email address associated with the token. (required)
 * @property {string} token - The token value. (unique, required)
 * @property {Date} expiration_time - The expiration time of the token. (default: 1 hour from creation)
 */
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

export const Token = mongoose.model('Token', tokenSchema)