const { userRepository } = require('../repositories/index.js');
const HttpStatusCode = require('../exceptions/HttpStatusCode.js');
const { validationResult } = require('express-validator');
const { STATUS } = require('../global/constants.js');


const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        phoneNumber,
        password,
        name,
        email,
        gender,
        address
    } = req.body;

    try {
        await userRepository.register({
            phoneNumber,
            password,
            name,
            email,
            gender,
            address
        });

        res.status(HttpStatusCode.INSERT_OK).json({
            status: STATUS.SUCCESS,
            message: 'Register user successfully'
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        phoneNumber,
        password
    } = req.body;

    try {
        let user = await userRepository.login({ phoneNumber, password });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Login user successfully',
            data: user
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const forgotPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        phoneNumber,
        password,
        name,
        email
    } = req.body;

    try {
        let user = await userRepository.forgotPassword({
            phoneNumber,
            password,
            name,
            email
        });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Password update successful',
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        id,
        password,
        newPassword
    } = req.body;

    try {
        let user = await userRepository.resetPassword({
            id,
            password,
            newPassword
        });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Password update successful',
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const {
        id,
        name,
        email,
        gender,
        address
    } = req.body;

    try {
        let user = await userRepository.updateUser({
            id,
            name,
            email,
            gender,
            address
        });

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update user successful',
            data: user
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }
};

const updateFile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const userId = req.body.id;
    const imagePath = req.file.path;


    try {
        let user = await userRepository.updateFile(userId, imagePath);

        res.status(HttpStatusCode.OK).json({
            status: STATUS.SUCCESS,
            message: 'Update image successful',
            data: user
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            status: STATUS.ERROR,
            message: `${exception.message}`
        });
    }


};

module.exports = { register, login, forgotPassword, resetPassword, updateUser, updateFile };