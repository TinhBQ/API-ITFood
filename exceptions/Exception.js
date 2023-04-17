const { OutputType, print } = require('../helpers/print.js');

module.exports = class Exception extends Error {

    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
    static WRONG_DB_CONNECTION_STRING = "Wrong server name connection string";
    static CANNOT_CONECT_MONGODB = "Can't connect to Mongoose";
    static USER_EXIST = "User already exists";
    static UPDATE_USER_FAILED = "Update user  failed"
    static CANNOT_REGISTER_USER = "Can't register user";
    static UPDATE_IMAGE_FAILED = "Update image failed"
    static WRONG_PHONENUMBER_AND_PASSWORD = 'Wrong phone number or password';
    static WRONG_USER_INFO = 'User information incorrect';
    static ERROR_PASSWORD = 'Mật khẩu phải tối thiểu 8 ký tự. Bao gồm chữ cái in hoa, in thường và chữ số.';
    static ERROR_NEW_PASSWORD = 'Mật khẩu mới phải tối thiểu 8 ký tự. Bao gồm chữ cái in hoa, in thường và chữ số.';
    static GET_ADDRESSES_FAILED = "Get addresses failed"
    static ADD_ADDRESS_FAILED = 'Add address failed';
    static ADDRESS_EXIST= 'Address already exists'
    static UPDATE_ADDRESS_FAILED = 'Update address failed';
    static DELETE_ADDRESS_FAILED = 'Delete address failed';


    constructor(message, validatorErrors={}) {
        super(message); // call constructor of parent class(Error)
        print(message, OutputType.ERROR);
        this.validatorErrors = validatorErrors;
    }
}