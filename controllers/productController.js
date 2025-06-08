const db = require('../config/db');

exports.getAllProducts = async (req, res) => {
  const result = await db.query('SELECT * FROM products');
  res.json(result.rows);
};

exports.addProduct = async (req, res) => {
  const { name, sku, quantity, price, supplier_id } = req.body;
  await db.query(
    'INSERT INTO products (name, sku, quantity, price, supplier_id) VALUES ($1, $2, $3, $4, $5)',
    [name, sku, quantity, price, supplier_id]
  );
  res.json({ message: 'Product added' });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, sku, quantity, price, supplier_id } = req.body;
  await db.query(
    'UPDATE products SET name=$1, sku=$2, quantity=$3, price=$4, supplier_id=$5 WHERE id=$6',
    [name, sku, quantity, price, supplier_id, id]
  );
  res.json({ message: 'Product updated' });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM products WHERE id=$1', [id]);
  res.json({ message: 'Product deleted' });
};
