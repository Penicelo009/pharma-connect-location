const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');

// Example admin-only route
router.get('/stats', AuthMiddleware.authenticate, AuthMiddleware.authorizeRoles(['admin']), async (req, res, next) => {
  try {
    // placeholder stats
    res.json({ users: 0, pharmacies: 0, orders: 0 });
  } catch (err) { next(err); }
});

module.exports = router;
