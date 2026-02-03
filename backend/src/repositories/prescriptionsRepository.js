const db = require('../db');

exports.create = async ({ user_id = null, order_id = null, original_filename, mime_type, size_bytes, storage_driver, path, url, checksum, notes = null }) => {
  const { rows } = await db.query(
    `INSERT INTO prescriptions (user_id, order_id, file_path, original_filename, mime_type, size_bytes, storage_driver, checksum, notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [user_id, order_id, path, original_filename, mime_type, size_bytes, storage_driver, checksum, notes]
  );
  return rows[0];
};

exports.findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM prescriptions WHERE id=$1 LIMIT 1', [id]);
  return rows[0];
};

exports.setStatus = async (id, status, reviewed_by = null, notes = null) => {
  const { rows } = await db.query('UPDATE prescriptions SET status=$1, reviewed_by=$2, reviewed_at=now(), notes=COALESCE(notes,$3) WHERE id=$4 RETURNING *', [status, reviewed_by, notes, id]);
  return rows[0];
};

exports.findByOrderId = async (orderId) => {
  const { rows } = await db.query('SELECT * FROM prescriptions WHERE order_id=$1 ORDER BY created_at DESC', [orderId]);
  return rows;
};

exports.findByChecksum = async (checksum) => {
  const { rows } = await db.query('SELECT * FROM prescriptions WHERE checksum=$1 LIMIT 1', [checksum]);
  return rows[0];
};

exports.findByOrderAndChecksum = async (orderId, checksum) => {
  const { rows } = await db.query('SELECT * FROM prescriptions WHERE order_id=$1 AND checksum=$2 LIMIT 1', [orderId, checksum]);
  return rows[0];
};
