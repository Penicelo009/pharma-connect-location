const express = require('express');
const { body, validationResult } = require('express-validator');
const AuthController = require('../controllers/authController');
const AuthMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').optional().isString()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, AuthController.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, AuthController.login);

router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthMiddleware.authenticateOptional, AuthController.logout);

module.exports = router;
