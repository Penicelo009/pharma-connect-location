const db = require('../db');

exports.save = async ({ user_id, token, expires_at = null }) => {
  const { rows } = await db.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2,$3) RETURNING *`,
    [user_id, token, expires_at]
  );
  return rows[0];
};

exports.findByToken = async (token) => {
  const { rows } = await db.query(`SELECT * FROM refresh_tokens WHERE token=$1 LIMIT 1`, [token]);
  return rows[0];
};

exports.revoke = async (id) => {
  await db.query(`UPDATE refresh_tokens SET revoked = true, revoked_at = now() WHERE id=$1`, [id]);
};
