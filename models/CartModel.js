const mongoose = require('mongoose');
const { COLLECTION } = require('../global/constants.js');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.USER,
        unique: true,
        required: true
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Cart', cartSchema);
