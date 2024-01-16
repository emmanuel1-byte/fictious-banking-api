import { transaction } from "./repository.js"

export async function listTransaction(req, res){
    try{
     const getTransaction = await transaction(req.user?.sub)
     return res.status(200).json({ message: {data: { transactions: getTransaction }}})
    }catch(err){
        return res.status(500).json({ message: err.message || "Internal Server Error"})
    }
}