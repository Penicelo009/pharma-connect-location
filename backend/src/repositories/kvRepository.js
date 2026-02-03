// Thin repository for key-value table kv_store
const db = require('../db');

exports.find = async (namespace, key) => {
  const { rows } = await db.query(`SELECT * FROM kv_store WHERE namespace=$1 AND key=$2`, [namespace, key]);
  return rows[0];
};

exports.upsert = async (namespace, key, value) => {
  await db.query(`INSERT INTO kv_store (namespace,key,value) VALUES ($1,$2,$3)
    ON CONFLICT (namespace,key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`, [namespace,key,value]);
};

exports.delete = async (namespace, key) => {
  await db.query(`DELETE FROM kv_store WHERE namespace = $1 AND key = $2`, [namespace,key]);
};
