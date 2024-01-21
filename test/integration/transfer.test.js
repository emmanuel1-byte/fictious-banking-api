// import request from "supertest";
// import app from '../../src/app'
// import mongoose from "mongoose";
// import { config } from "../../src/utils/config";
// import { accessToken } from "./login.test";

// beforeAll(async function(){
//     await mongoose.connect(config.dbUrl)
// })

// test('POST /api/transfer - Successful transfer', async () => {
//     const response = await request(app).post('/api/transfer')
//         .set('Authorization', `Bearer ${accessToken}`)
//         .send({
//             accountName: "snr man",
//             accountNumber: 8132592260,
//             amount: 5000.00
//         })
//         .timeout(30000)

//     expect(response.statusCode).toBe(201)
//     expect(response.body.message).toEqual('Transfer successful')
//     expect(response.body.transfer).toBeTruthy()
// })

// test('POST /api/deposit - Successful deposit', async () => {
//     const response = await request(app).post('/api/deposit')
//         .set('Authorization', `Bearer ${accessToken}`)
//         .send({
//             accountNumber: 8132592260,
//             amount: 5000.00
//         })
//         .timeout(30000)

//     expect(response.statusCode).toBe(201)
//     expect(response.body.message).toEqual('Deposit successful')
//     expect(response.body.deposit).toBeTruthy()
// })

// test('POST /api/withdraw - Successful withdrawal', async () => {
//     const response = await request(app).post('/api/withdraw')
//         .set('Authorization', `Bearer ${accessToken}`)
//         .send({
//             accountNumber: 8132592260,
//             amount: 1000.00
//         })
//         .timeout(30000)

//     expect(response.statusCode).toBe(200)
//     expect(response.body.message).toEqual('Withdrawal successful')
//     expect(response.body.withdrawal).toBeTruthy()
// })

// test('GET /api/balance - Successful balance check', async () => {
//     const response = await request(app).get('/api/balance')
//         .set('Authorization', `Bearer ${accessToken}`)
//         .timeout(30000)

//     expect(response.statusCode).toBe(200);
//     expect(response.body.message).toEqual('Balance retrieved successfully');
//     expect(response.body.account).toBeTruthy()
// })

// test('GET /api/transactions - Successful transaction retrieval', async () => {
//     const response = await request(app).get('/api/transactions')
//         .set('Authorization', `Bearer ${accessToken}`)
//         .query({ page: 1, limit: 10 })
//         .timeout(30000)

//     expect(response.statusCode).toBe(200)
//     expect(response.body.message).toEqual('Transactions retrieved successfully');
//     expect(response.body.transactions).toBeTruthy();
// })

// afterAll(async function(){
//     await mongoose.disconnect()
// })
