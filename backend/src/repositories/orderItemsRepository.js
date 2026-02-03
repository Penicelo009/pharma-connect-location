const db = require('../db');

exports.createItems = async (client, orderId, items) => {
  // items: [{ medicine_id, quantity, price_at_purchase }]
  const q = `INSERT INTO order_items (order_id, medicine_id, quantity, price_at_purchase) VALUES `;
  const values = [];
  const placeholders = items.map((it, i) => {
    const idx = i * 4;
    values.push(orderId, it.medicine_id, it.quantity, it.price_at_purchase);
    return `($${idx+1}, $${idx+2}, $${idx+3}, $${idx+4})`;
  }).join(',');

  const sql = q + placeholders + ' RETURNING *';
  const { rows } = await client.query(sql, values);
  return rows;
};

exports.findByOrderId = async (orderId) => {
  const { rows } = await db.query('SELECT * FROM order_items WHERE order_id=$1', [orderId]);
  return rows;
};
