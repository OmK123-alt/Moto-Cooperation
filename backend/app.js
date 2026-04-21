const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');

const isVercel = Boolean(process.env.VERCEL);
if (isVercel) {
  app.use((req, _res, next) => {
    const u = req.url || '/';
    if (!u.startsWith('/api')) {
      req.url = '/api' + (u.startsWith('/') ? u : '/' + u);
    }
    next();
  });
}

const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const EVENTS_FILE = path.join(__dirname, 'data', 'events.json');
const CONTACTS_FILE = path.join(__dirname, 'data', 'contacts.json');
const BUILDS_FILE = path.join(__dirname, 'data', 'builds.json');
const SETTINGS_FILE = path.join(__dirname, 'data', 'settings.json');
const ASSETS_DIR = path.join(FRONTEND_DIR, 'assets');

const USERS_FILE = path.join(__dirname, 'data', 'users.json');

if (!isVercel) {
  if (!fs.existsSync(ASSETS_DIR)) fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const uploadDest = isVercel ? require('os').tmpdir() : ASSETS_DIR;
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDest),
  filename: (req, file, cb) => cb(null, 'hero.mp4')
});
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } });

if (!isVercel) {
  app.use(express.static(FRONTEND_DIR));
}

app.post('/api/hero-video', upload.single('video'), (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({
        success: false,
        error:
          'Hero video upload is not supported on Vercel (read-only filesystem). Host the video elsewhere and set hero URL in settings, or run the backend on a VPS / Render / Railway.'
      });
    }
    if (!req.file) {
      console.error('❌ No file in request');
      return res.status(400).json({ success: false, error: 'No file received' });
    }
    const settings = { heroVideo: '/assets/hero.mp4' };
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
    console.log(`🎬 Hero video uploaded: ${req.file.filename} (${(req.file.size / 1024 / 1024).toFixed(1)}MB)`);
    res.json({ success: true, heroVideo: '/assets/hero.mp4' });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use(express.json());

app.get('/api/settings', (req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')));
  } catch (err) {
    res.json({ heroVideo: '' });
  }
});

app.delete('/api/hero-video', (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({
        success: false,
        error: 'Removing hero video file is not supported on Vercel. Update settings.json in the repo or use external hosting.'
      });
    }
    const videoPath = path.join(ASSETS_DIR, 'hero.mp4');
    if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ heroVideo: '' }, null, 2), 'utf8');
    console.log('🗑️ Hero video removed');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/products', (req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8')));
  } catch (err) {
    res.json({ products: [] });
  }
});
app.post('/api/products', (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({
        success: false,
        error:
          'Saving products on Vercel is not supported (read-only filesystem). Use Git to update backend/data/products.json or deploy the API on Render/Railway with a disk or database.'
      });
    }
    const data = { products: Array.isArray(req.body.products) ? req.body.products : [] };
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Products saved — ${data.products.length} item(s)`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/events', (req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8')));
  } catch (err) {
    res.json({ events: [] });
  }
});
app.post('/api/events', (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({
        success: false,
        error: 'Saving events on Vercel is not supported (read-only filesystem).'
      });
    }
    const data = { events: Array.isArray(req.body.events) ? req.body.events : [] };
    fs.writeFileSync(EVENTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Events saved — ${data.events.length} item(s)`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/builds', (req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(BUILDS_FILE, 'utf8')));
  } catch (err) {
    res.json({ builds: [] });
  }
});
app.post('/api/builds', (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({
        success: false,
        error: 'Saving builds on Vercel is not supported (read-only filesystem).'
      });
    }
    const data = { builds: Array.isArray(req.body.builds) ? req.body.builds : [] };
    fs.writeFileSync(BUILDS_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Builds saved — ${data.builds.length} item(s)`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/users', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    const safe = data.users.map(u => ({ ...u, password: undefined }));
    res.json({ users: safe });
  } catch (err) {
    res.json({ users: [] });
  }
});

app.post('/api/register', (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({
        success: false,
        error: 'User registration on Vercel is not supported (read-only filesystem).'
      });
    }
    const { name, credential, password } = req.body;
    if (!name || !credential || !password) return res.status(400).json({ success: false, error: 'All fields required' });

    let data = { users: [] };
    try {
      data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch {}

    const exists = data.users.find(u => u.credential.toLowerCase() === credential.toLowerCase());
    if (exists) return res.status(409).json({ success: false, error: 'Account already exists with this email/mobile' });

    const user = {
      id: 'u-' + Date.now(),
      name: name.trim(),
      credential: credential.trim(),
      password,
      joinDate: new Date().toLocaleDateString('en-IN'),
      avatar: name
        .trim()
        .split(' ')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    };
    data.users.push(user);
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log(`👤 New user: ${user.name} (${user.credential})`);
    res.json({ success: true, user: { ...user, password: undefined } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/login', (req, res) => {
  try {
    const { credential, password } = req.body;
    let data = { users: [] };
    try {
      data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch {}

    const user = data.users.find(
      u => u.credential.toLowerCase() === credential.toLowerCase() && u.password === password
    );
    if (!user) return res.status(401).json({ success: false, error: 'Incorrect email/mobile or password' });
    console.log(`🔑 Login: ${user.name}`);
    res.json({ success: true, user: { ...user, password: undefined } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({ success: false, error: 'Deleting users on Vercel is not supported (read-only filesystem).' });
    }
    const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    data.users = data.users.filter(u => u.id !== req.params.id);
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/contact', (req, res) => {
  try {
    res.json(JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8')));
  } catch (err) {
    res.json({ contacts: [] });
  }
});
app.post('/api/contact', (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({
        success: false,
        error: 'Saving contacts on Vercel is not supported (read-only filesystem).'
      });
    }
    let existing = { contacts: [] };
    try {
      existing = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    } catch {}
    existing.contacts.push(req.body);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(existing, null, 2), 'utf8');
    console.log(`📬 New contact: ${req.body.firstName} ${req.body.lastName}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
app.delete('/api/contact/:id', (req, res) => {
  try {
    if (isVercel) {
      return res.status(501).json({ success: false, error: 'Deleting contacts on Vercel is not supported (read-only filesystem).' });
    }
    const data = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    data.contacts = data.contacts.filter(c => c.id !== req.params.id);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = { app };
