const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail.js');
const { DEFAULT_VALUES, DEFAULT_GENDER, DEFAULT_ROLES, COLLECTION } = require('../global/constants.js');

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (phoneNumber) => {
                return /^\d{10}$/.test(phoneNumber);
            },
            message: 'Số điện thoại bao gồm 10 chữ số.'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password) => {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
            },
            message: "Mật khẩu phải tối thiểu 8 ký tự. Bao gồm chữ cái in hoa, in thường và chữ số."
        }
    },
    name: {
        type: String,
        required: true,
        default: "Anonymous",
        trim: true,
        validate: {
            validator: (name) => {
                return /^[\p{L}\s]*$/mu.test(name);
            },
            message: "Họ và tên là chuỗi chữ không chứa các ký tự đặt biệt."
        }
    },
    email: {
        type: String,
        require: true,
        default: "Anonymous@gmail.com",
        validate: {
            validator: (email) => {
                isEmail
            },
            message: "Email không hợp lệ."
        }
    },
    gender: {
        type: String,
        enum: {
            values: [DEFAULT_GENDER.MALE, DEFAULT_GENDER.FEMALE],
            massage: '{VALUE} is not supported'
        },
        required: true,
        default: DEFAULT_GENDER.MALE
    },
    avatar: {
        type: String,
        default: DEFAULT_VALUES.AVATAR,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: [DEFAULT_ROLES.CLIENT, DEFAULT_ROLES.MANAGER],
            massage: '{VALUE} is not supported'
        },
        required: true,
        default: DEFAULT_ROLES.CLIENT
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('User', userSchema);