const PrescriptionsService = require('../services/prescriptionsService');

exports.upload = async (req, res, next) => {
  try {
    const user = req.user || null;
    const user_id = user ? user.id : null;
    const order_id = req.body.orderId ? parseInt(req.body.orderId) : null;
    const notes = req.body.notes || null;
    const file = req.file;
    const checksum = req.body.checksum || null;

    // Pre-check duplicates if checksum is provided
    if (checksum) {
      let existing = null;
      if (order_id) existing = await require('../repositories/prescriptionsRepository').findByOrderAndChecksum(order_id, checksum);
      if (!existing) existing = await require('../repositories/prescriptionsRepository').findByChecksum(checksum);
      if (existing) return res.status(200).json({ message: 'Already uploaded', id: existing.id, status: existing.status, order_id: existing.order_id });
    }

    const rec = await PrescriptionsService.upload({ user_id, order_id, file, notes });
    if (rec && rec.alreadyExists) return res.status(200).json({ message: 'Already uploaded', id: rec.id, status: rec.status, order_id: rec.order_id });
    res.status(201).json({ id: rec.id, status: rec.status, order_id: rec.order_id });
  } catch (err) { next(err); }
};

// lookup by checksum (GET /api/prescriptions/lookup?checksum=...)
exports.lookup = async (req, res, next) => {
  try {
    const { checksum } = req.query;
    if (!checksum) return res.status(400).json({ message: 'checksum required' });
    const existing = await require('../repositories/prescriptionsRepository').findByChecksum(checksum);
    if (!existing) return res.status(404).json({ message: 'Not found' });
    res.json({ id: existing.id, status: existing.status, order_id: existing.order_id });
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const rec = await PrescriptionsService.get(id);
    if (!rec) return res.status(404).json({ message: 'Not found' });

    // access check: owner, admin, pharmacy owner
    const requester = req.user || null;
    if (rec.user_id && requester && requester.id === rec.user_id) return res.json(rec);
    if (requester && requester.role === 'admin') return res.json(rec);
    if (requester && requester.role === 'pharmacy') {
      // check if this pharmacy owns order
      if (rec.order_id) {
        const { rows } = await require('../db').query('SELECT 1 FROM orders WHERE id=$1 AND pharmacy_id IN (SELECT id FROM pharmacies WHERE user_id=$2) LIMIT 1', [rec.order_id, requester.id]);
        if (rows && rows.length) return res.json(rec);
      }
    }

    // guests who uploaded but no auth: allow access only if no user_id and no order (rare)
    if (!rec.user_id && !rec.order_id && !requester) return res.json(rec);

    return res.status(403).json({ message: 'Forbidden' });
  } catch (err) { next(err); }
};

exports.review = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { status, notes } = req.body;
    const reviewer = req.user;
    if (!reviewer) return res.status(401).json({ message: 'Unauthorized' });
    if (!['approved','rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const updated = await PrescriptionsService.review(id, reviewer.id, status, notes);
    res.json(updated);
  } catch (err) { next(err); }
};
