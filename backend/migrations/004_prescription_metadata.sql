-- 004_prescription_metadata.sql

BEGIN;

ALTER TABLE prescriptions
  ADD COLUMN IF NOT EXISTS original_filename VARCHAR(255),
  ADD COLUMN IF NOT EXISTS mime_type VARCHAR(100),
  ADD COLUMN IF NOT EXISTS size_bytes INT,
  ADD COLUMN IF NOT EXISTS storage_driver VARCHAR(50) DEFAULT 'local',
  ADD COLUMN IF NOT EXISTS checksum VARCHAR(128),
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP,
  ADD COLUMN IF NOT EXISTS reviewed_by INT REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_prescriptions_order ON prescriptions(order_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_user ON prescriptions(user_id);

COMMIT;
