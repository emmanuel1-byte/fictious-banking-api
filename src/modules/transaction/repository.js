import { Transaction } from "./model.js"

/**
 * Retrieves a paginated list of transactions for a specific user.
 *
 * @async
 * @function
 * @param {string} userId - The ID of the user for whom transactions are to be retrieved.
 * @param {number} page - The page number for pagination (1-indexed).
 * @param {number} limit - The number of transactions to retrieve per page.
 * @returns {Promise<{total: number, data: Array}>} - An object containing the total number of transactions and the data array.
 * @throws {Error} If an error occurs during the database operation.
 *
 * @example
 * const result = await repository.transaction('user123', 1, 10);
 * Result: { total: 20, data: [/* array of transactions ]}
*/
async function transaction(userId, page, limit){
    try{
        const total = await Transaction.countDocuments()
        const data = await Transaction.find({ user_id: userId })
        .skip((page-1)*limit)
        .limit(limit)
        return {
            total,
            data
        }
    }catch(err){
        throw Error(err)
    }
}

/**
 * Repository object containing various database-related functions.
 * @namespace
 * @property {function} transaction - Function to retrieve paginated transactions for a user.
 */
export const repository = {
    transaction
}
