const request = require('supertest');
const app = require('../app');

describe('sanity check', () => {
  it('GET / should respond', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBeDefined();
  });
});