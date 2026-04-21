function notFound(_req, res) {
  res.status(404).json({ success: false, error: 'Route not found' });
}

function errorHandler(err, _req, res, _next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ success: false, error: err.message || 'Internal server error' });
}

module.exports = {
  notFound,
  errorHandler
};
