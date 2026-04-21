const { listEvents, replaceEvents } = require('../models/eventsModel');

async function getEvents(_req, res) {
  const events = await listEvents();
  res.json({ events });
}

async function saveEvents(req, res) {
  const events = Array.isArray(req.body?.events) ? req.body.events : [];
  await replaceEvents(events);
  res.json({ success: true, count: events.length });
}

module.exports = {
  getEvents,
  saveEvents
};
