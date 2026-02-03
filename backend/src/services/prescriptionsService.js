const fs = require('fs');
const path = require('path');
const FileStorage = require('./fileStorage');
const PrescriptionsRepo = require('../repositories/prescriptionsRepository');
const OrdersRepo = require('../repositories/ordersRepository');

const MAX_UPLOAD_SIZE = parseInt(process.env.MAX_UPLOAD_SIZE || (5 * 1024 * 1024)); // 5MB default

exports.upload = async ({ user_id = null, order_id = null, file, notes = null }) => {
  if (!file) throw new Error('No file uploaded');
  if (file.size > MAX_UPLOAD_SIZE) throw new Error('File too large');

  // verify order exists if provided
  if (order_id) {
    const order = await OrdersRepo.getById(order_id);
    if (!order) throw new Error('Order not found');
  }

  // Save via storage driver (file already stored by multer to disk)
  const stored = await FileStorage.save(file);

  // Persist metadata
  try {
    const record = await PrescriptionsRepo.create({
      user_id,
      order_id,
      original_filename: stored.originalName,
      mime_type: stored.mimeType,
      size_bytes: stored.size,
      storage_driver: stored.driver,
      path: stored.path,
      url: stored.url,
      checksum: stored.checksum,
      notes
    });
    return record;
  } catch (err) {
    // Handle unique constraint race (duplicate upload)
    // Postgres unique violation code is '23505'
    if (err && err.code === '23505') {
      // Attempt to find existing by order+checksum or checksum
      if (order_id) {
        const existing = await PrescriptionsRepo.findByOrderAndChecksum(order_id, stored.checksum);
        if (existing) return { ...existing, alreadyExists: true };
      }
      const existing = await PrescriptionsRepo.findByChecksum(stored.checksum);
      if (existing) return { ...existing, alreadyExists: true };
    }
    throw err;
  }
};

exports.get = async (id) => {
  return await PrescriptionsRepo.findById(id);
};

exports.review = async (id, reviewer_id, status, notes = null) => {
  if (!['approved','rejected','pending'].includes(status)) throw new Error('Invalid status');
  const prescription = await PrescriptionsRepo.findById(id);
  if (!prescription) throw new Error('Not found');
  const updated = await PrescriptionsRepo.setStatus(id, status, reviewer_id, notes);
  return updated;
};
