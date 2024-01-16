import { User } from "../modules/auth/model.js"

export const verifySignUp = async function(req, res, next) {
    try {
        const { email } = req.body
        const doesExist = await User.findOne({ email: email })
        if (doesExist) return res.status(400).json({ message: 'Email already in use!' })
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message } || "Internal Server Error")
    }
}
