-- 001_create_kv_and_core_tables.sql

BEGIN;

-- Key-value storage used for StorageService migration/fallback
CREATE TABLE IF NOT EXISTS kv_store (
  namespace VARCHAR(100) NOT NULL,
  key VARCHAR(200) NOT NULL,
  value TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  PRIMARY KEY(namespace,key)
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Pharmacies
CREATE TABLE IF NOT EXISTS pharmacies (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Medicines
CREATE TABLE IF NOT EXISTS medicines (
  id SERIAL PRIMARY KEY,
  pharmacy_id INT REFERENCES pharmacies(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  sku VARCHAR(100),
  price NUMERIC(12,2) NOT NULL,
  stock INT DEFAULT 0,
  requires_prescription BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_med_name ON medicines USING gin (to_tsvector('simple', name));

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  pharmacy_id INT REFERENCES pharmacies(id),
  total NUMERIC(12,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'created',
  delivery_id INT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  medicine_id INT REFERENCES medicines(id),
  quantity INT,
  price_at_purchase NUMERIC(12,2)
);

-- Prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  order_id INT REFERENCES orders(id),
  file_path TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  reviewed_by INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Subscription plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  features JSONB
);

CREATE TABLE IF NOT EXISTS pharmacy_subscriptions (
  id SERIAL PRIMARY KEY,
  pharmacy_id INT REFERENCES pharmacies(id),
  plan_id INT REFERENCES subscription_plans(id),
  status VARCHAR(20) DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Deliveries
CREATE TABLE IF NOT EXISTS deliveries (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  driver_id INT REFERENCES users(id),
  status VARCHAR(20),
  location_lat NUMERIC(9,6),
  location_lng NUMERIC(9,6),
  updated_at TIMESTAMP DEFAULT now()
);

-- Ratings
CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  pharmacy_id INT REFERENCES pharmacies(id),
  rating INT CHECK (rating >=1 AND rating <=5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT now()
);

COMMIT;
