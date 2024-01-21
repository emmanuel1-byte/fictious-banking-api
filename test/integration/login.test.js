import request from "supertest";
import app from '../../src/app'
import mongoose from "mongoose";
import { config } from "../../src/utils/config";
import { dbConnection } from "../../src/utils/database";

beforeAll(async function(){
    dbConnection(config.dbUrl)
})

test('POST /api/login - Successful login', async () => {
    const response = await request(app).post('/api/login')
        .send({
            email: "hilaryemmanuel841@gmail.com",
            password: "100"
        })
        .timeout(30000)

    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toBeTruthy()
    expect(response.body.data.user).toBeTruthy()

    accessToken = response.body.data.token
    console.log(accessToken)
})
afterAll(async function(){
    await mongoose.disconnect()
})

export let accessToken;