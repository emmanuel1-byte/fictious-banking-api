import request from 'supertest';
import app from '../../src/app';
import { cleanUpDatabase } from '../../src/utils/database';

let accessToken

// beforeAll(async () => await cleanUpDatabase())

describe('User Registration', () => {
    test('POST /api/register - Successful registration', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                full_name: 'dev_Emmanel',
                email: 'emmanuelhilary9@gmail.com',
                phone_number: '08132592260',
                password: '100',
            })

        expect(response.statusCode).toBe(201)
    })
})


describe('User Login', () => {
    test('POST /api/login - Successful login', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'emmanuelhilary9@gmail.com',
                password: '100'
            })

        expect(response.statusCode).toBe(200)

        accessToken = response.body.data.token
        console.log(accessToken)
    })
})


describe('Transfer transaction', () => {
    test('POST /api/transfer - Successful transfer', async () => {
        const response = await request(app).post('/api/transfer')
            .set('Authorization', `${accessToken}`)
            .send({
                accountName: "snr man",
                accountNumber: 70132592345,
                amount: 5000.00
            })

        expect(response.statusCode).toBe(201)
    })
})


describe('Deposit transaction', () => {
    test('POST /api/deposit - Successful deposit', async () => {
        const response = await request(app).post('/api/deposit')
            .set('Authorization', `${accessToken}`)
            .send({
                accountNumber: 8132592260,
                amount: 5000.00
            })

        expect(response.statusCode).toBe(201)
    })
})


describe('Withdraw transaction', () => {
    test('POST /api/withdraw - Successful withdrawal', async () => {
        const response = await request(app).post('/api/withdraw')
            .set('Authorization', `${accessToken}`)
            .send({
                accountNumber: 8132592260,
                amount: 1000.00
            })

        expect(response.statusCode).toBe(201)
    })
})


describe('Check Account Balance', () => {
    test('GET /api/balance - Successful balance check', async () => {
        const response = await request(app).get('/api/balance')
            .set('Authorization', `${accessToken}`)

        expect(response.statusCode).toBe(200)
    })
})


describe('List transactions', () => {
    test('GET /api/transactions - Successful transaction retrieval', async () => {
        const response = await request(app).get('/api/transactions')
            .set('Authorization', `${accessToken}`)
            .query({ page: 1, limit: 10 })

        expect(response.statusCode).toBe(200)
    })
})
