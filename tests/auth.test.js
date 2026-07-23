const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('POST /api/auth/register', () => {
  it('should register a new user and return 201 with a token', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 400 if username or password is missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'onlyusername' });

    expect(res.statusCode).toBe(400);
  });
});