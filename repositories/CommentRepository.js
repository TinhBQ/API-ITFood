const { userModel, commentModel } = require('../models/index.js');
const Exception = require('../exceptions/Exception.js');

const addComment = async ({
    userId,
    product,
    comment,
    commentId
}) => {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.ADD_COMMENT_FAILED);
    };

    const existingComment = await commentModel.create({
        userId,
        product,
        comment,
        commentId
    });

    if (!existingComment) {
        throw new Exception(Exception.ADD_COMMENT_FAILED);
    }
};

const updateComment = async ({
    userId,
    commentId,
    comment
}) => {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.UPDATE_COMMENT_FAILED);
    };

    let existingComment = await commentModel.findOneAndUpdate({
        _id: commentId,
        userId: userId
    }, {$set: {comment: comment}});

    if (!existingComment) {
        throw new Exception(Exception.UPDATE_COMMENT_FAILED);
    };
};

const deleteComment = async ({
    userId,
    commentId
}) => {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.DELETE_COMMENT_FAILED);
    };

    const existingComment = await commentModel.findById(commentId);
    if (!existingComment) {
        throw new Exception(Exception.DELETE_COMMENT_FAILED);
    };
    
    await commentModel.deleteOne({_id: commentId});
    await commentModel.deleteOne({commentId});
};

module.exports = {
    addComment,
    updateComment,
    deleteComment
}