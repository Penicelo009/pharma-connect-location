/**
 * StorageService - mirrors the frontend StorageService API but backed by Postgres.
 * When DB is not available, falls back to in-memory map (as safe fallback).
 * For initial migration we provide a simple key-value table.
 */
const db = require('../db');

const TABLE = 'kv_store';

const inMemory = new Map();

async function ensureTable() {
  // no-op: migrations will create table; but we can create on-the-fly if necessary
}

exports.get = async (namespace, key) => {
  try {
    const { rows } = await db.query(
      `SELECT value FROM ${TABLE} WHERE namespace = $1 AND key = $2 LIMIT 1`,
      [namespace, key]
    );
    if (rows.length === 0) return undefined;
    return JSON.parse(rows[0].value);
  } catch (err) {
    // fallback
    const k = `${namespace}:${key}`;
    return inMemory.has(k) ? inMemory.get(k) : undefined;
  }
};

exports.set = async (namespace, key, value) => {
  const str = JSON.stringify(value);
  try {
    await db.query(
      `INSERT INTO ${TABLE} (namespace, key, value) VALUES ($1,$2,$3)
       ON CONFLICT (namespace,key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [namespace, key, str]
    );
  } catch (err) {
    const k = `${namespace}:${key}`;
    inMemory.set(k, value);
  }
};

exports.delete = async (namespace, key) => {
  try {
    await db.query(`DELETE FROM ${TABLE} WHERE namespace = $1 AND key = $2`, [namespace, key]);
  } catch (err) {
    const k = `${namespace}:${key}`;
    inMemory.delete(k);
  }
};
