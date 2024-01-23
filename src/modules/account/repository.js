import { Transaction } from "../transaction/model.js"
import { Account } from "./model.js"

/**
 * Makes a transfer between accounts.
 *
 * @param {Object} transferData - Data for the transfer.
 * @param {string} transferData.accountNumber - Account number to transfer funds to.
 * @param {number} transferData.amount - Amount to transfer.
 * @param {string} transferData.remark - (Optional) Remark for the transaction.
 * @param {string} userId - User ID initiating the transfer.
 * @returns {Promise<Object>} A Promise that resolves to the transaction details.
 * @throws {Error} Throws an error if the account numbers are invalid or if the balance is too low.
 */
async function makeTransfer(transferData, userId) {
    let sesssion = null
    try {
        sesssion = await Account.startSession()
        sesssion.startTransaction()

        const senderAccount = await Account.findOne({ user_id: userId })
        const recieverAccount = await Account.findOne({ account_number: transferData.accountNumber })
        if (!senderAccount || !recieverAccount) {
            throw Error('Invalid account number')
        }
        if (senderAccount.balance < transferData.amount) {
            throw Error('Balance is too low')
        }
        await Account.findOneAndUpdate({ user_id: userId }, { $inc: { balance: -transferData.amount } }, { new: true })
        await Account.findOneAndUpdate({ account_number: transferData.accountNumber }, { $inc: { balance: +transferData.amount } }, { new: true })
        const transaction = await Transaction.create({ user_id: senderAccount.user_id, from: senderAccount.account_name, to: recieverAccount.account_name, transaction_type: 'transfer', amount: transferData.amount, remark: transferData?.remark })
        await sesssion.commitTransaction()
        sesssion.endSession()

        return transaction
    } catch (err) {
        await sesssion.abortTransaction()
        sesssion.endSession()
        throw Error(err)
    }
}


/**
 * Makes a deposit into an account.
 *
 * @param {Object} depositData - Data for the deposit.
 * @param {string} depositData.accountNumber - Account number to deposit funds into.
 * @param {number} depositData.amount - Amount to deposit.
 * @returns {Promise<Object>} A Promise that resolves to the transaction details.
 * @throws {Error} Throws an error if the account number is invalid.
 */
async function makeDeposit(depositData) {
    let session = null
    try {
        session = await Account.startSession()
        session.startTransaction()
        const account = await Account.findOne({ account_number: depositData.accountNumber })

        await Account.findOneAndUpdate({ account_number: depositData.accountNumber }, { $inc: { balance: +depositData.amount } }, { new: true })
        const transaction = await Transaction.create({ user_id: account.user_id, transaction_type: 'deposit', amount: depositData.amount })

        await session.commitTransaction()
        session.endSession()

        return transaction
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw Error(err)
    }
}

/**
 * Makes a withdrawal from an account.
 *
 * @param {Object} withdrawalData - Data for the withdrawal.
 * @param {string} withdrawalData.accountNumber - Account number to withdraw funds from.
 * @param {number} withdrawalData.amount - Amount to withdraw.
 * @returns {Promise<Object>} A Promise that resolves to the transaction details.
 * @throws {Error} Throws an error if there are insufficient funds.
 */
async function makeWithdrawal(withdrawalData) {
    let session = null
    try {
        session = await Account.startSession()
        session.startTransaction()

        const account = await Account.findOne({ account_number: withdrawalData.accountNumber })
        if (account.balance < withdrawalData.amount) {
            throw Error("Insufficient funds🤑🤑")
        }
        await Account.findOneAndUpdate({ account_number: withdrawalData.accountNumber }, { $inc: { balance: -withdrawalData.amount } }, { new: true })
        const transaction = await Transaction.create({ user_id: account.user_id, transaction_type: 'withdrawal', amount: withdrawalData.amount })

        await session.commitTransaction()
        session.endSession()

        return transaction
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw Error(err)
    }
}

/**
 * Checks the balance of a user's account.
 *
 * @param {string} userId - User ID to check the balance for.
 * @returns {Promise<Object>} A Promise that resolves to the account balance.
 * @throws {Error} Throws an error if the user ID is invalid.
 */
async function checkBalance(userId){
    try{
        return await Account.findOne({ user_id: userId }, 'balance')
    }catch(err){
        throw Error(err)
    }
}

// /**
//  * Repository object containing functions related to account transactions.
//  * @type {Object}
//  * @property {Function} makeTransfer - Function to make a transfer between accounts.
//  * @property {Function} makeDeposit - Function to make a deposit into an account.
//  * @property {Function} makeWithdrawal - Function to make a withdrawal from an account.
//  * @property {Function} checkBalance - Function to check the balance of a user's account.
//  */
export const repository = {
    makeTransfer,
    makeDeposit,
    makeWithdrawal,
    checkBalance
}
