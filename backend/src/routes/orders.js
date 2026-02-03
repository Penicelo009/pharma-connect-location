const express = require('express');
const { body, validationResult } = require('express-validator');
const OrdersController = require('../controllers/ordersController');
const Auth = require('../middleware/auth');

const router = express.Router();

// Create order (guest or authenticated)
router.post('/', [
  body('pharmacyId').isInt(),
  body('items').isArray({ min: 1 }),
  body('items.*.medicineId').isInt(),
  body('items.*.quantity').isInt({ min: 1 }),
  body('total').isFloat({ gt: 0 })
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, Auth.authenticateOptional, OrdersController.create);

// Get order
router.get('/:id', Auth.authenticateOptional, OrdersController.get);

// Update status
router.patch('/:id/status', Auth.authenticate, OrdersController.updateStatus);

module.exports = router;
