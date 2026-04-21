const pool = require('../database/pool');

async function listContacts() {
  const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
  return result.rows.map(row => ({
    id: row.id,
    date: row.date,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    interest: row.interest,
    message: row.message,
    status: row.status
  }));
}

async function addContact(contact) {
  const id = contact.id || `c-${Date.now()}`;
  const date = contact.date || new Date().toLocaleString('en-IN');
  await pool.query(
    `INSERT INTO contacts (id, date, first_name, last_name, email, phone, interest, message, status)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [
      id,
      date,
      contact.firstName || '',
      contact.lastName || '',
      contact.email || '',
      contact.phone || '',
      contact.interest || '',
      contact.message || '',
      contact.status || 'new'
    ]
  );
}

async function deleteContact(id) {
  await pool.query('DELETE FROM contacts WHERE id = $1', [id]);
}

module.exports = {
  listContacts,
  addContact,
  deleteContact
};
