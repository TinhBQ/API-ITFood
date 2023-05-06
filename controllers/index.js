const userController = require('./UserController.js');
const addressController = require('./AddressController.js');
const categoryController = require('./CategoryController.js');
const productController = require('./ProductController.js');
const cartItemController = require('./CartItemController.js');
const orderController = require('./OrderController.js');
const deliveryController = require('./DeliveryController.js');

module.exports = {
    userController,
    addressController,
    categoryController,
    productController,
    cartItemController,
    orderController,
    deliveryController
};