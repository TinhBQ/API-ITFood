const { deliveryRepository } = require('../repositories/index.js');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { STATUS } = require('../global/constants.js');

const getDeliveries = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId
    } = req.query;

    try {
        const existingDelivery = await deliveryRepository.getDeliveries({userId});

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get successful count Categories',
            ...existingDelivery
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

module.exports = {
    getDeliveries
}