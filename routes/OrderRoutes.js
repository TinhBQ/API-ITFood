const express = require('express');
const { orderController } = require('../controllers/index.js');

const router = express.Router();

router.post('/', orderController.order);
router.get('/total-price', orderController.totalPrice);
router.get('/status', orderController.status);
router.patch('/update-status', orderController.updateStatus);
router.get('/total-orders-day', orderController.totalOrdersDay);
router.get('/total-prices-day', orderController.totalPricePricesDay);
router.get('/total-orders-day-series', orderController.totalOrdersDaySeries);
router.get('/total-prices-day-series', orderController.totalPricesDaySeries);
router.get('/total-prices-days', orderController.totalPricesDays);
router.get('/products', orderController.getProducts);

module.exports = router;
