const pool = require('../database/pool');

async function listBuilds() {
  const result = await pool.query('SELECT * FROM builds ORDER BY created_at DESC');
  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    builder: row.builder,
    category: row.category,
    sub: row.sub,
    keyFeature: row.key_feature,
    description: row.description,
    emoji: row.emoji,
    image: row.image,
    featured: row.featured
  }));
}

async function replaceBuilds(builds) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM builds');
    for (const item of builds) {
      await client.query(
        `INSERT INTO builds (id, name, builder, category, sub, key_feature, description, emoji, image, featured)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          item.id,
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
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  listBuilds,
  replaceBuilds
};
