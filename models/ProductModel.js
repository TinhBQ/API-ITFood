const mongoose = require('mongoose');
const { COLLECTION } = require('../global/constants.js');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    image: { 
        type: String,
        required: true,
        unique: true

        
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.CATEGORY
    },
}, {
    timestamps : true,
});

module.exports = mongoose.model('Product', productSchema);
