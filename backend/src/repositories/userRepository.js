const db = require('../db');

exports.findByEmail = async (email) => {
  const { rows } = await db.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM users WHERE id=$1 LIMIT 1', [id]);
  return rows[0];
};

exports.create = async ({ email, password_hash, name, role = 'user' }) => {
  const { rows } = await db.query(
    `INSERT INTO users (email, password_hash, name, role) VALUES ($1,$2,$3,$4) RETURNING *`,
    [email, password_hash, name, role]
  );
  return rows[0];
};
