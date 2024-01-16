import { Account } from "../account/model.js";
import { BlackList, Token, User } from "./model.js";

/**
 * Creates a new user with the provided data.
 *
 * @param {Object} data - User data including full name, email, phone number, and password.
 * @returns {Promise<User>} - A promise that resolves to the newly created user.
 * @throws {Error} - If an error occurs during the user creation process.
 */
async function createUser(data) {
    let session = null
    try {
   
        session = await User.startSession()
        session.startTransaction()

        const newUser = new User({
            full_name: data.full_name, email: data.email, phone_number: data.phone_number,
            password: data.password
        })
        newUser.save({session})

        const newAcccount = new Account({
            user_id: newUser._id, account_number: newUser.phone_number,
            balance: 0.00, account_type: 'savings', account_name: newUser.full_name
        })

        newAcccount.save({session})

        await session.commitTransaction()
        session.endSession()
        return newUser
    }
    catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw Error(err)
    }
}

/**
 * Finds a user by their email address.
 *
 * @param {string} email - The email address to search for.
 * @returns {Promise<User|null>} - A promise that resolves to the found user or null if not found.
 * @throws {Error} - If an error occurs during the search process.
 */
async function findByEmail(email) {
    try {
        return await User.findOne({ email: email })
    } catch (err) {
        throw Error(err)
    }
}

/**
 * Creates a new entry in the blacklist collection with the provided token.
 *
 * @param {string} token - The token to be blacklisted.
 * @returns {Promise<BlackList>} - A promise that resolves to the newly created blacklist entry.
 * @throws {Error} - If an error occurs during the blacklist creation process.
 */
async function createBlackList(token) {
    try {
        return await BlackList.create({ token: token })
    } catch (err) {
        throw Error(err)
    }
}

/**
 * Creates a new entry in the token collection with the provided email and token.
 *
 * @param {string} email - The email associated with the token.
 * @param {string} token - The token to be stored.
 * @returns {Promise<Token>} - A promise that resolves to the newly created token entry.
 * @throws {Error} - If an error occurs during the token creation process.
 */
async function createToken(email, token) {
    try {
        return await Token.create({ email: email, token: token })
    } catch (err) {
        throw Error(err)
    }
}

/**
 * Finds a token by its value.
 *
 * @param {string} token - The token value to search for.
 * @returns {Promise<Token|null>} - A promise that resolves to the found token or null if not found.
 * @throws {Error} - If an error occurs during the search process.
 */
async function findToken(token) {
    try {
        return await Token.findOne({ token: token })
    } catch (err) {
        throw Error(err)
    }
}

/**
 * Updates the refresh token for a user with the provided user ID.
 *
 * @param {string} user_id - The ID of the user to update.
 * @returns {Promise<UpdateResult>} - A promise that resolves to the update result.
 * @throws {Error} - If an error occurs during the update process.
 */
async function updateToken(user_id) {
    try {
        return await User.updateOne({ _id: user_id }, { refresh_token: ' ' })
    } catch (err) {
        throw Error(err)
    }
}

/**
 * Finds a blacklisted token by its value.
 *
 * @param {string} token - The token value to search for in the blacklist.
 * @returns {Promise<Token|null>} - A promise that resolves to the found blacklisted token or null if not found.
 * @throws {Error} - If an error occurs during the search process.
 */
async function findBlackListedToken(token) {
    try {
        return await Token.findOne({ token: token })
    } catch (err) {
        throw Error(err)
    }

}
/**
 * Repository object containing user-related database operations.
 * @type {Object}
 * @property {Function} createUser - Creates a new user.
 * @property {Function} findByEmail - Finds a user by email.
 * @property {Function} createBlackList - Creates a new blacklist entry.
 * @property {Function} createToken - Creates a new token entry.
 * @property {Function} findToken - Finds a token by value.
 * @property {Function} updateToken - Updates a user's refresh token.
 * @property {Function} findBlackListedToken - Finds a blacklisted token by value.
 */
const repository = {
    createUser,
    findByEmail,
    createBlackList,
    createToken,
    findToken,
    updateToken,
    findBlackListedToken
}

export default repository