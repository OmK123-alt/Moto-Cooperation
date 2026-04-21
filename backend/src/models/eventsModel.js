const pool = require('../database/pool');

async function listEvents() {
  const result = await pool.query('SELECT * FROM events ORDER BY created_at DESC');
  return result.rows.map(row => ({
    id: row.id,
    date: row.date,
    month: row.month,
    name: row.name,
    tag: row.tag,
    cta: row.cta,
    location: row.location,
    details: row.details,
    featured: row.featured
  }));
}

async function replaceEvents(events) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM events');
    for (const item of events) {
      await client.query(
        `INSERT INTO events (id, date, month, name, tag, cta, location, details, featured)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          item.id,
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
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  listEvents,
  replaceEvents
};
