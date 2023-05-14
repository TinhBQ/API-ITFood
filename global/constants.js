const MAX_RECORDS = 100;

const URL = 'https://it4food.onrender.com/';

const DEFAULT_VALUES = {
    AVATAR: 'https://1.bp.blogspot.com/-CV8fOXMMw60/YZ-UJ4X9sAI/AAAAAAAACMc/2Svet97exjgNdJ9CeTKUU3OuA-mnCQEzwCLcBGAsYHQ/s595/3a.jpg',
    IMAGE_COURSE: ""
};

const DEFAULT_GENDER = {
    MALE: 'Nam',
    FEMALE: 'Nữ'
}

const DEFAULT_ROLES = {
    MANAGER: "MANAGER",
    CLIENT: "CLIENT",
};

const STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
};

const COLLECTION = {
    USER: "User",
    ADDRESS: "Address",
    CATEGORY: "Category",
    PRODUCT: "Product",
    CART: "Cart",
    CART: "CartItem",
    ORDER: "Order",
    DELIVERY: "Delivery",
    COMMENT: "Comment"
};

const DELIVERY = {
    EXPRESS: "Express",
    SAVE: "Save",
    FAST: "Fast"
}

module.exports = {
    MAX_RECORDS,
    DEFAULT_VALUES,
    DEFAULT_GENDER,
    DEFAULT_ROLES,
    STATUS,
    COLLECTION,
    DELIVERY,
    URL
};