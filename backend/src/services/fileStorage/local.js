const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const BASE = path.join(process.cwd(), 'uploads', 'prescriptions');

async function ensureBase() {
  await fs.mkdir(BASE, { recursive: true });
}

// file: multer file object { destination, filename, path, mimetype, size, originalname }
exports.save = async (file) => {
  await ensureBase();
  // file already saved by multer to destination; compute checksum and return metadata
  const filepath = file.path; // absolute path
  const data = await fs.readFile(filepath);
  const checksum = crypto.createHash('sha256').update(data).digest('hex');
  return {
    driver: 'local',
    path: filepath,
    url: `/uploads/prescriptions/${path.basename(filepath)}`,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    checksum,
  };
};

exports.delete = async (stored) => {
  try {
    await fs.unlink(stored.path);
    return true;
  } catch (err) { return false; }
};
