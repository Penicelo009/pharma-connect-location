const jwt = require('jsonwebtoken');
const AuthService = require('../services/authService');
const UserRepo = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

async function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await UserRepo.findById(payload.sub);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) { return res.status(401).json({ message: 'Invalid token' }); }
}

// optional authentication: if token present, authenticate, otherwise continue as guest
async function authenticateOptional(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return next();
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await UserRepo.findById(payload.sub);
    if (user) req.user = { id: user.id, role: user.role };
  } catch (err) {
    // ignore token errors in optional mode
  }
  return next();
}

function authorizeRoles(allowed = []) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (allowed.length && !allowed.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}

module.exports = { authenticate, authenticateOptional, authorizeRoles };
