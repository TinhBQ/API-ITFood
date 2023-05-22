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

const addCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const userId = req.body.userId
    const name = req.body.name;
    const image = req.file;

    try {
        let existingCategory = await categoryRepository.addCategory(userId, name, image);

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Add Category successful',
            result: existingCategory
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }

};

const updateCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const userId = req.body.userId
    const categoryId = req.body.categoryId;
    const name = req.body.name;
    const image = req.file;

    try {
        let existingCategory = await categoryRepository.updateCategory(userId, categoryId, name, image);

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update Category successful',
            result: existingCategory
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const deleteCategory = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        categoryId
    } = req.query;

    try {
        let existingCategory = await categoryRepository.deleteCategory({userId, categoryId});

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Delete Category successful',
            result: existingCategory
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
 
};

module.exports = { getCategories, getCategoriesCount, addCategory, updateCategory, deleteCategory };