const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');

router.get('/', ctrl.getAllProducts);
router.post('/', ctrl.addProduct);
router.put('/:id', ctrl.updateProduct);
router.delete('/:id', ctrl.deleteProduct);

module.exports = router;
