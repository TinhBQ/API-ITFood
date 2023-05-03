const mongoose = require('mongoose');
const { COLLECTION } = require('../global/constants.js');

const cartItemSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.CART
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.PRODUCT,
        unique: false
    },
    quantity: {
        type: Number,
        default: 0
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('CartItem', cartItemSchema);