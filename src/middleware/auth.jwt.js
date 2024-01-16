import jwt from 'jsonwebtoken'
import { config } from "../config/config.js";

export async function catchError(err, res) {
    try{
        if (err instanceof jwt.TokenExpiredError) return res.status(401).json({ message: 'Access token has expired Unauthorized!' })
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' })
    }
   
}

export async function validateJwt(req, res, next) {
    const accessToken = req.headers.authorization
    if (!accessToken) return res.status(400).json({ message: 'Access token required' })
    jwt.verify(accessToken, config.secret, (err, decoded) => {
        if (err) return catchError(err, res)
        req.user = decoded
        next()
    })
}