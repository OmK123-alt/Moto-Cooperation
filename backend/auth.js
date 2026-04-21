// JWT Authentication Module
const crypto = require('crypto');

// Secret key for JWT (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'moto-cooperation-secret-key-2024';

// Role-based permissions mapping
const ROLE_PERMISSIONS = {
  admin: {
    dashboard: true,
    products: ['create', 'read', 'update', 'delete'],
    events: ['create', 'read', 'update', 'delete'],
    builds: ['create', 'read', 'update', 'delete'],
    contacts: ['create', 'read', 'update', 'delete'],
    users: ['create', 'read', 'update', 'delete'],
    reports: ['read'],
    settings: ['read', 'update']
  },
  product_manager: {
    dashboard: true,
    products: ['create', 'read', 'update', 'delete'],
    reports: ['read'],
    contacts: ['read']
  },
  event_manager: {
    dashboard: true,
    events: ['create', 'read', 'update', 'delete'],
    builds: ['read'],
    contacts: ['read']
  },
  gallery_manager: {
    dashboard: true,
    builds: ['create', 'read', 'update', 'delete'],
    products: ['read'],
    events: ['read']
  },
  contact_manager: {
    dashboard: true,
    contacts: ['create', 'read', 'update', 'delete'],
    reports: ['read'],
    products: ['read'],
    events: ['read']
  },
  report_viewer: {
    dashboard: true,
    reports: ['read'],
    products: ['read'],
    events: ['read'],
    builds: ['read'],
    contacts: ['read'],
    users: ['read']
  }
};

// Simple JWT implementation
function generateToken(user) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({
    id: user.id,
    name: user.name,
    credential: user.credential,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  })).toString('base64');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64');

  return `${header}.${payload}.${signature}`;
}

function verifyToken(token) {
  try {
    const [header, payload, signature] = token.split('.');
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64');
    
    if (signature !== expectedSignature) {
      return null;
    }

    // Decode payload
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString());
    
    // Check expiration
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return decoded;
  } catch (err) {
    return null;
  }
}

// Middleware to extract and verify token
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;
  
  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }

  req.user = decoded;
  next();
}

// Middleware to check role permissions
function requireRole(requiredAction, resource) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    const permissions = ROLE_PERMISSIONS[req.user.role];
    
    if (!permissions) {
      return res.status(403).json({ success: false, error: 'Invalid role' });
    }

    const resourcePerms = permissions[resource];
    
    if (!resourcePerms || (Array.isArray(resourcePerms) && !resourcePerms.includes(requiredAction))) {
      return res.status(403).json({ 
        success: false, 
        error: `Permission denied. Your role (${req.user.role}) cannot ${requiredAction} ${resource}` 
      });
    }

    next();
  };
}

// Middleware to allow unauthenticated access but attach user if token exists
function optionalAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;
  
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }
  
  next();
}

module.exports = {
  generateToken,
  verifyToken,
  authMiddleware,
  requireRole,
  optionalAuth,
  ROLE_PERMISSIONS
};
