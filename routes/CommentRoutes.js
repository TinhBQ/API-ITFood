const express = require('express');
const { commentController } = require('../controllers/index.js')

const router = express.Router();

router.post('/add', commentController.addComment);
router.patch('/update', commentController.updateComment);
router.delete('/delete', commentController.deleteComment);

module.exports = router;