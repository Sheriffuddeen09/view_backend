const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/supplierController');

router.get('/', ctrl.getAllSuppliers);
router.post('/', ctrl.addSupplier);

module.exports = router;
