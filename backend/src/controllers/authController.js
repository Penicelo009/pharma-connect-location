const AuthService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await AuthService.register({ email, password, name });
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const tokens = await AuthService.login({ email, password });
    res.json(tokens);
  } catch (err) { next(err); }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await AuthService.refresh({ refreshToken });
    res.json(tokens);
  } catch (err) { next(err); }
};

exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    // optional: revoke refresh token if provided
    if (refreshToken) await AuthService.revokeRefreshToken(refreshToken);
    res.status(204).send();
  } catch (err) { next(err); }
};
