const db = require('../db');

exports.createOrder = async ({ user_id, pharmacy_id, total, status = 'pending', contact_name = null, contact_phone = null, delivery_address = null }) => {
  const { rows } = await db.query(
    `INSERT INTO orders (user_id, pharmacy_id, total, status, contact_name, contact_phone, delivery_address)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [user_id, pharmacy_id, total, status, contact_name, contact_phone, delivery_address]
  );
  return rows[0];
};

exports.getById = async (id) => {
  const { rows } = await db.query('SELECT * FROM orders WHERE id=$1 LIMIT 1', [id]);
  return rows[0];
};

exports.updateStatus = async (id, status) => {
  const { rows } = await db.query('UPDATE orders SET status=$1, updated_at=now() WHERE id=$2 RETURNING *', [status, id]);
  return rows[0];
};

exports.findByUser = async (user_id) => {
  const { rows } = await db.query('SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC', [user_id]);
  return rows;
};
