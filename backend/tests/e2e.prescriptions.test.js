const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const request = require('supertest');

jest.setTimeout(30000);

// Ensure we use a test database. You can set TEST_DATABASE_URL env var before running tests.
const TEST_DB = process.env.TEST_DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/pharmadb_test';
process.env.DATABASE_URL = TEST_DB;

// run migrations against test DB
beforeAll(() => {
  // ensure uploads dir exists and is empty
  const UPLOADS = path.join(process.cwd(), 'uploads', 'prescriptions');
  fs.rmSync(UPLOADS, { recursive: true, force: true });
  fs.mkdirSync(UPLOADS, { recursive: true });

  // run migrations script
  try {
    execSync('node scripts/run-migrations.js', { stdio: 'inherit', env: { ...process.env, DATABASE_URL: TEST_DB } });
  } catch (err) {
    console.error('Migration failed', err);
    throw err;
  }
});

// After tests, optionally drop tables (left to developer)
afterAll(async () => {
  // cleanup uploads
  const UPLOADS = path.join(process.cwd(), 'uploads', 'prescriptions');
  try { fs.rmSync(UPLOADS, { recursive: true, force: true }); } catch(e){}
});

const app = require('../src/app');
const db = require('../src/db');

async function createPharmacyAndMedicine(){
  // create a user to own pharmacy
  const userRes = await db.query(`INSERT INTO users (email, name, role) VALUES ($1,$2,$3) RETURNING *`, ['owner@example.com','Owner','pharmacy']);
  const user = userRes.rows[0];
  const pRes = await db.query(`INSERT INTO pharmacies (user_id, name, address, lat, lng, verified) VALUES ($1,$2,$3,0,0,true) RETURNING *`, [user.id, 'Pharm Test', 'Rua X']);
  const pharmacy = pRes.rows[0];
  // active subscription
  await db.query(`INSERT INTO subscription_plans (name, price) VALUES ('basic', 0) ON CONFLICT DO NOTHING`);
  await db.query(`INSERT INTO pharmacy_subscriptions (pharmacy_id, plan_id, status, start_date) VALUES ($1, 1, 'active', now())`, [pharmacy.id]);
  const medRes = await db.query(`INSERT INTO medicines (pharmacy_id, name, price, stock, requires_prescription) VALUES ($1,$2,$3,$4,$5) RETURNING *`, [pharmacy.id, 'Paracetamol', 5.5, 10, true]);
  const med = medRes.rows[0];
  return { user, pharmacy, med };
}

describe('E2E prescriptions with real DB', () => {
  test('upload then lookup and persistence', async () => {
    const { pharmacy, med } = await createPharmacyAndMedicine();

    // create guest order for the pharmacy with prescription not required flag set true so order accepted
    const orderRes = await request(app).post('/api/orders').send({ pharmacyId: pharmacy.id, items: [{ medicineId: med.id, quantity: 1 }], total: 5.5, prescriptionProvided: true });
    expect([201,200]).toContain(orderRes.statusCode);
    const orderId = orderRes.body.id || orderRes.body.order_id || orderRes.body.order?.id || orderRes.body.id;

    // prepare a file buffer
    const buf = Buffer.from('fake-pdf-content');
    const crypto = require('crypto');
    const checksum = crypto.createHash('sha256').update(buf).digest('hex');

    // ensure lookup returns 404
    let lookup = await request(app).get('/api/prescriptions/lookup').query({ checksum });
    expect(lookup.statusCode).toBe(404);

    // upload (simulate sync upload)
    const uploadRes = await request(app).post('/api/prescriptions').field('orderId', String(orderId)).field('checksum', checksum).attach('file', buf, { filename: 'rx.pdf', contentType: 'application/pdf' });
    expect([201,200]).toContain(uploadRes.statusCode);
    const createdId = uploadRes.body.id || uploadRes.body.id;
    expect(createdId).toBeTruthy();

    // verify DB row exists
    const dbRow = await db.query('SELECT * FROM prescriptions WHERE id = $1', [createdId]);
    expect(dbRow.rows.length).toBe(1);
    expect(dbRow.rows[0].checksum).toBe(checksum);
    expect(dbRow.rows[0].order_id).toBe(parseInt(orderId));
  });

  test('duplicate upload returns existing and unique constraint prevents duplicates', async () => {
    const { pharmacy, med } = await createPharmacyAndMedicine();
    const orderRes = await request(app).post('/api/orders').send({ pharmacyId: pharmacy.id, items: [{ medicineId: med.id, quantity: 1 }], total: 5.5, prescriptionProvided: false });
    const orderId = orderRes.body.id || orderRes.body.order_id || orderRes.body.id;

    const buf = Buffer.from('duplicate-content');
    const crypto = require('crypto');
    const checksum = crypto.createHash('sha256').update(buf).digest('hex');

    // upload twice concurrently
    const p1 = request(app).post('/api/prescriptions').field('orderId', String(orderId)).field('checksum', checksum).attach('file', buf, { filename: 'a.pdf', contentType: 'application/pdf' });
    const p2 = request(app).post('/api/prescriptions').field('orderId', String(orderId)).field('checksum', checksum).attach('file', buf, { filename: 'b.pdf', contentType: 'application/pdf' });

    const results = await Promise.all([p1, p2]);
    // at least one should have succeeded with 201, other should be 200 or 201
    expect(results.some(r => r.statusCode === 201)).toBe(true);

    // ensure no duplicate rows in DB
    const rows = await db.query('SELECT * FROM prescriptions WHERE checksum=$1 AND order_id=$2', [checksum, orderId]);
    expect(rows.rows.length).toBe(1);
  });

});
