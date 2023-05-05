const mongoose = require('mongoose');
const { COLLECTION, DELIVERY } = require('../global/constants.js');

const orderSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.USER
    },
    address: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (phoneNumber) => {
                return /^\d{10}$/.test(phoneNumber);
            },
            message: 'Số điện thoại bao gồm 10 chữ số.'
        }
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.DELIVERY,
        required: true,
        unique: false
    },
    status: {
        type: Number,
        required: true,
        default: 0 
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Order', orderSchema);
