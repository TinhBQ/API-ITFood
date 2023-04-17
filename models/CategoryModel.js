const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
        require: true,
        unique: true
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Category', categorySchema);