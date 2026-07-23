const request = require('supertest');
const app = require('../app');       // or wherever app.js lives relative to tests/

  describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    // Ensure a known user exists before each login test
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'loginuser', password: 'correctpassword' });
  });

  it('should log in an existing user and return 200 with a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'loginuser', password: 'correctpassword' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 401 for a wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'loginuser', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
  });

  it('should return 401 for a username that does not exist', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nosuchuser', password: 'whatever' });

    expect(res.statusCode).toBe(401);
  });
});;

  