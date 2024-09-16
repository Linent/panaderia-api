const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/create', orderController.createSale);
router.get('/', orderController.getSales);

module.exports = router;
