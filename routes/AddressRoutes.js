const express = require('express');
const { addressController } = require('../controllers/index.js')

const router = express.Router();

router.get('/addresses', addressController.getAddresses);
router.post('/add-address', addressController.addAddress);
router.patch('/update-address', addressController.updateAddress);
router.delete('/delete-address', addressController.deleteAddress);


module.exports = router;

