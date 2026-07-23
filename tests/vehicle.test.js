const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Auth middleware on GET /api/vehicles', () => {
  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.statusCode).toBe(401);
  });

  it('should return 401 if an invalid token is provided', async () => {
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', 'Bearer invalidtoken123');
    expect(res.statusCode).toBe(401);
  });

  it('should return 200 if a valid token is provided', async () => {
    const validToken = jwt.sign(
      { userId: 'fakeuserid', role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
  });
});