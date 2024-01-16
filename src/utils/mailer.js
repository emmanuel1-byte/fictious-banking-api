import nodemailer from 'nodemailer'
import { config } from '../config/config.js'

export const sendVerificationEmail = async (email,token) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            pass: config.googlePass,
            user: config.googleUser
        }
    })
    const verificationLink = `http://localhost:${token}`
    const mailOptions = {
        from: config.googleUser,
        to: email,
        subject: 'Verify Email',
        html: `<p>Please click <a href="${verificationLink}">here</a> to verify your email</p>`
    }
    await transporter.sendMail(mailOptions)
}

