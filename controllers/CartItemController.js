const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { validationResult } = require('express-validator');
const { STATUS } = require('../global/constants.js');
const { cartItemRepository } = require('../repositories/index.js');

const addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        productId
    } = req.body;

    try {
        await cartItemRepository.addProduct({ userId, productId });

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Product added to cart successfully'
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        productId,
        quantity
    } = req.body;

    try {
        await cartItemRepository.updateProduct({ userId, productId, quantity });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Product updated in Cart successfully'
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const deleteProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        productId
    } = req.body;

    try {
        await cartItemRepository.deleteProduct({ userId, productId });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Product deleted in Cart successfully'
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const getProducts = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId
    } = req.body;

    try {
        let existingCartItem = await cartItemRepository.getProducts({ userId });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get products in the cart successfully',
            ...existingCartItem
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

module.exports = { addProduct, updateProduct, deleteProduct, getProducts }