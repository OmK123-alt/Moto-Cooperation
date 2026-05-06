const { Pool } = require('pg');
const { databaseUrl, createConfigError } = require('../config/env');

let pool;

function getPool() {
  if (!databaseUrl) {
    throw createConfigError('Server misconfiguration: DATABASE_URL is required for API/database operations.');
  }

  if (!pool) {
    const isLocalConnection = /localhost|127\.0\.0\.1/i.test(databaseUrl);

    pool = new Pool({
      connectionString: databaseUrl,
      ssl: isLocalConnection ? false : { rejectUnauthorized: false },
      max: Number(process.env.PGPOOL_MAX || 10),
      idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS || 30000),
      connectionTimeoutMillis: Number(process.env.PG_CONNECT_TIMEOUT_MS || 10000)
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
