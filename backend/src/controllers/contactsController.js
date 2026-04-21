const { listContacts, addContact, deleteContact } = require('../models/contactsModel');

async function getContacts(_req, res) {
  const contacts = await listContacts();
  res.json({ contacts });
}

async function createContact(req, res) {
  await addContact(req.body || {});
  res.json({ success: true });
}

async function removeContact(req, res) {
  await deleteContact(req.params.id);
  res.json({ success: true });
}

module.exports = {
  getContacts,
  createContact,
  removeContact
};
