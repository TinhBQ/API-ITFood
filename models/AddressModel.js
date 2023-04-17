const mongoose = require('mongoose');
const { COLLECTION } = require('../global/constants.js');

const addressSchema = new mongoose.Schema({
    address: {
        type: String,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.USER
    }
}, {
    timestamps : true,
});

module.exports = mongoose.model('Address', addressSchema);
