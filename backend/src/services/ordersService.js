const db = require('../db');
const OrdersRepo = require('../repositories/ordersRepository');
const OrderItemsRepo = require('../repositories/orderItemsRepository');

/**
 * Business rules mirrored from cart.js
 * - single-pharmacy cart enforcement
 * - prescription validation (if medicine.requires_prescription true => require prescriptionProvided)
 * - pharmacy subscription must be active
 */

exports.createOrder = async ({ user_id = null, pharmacy_id, items, total, prescriptionProvided = false, contact = {} }) => {
  if (!items || items.length === 0) throw new Error('Cart is empty');

  // Validate single-pharmacy and medicine existence
  const medicineIds = items.map(i => i.medicineId);
  const { rows: meds } = await db.query(`SELECT id, pharmacy_id, price, stock, requires_prescription FROM medicines WHERE id = ANY($1::int[])`, [medicineIds]);
  if (meds.length !== medicineIds.length) throw new Error('One or more medicines not found');

  const pharmacies = new Set(meds.map(m => m.pharmacy_id));
  if (pharmacies.size !== 1 || !pharmacies.has(parseInt(pharmacy_id))) throw new Error('All items must belong to a single pharmacy');

  // Prescription check
  const requiresRx = meds.some(m => m.requires_prescription);
  if (requiresRx && !prescriptionProvided) throw new Error('Prescription required for at least one item');

  // Subscription check for the pharmacy
  const { rows: subs } = await db.query(
    `SELECT * FROM pharmacy_subscriptions WHERE pharmacy_id=$1 AND status='active' ORDER BY created_at DESC LIMIT 1`, [pharmacy_id]
  );
  if (!subs || subs.length === 0) throw new Error('Pharmacy subscription required to place orders');

  // Check stock availability
  const medById = new Map(meds.map(m => [m.id, m]));
  for (const it of items) {
    const m = medById.get(it.medicineId);
    if (!m) throw new Error('Medicine not found');
    if (typeof it.quantity !== 'number' || it.quantity <= 0) throw new Error('Invalid quantity');
    if (m.stock < it.quantity) throw new Error(`Insufficient stock for medicine id ${m.id}`);
  }

  // Create order & order_items in a transaction
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    const order = await OrdersRepo.createOrder({ user_id, pharmacy_id, total, status: 'pending', contact_name: contact.name || null, contact_phone: contact.phone || null, delivery_address: contact.address || null });

    // prepare order items payload
    const itemsPayload = items.map(it => ({ medicine_id: it.medicineId, quantity: it.quantity, price_at_purchase: medById.get(it.medicineId).price }));
    const createdItems = await OrderItemsRepo.createItems(client, order.id, itemsPayload);

    // subtract stock
    for (const it of items) {
      await client.query('UPDATE medicines SET stock = stock - $1 WHERE id = $2', [it.quantity, it.medicineId]);
    }

    await client.query('COMMIT');

    // return order with items
    order.items = createdItems;
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.getOrder = async (id) => {
  const order = await OrdersRepo.getById(id);
  if (!order) return null;
  const items = await OrderItemsRepo.findByOrderId(id);
  order.items = items;
  return order;
};

exports.updateStatus = async (id, newStatus) => {
  const allowed = ['pending','approved','rejected','completed'];
  if (!allowed.includes(newStatus)) throw new Error('Invalid status');
  const order = await OrdersRepo.updateStatus(id, newStatus);
  return order;
};
