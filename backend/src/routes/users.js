const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const UserRepo = require('../repositories/userRepository');

// GET /api/users/me - authenticated
router.get('/me', AuthMiddleware.authenticate, async (req, res, next) => {
  try {
    const user = await UserRepo.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (err) { next(err); }
});

module.exports = router;
