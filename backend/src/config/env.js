const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

const REQUIRED_ENV_KEYS = ['DATABASE_URL', 'JWT_SECRET'];

function readEnv(name, fallback = '') {
  const value = process.env[name];
  if (typeof value !== 'string') return fallback;
  return value.trim();
}

function createConfigError(message) {
  const error = new Error(message);
  error.status = 500;
  error.code = 'CONFIG_ERROR';
  return error;
}

function getMissingRequiredEnv() {
  return REQUIRED_ENV_KEYS.filter((key) => !readEnv(key));
}

function getApiConfigError() {
  const missing = getMissingRequiredEnv();
  if (!missing.length) return null;
  return createConfigError(`Server misconfiguration: missing required environment variable(s): ${missing.join(', ')}`);
}

module.exports = {
  nodeEnv: readEnv('NODE_ENV', 'development'),
  port: Number(process.env.PORT || 3000),
  jwtSecret: readEnv('JWT_SECRET'),
  databaseUrl: readEnv('DATABASE_URL'),
  blobToken: readEnv('BLOB_READ_WRITE_TOKEN'),
  adminCredential: readEnv('ADMIN_CREDENTIAL'),
  adminPassword: readEnv('ADMIN_PASSWORD'),
  adminName: readEnv('ADMIN_NAME'),
  isVercel: Boolean(process.env.VERCEL),
  requiredEnvKeys: REQUIRED_ENV_KEYS,
  getMissingRequiredEnv,
  getApiConfigError,
  createConfigError
};
