function notFound(_req, res) {
  res.status(404).json({ success: false, error: 'Route not found' });
}

function errorHandler(err, _req, res, _next) {
  console.error(err);
  const status = err.status || 500;
  const payload = {
    success: false,
    error: err.message || 'Internal server error'
  };

  if (err.code === 'CONFIG_ERROR') {
    payload.code = 'CONFIG_ERROR';
  }

  res.status(status).json(payload);
}

module.exports = {
  notFound,
  errorHandler
};
