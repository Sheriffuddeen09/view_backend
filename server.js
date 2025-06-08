const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
