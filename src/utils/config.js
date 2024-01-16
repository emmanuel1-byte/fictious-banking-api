import dotenv from 'dotenv'
dotenv.config()

export const config = {
    dbUrl: process.env.DATABASE_URL,
    secret: process.env.JWT_SECRET,
    port: process.env.PORT,
    googlePass: process.env.APP_PASSWORD,
    googleUser: process.env.USER_NAME
}
