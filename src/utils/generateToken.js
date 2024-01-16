import jwt from 'jsonwebtoken'
import { config } from './config.js'
import { User } from '../modules/auth/model.js'

export const generateAccesToken = function (user_id, email) {
    try {
        const payload = { sub: user_id, email: email }
        const accessToken = jwt.sign(payload, config.secret, { expiresIn: '1d', algorithm: 'HS256' })
        return accessToken
    } catch (err) {
        throw Error(err)
    }
}

export const generateRefreshToken = async function (user_id) {
    try {
        const payload = { sub: user_id }
        const refreshToken = jwt.sign(payload, config.secret, { expiresIn: "2d", algorithm: 'HS256' })
        await User.updateOne({ _id: user_id }, { refresh_token: refreshToken })
        return refreshToken
    } catch (err) {
        throw Error(err)
    }

}