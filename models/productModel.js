const pool = require('../config/db');

const getAllProducts = async () => {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
};

const addProduct = async ({ name, sku, quantity, price, supplier_id }) => {
  const result = await pool.query(
    'INSERT INTO products (name, sku, quantity, price, supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, sku, quantity, price, supplier_id]
  );
  return result.rows[0];
};

const updateProduct = async (id, data) => {
  const { name, sku, quantity, price, supplier_id } = data;
  const result = await pool.query(
    `UPDATE products SET name=$1, sku=$2, quantity=$3, price=$4, supplier_id=$5 WHERE id=$6 RETURNING *`,
    [name, sku, quantity, price, supplier_id, id]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  await pool.query('DELETE FROM products WHERE id=$1', [id]);
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
