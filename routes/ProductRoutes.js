const express = require('express');
const { productController } = require('../controllers/index.js')
const upload = require('../middleware/upload.js')

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/best-seller', productController.getProductsBestseller);
router.post('/add', upload.single('image'), productController.addProduct);

module.exports = router;