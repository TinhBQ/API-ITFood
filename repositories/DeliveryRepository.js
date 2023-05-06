const { deliveryModel, userModel } = require('../models/index.js');
const Exception = require('../exceptions/Exception.js');

const getDeliveries = async({
    userId
}) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.GET_DELIVER_FAILED);
    }

    let existingDelivery = await deliveryModel.find({}, { name: 1, price: 1 });
    return {
        result: existingDelivery
    }
};

module.exports = { getDeliveries }