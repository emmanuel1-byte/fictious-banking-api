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
        console.error('Database disconnected', err)
    }
}

