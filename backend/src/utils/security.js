const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, createConfigError } = require('../config/env');

const SALT_ROUNDS = 10;

function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function ensureJwtSecret() {
  if (!jwtSecret) {
    throw createConfigError('Server misconfiguration: JWT_SECRET is required for authentication.');
  }
}

function signToken(user) {
  ensureJwtSecret();
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      name: user.name,
      credential: user.credential
    },
    jwtSecret,
    { expiresIn: '24h' }
  );
}

function verifyToken(token) {
  ensureJwtSecret();
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  hashPassword,
  comparePassword,
  signToken,
  verifyToken
};
