const fs = require('fs');
const path = require('path');
const pool = require('./pool');
const { adminCredential, adminPassword, adminName } = require('../config/env');
const { avatarFromName, nowJoinDate } = require('../utils/helpers');
const { hashPassword } = require('../utils/security');

const dataDir = path.join(process.cwd(), 'backend', 'data');

function readJson(fileName, fallback) {
  try {
    const raw = fs.readFileSync(path.join(dataDir, fileName), 'utf8');
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
}

async function tableCount(tableName) {
  const result = await pool.query(`SELECT COUNT(*)::int AS count FROM ${tableName}`);
  return result.rows[0].count;
}

async function seedUsers() {
  const count = await tableCount('users');
  if (count > 0) return;

  const data = readJson('users.json', { users: [] });
  for (const user of data.users || []) {
    const hash = await hashPassword(String(user.password || 'changeme123'));
    await pool.query(
      `INSERT INTO users (id, name, credential, password_hash, role, join_date, avatar)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (id) DO NOTHING`,
      [
        user.id || `u-${Date.now()}`,
        user.name || 'User',
        String(user.credential || '').trim().toLowerCase(),
        hash,
        user.role || 'user',
        user.joinDate || nowJoinDate(),
        user.avatar || avatarFromName(user.name || 'User')
      ]
    );
  }

  const adminExists = await pool.query('SELECT 1 FROM users WHERE credential = $1 LIMIT 1', [String(adminCredential).toLowerCase()]);
  if (adminExists.rowCount === 0) {
    const adminHash = await hashPassword(adminPassword);
    await pool.query(
      `INSERT INTO users (id, name, credential, password_hash, role, join_date, avatar)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        `u-admin-${Date.now()}`,
        adminName,
        String(adminCredential).toLowerCase(),
        adminHash,
        'admin',
        nowJoinDate(),
        avatarFromName(adminName)
      ]
    );
  }
}

async function seedProducts() {
  const count = await tableCount('products');
  if (count > 0) return;
  const data = readJson('products.json', { products: [] });
  for (const item of data.products || []) {
    await pool.query(
      `INSERT INTO products (id, name, description, price, category, badge, emoji, image, stock, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (id) DO NOTHING`,
      [
        item.id || `p-${Date.now()}`,
        item.name || 'Untitled Product',
        item.description || '',
        Number(item.price || 0),
        item.category || 'accessories',
        item.badge || '',
        item.emoji || '🔩',
        item.image || '',
        Number(item.stock || 0),
        Boolean(item.featured)
      ]
    );
  }
}

async function seedEvents() {
  const count = await tableCount('events');
  if (count > 0) return;
  const data = readJson('events.json', { events: [] });
  for (const item of data.events || []) {
    await pool.query(
      `INSERT INTO events (id, date, month, name, tag, cta, location, details, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (id) DO NOTHING`,
      [
        item.id || `ev-${Date.now()}`,
        item.date || '',
        item.month || '',
        item.name || 'Untitled Event',
        item.tag || '',
        item.cta || '',
        item.location || '',
        item.details || '',
        Boolean(item.featured)
      ]
    );
  }
}

async function seedBuilds() {
  const count = await tableCount('builds');
  if (count > 0) return;
  const data = readJson('builds.json', { builds: [] });
  for (const item of data.builds || []) {
    await pool.query(
      `INSERT INTO builds (id, name, builder, category, sub, key_feature, description, emoji, image, featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       ON CONFLICT (id) DO NOTHING`,
      [
        item.id || `b-${Date.now()}`,
        item.name || 'Untitled Build',
        item.builder || '',
        item.category || 'jdm',
        item.sub || '',
        item.keyFeature || '',
        item.description || '',
        item.emoji || '🚗',
        item.image || '',
        Boolean(item.featured)
      ]
    );
  }
}

async function seedContacts() {
  const count = await tableCount('contacts');
  if (count > 0) return;
  const data = readJson('contacts.json', { contacts: [] });
  for (const item of data.contacts || []) {
    await pool.query(
      `INSERT INTO contacts (id, date, first_name, last_name, email, phone, interest, message, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (id) DO NOTHING`,
      [
        item.id || `c-${Date.now()}`,
        item.date || '',
        item.firstName || '',
        item.lastName || '',
        item.email || '',
        item.phone || '',
        item.interest || '',
        item.message || '',
        item.status || 'new'
      ]
    );
  }
}

async function seedSettings() {
  const count = await tableCount('settings');
  if (count > 0) return;
  const data = readJson('settings.json', { heroVideo: '' });
  await pool.query(
    `INSERT INTO settings (key, value) VALUES ('heroVideo', $1)
     ON CONFLICT (key) DO NOTHING`,
    [data.heroVideo || '']
  );
}

async function seedAll() {
  await seedUsers();
  await seedProducts();
  await seedEvents();
  await seedBuilds();
  await seedContacts();
  await seedSettings();
}

module.exports = {
  seedAll
};
