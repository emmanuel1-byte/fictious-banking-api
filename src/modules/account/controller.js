import { depositSchema, transferSchema, withdrawalSchema } from "./schema.js"
import repository from "./repository.js"

export async function transfer(req, res) {
    try {
        const validationResult = transferSchema.validate(req.body)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const makeTransfer = await repository.makeTransfer(validationResult?.value, req.user?.sub)
        return res.status(201).json({ message: "Transfer succesfull", data: { transfer: makeTransfer } })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

export async function deposit(req, res) {
    try {
        const validationResult = depositSchema.validate(req.body)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const makedeposit = await repository.makeDeposit(validationResult.value, req.id)
        return res.status(201).json({ message: "Deposit succesfull", data: { transfer: makedeposit } })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}

export async function withdraw(req, res) {
    try {
        const validationResult = withdrawalSchema.validate(req.body)
        if (validationResult.error) return res.status(400).json({ message: validationResult.error.details[0]?.message })
        const makeWithdrawal = await repository.makeWithdrawal(validationResult.value)
        return res.status(201).json({ message: "Withdawal successfull", data: { withdrawal: makeWithdrawal } })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error" })
    }
}
