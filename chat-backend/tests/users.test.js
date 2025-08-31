const request = require('supertest');
const app = require('../server');
const pool = require('../db/index');

describe('User Routes', () => {
  let testUserId;

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE email = $1', [
      'test@example.com',
    ]);
    await pool.end();
  });

  test('POST /users/register - success', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test1234',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    testUserId = res.body.user.id;
  });

  test('POST /users/register - user already exists', async () => {
    const res = await request(app).post('/users/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Test1234',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'User already exists');
  });

  test('POST /users/login - success', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'test@example.com',
      password: 'Test1234',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
  });

  test('GET /users - get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /users/:id - get single user', async () => {
    const res = await request(app).get(`/users/${testUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('test@example.com');
  });

  test('PUT /users/:id - update user', async () => {
    const res = await request(app).put(`/users/${testUserId}`).send({
      name: 'Updated Name',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.name).toBe('Updated Name');
  });

  test('DELETE /users/:id - delete user', async () => {
    const res = await request(app).delete(`/users/${testUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted successfully');
  });
});
