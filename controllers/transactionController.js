const db = require('../config/db');

exports.recordTransaction = async (req, res) => {
  const { product_id, type, quantity } = req.body;

  // Insert into transaction
  await db.query(
    'INSERT INTO transactions (product_id, type, quantity) VALUES ($1, $2, $3)',
    [product_id, type, quantity]
  );

  // Update product stock
  const operator = type === 'sale' ? '-' : '+';
  await db.query(`UPDATE products SET quantity = quantity ${operator} $1 WHERE id = $2`, [
    quantity,
    product_id,
  ]);

  res.json({ message: 'Transaction recorded and stock updated' });
};

exports.getAllTransactions = async (req, res) => {
  const result = await db.query('SELECT * FROM transactions');
  res.json(result.rows);
};
