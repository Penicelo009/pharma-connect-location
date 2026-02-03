const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepo = require('../repositories/userRepository');
const RefreshRepo = require('../repositories/refreshRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'change-refresh-me';
const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || '15m';
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || '30d';

function signAccess(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
}

function signRefresh(user) {
  return jwt.sign({ sub: user.id }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

exports.register = async ({ email, password, name }) => {
  const existing = await UserRepo.findByEmail(email);
  if (existing) throw new Error('Email already in use');
  const hash = await bcrypt.hash(password, 10);
  const user = await UserRepo.create({ email, password_hash: hash, name, role: 'user' });
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await UserRepo.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password_hash || '');
  if (!ok) throw new Error('Invalid credentials');
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);
  await RefreshRepo.save({ user_id: user.id, token: refreshToken });
  return { accessToken, refreshToken, expiresIn: ACCESS_EXPIRES };
};

exports.refresh = async ({ refreshToken }) => {
  if (!refreshToken) throw new Error('refreshToken required');
  // verify signature
  let payload;
  try { payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET); } catch (err) { throw new Error('Invalid refresh token'); }
  const stored = await RefreshRepo.findByToken(refreshToken);
  if (!stored || stored.revoked) throw new Error('Refresh token revoked');
  const user = await UserRepo.findById(stored.user_id);
  if (!user) throw new Error('User not found');
  const accessToken = signAccess(user);
  const newRefresh = signRefresh(user);
  // rotate tokens: revoke old and save new
  await RefreshRepo.revoke(stored.id);
  await RefreshRepo.save({ user_id: user.id, token: newRefresh });
  return { accessToken, refreshToken: newRefresh, expiresIn: ACCESS_EXPIRES };
};

exports.revokeRefreshToken = async (refreshToken) => {
  const stored = await RefreshRepo.findByToken(refreshToken);
  if (stored) await RefreshRepo.revoke(stored.id);
};

// helper to get payload from access token (used by middleware)
exports.verifyAccess = (token) => jwt.verify(token, JWT_SECRET);
