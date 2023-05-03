const express = require('express');
const { categoryController } = require('../controllers/index.js')

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/count', categoryController.getCategoriesCount);

module.exports = router;