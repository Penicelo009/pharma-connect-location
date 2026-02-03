const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const StorageController = require('../controllers/storageController');

// GET /api/storage/:namespace/:key
router.get('/:namespace/:key', StorageController.getItem);

// POST /api/storage/:namespace/:key  { value }
router.post('/:namespace/:key', [body('value').exists()], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}, StorageController.setItem);

// DELETE /api/storage/:namespace/:key
router.delete('/:namespace/:key', StorageController.deleteItem);

module.exports = router;
