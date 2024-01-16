import { Transaction } from "./model.js"

export async function transaction(userId){
    try{
        return await Transaction.find({ user_id: userId })
    }catch(err){
        throw Error(err)
    }
}