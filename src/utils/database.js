import mongoose from 'mongoose'

export async function dbConnection(dbUrl) {
    try {
        await mongoose.connect(dbUrl)
        console.log('Database connection established successfully')
    } catch (err) {
        console.log('Database disconnected')
        throw Error(err)
    }
}

export async function cleanUpDatabase(){
    const collections = mongoose.connection.collections
    for(const key in collections ){
        const collection = collections[key]
        await collection.deleteMany()
    }
}
