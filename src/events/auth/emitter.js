import EventEmitter from 'events'
const authEvent = new EventEmitter()
import repository from '../../modules/auth/repository.js'
import { v4 as uuidv4 } from 'uuid'
import { sendMail } from '../../service/email/mailer.js'

/**
 * Sends a verification email to the specified user's email address.
 *
 * @param {Object} data - The data object containing email and additional information.
 * @param {string} data.email - The email address of the user.
 * @returns {Promise<void>} - A promise that resolves once the email has been sent.
 * @throws {Error} - Throws an error if there is an issue during the process.
 */
authEvent.on('sendVerificationEmail', async (data) => {
    try {
        // Generate a unique token
        const token = uuidv4()

        // Store the token in the repository for later verification
        await repository.createToken(data.email, token)

        // Compose the content of the verification email
        const emailContent = {
            to: data.email,
            subject: 'Welcome to Simple fictious Bank🤑🙌',
            html: `<h3>Please click <a href="${'http://localhost:${token}'}">here</a> to verify your email</h3>`
        }
        await sendMail(emailContent)
    } catch (err) {
        throw Error(err)
    }
})

export default authEvent