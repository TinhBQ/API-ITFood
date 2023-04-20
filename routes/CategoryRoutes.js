const express = require('express');
const { categoryController } = require('../controllers/index.js')

const router = express.Router();

router.get('/', categoryController.getCategories);

module.exports = router;