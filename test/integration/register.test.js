import request from "supertest";
import app from '../../src/app'
import mongoose from "mongoose";
import { config } from "../../src/utils/config";
import { dbConnection } from "../../src/utils/database";

// Import necessary modules

beforeAll(async () => {
    // Set up any necessary setup, such as database connections
    dbConnection(config.dbUrl)
  })
  
  test('POST /api/register - Successful registration', async () => {
    // Your test logic here
    const response = await request(app).post('/api/register').send({
      full_name: "dev_Emmanel",
      email: "hilaryemmanuel841@gmail.com",
      phone_number: "08132592260",
      password: "100"
    })
  
    expect(response.statusCode).toBe(201);
  })
  
  afterAll(async () => {
    // Clean up, disconnect from the database, etc.
    await mongoose.disconnect()
  })
  