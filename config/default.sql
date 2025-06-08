-- Create Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_info TEXT
);

-- Create Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sku VARCHAR(50) UNIQUE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  price NUMERIC(10, 2) NOT NULL,
  supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL
);

-- Create Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  type VARCHAR(10) CHECK (type IN ('sale', 'purchase')),
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
