const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const { initializeDatabase } = require('./database/init');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const { isVercel, getApiConfigError } = require('./config/env');

const app = express();
const FRONTEND_DIR = path.join(__dirname, '..', '..', 'frontend');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', (_req, _res, next) => {
  const configError = getApiConfigError();
  if (configError) return next(configError);
  return next();
});

app.use('/api', async (_req, _res, next) => {
  try {
    // Avoid running DB schema creation/seed on every serverless invocation.
    // On Vercel (serverless) this can hang if the database is unreachable
    // — skip the initialization step unless explicitly forced.
    const forceInit = String(process.env.FORCE_DB_INIT || '') === 'true';
    if (!isVercel || forceInit) {
      await initializeDatabase();
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use('/api', apiRoutes);

if (!isVercel) {
  app.use(express.static(FRONTEND_DIR));
  app.get('/admin', (_req, res) => {
    res.sendFile(path.join(FRONTEND_DIR, 'admin', 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
