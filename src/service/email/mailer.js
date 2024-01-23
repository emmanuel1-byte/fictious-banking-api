import nodemailer from 'nodemailer'
import { config } from '../../utils/config.js'

/**
 * Sends an email using Nodemailer.
 *
 * @param {Object} data - The email data.
 * @param {string} data.to - The recipient's email address.
 * @param {string} data.subject - The subject of the email.
 * @param {string} data.html - The HTML content of the email.
 * @returns {Promise<void>} A promise that resolves when the email is sent successfully.
 * @throws {Error} Throws an error if the email fails to send.
 */
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

