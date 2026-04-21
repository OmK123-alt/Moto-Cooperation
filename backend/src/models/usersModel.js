const pool = require('../database/pool');

function mapUser(row) {
  return {
    id: row.id,
    name: row.name,
    credential: row.credential,
    role: row.role,
    joinDate: row.join_date,
    avatar: row.avatar
  };
}

async function listUsers() {
  const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows.map(mapUser);
}

async function findUserByCredential(credential) {
  const result = await pool.query('SELECT * FROM users WHERE credential = $1 LIMIT 1', [String(credential).trim().toLowerCase()]);
  return result.rows[0] || null;
}

async function createUser(user) {
  const result = await pool.query(
    `INSERT INTO users (id, name, credential, password_hash, role, join_date, avatar)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [
      user.id,
      user.name,
      String(user.credential).trim().toLowerCase(),
      user.passwordHash,
      user.role || 'user',
      user.joinDate,
      user.avatar
    ]
  );
  return mapUser(result.rows[0]);
}

async function deleteUser(id) {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
}

module.exports = {
  mapUser,
  listUsers,
  findUserByCredential,
  createUser,
  deleteUser
};
