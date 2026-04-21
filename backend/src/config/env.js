const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  databaseUrl: process.env.DATABASE_URL || '',
  blobToken: process.env.BLOB_READ_WRITE_TOKEN || '',
  adminCredential: process.env.ADMIN_CREDENTIAL || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'moto2024',
  adminName: process.env.ADMIN_NAME || 'Admin',
  isVercel: Boolean(process.env.VERCEL)
};
