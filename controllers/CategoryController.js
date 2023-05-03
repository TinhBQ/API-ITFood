const { MAX_RECORDS } = require('../global/constants.js');
const { categoryRepository } = require('../repositories/index.js');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { STATUS } = require('../global/constants.js');
const { validationResult } = require('express-validator');


const getCategories = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    try {
        const filteredCategories = await categoryRepository.getCategories({ page, size, searchString });

        res.status(HttpStatusCode.OK).json({
            message: 'Get Categories Successfully',
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

const getCategoriesCount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
        const filteredCategories = await categoryRepository.getCategoriesCount();

        res.status(HttpStatusCode.OK).json({
            message: 'Get successful count Categories',
            ...filteredCategories
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

module.exports = { getCategories, getCategoriesCount };