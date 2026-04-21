const multer = require('multer');
const { put } = require('@vercel/blob');
const { blobToken } = require('../config/env');
const { getSettings, setHeroVideo } = require('../models/settingsModel');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 * 1024 }
});

async function readSettings(_req, res) {
  const settings = await getSettings();
  res.json(settings);
}

async function uploadHeroVideo(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file received' });
  }

  if (!blobToken) {
    return res.status(500).json({ success: false, error: 'BLOB_READ_WRITE_TOKEN is not set' });
  }

  const fileName = `hero-${Date.now()}-${req.file.originalname || 'video.mp4'}`;
  const blob = await put(fileName, req.file.buffer, {
    access: 'public',
    token: blobToken,
    contentType: req.file.mimetype || 'video/mp4',
    addRandomSuffix: true
  });

  await setHeroVideo(blob.url);
  res.json({ success: true, heroVideo: blob.url });
}

async function deleteHeroVideo(_req, res) {
  await setHeroVideo('');
  res.json({ success: true });
}

module.exports = {
  upload,
  readSettings,
  uploadHeroVideo,
  deleteHeroVideo
};
