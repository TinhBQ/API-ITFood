const mongoose = require('mongoose');
const { COLLECTION } = require('../global/constants.js');

const orderItemSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.ORDER
    },
    name: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    image: { 
        type: String,
        required: true
    },
    quantity: {
        type: Number
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('OrderItem', orderItemSchema);