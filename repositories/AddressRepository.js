const { userModel, addressModel } = require('../models/index.js');
const Exception = require('../exceptions/Exception.js');

const getAddresses = async ({ userId }) => {
    let existingUser = await userModel.findById(userId);
    if (!!existingUser) {
        let existingAddresses = await addressModel.find({ userId }, { _id: 1, address: 1 });

        if (existingAddresses) {
            return {
                addresses: existingAddresses
            }
        } else {
            throw new Exception(Exception.GET_ADDRESSES_FAILED);
        }
    } else {
        throw new Exception(Exception.GET_ADDRESSES_FAILED);
    }
};

const addAddress = async ({
    userId,
    address
}) => {
    let existingUser = await userModel.findById(userId);
    if (!!existingUser) {

        let existingAddresses = await addressModel.findOne({ userId, address });
        if (!existingAddresses) {
            const add = await addressModel.create({
                userId,
                address
            });
    
            if (add) {
                let existingAddresses = await addressModel.find({ userId }, { _id: 1, address: 1 });
                return {
                    addresses: existingAddresses
                }
            } else {
                throw new Exception(Exception.ADD_ADDRESS_FAILED);
            }
        } else {
            throw new Exception(Exception.ADDRESS_EXIST);
        }
    } else {
        throw new Exception(Exception.ADD_ADDRESS_FAILED);
    }
};

const updateAddress = async ({
    id,
    userId,
    address
}) => {
    let existingUser = await userModel.findById(userId);
    if (!!existingUser) {
        const existingAddress = await addressModel.findById(id);
        if (existingAddress) {
            existingAddress.address = address ?? existingAddress.address;
            await existingAddress.save();

            let existingAddresses = await addressModel.find({ userId }, { _id: 1, address: 1 });
            return {
                addresses: existingAddresses
            }
        } else {
            throw new Exception(Exception.UPDATE_ADDRESS_FAILED);
        }
    } else {
        throw new Exception(Exception.UPDATE_ADDRESS_FAILED);
    }
};

const deleteAddress = async ({
    id,
    userId
}) => {
    let existingUser = await userModel.findById(userId);
    if (!!existingUser) {
        const del = await addressModel.deleteOne({_id: id});
        if (del) {
            let existingAddresses = await addressModel.find({ userId }, { _id: 1, address: 1 });
            return {
                addresses: existingAddresses
            }
        } else {
            throw new Exception(Exception.DELETE_ADDRESS_FAILED);
        }
    } else {
        throw new Exception(Exception.DELETE_ADDRESS_FAILED);
    }
};

module.exports = { getAddresses, addAddress, updateAddress, deleteAddress };