const express = require('express');
const { cartItemController } = require('../controllers/index.js');

const router = express.Router();

router.post('/add', cartItemController.addProduct);
router.patch('/update', cartItemController.updateProduct);
router.delete('/delete', cartItemController.deleteProduct);
router.get('/', cartItemController.getProducts);

module.exports = router;
