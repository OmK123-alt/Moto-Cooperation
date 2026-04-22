const { Pool } = require('pg');
const { databaseUrl, createConfigError } = require('../config/env');

let pool;

function getPool() {
  if (!databaseUrl) {
    throw createConfigError('Server misconfiguration: DATABASE_URL is required for API/database operations.');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false }
    });
  }

  return pool;
}

module.exports = {
  getPool,
  query(text, params) {
    return getPool().query(text, params);
  }
};
