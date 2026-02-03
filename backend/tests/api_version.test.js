const request = require('supertest');
const app = require('../src/app');

describe('API version header', () => {
  test('X-API-Version header is present and default is 1', async () => {
    const res = await request(app).get('/api/_health');
    expect(res.statusCode).toBe(200);
    expect(res.headers['x-api-version']).toBeDefined();
    expect(res.headers['x-api-version']).toBe('1');
  });
});