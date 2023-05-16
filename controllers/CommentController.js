const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { validationResult } = require('express-validator');
const { STATUS } = require('../global/constants.js');
const { commentRepository } = require('../repositories/index.js');

const addComment = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        product,
        comment,
        commentId
    } = req.body;

    try {
        await commentRepository.addComment({ userId, product, comment, commentId });

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Insert comment successful',
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const updateComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        commentId,
        comment
    } = req.body;

    try {
        await commentRepository.updateComment({ userId, commentId, comment });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update comment successful',
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const deleteComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        commentId
    } = req.body;

    try {
        await commentRepository.deleteComment({ userId, commentId });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Delete comment successful',
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const getComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        product,
        commentId
    } = req.params;

    try {
        const existingComment = await commentRepository.getComment({ userId, product, commentId });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Delete comment successful',
            ...existingComment
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

module.exports = {
    addComment,
    updateComment,
    deleteComment,
    getComment
}