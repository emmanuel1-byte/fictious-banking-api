


// beforeAll(async () => {
//     await mongoose.connect(config.dbUrl)
// })

// describe("Test the root path", () => {
//     test("GET /", async () => {
//         const response = await request(app).get("/")
//         expect(response.statusCode).toBe(200)
//     })
// })

// describe("Endpoints", () => {
//     let accessToken

//     test('POST /api/register - Successful registration', async () => {
//         console.log('Before API request');
//         const response = await request(app).post('/api/register')
//             .send({
//                 full_name: "dev_Emmanel",
//                 email: "hilaryemmanuel841@gmail.com",
//                 phone_number: "08132592260",
//                 password: "100"
//             })
            

//         expect(response.statusCode).toBe(201);
//         expect(response.body).toEqual({
//             message: "Registration successful. Check your email!"
//         })
//         console.log('After API request');
//     })

//     test('POST /api/login - Successful login', async () => {
//         const response = await request(app).post('/api/login')
//             .send({
//                 email: "hilaryemmanuel841@gmail.com",
//                 password: "100"
//             })
//             .timeout(30000)

//         expect(response.statusCode).toBe(200);
//         expect(response.body.message).toEqual("Login successful")
//         expect(response.body.data.token).toBeTruthy()
//         expect(response.body.data.user).toBeTruthy()

//         accessToken = response.body.data.token
//     })

//     test('POST /api/transfer - Successful transfer', async () => {
//         const response = await request(app).post('/api/transfer')
//             .set('Authorization', `Bearer ${accessToken}`)
//             .send({
//                 accountName: "snr man",
//                 accountNumber: 8132592260,
//                 amount: 5000.00
//             })
//             .timeout(30000)

//         expect(response.statusCode).toBe(201)
//         expect(response.body.message).toEqual('Transfer successful')
//         expect(response.body.transfer).toBeTruthy()
//     })

//     test('POST /api/deposit - Successful deposit', async () => {
//         const response = await request(app).post('/api/deposit')
//             .set('Authorization', `Bearer ${accessToken}`)
//             .send({
//                 accountNumber: 8132592260,
//                 amount: 5000.00
//             })
//             .timeout(30000)

//         expect(response.statusCode).toBe(201)
//         expect(response.body.message).toEqual('Deposit successful')
//         expect(response.body.deposit).toBeTruthy()
//     })

//     test('POST /api/withdraw - Successful withdrawal', async () => {
//         const response = await request(app).post('/api/withdraw')
//             .set('Authorization', `Bearer ${accessToken}`)
//             .send({
//                 accountNumber: 8132592260,
//                 amount: 1000.00
//             })
//             .timeout(30000)

//         expect(response.statusCode).toBe(200)
//         expect(response.body.message).toEqual('Withdrawal successful')
//         expect(response.body.withdrawal).toBeTruthy()
//     })

//     test('GET /api/balance - Successful balance check', async () => {
//         const response = await request(app).get('/api/balance')
//             .set('Authorization', `Bearer ${accessToken}`)
//             .timeout(30000)

//         expect(response.statusCode).toBe(200);
//         expect(response.body.message).toEqual('Balance retrieved successfully');
//         expect(response.body.account).toBeTruthy()
//     })

//     test('GET /api/transactions - Successful transaction retrieval', async () => {
//         const response = await request(app).get('/api/transactions')
//             .set('Authorization', `Bearer ${accessToken}`)
//             .query({ page: 1, limit: 10 })
//             .timeout(30000)

//         expect(response.statusCode).toBe(200)
//         expect(response.body.message).toEqual('Transactions retrieved successfully');
//         expect(response.body.transactions).toBeTruthy();
//     })
// })

// afterAll(async () => {
//     await mongoose.disconnect()
// })
