const { userModel, cartModel, cartItemModel, productModel } = require('../models/index.js');
const Exception = require('../exceptions/Exception.js');

const addProduct = async ({
    userId,
    productId
}) => {
    let existingUser = await userModel.findById(userId);
    if (!!existingUser) {
        let existingCart = await cartModel.findOne({ userId: existingUser._id });
        if (!existingCart) {
            throw new Exception(Exception.ADD_PRODUCT_TO_CART_FAILED);
        }

        let existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            throw new Exception(Exception.ADD_PRODUCT_TO_CART_FAILED);
        }

        let existingProductInCart = await cartItemModel.findOne({ product: existingProduct._id });
        if (existingProductInCart) {
            throw new Exception(Exception.PRODUCT_ALREADY_EXISTS_IN_CART);
        }

        await cartItemModel.create({
            cartId: existingCart._id,
            product: existingProduct._id,
            quantity: 1
        });
    } else {
        throw new Exception(Exception.ADD_PRODUCT_TO_CART_FAILED);
    }
};

const updateProduct = async ({
    userId,
    productId,
    quantity
}) => {

    let existingUser = await userModel.findById(userId);
    if (existingUser) {
        let existingCart = await cartModel.findOne({ userId: existingUser._id });
        if (!existingCart) {
            throw new Exception(Exception.UPDATE_PRODUCT_IN_CART_FAILED);
        }

        let existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            throw new Exception(Exception.UPDATE_PRODUCT_IN_CART_FAILED);
        }

        let existingCartItem = await cartItemModel.findOne({ product: existingProduct._id });
        if (!existingCartItem) {
            throw new Exception(Exception.UPDATE_PRODUCT_IN_CART_FAILED);
        }

        if (quantity <= 0) {
            throw new Exception(Exception.UPDATE_PRODUCT_IN_CART_FAILED);
        }

        existingCartItem.quantity = quantity ?? existingCartItem.quantity;
        await existingCartItem.save();
    } else {
        throw new Exception(Exception.UPDATE_PRODUCT_IN_CART_FAILED);
    }
};

const deleteProduct = async({
    userId,
    productId
}) => {
    let existingUser = await userModel.findById(userId);
    if (existingUser) {
        let existingCart = await cartModel.findOne({ userId: existingUser._id });
        if (!existingCart) {
            throw new Exception(Exception.DELETE_PRODUCT_IN_CART_FAILED);
        }

        let existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            throw new Exception(Exception.DELETE_PRODUCT_IN_CART_FAILED);
        }

        await cartItemModel.deleteOne({ product: existingProduct._id });

    } else {
        throw new Exception(Exception.DELETE_PRODUCT_IN_CART_FAILED);
    }
};

const getProducts = async ({ userId }) => {
    let existingUser = await userModel.findById(userId);
    if (existingUser) {
        let existingCart = await cartModel.findOne({ userId: existingUser._id });
        if (!existingCart) {
            throw new Exception(Exception.DELETE_PRODUCT_IN_CART_FAILED);
        }

        let existingCartItem = await cartItemModel.find({ cartId: existingCart._id }, {_id: 0, product: 1}).populate(
            {
                path: "product",
                select: {name: 1, description: 1, price: 1, quantity: 1, image: 1}
            });

        let result = existingCartItem.map( element => {
            return element.product;
        })

        return { data: result };

    } else {
        throw new Exception(Exception.DELETE_PRODUCT_IN_CART_FAILED);
    }
};

module.exports = { addProduct, updateProduct, deleteProduct, getProducts }