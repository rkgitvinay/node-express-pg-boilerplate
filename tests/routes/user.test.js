const request = require('supertest');
const app = require('../../src/app');

let authToken;

beforeAll(async () => {
  const res = await request(app).post('/api/v1/auth/login').send({
    email: 'admin@example.com',
    password: 'Password@123',
  });
  authToken = res.body.data?.token?.access?.token;
});

describe('🔐 Authenticated User Routes', () => {
  test('GET /api/v1/users should return user list if authenticated', async () => {
    const res = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(Array.isArray(res.body.data.users)).toBe(true);
  });

  test('GET /api/v1/users should fail without token', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toMatch(/token/i);
  });

  test('GET /api/v1/users/:id should return user details if authenticated', async () => {
    const res = await request(app)
      .get('/api/v1/users/1')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.data.id).toBe(1);
  });

  test('GET /api/v1/users/:id should fail without token', async () => {
    const res = await request(app).get('/api/v1/users/1');
    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toMatch(/token/i);
  });

  test('GET /api/v1/users/:id should fail with invalid token', async () => {
    const res = await request(app)
      .get('/api/v1/users/1')
      .set('Authorization', `Bearer invalid-token`);

    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toMatch(/token/i);
  });

  test('GET /api/v1/users/:id should fail with invalid user id', async () => {
    const res = await request(app)
      .get('/api/v1/users/6')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toMatch(/not found/i);
  });
});
