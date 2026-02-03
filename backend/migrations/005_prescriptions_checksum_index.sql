-- 005_prescriptions_checksum_index.sql

BEGIN;

-- Index for fast lookup by checksum
CREATE INDEX IF NOT EXISTS idx_prescriptions_checksum ON prescriptions (checksum);

-- Prevent duplicate prescription uploads for the same order and checksum
CREATE UNIQUE INDEX IF NOT EXISTS uniq_prescription_order_checksum ON prescriptions (order_id, checksum) WHERE order_id IS NOT NULL;

COMMIT;
