const express = require('express');
const router = express.Router();
const PrescriptionsController = require('../controllers/prescriptionsController');
const Auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Upload prescription (guest or authenticated). Expects multipart/form-data with file field 'file' and orderId
router.post('/', Auth.authenticateOptional, upload.single('file'), PrescriptionsController.upload);

// Get prescription metadata (auth optional but access controlled)
router.get('/:id', Auth.authenticateOptional, PrescriptionsController.get);

// Lookup by checksum (useful for dedup checks)
router.get('/lookup', PrescriptionsController.lookup);

// Review prescription (admin or pharmacy)
router.post('/:id/review', Auth.authenticate, Auth.authorizeRoles(['admin','pharmacy']), PrescriptionsController.review);

module.exports = router;