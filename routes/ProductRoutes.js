const express = require('express');
const { productController } = require('../controllers/index.js')

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/best-seller', productController.getProductsBestseller);

module.exports = router;