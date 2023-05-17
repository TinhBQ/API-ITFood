const { database } = require('firebase-admin');
const Exception = require('../exceptions/Exception.js');
const moment = require('moment-timezone');
const {
    orderModel,
    orderItemModel,
    userModel, cartModel,
    cartItemModel, deliveryModel,
    productModel
} = require('../models/index.js');
const { array } = require('../middleware/upload.js');

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

        let existingCartItem = await cartItemModel.findOne({ cartId: existingCart._id });
        if (!existingCartItem) {
            throw new Exception(Exception.ORDER_FAILED);
        }

        // Get Price
        existingCartItem = await cartItemModel.find({ cartId: existingCart._id }, { _id: 0, product: 1, quantity: 1 }).populate(
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

        // await orderModel.drop
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
        let existingOrder = await orderModel.find({ userId: existingUser._id }, { _id: 1, status: 1 });

        if (!existingOrder) {
            throw new Exception(Exception.GET_STATUS_FAILED);
        }

        return existingOrder;
    } else {
        throw new Exception(Exception.GET_STATUS_FAILED);
    }
};

const totalOrdersDay = async ({
    userId
}) => {
    let existingUser = await userModel.find({ _id: userId, role: 'MANAGER' });
    if (!existingUser) {
        throw new Exception(Exception.GET_TOTAL_ORDERS_FAILED);
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây về 0
    console.log(startOfDay)

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let existingOrder = await orderModel.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } }, { _id: 1 });
    console.log(existingOrder);

    let totalOrdersDay = !existingOrder ? 0 : existingOrder.reduce((partialSum) => partialSum + 1, 0);
    console.log(totalOrdersDay);
    return {
        result: totalOrdersDay
    }
};

const totalPricePricesDay = async ({
    userId
}) => {
    let existingUser = await userModel.find({ _id: userId, role: 'MANAGER' });
    if (!existingUser) {
        throw new Exception(Exception.GET_TOTAL_PRICES_FAILED);
    }

    const startOfDay = new Date();
     // Đặt giờ, phút, giây, mili giây về 0
    startOfDay.setHours(0, 0, 0, 0);
    console.log(startOfDay)

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    console.log(endOfDay)

    let existingOrder = await orderModel.find({ createdAt: { $gte: startOfDay, $lte: endOfDay } }, { _id: 0, totalPrice: 1 });
    console.log(existingOrder);

    let totalPricesDay = !existingOrder ? 0 : existingOrder.reduce((partialSum, element) => partialSum + element.totalPrice, 0);
    console.log(totalPricesDay);
    return {
        result: totalPricesDay
    }
};

const totalOrdersDaySeries = async (userId, startDay, endDay) => {
    let existingUser = await userModel.find({ _id: userId, role: 'MANAGER' });
    if (!existingUser) {
        throw new Exception(Exception.GET_TOTAL_ORDERS_DAY_SERIES_FAILED);
    }

    console.log(startDay);
    console.log(endDay);
    let originalDate = moment(startDay);
    startDay = originalDate.add(1, 'day');

    originalDate = moment(endDay);
    endDay = originalDate.add(1, 'day');

    
    const formatStr = 'DD/MM/YYYY';

    const dateStart = moment.utc(startDay, formatStr).startOf('day').utc().toISOString();
    console.log(dateStart); // 2023-04-10T17:00:00.000Z

    const dateEnd = moment.utc(endDay, formatStr).endOf('day').utc().toISOString();
    console.log(dateEnd); 
    

    if (dateEnd < dateStart) {
        throw new Exception(Exception.GET_TOTAL_ORDERS_FAILED);
    }


    let existingOrder = await orderModel.find({ createdAt: { $gte: dateStart, $lte: dateEnd } }, { _id: 1 });
    console.log(existingOrder);

    let totalOrdersDaySeries = !existingOrder ? 0 : existingOrder.reduce((partialSum) => partialSum + 1, 0);
    console.log(totalOrdersDaySeries);
    return {
        result: totalOrdersDaySeries
    }
}

const totalPricesDaySeries = async (userId, startDay, endDay) => {
    let existingUser = await userModel.find({ _id: userId, role: 'MANAGER' });
    if (!existingUser) {
        throw new Exception(Exception.GET_TOTAL_PRICES_DAY_SERIES_FAILED);
    }

    console.log(startDay);
    console.log(endDay);
    let originalDate = moment(startDay);
    startDay = originalDate.add(1, 'day');

    originalDate = moment(endDay);
    endDay = originalDate.add(1, 'day');

    
    const formatStr = 'DD/MM/YYYY';

    const dateStart = moment.utc(startDay, formatStr).startOf('day').utc().toISOString();
    console.log(dateStart); // 2023-04-10T17:00:00.000Z

    const dateEnd = moment.utc(endDay, formatStr).endOf('day').utc().toISOString();
    console.log(dateEnd); 
    

    if (dateEnd < dateStart) {
        throw new Exception(Exception.GET_TOTAL_ORDERS_FAILED);
    }


    let existingOrder = await orderModel.find({ createdAt: { $gte: dateStart, $lte: dateEnd } }, { _id: 0, totalPrice: 1 });
    console.log(existingOrder);

    let totalPricesDay = !existingOrder ? 0 : existingOrder.reduce((partialSum, element) => partialSum + element.totalPrice, 0);
    console.log(totalPricesDay);
    return {
        result: totalPricesDay
    }
}

const totalPricesDays = async (userId, startDay, endDay) => {
    let existingUser = await userModel.find({ _id: userId, role: 'MANAGER' });
    if (!existingUser) {
        throw new Exception(Exception.GET_TOTAL_PRICES_DAYS_FAILED);
    }
    let originalDate = moment(startDay);
    startDay = originalDate.add(1, 'day');
    console.log(startDay);

    originalDate = moment(endDay);
    endDay = originalDate.add(1, 'day');
    console.log(endDay)

    const formatStr = 'DD/MM/YYYY';

    let arr = [];
    
    while (endDay >= startDay) {
        
        let dateStart = moment.utc(startDay, formatStr).startOf('day').utc().toISOString();
        console.log(dateStart); // 2023-04-10T17:00:00.000Z
    
        let dateEnd = moment.utc(startDay, formatStr).endOf('day').utc().toISOString();
        console.log(dateEnd); 
        
    
        if (dateEnd < dateStart) {
            throw new Exception(Exception.GET_TOTAL_ORDERS_FAILED);
        }

        let existingOrder = await orderModel.find({ createdAt: { $gte: dateStart, $lte: dateEnd } }, { _id: 0, totalPrice: 1 });
        let totalPricesDay = !existingOrder ? 0 : existingOrder.reduce((partialSum, element) => partialSum + element.totalPrice, 0);

        let newObject = {
            date: startDay.format('DD/MM/YYYY'),
            totalPrice: totalPricesDay
        }

        arr.push(newObject);
        console.log(arr);

        originalDate = moment(startDay);
        startDay = originalDate.add(1, 'day');
    }
     
    return {
        result: arr
    }
}

module.exports = {
    order,
    totalPrice,
    status,
    totalOrdersDay,
    totalPricePricesDay,
    totalOrdersDaySeries,
    totalPricesDaySeries,
    totalPricesDays
}