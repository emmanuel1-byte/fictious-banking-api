import jwt from 'jsonwebtoken'
import { config } from "../utils/config.js";

/**
 * Handles JWT token expiration error and sends an appropriate response.
 *
 * @param {Error} err - The error object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {import('express').Response} - The updated Express response object.
 */
export async function catchError(err, res) {
    try {
        if (err instanceof jwt.TokenExpiredError) return res.status(401).json({ message: 'token has expired Unauthorized!' })
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

}

/**
 * Validates the provided JWT token in the request headers.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function.
 * @returns {void}
 */
export const validateAccessToken = async function (req, res, next) {
    const accessToken = req.headers.authorization
    if (!accessToken) return res.status(400).json({ message: 'Access token required' })
    jwt.verify(accessToken, config.secret, (err, decoded) => {
        if (err) return catchError(err, res)
        req.user = decoded
        next()
    })
}

export const validateRefreshToken = async function (req, res, next) {
    const refreshToken = req.cookies?.refreshToken
    console.log(refreshToken)
    jwt.verify(refreshToken, config.dbUrl, (err, decoded) => {
        if (err) catchError(err, res)
        req.id = decoded.sub
        next()
    })
}