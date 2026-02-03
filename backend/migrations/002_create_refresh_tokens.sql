-- 002_create_refresh_tokens.sql

BEGIN;

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP,
  revoked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now(),
  revoked_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id);

COMMIT;
