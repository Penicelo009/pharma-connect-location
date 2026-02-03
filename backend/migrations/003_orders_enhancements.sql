-- 003_orders_enhancements.sql

BEGIN;

-- Ensure default status is 'pending' for new orders
ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'pending';

-- Add contact info for guest orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS contact_name VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_address TEXT;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_pharmacy ON orders(pharmacy_id);

COMMIT;
