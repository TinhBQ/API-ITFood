const express = require('express');
const { deliveryController } = require('../controllers/index.js')

const router = express.Router();

router.get('/', deliveryController.getDeliveries);

module.exports = router;