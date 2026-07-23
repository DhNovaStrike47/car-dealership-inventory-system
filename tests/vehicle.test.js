const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validToken = jwt.sign(
  { userId: 'fakeuserid', role: 'user' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

const adminToken = jwt.sign(
  { userId: 'fakeadminid', role: 'admin' },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

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
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${validToken}`);
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /api/vehicles', () => {
  it('should create a new vehicle and return 201', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${validToken}`)
      .send({
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 20000,
        quantity: 5
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.make).toBe('Toyota');
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ make: 'Honda' });

    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/vehicles', () => {
  it('should return an array of vehicles', async () => {
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
describe('GET /api/vehicles/search', () => {
  beforeAll(async () => {
    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ make: 'Ford', model: 'Mustang', category: 'Coupe', price: 35000, quantity: 3 });
  });

  it('should return vehicles matching make', async () => {
    const res = await request(app)
      .get('/api/vehicles/search?make=Ford')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.some(v => v.make === 'Ford')).toBe(true);
  });

  it('should return vehicles within a price range', async () => {
    const res = await request(app)
      .get('/api/vehicles/search?minPrice=30000&maxPrice=40000')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.every(v => v.price >= 30000 && v.price <= 40000)).toBe(true);
  });
});
describe('DELETE /api/vehicles/:id', () => {
  it('should return 403 for a non-admin user', async () => {
    const createRes = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${validToken}`)
      .send({ make: 'Mazda', model: '3', category: 'Hatchback', price: 18000, quantity: 2 });

    const res = await request(app)
      .delete(`/api/vehicles/${createRes.body._id}`)
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toBe(403);
  });

  it('should delete a vehicle and return 200 for an admin user', async () => {
  const createRes = await request(app)
    .post('/api/vehicles')
    .set('Authorization', `Bearer ${validToken}`)
    .send({ make: 'Kia', model: 'Soul', category: 'Hatchback', price: 17000, quantity: 1 });

  const res = await request(app)
    .delete(`/api/vehicles/${createRes.body._id}`)
    .set('Authorization', `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
});
});