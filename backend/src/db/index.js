const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString, idleTimeoutMillis: 30000 });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
