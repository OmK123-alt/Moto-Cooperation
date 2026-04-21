const { listBuilds, replaceBuilds } = require('../models/buildsModel');

async function getBuilds(_req, res) {
  const builds = await listBuilds();
  res.json({ builds });
}

async function saveBuilds(req, res) {
  const builds = Array.isArray(req.body?.builds) ? req.body.builds : [];
  await replaceBuilds(builds);
  res.json({ success: true, count: builds.length });
}

module.exports = {
  getBuilds,
  saveBuilds
};
