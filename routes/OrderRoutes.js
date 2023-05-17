const express = require('express');
const { orderController } = require('../controllers/index.js');

const router = express.Router();

router.post('/', orderController.order);
router.get('/total-price', orderController.totalPrice);
router.get('/status', orderController.status);
router.get('/total-orders-day', orderController.totalOrdersDay);

module.exports = router;
