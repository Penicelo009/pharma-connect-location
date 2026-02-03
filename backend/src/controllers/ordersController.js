const OrdersService = require('../services/ordersService');

exports.create = async (req, res, next) => {
  try {
    const user_id = req.user ? req.user.id : null;
    const { pharmacyId, items, total, prescriptionProvided, contact } = req.body;
    const order = await OrdersService.createOrder({ user_id, pharmacy_id: pharmacyId, items, total, prescriptionProvided, contact });
    res.status(201).json({ id: order.id, status: order.status, items: order.items });
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const order = await OrdersService.getOrder(id);
    if (!order) return res.status(404).json({ message: 'Not found' });

    // authorization: owner, pharmacy owner, admin
    const requester = req.user || null;
    if (order.user_id && requester && requester.id === order.user_id) return res.json(order);

    if (requester && requester.role === 'admin') return res.json(order);

    if (requester && requester.role === 'pharmacy') {
      // check if this pharmacy belongs to requester
      const { rows } = await require('../db').query('SELECT * FROM pharmacies WHERE id=$1 AND user_id=$2 LIMIT 1', [order.pharmacy_id, requester.id]);
      if (rows && rows.length) return res.json(order);
    }

    return res.status(403).json({ message: 'Forbidden' });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;

    const order = await OrdersService.getOrder(id);
    if (!order) return res.status(404).json({ message: 'Not found' });

    const requester = req.user;
    if (!requester) return res.status(401).json({ message: 'Unauthorized' });

    // Only admin or pharmacy owner or delivery can change status, with some constraints
    if (requester.role === 'admin') {
      const updated = await OrdersService.updateStatus(id, status);
      return res.json(updated);
    }

    if (requester.role === 'pharmacy') {
      // ensure requester owns pharmacy
      const { rows } = await require('../db').query('SELECT * FROM pharmacies WHERE id=$1 AND user_id=$2 LIMIT 1', [order.pharmacy_id, requester.id]);
      if (!rows || rows.length === 0) return res.status(403).json({ message: 'Forbidden' });
      if (!['approved','rejected'].includes(status)) return res.status(400).json({ message: 'Pharmacy can only set approved or rejected' });
      const updated = await OrdersService.updateStatus(id, status);
      return res.json(updated);
    }

    if (requester.role === 'delivery') {
      if (status !== 'completed') return res.status(400).json({ message: 'Delivery can only set completed' });
      const updated = await OrdersService.updateStatus(id, status);
      return res.json(updated);
    }

    return res.status(403).json({ message: 'Forbidden' });
  } catch (err) { next(err); }
};
