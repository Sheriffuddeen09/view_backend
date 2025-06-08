const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/transactionController');

router.post('/', ctrl.recordTransaction);
router.get('/', ctrl.getAllTransactions);

module.exports = router;
