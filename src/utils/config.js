import dotenv from 'dotenv'
dotenv.config()

/**
 * Configuration object for the application.
 * @typedef {Object} AppConfig
 * @property {string} dbUrl - The database connection URL.
 * @property {string} secret - The secret key for JWT (JSON Web Token) generation.
 * @property {number} port - The port on which the server will listen.
 * @property {string} googlePass - The password for accessing Google services.
 * @property {string} googleUser - The username for accessing Google services.
 */
export const config = {
    dbUrl: process.env.DATABASE_URL,
    secret: process.env.JWT_SECRET,
    port: process.env.PORT,
    googlePass: process.env.APP_PASSWORD,
    googleUser: process.env.USER_NAME
}
