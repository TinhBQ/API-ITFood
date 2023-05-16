const express = require('express');
const { categoryController } = require('../controllers/index.js')
const upload = require('../middleware/upload.js')

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/count', categoryController.getCategoriesCount);
router.post('/add', upload.single('image'), categoryController.addCategory);
router.patch('/update', upload.single('image'), categoryController.updateCategory);
router.delete('/delete', categoryController.deleteCategory);


module.exports = router;