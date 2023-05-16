const { orderRepository } = require('../repositories/index.js');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { STATUS } = require('../global/constants.js');

const order = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        address,
        phoneNumber,
        delivery
    } = req.body;

    try {
        let existingOder = await orderRepository.order({ userId, address, phoneNumber, delivery });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Order successfully',
            ...existingOder
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }

};

const totalPrice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        delivery
    } = req.params;

    try {
        let totoalPrice = await orderRepository.totalPrice({ userId, delivery });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get totoal price successfully',
            ...totoalPrice
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const status = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId
    } = req.params;

    try {
        let existingStatus = await orderRepository.status({ userId });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get status successfully',
            results: existingStatus
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

module.exports = {
    order,
    totalPrice,
    status
}