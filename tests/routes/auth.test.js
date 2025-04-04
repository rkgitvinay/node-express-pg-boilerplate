const request = require('supertest');
const app = require('../../src/app');

describe('POST /api/v1/auth/login', () => {
  it('should login with valid credentials', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'admin@example.com',
      password: 'Password@123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toHaveProperty('access');
    expect(res.body.data.user.email).toBe('admin@example.com');
  });

  it('should fail with incorrect credentials', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'ana@example.com',
      password: 'wrongpassword',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe(false);
  });
});
