import nodemailer from 'nodemailer'
import { config } from '../../utils/config.js'

export const sendMail = async (data) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            pass: config.googlePass,
            user: config.googleUser
        }
    })
    const mailOptions = {
        from: config.googleUser,
        to: data.to,
        subject: data.subject,
        html: data.html
    }
    try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent succesfully')
    } catch (err) {
        console.log('Email was not sent', err)
    }
}

