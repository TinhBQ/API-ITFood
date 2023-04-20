const { MAX_RECORDS } = require('../global/constants.js');
const { categoryRepository } = require('../repositories/index.js');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { STATUS } = require('../global/constants.js');


const getCategories = async (req, res) => {
    let { page = 1, size = MAX_RECORDS, searchString = '' } = req.query;
    size = size >= MAX_RECORDS ? MAX_RECORDS : size;

    try {
        const filteredCategories = await categoryRepository.getCategories({ page, size, searchString });

        res.status(HttpStatusCode.OK).json({
            message: 'Get Categories Successfully',
            size: filteredCategories.length,
            page,
            searchString,
            data: filteredCategories
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

module.exports = { getCategories };