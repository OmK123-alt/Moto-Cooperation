const { verifyToken } = require('../utils/security');

const ROLE_PERMISSIONS = {
  admin: ['*'],
  product_manager: ['products:write', 'products:read', 'events:read', 'builds:read', 'contacts:read', 'users:read', 'settings:write', 'settings:read'],
  event_manager: ['events:write', 'events:read', 'products:read', 'builds:read', 'contacts:read', 'settings:read'],
  gallery_manager: ['builds:write', 'builds:read', 'products:read', 'events:read', 'settings:read'],
  contact_manager: ['contacts:write', 'contacts:read', 'users:read', 'settings:read'],
  report_viewer: ['products:read', 'events:read', 'builds:read', 'contacts:read', 'users:read', 'settings:read']
};

function authRequired(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, error: 'Missing authorization token' });
    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

function allow(permission) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) return res.status(403).json({ success: false, error: 'Forbidden' });
    const permissions = ROLE_PERMISSIONS[req.user.role] || [];
    if (permissions.includes('*') || permissions.includes(permission)) return next();
    return res.status(403).json({ success: false, error: 'You are not allowed to perform this action' });
  };
}

module.exports = {
  authRequired,
  allow,
  ROLE_PERMISSIONS
};
