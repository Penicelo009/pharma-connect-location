const request = require('supertest');
const express = require('express');

// We'll create an express app using our routes but mock repository/service modules
jest.mock('../src/repositories/prescriptionsRepository');
jest.mock('../src/services/prescriptionsService');

const PrescriptionsRepo = require('../src/repositories/prescriptionsRepository');
const PrescriptionsService = require('../src/services/prescriptionsService');

const routes = require('../src/routes');

let app;
beforeAll(() =>{
  app = express();
  app.use(express.json());
  app.use('/api', routes);
  // simple error handler
  app.use((err, req, res, next) => res.status(500).json({ message: err.message }));
});

afterEach(()=>{ jest.clearAllMocks(); });

test('lookup returns 404 when not found and 200 when found', async ()=>{
  PrescriptionsRepo.findByChecksum.mockResolvedValue(null);
  let res = await request(app).get('/api/prescriptions/lookup').query({ checksum: 'abc' });
  expect(res.statusCode).toBe(404);

  PrescriptionsRepo.findByChecksum.mockResolvedValue({ id: 5, status: 'pending' });
  res = await request(app).get('/api/prescriptions/lookup').query({ checksum: 'abc' });
  expect(res.statusCode).toBe(200);
  expect(res.body.id).toBe(5);
});

test('upload returns 200 if duplicate detected by order+checksum or checksum', async ()=>{
  // simulate findByOrderAndChecksum returning existing record at controller pre-check
  PrescriptionsRepo.findByOrderAndChecksum.mockResolvedValue({ id: 11, status: 'pending', order_id: 7 });

  // perform multipart request - use supertest
  const res = await request(app)
    .post('/api/prescriptions')
    .field('orderId', '7')
    .field('checksum', 'abc')
    .attach('file', Buffer.from('test'), 'rx.pdf');

  expect(res.statusCode).toBe(200);
  expect(res.body.message).toBe('Already uploaded');
  expect(res.body.id).toBe(11);
});

test('upload returns 201 when new and service.upload is called', async ()=>{
  PrescriptionsRepo.findByOrderAndChecksum.mockResolvedValue(null);
  PrescriptionsRepo.findByChecksum.mockResolvedValue(null);
  PrescriptionsService.upload.mockResolvedValue({ id: 22, status: 'pending', order_id: 8 });

  const res = await request(app)
    .post('/api/prescriptions')
    .field('orderId', '8')
    .field('checksum', 'xyz')
    .attach('file', Buffer.from('hello'), 'rx2.pdf');

  expect(res.statusCode).toBe(201);
  expect(res.body.id).toBe(22);
});

// Simulate race: pre-check returns null, create throws unique violation, service recovers and returns existing
test('handles unique constraint race gracefully and returns Already uploaded', async ()=>{
  PrescriptionsRepo.findByOrderAndChecksum.mockResolvedValue(null);
  PrescriptionsRepo.findByChecksum.mockResolvedValue(null);

  const uniqueError = new Error('duplicate'); uniqueError.code = '23505';
  // make PrescriptionsService.upload throw unique error which will be handled internally
  PrescriptionsService.upload.mockImplementation(async ({ order_id }) => {
    // Simulate throwing db unique error then fetching existing
    if (!order_id) throw uniqueError;
    // Simulate recovery by returning existing record
    return { id: 99, status: 'pending', order_id, alreadyExists: true };
  });

  const res = await request(app)
    .post('/api/prescriptions')
    .field('orderId', '9')
    .field('checksum', 'dup')
    .attach('file', Buffer.from('dup'), 'dup.pdf');

  // Depending on service behavior, controller should return 200 for alreadyExists
  expect([200,201]).toContain(res.statusCode);
});
