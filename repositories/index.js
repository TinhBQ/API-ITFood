const userRepository = require('./UserRepository.js');
const addressRepository = require('./AddressRepository.js');
const categoryRepository = require('./CategoryRepository.js');
const productRepository = require('./ProductRepository.js');
const cartItemRepository = require('./CartItemRepository.js');
const orderRepository = require('./OrderRepository.js');
const deliveryRepository = require('./DeliveryRepository.js');

module.exports = {
    userRepository,
    addressRepository,
    categoryRepository,
    productRepository,
    cartItemRepository,
    orderRepository,
    deliveryRepository
}