import mongoose from 'mongoose'

/**
 * Establishes a connection to the MongoDB database.
 *
 * @param {string} dbUrl - The URL of the MongoDB database.
 * @throws {Error} If the connection to the database fails.
 * @returns {Promise<void>} A Promise that resolves when the connection is established.
 */
export const dbConnection = async function (dbUrl) {
    try {
        await mongoose.connect(dbUrl)
        console.log('Database connection established successfully')
    } catch (err) {
        console.log('Database disconnected')
        throw Error(err)
    }
}

/**
 * Cleans up the MongoDB database by deleting all documents from all collections.
 *
 * @throws {Error} If there is an error while cleaning up the database.
 * @returns {Promise<void>} A Promise that resolves when the cleanup is complete.
 */
export const cleanUpDatabase = async function (){
    const collections = mongoose.connection.collections
    for(const key in collections ){
        const collection = collections[key]
        await collection.deleteMany()
    }
}
