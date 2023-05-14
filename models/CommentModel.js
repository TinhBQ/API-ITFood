const mongoose = require('mongoose');
const { COLLECTION } = require('../global/constants.js');

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.USER
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.PRODUCT,
    },
    comment: {
        type: String,
        unique: true
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTION.COMMENT
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Comment', commentSchema);