const express = require('express');
const { userController } = require('../controllers/index.js')
const upload = require('../middleware/upload.js')

const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/forgot-password', userController.forgotPassword);
router.patch('/reset-password', userController.resetPassword);
router.patch('/update-user', userController.updateUser);
router.post('/upload-file', upload.single('avatar'), userController.updateFile);
router.get('/', userController.getUser);
router.patch('/update', userController.updateUser);

module.exports = router;