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
    static GET_CATEGOIES_FAILED = 'Get categories failed';
    static CATEGORY_DOES_NOT_EXIST = "Category doesn't exist";
    static GET_PRODUCTS_FAILED = 'Get products failed';
    static ADD_PRODUCT_TO_CART_FAILED = 'Add Product to Cart failed';
    static UPDATE_PRODUCT_IN_CART_FAILED = 'Update Product in Cart failed';
    static DELETE_PRODUCT_IN_CART_FAILED = 'Delete Product from Cart failed';
    static PRODUCT_ALREADY_EXISTS_IN_CART = 'Product already exists in Cart'
    static GET_TOTAL_PRICE_FAILED = 'Get total price failed';
    static ORDER_FAILED = 'Order failed';
    static GET_STATUS_FAILED = 'Status failed';
    static GET_DELIVER_FAILED = 'Deliver failed';
    static ADD_COMMENT_FAILED = 'Add comment failed';
    static UPDATE_COMMENT_FAILED = 'Update comment failed';
    static DELETE_COMMENT_FAILED = 'Delete comment failed';
    static GET_COMMENT_FAILED = 'Get comment failed';
    static ADD_PRODUCT_FAILED = 'Add product failed';
    static UPDATE_PRODUCT_FAILED = 'Update product failed';
    static ADD_CATEGORY_FAILED = 'Add category failed';
    static UPDATE_CATEGORY_FAILED = 'Update category failed';
    static DELETE_CATEGORY_FAILED = 'Delete category failed';
    static GET_USER_BY_PHONE_NUMBER_FAILED = 'Get user by Phone Number failed';
    static GET_USER_FAILER = 'Get user failed';
    static GET_TOTAL_ORDERS_FAILED = 'Get total orders failed';
    static GET_TOTAL_PRICES_FAILED = 'Get total prices failed';
    static GET_TOTAL_ORDERS_DAY_SERIES_FAILED = 'Get total orders day services failed';
    static GET_TOTAL_PRICES_DAY_SERIES_FAILED = 'Get total prices day servioces failed';
    static GET_TOTAL_PRICES_DAYS_FAILED = 'Get total prices days failed';
    static GET_PRODUCTS_BY_ORDER_ID_FAILED = 'Get products by OrderId failed';

    constructor(message, validatorErrors={}) {
        super(message); // call constructor of parent class(Error)
        print(message, OutputType.ERROR);
        this.validatorErrors = validatorErrors;
    }
}