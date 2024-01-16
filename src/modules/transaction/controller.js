import { repository } from "./repository.js"

/**
 * Retrieves a paginated list of transactions for the authenticated user.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves once the operation is complete.
 * 
 *  
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */
export const listTransaction = async function (req, res) {
     /**
     * @type {number}
     * @description The page number for pagination. Defaults to 1 if not provided.
     */

       /**
     * @type {number}
     * @description The number of transactions to retrieve per page. Defaults to 10 if not provided.
     */
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    try {
         /**
         * @type {Object}
         * @property {Array<Object>} data - Array of transaction data.
         * @property {number} total - Total number of transactions.
         */
        const getTransaction = await repository.transaction(req.user?.sub, page, limit)
        return res.status(200).json({
            message: {
                data: {
                    transactions: getTransaction.data,
                    total: getTransaction.total, totalPages: Math.ceil(getTransaction.total / limit)
                }, page: page
            }
        })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}