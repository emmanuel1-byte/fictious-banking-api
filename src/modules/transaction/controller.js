import { repository } from "./repository.js"

/**
 * Retrieves a paginated list of transactions for the authenticated user.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} A promise that resolves once the operation is complete.
 * 
 *  
 * @throws {Object} - Returns a 500 status with an error message if an error occurs.
 */


/**
 * @openapi
 * components:
 *   parameters:
 *     pageQueryParam:
 *       name: page
 *       in: query
 *       description: The page number for pagination. Defaults to 1 if not provided.
 *       required: false
 *       schema:
 *         type: integer
 *     limitQueryParam:
 *       name: limit
 *       in: query
 *       description: The number of transactions to retrieve per page. Defaults to 10 if not provided.
 *       required: false
 *       schema:
 *         type: integer
 *   responses:
 *     TransactionListResponse:
 *       description: Transactions retrieved successfully.
 *       content:
 *         application/json:
 *           example:
 *             message: 'Transactions retrieved successfully'
 *             data:
 *               transactions: []
 *               total: 0
 *               totalPages: 0
 *             page: 1
 *     InternalServerErrorResponse:
 *       description: Internal Server Error.
 *       content:
 *         application/json:
 *           example:
 *             message: 'Internal Server Error'
 * 
 * /api/transactions:
 *   get:
 *     summary: List user transactions
 *     description: Endpoint to list user transactions.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - $ref: '#/components/parameters/pageQueryParam'
 *       - $ref: '#/components/parameters/limitQueryParam'
 *     responses:
 *       '200':
 *         $ref: '#/components/responses/TransactionListResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerErrorResponse'
 *     security:
 *       - bearerAuth: []
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
            message: 'Transactions retrieved succesfully',
                data: {
                    transactions: getTransaction.data,
                    total: getTransaction.total, totalPages: Math.ceil(getTransaction.total / limit)
                }, page: page
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}