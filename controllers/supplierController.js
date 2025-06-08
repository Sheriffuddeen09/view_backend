const db = require('../config/db');

exports.getAllSuppliers = async (req, res) => {
  const result = await db.query('SELECT * FROM suppliers');
  res.json(result.rows);
};

exports.addSupplier = async (req, res) => {
  const { name, contact } = req.body;
  await db.query('INSERT INTO suppliers (name, contact) VALUES ($1, $2)', [name, contact]);
  res.json({ message: 'Supplier added' });
};
