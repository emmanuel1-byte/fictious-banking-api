import repository from "../modules/auth/repository.js"

export async function checkBlackList(req, res, next){
    try{
        const token = req.headers?.authorization
        const doesExist = await repository.findBlackListedToken(token)
        if(doesExist) return res.status(403).json({ message: 'Invalid token'})
        next()
    }catch(err){
        return res.status(500).json({ message: err.message || 'Internal Server Error'})
    }
}