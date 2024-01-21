import mongoose from "mongoose";

export function dbConnection(dbUrl) {
    mongoose.connect(dbUrl)

    const db = mongoose.connection

    db.on('error', (err) => {
        console.log(`Database connection failed due to ${err}`)
    })

    db.once('open', async() => {
        console.log(`Database connection established successfully`)
    })

    db.on('disconnect', (err) => {
        console.log(`Database disconnected ${err}`)
    })

}
