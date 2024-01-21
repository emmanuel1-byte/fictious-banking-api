import { depositSchema, transferSchema, withdrawalSchema } from "./schema.js"
import repository from "./repository.js"
import transactionEvent from "../../events/transaction/emitter.js"

/**
 * Transfer funds from one account to another.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or error.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Transfer:
 *       type: object
 *       properties:
 *         accountName:
 *           type: string
 *         accountNumber:
 *           type: string
 *         amount:
 *           type: integer
 *       required:
 *         - accountName
 *         - accountNumber
 *         - amount
*/

/**
 * @openapi
 * /api/transfer:
 *   post:
 *     summary: Make a transfer
 *     description: Endpoint to transfer funds.
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transfer'
 *     responses:
 *       201:
 *         description: Transfer successful
 *         content:
 *           application/json:
 *             example:
 *               message: Transfer successful
 *               data:
 *                 transfer: { Your transfer data here }
 *       400:
 *         description: Bad Request. Invalid input.
 *         content:
 *           application/json:
 *             example:
 *               message: Validation failed. Please check your input.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
export const transfer = async function (req, res) {
    try {
        const validationResult = transferSchema.validate(req.body)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const makeTransfer = await repository.makeTransfer(validationResult?.value, req.user?.sub)
        if (!makeTransfer) return res.status(500).json({ message: "Transfer failed" })
        transactionEvent.emit('transferEmail', makeTransfer, req.user?.email)
        return res.status(201).json({ message: "Transfer succesfull", data: { transfer: makeTransfer } })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

/**
 * Deposit funds into the user's account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or error.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Deposit:
 *       type: object
 *       properties:
 *         accountNumber:
 *           type: integer
 *         amount:
 *           type: integer
 *       required:
 *         - accountNumber
 *         - amount
*/

/**
 * @openapi
 * /api/deposit:
 *   post:
 *     summary: Make a deposit
 *     description: Endpoint to deposit funds.
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Deposit'
 *     responses:
 *       201:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             example:
 *               message: Deposit successful
 *               data:
 *                 deposit: { Your deposit data here }
 *       400:
 *         description: Bad Request. Invalid input.
 *         content:
 *           application/json:
 *             example:
 *               message: Validation failed. Please check your input.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
export const deposit = async function (req, res) {
    try {
        const validationResult = depositSchema.validate(req.body)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const makedeposit = await repository.makeDeposit(validationResult.value, req.user?.sub)
        if (!makedeposit) return res.status(500).json({ message: 'Deposit failed' })
        const account = await repository.checkBalance(req.user?.sub)
        transactionEvent.emit('depositEmail', makedeposit, req.user?.email, account.balance)
        return res.status(201).json({ message: "Deposit succesfull", data: { deposit: makedeposit } })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

/**
 * Withdraw funds from the user's account.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or error.
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Withdrawal:
 *       type: object
 *       properties:
 *         accountNumber:
 *           type: string
 *         amount:
 *           type: integer
 *       required:
 *         - accountNumber
 *         - amount
*/

/**
 * @openapi
 * /api/withdraw:
 *   post:
 *     summary: Make a withdrawal
 *     description: Endpoint to withdraw funds.
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Withdrawal'
 *     responses:
 *       201:
 *         description: Withdrawal successful
 *         content:
 *           application/json:
 *             example:
 *               message: Withdrawal successful
 *               data:
 *                 withdrawal: { Your withdrawal data here }
 *       400:
 *         description: Bad Request. Invalid input.
 *         content:
 *           application/json:
 *             example:
 *               message: Validation failed. Please check your input.
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
export const withdraw = async function (req, res) {
    try {
        const validationResult = withdrawalSchema.validate(req.body)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const makeWithdrawal = await repository.makeWithdrawal(validationResult.value)
        if (!makeWithdrawal) return res.status(500).json({ message: 'Withdrawal failed' })
        const account = await repository.checkBalance(req.user?.sub)
        transactionEvent.emit('withDrawEmail', makeWithdrawal, req.user?.email, account.balance)
        return res.status(201).json({ message: "Withdawal successfull", data: { withdrawal: makeWithdrawal } })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

/**
 * Get the account balance for the user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating success or error.
 */


/**
 * @openapi
 * /api/balance:
 *   get:
 *     summary: Get account balance
 *     description: Endpoint to retrieve account balance.
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Balance retrieved successfully
 *               data:
 *                 account: { Your account balance data here  }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
export const accountBalance = async function (req, res) {
    try {
        const account = await repository.checkBalance(req.user.sub)
        transactionEvent.emit('balanceEmail', account, req.user?.email)
        return res.status(200).json({ message: "Balance retrieved successfully", data: { account } })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}
