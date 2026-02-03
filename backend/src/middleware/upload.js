const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'prescriptions');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, UPLOAD_DIR); },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`;
    cb(null, name);
  }
});

function fileFilter (req, file, cb) {
  const allowed = ['image/jpeg','image/png','image/webp','application/pdf'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type'), false);
}

const limits = { fileSize: parseInt(process.env.MAX_UPLOAD_SIZE || (5 * 1024 * 1024)) };

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
