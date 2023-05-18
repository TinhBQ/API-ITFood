const { MAX_RECORDS } = require('../global/constants.js');
const { productRepository } = require('../repositories/index.js');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { STATUS } = require('../global/constants.js');
const { validationResult } = require('express-validator');

const getProducts = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    let { categoryId, page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    try {
        const filteredCategories = await productRepository.getProducts({ categoryId, page, size, searchString });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get Products Successfully',
            // size: filteredCategories.length,
            // page,
            // searchString,
            data: filteredCategories
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const getProductsBestseller = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
        const filteredCategories = await productRepository.getProductsBestseller({});

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get Products Successfully',
            // size: filteredCategories.length,
            // page,
            // searchString,
            data: filteredCategories
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const userId = req.body.userId
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const categoryId = req.body.categoryId;
    const image = req.file;

    try {
        let existingProduct = await productRepository.addProduct(userId, name, description, price, quantity, categoryId, image);

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Add product successful',
            result: existingProduct
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

    const userId = req.body.userId;
    const productId = req.body.productId;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const image = req.file;

    try {
        let existingProduct = await productRepository.updateProduct(userId, productId, name,  description, price, quantity, image);

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update product successful',
            result: existingProduct
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
        await productRepository.deleteProduct({userId, productId});

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Delete product successful'
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const getAllProducts = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;


    try {
        const filteredCategories = await productRepository.getAllProducts({page, size, searchString});

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get Products Successfully',
            // size: filteredCategories.length,
            // page,
            // searchString,
            data: filteredCategories
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`
        });
    }

};

module.exports = { getProducts, getProductsBestseller, addProduct, updateProduct, deleteProduct, getAllProducts };