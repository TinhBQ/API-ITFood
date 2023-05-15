const Exception = require('../exceptions/Exception.js');
const {
    orderModel,
    orderItemModel,
    userModel, cartModel,
    cartItemModel, deliveryModel,
    productModel
} = require('../models/index.js');

const order = async ({
    userId,
    address,
    phoneNumber,
    delivery
}) => {
    let existingUser = await userModel.findById(userId);
    if (existingUser) {
        let existingCart = await cartModel.findOne({ userId: existingUser._id });
        if (!existingCart) {
            throw new Exception(Exception.ORDER_FAILED);
        }

        // Get Price
        let existingCartItem = await cartItemModel.find({ cartId: existingCart._id }, { _id: 0, product: 1, quantity: 1 }).populate(
            {
                path: "product",
                select: { _id: 0, price: 1 }
            });

        if (!existingCartItem) {
            throw new Exception(Exception.ORDER_FAILED);
        } // Tồn tại sản phẩm trong giỏ hàng -> Tiến hành xử lý

        let totalPriceProduct = !existingCartItem ? 0 : existingCartItem.map(element => {
            // let newObject = element.product;
            // newObject.quantity = element.quantity;
            return element.product.price * element.quantity;
        }).reduce((partialSum, a) => partialSum + a, 0);

        const existingDelivery = await deliveryModel.findById(delivery);
        let priceDelivery = !!existingDelivery ? existingDelivery.price : 0;

        let totalPrice = totalPriceProduct + priceDelivery;
        // Get Price done

        // Insert Order
        const existingOrder = await orderModel.create({
            userId: existingUser._id,
            address,
            phoneNumber,
            delivery: existingDelivery._id,
            totalPrice: totalPrice
        });

        if (!existingOrder) {
            throw new Exception(Exception.ORDER_FAILED);
        }

        await orderModel.drop
        // Insert Order done

        // Insert OrderItem
        existingCartItem = await cartItemModel.find({ cartId: existingCart._id }, { _id: 0, product: 1, quantity: 1 }).populate(
            {
                path: "product",
                select: { _id: 0, name: 1, description: 1, price: 1, image: 1 }
            });

        let orderItemNew = existingCartItem.map((element) => {
            let newObject = element.product;
            newObject.quantity = element.quantity;
            return newObject;
        });

        orderItemNew.forEach(async (element) => {
            const isTrue = await orderItemModel.create({
                orderId: existingOrder._id,
                name: element.name,
                description: element.description,
                price: element.price,
                image: element.image,
                quantity: element.quantity
            });

            if (!isTrue) {
                await orderItemModel.deleteMany({ orderId: existingOrder._id });
                await orderModel.deleteOne({ _id: existingOrder._id });
                throw new Exception(Exception.ORDER_FAILED);
            }
        });
        // Insert OrderItem done

        // Update product
        existingCartItem = await cartItemModel.find({ cartId: existingCart._id }, { _id: 0, product: 1, quantity: 1 }).populate(
            {
                path: "product",
                select: { _id: 1, quantity: 1 }
            });

        console.log(existingCart)

        let updateQuantityProducts = existingCartItem.map(element => {
            let newObject = element.product;
            newObject.quantity = newObject.quantity - element.quantity;
            return newObject;
        });

        console.log(updateQuantityProducts);

        updateQuantityProducts.forEach(async (element) => {
            let updateProduct = await productModel.findById(element._id);

            let sold = updateProduct.sold;
            let quantity = updateProduct.quantity - element.quantity;
            sold = sold > 0 ? sold + quantity : 0 + quantity;

            updateProduct.quantity = element.quantity ?? updateProduct.quantity;
            updateProduct.sold = sold ?? updateProduct.sold;
            await updateProduct.save();
        });
        // Update product done

        // delete cart items
        await cartItemModel.deleteMany({ cartId: existingCart._id });
        // delete cart items done
    } else {
        throw new Exception(Exception.ORDER_FAILED);
    }
};

const totalPrice = async ({
    userId,
    delivery
}) => {
    let existingUser = await userModel.findById(userId);
    if (existingUser) {
        let existingCart = await cartModel.findOne({ userId: existingUser._id });
        if (!existingCart) {
            throw new Exception(Exception.GET_TOTAL_PRICE_FAILED);
        }

        let existingCartItem = await cartItemModel.find({ cartId: existingCart._id }, { _id: 0, product: 1, quantity: 1 }).populate(
            {
                path: "product",
                select: { _id: 0, price: 1 }
            });

        if (!existingCartItem) {
            throw new Exception(Exception.GET_TOTAL_PRICE_FAILED);
        }

        let totalPriceProduct = !existingCartItem ? 0 : existingCartItem.map(element => {
            // let newObject = element.product;
            // newObject.quantity = element.quantity;
            return element.product.price * element.quantity;
        }).reduce((partialSum, a) => partialSum + a, 0);

        const existingDelivery = await deliveryModel.findById(delivery);
        let priceDelivery = !!existingDelivery ? existingDelivery.price : 0;

        return {
            result: totalPriceProduct + priceDelivery
        }

    } else {
        throw new Exception(Exception.GET_TOTAL_PRICE_FAILED);
    }
};

const status = async ({
    userId
}) => {
    let existingUser = await userModel.findById(userId);
    if (existingUser) {
        let existingOrder = await orderModel.find({ userId: existingUser._id }, { _id: 1, status: 1});

        if (!existingOrder) {
            throw new Exception(Exception.GET_STATUS_FAILED);
        }

        return existingOrder;
    } else {
        throw new Exception(Exception.GET_STATUS_FAILED);
    }
};



module.exports = {
    order,
    totalPrice,
    status
}