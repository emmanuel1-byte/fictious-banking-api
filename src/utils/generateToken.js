import jwt from 'jsonwebtoken'
import { config } from './config.js'
import { User } from '../modules/auth/model.js'

/**
 * Generates an access token for the specified user.
 *
 * @param {string} user_id - The user ID.
 * @param {string} email - The user's email address.
 * @returns {string} The generated access token.
 * @throws {Error} Throws an error if the token generation fails.
 */
export const generateAccesToken = function (user_id, email) {
    try {
        /**
         * JWT payload for the access token.
         * @typedef {Object} AccessTokenPayload
         * @property {string} sub - User ID.
         * @property {string} email - User's email address.
         */

        const payload = { sub: user_id, email: email }
        const accessToken = jwt.sign(payload, config.secret, { expiresIn: '1d', algorithm: 'HS256' })
        return accessToken
    } catch (err) {
        throw Error(err)
    }
}

/**
 * Generates a refresh token for the specified user, updates the user document,
 * and returns the generated refresh token.
 *
 * @param {string} user_id - The user ID.
 * @returns {Promise<string>} A promise that resolves to the generated refresh token.
 * @throws {Error} Throws an error if the token generation or user update fails.
 */
export const generateRefreshToken = async function (user_id) {
    try {
          /**
         * JWT payload for the refresh token.
         * @typedef {Object} RefreshTokenPayload
         * @property {string} sub - User ID.
         */
        const payload = { sub: user_id }
        const refreshToken = jwt.sign(payload, config.secret, { expiresIn: "2d", algorithm: 'HS256' })
        await User.updateOne({ _id: user_id }, { refresh_token: refreshToken })
        return refreshToken
    } catch (err) {
        throw Error(err)
    }

}