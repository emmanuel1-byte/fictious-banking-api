import EventEmitter from 'events'
import { sendMail } from '../../service/email/mailer.js'
const transactionEvent = new EventEmitter()

/**
 * Sends a transfer email notification.
 *
 * @param {object} data - The transfer data.
 * @param {string} email - The recipient's email address.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 * @throws {Error} If an error occurs during the email sending process.
 */
transactionEvent.on('transferEmail', async (data, email) => {
    try {
        /**
         * Email content for a successful transfer.
         * @type {object}
         */
        const emailContent = {
            to: email,
            subject: "Transfer reciept",
            html: `<h3>transfer succesfull</h3>
           <p>From: ${data.from}</p>
           <p>To: ${data.to}</p>
           <p> Amount: ${data.amount}</p>
           <p>Date: ${data.createdAt} </p>`
        }
        await sendMail(emailContent)
    } catch (err) {
        throw Error(err)
    }
})

/**
 * Sends a deposit email notification.
 *
 * @param {object} data - The deposit data.
 * @param {string} email - The recipient's email address.
 * @param {number} balance - The account balance after the deposit.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 * @throws {Error} If an error occurs during the email sending process.
 */
transactionEvent.on('depositEmail', async (data, email, balance) => {
    try {
         /**
         * Email content for a successful deposit.
         * @type {object}
         */
        const emailContent = {
            to: email,
            subject: 'Deposit reciept',
            html: `<h3>Deposit succesfull</h3>
           <p> Amount: ${data.amount}</p>
           <p>Balance: ${balance}</p>
           <p>Date: ${data.createdAt} </p>`
        }
        await sendMail(emailContent)
    } catch (err) {
        throw Error(err)
    }

})


/**
 * Sends a withdrawal email notification.
 *
 * @param {object} data - The withdrawal data.
 * @param {string} email - The recipient's email address.
 * @param {number} balance - The account balance after the withdrawal.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 * @throws {Error} If an error occurs during the email sending process.
 */
transactionEvent.on('withDrawEmail', async (data, email, balance) => {
    try {
         /**
         * Email content for a successful withdrawal.
         * @type {object}
         */
        const emailContent = {
            to: email,
            subject: 'Withdraw reciept',
            html: `<h3>WithDraw succesfull</h3>
           <p>Amount: ${data.amount}</p>
           <p>Balance: ${balance}</p>
           <p>Date: ${data.createdAt} </p>`
        }
        await sendMail(emailContent)
    } catch (err) {
        throw Error(err)
    }

})

/**
 * Sends an account balance email notification.
 *
 * @param {object} data - The data containing the account balance.
 * @param {string} email - The recipient's email address.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 * @throws {Error} If an error occurs during the email sending process.
 */
transactionEvent.on('balanceEmail', async (data, email) => {
    try {
         /**
         * Email content for an account balance notification.
         * @type {object}
         */
        const emailContent = {
            to: email,
            subject: 'Account Balance',
            html: `<h3>Balance</h3>
           <p>Balance: ${data.balance}</p>
           <p>Date: ${new Date()} </p>`
        }
        await sendMail(emailContent)
    } catch (err) {
        throw Error(err)
    }

})


export default transactionEvent