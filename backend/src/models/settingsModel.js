const pool = require('../database/pool');

async function getSettings() {
  const result = await pool.query('SELECT key, value FROM settings');
  const settings = {};
  for (const row of result.rows) settings[row.key] = row.value;
  return {
    heroVideo: settings.heroVideo || ''
  };
}

async function setHeroVideo(url) {
  await pool.query(
    `INSERT INTO settings (key, value, updated_at)
     VALUES ('heroVideo', $1, NOW())
     ON CONFLICT (key)
     DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
    [url || '']
  );
}

module.exports = {
  getSettings,
  setHeroVideo
};
