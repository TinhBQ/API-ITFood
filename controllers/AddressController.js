const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { validationResult } = require('express-validator');
const { STATUS } = require('../global/constants.js');
const { addressRepository } = require('../repositories/index.js');

const getAddresses = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId
    } = req.body;

    try {
        let addresses = await addressRepository.getAddresses({userId});

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Get addresses successful',
            ...addresses
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const addAddress = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        userId,
        address
    } = req.body;

    try {
        let addresses = await addressRepository.addAddress({userId, address});

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Add address successful',
            ...addresses
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const updateAddress = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        id,
        userId,
        address
    } = req.body;

    try {
        let addresses = await addressRepository.updateAddress({id, userId, address});

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update address successful',
            ...addresses
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const deleteAddress = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        id,
        userId,
    } = req.body;

    try {
        let addresses = await addressRepository.deleteAddress({id, userId});

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Delete address successful',
            ...addresses
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

module.exports = { getAddresses, addAddress, updateAddress, deleteAddress };