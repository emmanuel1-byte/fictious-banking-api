import { Transaction } from "../transaction/model.js"
import { Account } from "./model.js"

/**
 * 
 * @param {object} transferData 
 * @param {object} userId 
 * @returns returns a promise
 */
async function makeTransfer(transferData, userId) {
    // (senderAccountNumber, recieverAccountNumber, amount, remark
    let sesssion = null
    try {
        sesssion = await Account.startSession()
        sesssion.startTransaction()
        console.log(userId)
        const senderAccount = await Account.findOne({ user_id: userId })
        const recieverAccount = await Account.findOne({ account_number: transferData.accountNumber })
        if (!senderAccount || !recieverAccount) {
            throw Error('Invalid account number')
        }
        if (senderAccount.balance < transferData.amount) {
            throw Error('Balance is too low')
        }
        await Account.findOneAndUpdate({ _id: userId }, { $inc: { balance: -transferData.amount } }, { new: true })
        await Account.findOneAndUpdate({ account_number: transferData.accountNumber }, { $inc: { balance: +transferData.amount } }, { new: true })
        const transaction = await Transaction.create({ user_id: senderAccount.user_id, from: senderAccount.account_name, to: recieverAccount.account_name, transaction_type: 'transfer', amount: transferData.amount })
        await sesssion.commitTransaction()
        sesssion.endSession()
        return transaction
    } catch (err) {
        await sesssion.abortTransaction()
        sesssion.endSession()
        return 
    }
}

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

async function checkBalance(userId){
    try{
        return await Account.findOne({ user_id: userId})

    }catch(err){
        throw Error(err)
    }
}

const repository = {
    makeTransfer,
    makeDeposit,
    makeWithdrawal
}

export default repository