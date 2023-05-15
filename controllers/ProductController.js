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

    let { categoryId, page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

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

module.exports = { getProducts, getProductsBestseller };