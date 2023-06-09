const { orderRepository } = require('../repositories/index.js');
const { validationResult } = require('express-validator');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { STATUS } = require('../global/constants.js');
const moment = require('moment');

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
    } = req.query;

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
    } = req.query;

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

const totalOrdersDay = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId
    } = req.query;

    try {
        let existingStatus = await orderRepository.totalOrdersDay({ userId });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get total orders for the day successfully',
            ...existingStatus
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const totalPricePricesDay = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId
    } = req.query;

    try {
        let existingStatus = await orderRepository.totalPricePricesDay({ userId });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get total prices for the day successfully',
            ...existingStatus
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const totalOrdersDaySeries = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const userId = req.query.userId;
    const startDay = moment(req.query.startDay, 'DD/MM/YYYY').utc();
    const endDay = moment(req.query.endDay, 'DD/MM/YYYY').utc();

    try {
        let existingStatus = await orderRepository.totalOrdersDaySeries(userId, startDay, endDay);

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get total prices for the day successfully',
            ...existingStatus
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const totalPricesDaySeries = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const userId = req.query.userId;
    const startDay = moment(req.query.startDay, 'DD/MM/YYYY').utc();
    const endDay = moment(req.query.endDay, 'DD/MM/YYYY').utc();

    try {
        let existingStatus = await orderRepository.totalPricesDaySeries(userId, startDay, endDay);

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get total prices for the day successfully',
            ...existingStatus
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const totalPricesDays = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const userId = req.query.userId;
    const startDay = moment(req.query.startDay, 'DD/MM/YYYY').utc();
    const endDay = moment(req.query.endDay, 'DD/MM/YYYY').utc();

    try {
        let existingStatus = await orderRepository.totalPricesDays(userId, startDay, endDay);

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get total prices for the day successfully',
            ...existingStatus
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const updateStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        orderId,
        status
    } = req.body;

    try {
        let existingStatus = await orderRepository.updateStatus({ userId, orderId, status });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update status successfully',
            results: existingStatus
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
        userId,
        orderId
    } = req.query;

    try {
        let existingStatus = await orderRepository.getProducts({ userId, orderId });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get Product by OrderId successfully',
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
    status,
    totalOrdersDay,
    totalPricePricesDay,
    totalOrdersDaySeries,
    totalPricesDaySeries,
    totalPricesDays,
    updateStatus,
    getProducts
}