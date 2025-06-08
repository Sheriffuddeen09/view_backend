const pool = require('../config/db');

const getSuppliers = async () => {
  const res = await pool.query('SELECT * FROM suppliers');
  return res.rows;
};

const addSupplier = async ({ name, contact }) => {
  const res = await pool.query(
    'INSERT INTO suppliers (name, contact) VALUES ($1, $2) RETURNING *',
    [name, contact]
  );
  return res.rows[0];
};

module.exports = {
  getSuppliers,
  addSupplier,
};
