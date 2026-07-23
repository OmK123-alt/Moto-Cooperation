const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

function buildDatabaseUrlFromParts() {
  const host =
    readEnv('DATABASE_HOST') ||
    readEnv('PGHOST') ||
    readEnv('SUPABASE_DB_HOST') ||
    readEnv('DB_HOST');
  if (!host) return '';

  const port = readEnv('DATABASE_PORT') || readEnv('PGPORT') || readEnv('SUPABASE_DB_PORT') || readEnv('DB_PORT');
  const user =
    readEnv('DATABASE_USER') ||
    readEnv('PGUSER') ||
    readEnv('SUPABASE_DB_USER') ||
    readEnv('DB_USER') ||
    '';
  const password =
    readEnv('DATABASE_PASSWORD') ||
    readEnv('PGPASSWORD') ||
    readEnv('SUPABASE_DB_PASSWORD') ||
    readEnv('DB_PASSWORD') ||
    '';
  const db =
    readEnv('DATABASE_NAME') ||
    readEnv('PGDATABASE') ||
    readEnv('SUPABASE_DB_NAME') ||
    readEnv('DB_NAME') ||
    '';

  if (!db) return '';

  const auth = user && password ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}@` : user && !password ? `${encodeURIComponent(user)}@` : '';
  const portPart = port ? `:${port}` : '';
  return `postgresql://${auth}${host}${portPart}/${db}`;
}

const databaseUrl =
  readEnv('DATABASE_URL') ||
  readEnv('SUPABASE_DB_URL') ||
  readEnv('SUPABASE_DATABASE_URL') ||
  // Support common PG/Supabase component env vars for Vercel import
  buildDatabaseUrlFromParts();

const REQUIRED_ENV_KEYS = ['DATABASE_URL (or SUPABASE_DB_URL)', 'JWT_SECRET'];

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
  const missing = [];
  if (!databaseUrl) missing.push('DATABASE_URL (or SUPABASE_DB_URL)');
  if (!readEnv('JWT_SECRET')) missing.push('JWT_SECRET');
  return missing;
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
  databaseUrl,
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
