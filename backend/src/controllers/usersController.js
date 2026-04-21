const usersModel = require('../models/usersModel');

async function getUsers(_req, res) {
  const users = await usersModel.listUsers();
  res.json({ users });
}

async function removeUser(req, res) {
  await usersModel.deleteUser(req.params.id);
  res.json({ success: true });
}

module.exports = {
  getUsers,
  removeUser
};
