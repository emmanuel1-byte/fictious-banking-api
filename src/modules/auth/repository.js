import { Account } from "../account/model.js";
import { BlackList, Token, User } from "./model.js";
import bcrypt from 'bcrypt'


async function create(data) {
    // I would be making use of transaction
    let session = null
    try {
        // start transaction
        session = await User.startSession()
        session.startTransaction()

       const newUser =  await User.create([{
            full_name: data.full_name, email: data.email, phone_number: data.phone_number,
            password: await bcrypt.hash(data.password, 10)
        }], { session })
        const user = await User.findOne({ email: data.email }).session(session)
        await Account.create([{
            user_id: user._id, account_number: data.phone_number,
            balance: 5000.00, account_type: 'savings', account_name: user.full_name
        }], { session })

        // commit the transaction
        await session.commitTransaction()
        session.endSession()
        return newUser
    }
    catch (err) {
        // Incase of an error rollback the transaction
        await session.abortTransaction()
        session.endSession()
        console.error(err)
        throw Error(err)
    }
}

async function findByEmail(email) {
    try {
        return await User.findOne({ email: email })
    } catch (err) {
        throw Error(err)
    }
}

async function createBlackList(token) {
    try {
        return await BlackList.create({ token: token })
    } catch (err) {
        throw Error(err)
    }
}

async function createToken(email, token) {
    try {
        return await Token.create({ email: email, token: token })
    } catch (err) {
        throw Error(err)
    }
}
async function findToken(token) {
    try {
        return await Token.findOne({ token: token })
    } catch (err) {
        throw Error(err)
    }
}

async function UpdateUser(user_id) {
    try {
        return await User.updateOne({ _id: user_id }, { refresh_token: ' ' })
    } catch (err) {
        throw Error(err)
    }
}

async function findBlackListedToken(token){
    try{
        return await Token.findOne({ token: token})
    }catch(err){
        throw Error(err)
    }

}

const repository = {
    create,
    findByEmail,
    createBlackList,
    createToken,
    findToken,
    UpdateUser,
    findBlackListedToken
}

export default repository