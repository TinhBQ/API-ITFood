const mongoose = require('mongoose');
const { DELIVERY } = require('../global/constants.js');

const deliverySchema = new mongoose.Schema({
    name: {
        type: String,
        enum: {
            values: [DELIVERY.EXPRESS, DELIVERY.SAVE, DELIVERY.FAST],
            massage: '{VALUE} is no_DELIVERY.t supported'
        },
        required: true,
        default: DELIVERY.SAVE
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Delivery', deliverySchema);