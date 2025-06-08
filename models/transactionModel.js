const pool = require('../config/db');

const getTransactions = async () => {
  const res = await pool.query('SELECT * FROM transactions');
  return res.rows;
};

const addTransaction = async ({ product_id, type, quantity }) => {
  await pool.query('BEGIN');
  const transaction = await pool.query(
    'INSERT INTO transactions (product_id, type, quantity) VALUES ($1, $2, $3) RETURNING *',
    [product_id, type, quantity]
  );

  const qtyChange = type === 'purchase' ? quantity : -quantity;

  await pool.query(
    'UPDATE products SET quantity = quantity + $1 WHERE id = $2',
    [qtyChange, product_id]
  );

  await pool.query('COMMIT');
  return transaction.rows[0];
};

module.exports = {
  getTransactions,
  addTransaction,
};
