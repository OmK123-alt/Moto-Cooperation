const { avatarFromName, nowJoinDate, isAdminRole } = require('../utils/helpers');
const { hashPassword, comparePassword, signToken } = require('../utils/security');
const usersModel = require('../models/usersModel');

async function register(req, res) {
  const { name, credential, password } = req.body || {};
  if (!name || !credential || !password) {
    return res.status(400).json({ success: false, error: 'All fields required' });
  }

  const existing = await usersModel.findUserByCredential(credential);
  if (existing) {
    return res.status(409).json({ success: false, error: 'Account already exists with this email/mobile' });
  }

  const user = await usersModel.createUser({
    id: `u-${Date.now()}`,
    name: String(name).trim(),
    credential,
    passwordHash: await hashPassword(password),
    role: 'user',
    joinDate: nowJoinDate(),
    avatar: avatarFromName(name)
  });

  const token = signToken(user);
  return res.json({ success: true, user, token });
}

async function login(req, res) {
  const { credential, password } = req.body || {};
  if (!credential || !password) {
    return res.status(400).json({ success: false, error: 'Credential and password are required' });
  }

  const userRecord = await usersModel.findUserByCredential(credential);
  if (!userRecord) {
    return res.status(401).json({ success: false, error: 'Incorrect email/mobile or password' });
  }

  const ok = await comparePassword(password, userRecord.password_hash);
  if (!ok) {
    return res.status(401).json({ success: false, error: 'Incorrect email/mobile or password' });
  }

  const user = usersModel.mapUser(userRecord);
  const token = signToken(user);
  return res.json({ success: true, user, token });
}

async function adminLogin(req, res) {
  const { credential, password } = req.body || {};
  if (!credential || !password) {
    return res.status(400).json({ success: false, error: 'Credential and password are required' });
  }

  const userRecord = await usersModel.findUserByCredential(credential);
  if (!userRecord) {
    return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
  }

  const ok = await comparePassword(password, userRecord.password_hash);
  if (!ok) {
    return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
  }

  if (!isAdminRole(userRecord.role)) {
    return res.status(403).json({ success: false, error: 'This account has no admin panel access' });
  }

  const user = usersModel.mapUser(userRecord);
  const token = signToken(user);
  return res.json({ success: true, user, token });
}

async function adminMe(req, res) {
  return res.json({ success: true, user: req.user });
}

module.exports = {
  register,
  login,
  adminLogin,
  adminMe
};
