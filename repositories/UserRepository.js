const bcrypt = require('bcrypt');
const { userModel, addressModel, cartModel } = require('../models/index.js')
const Exception = require('../exceptions/Exception.js');
const jwt = require('jsonwebtoken');
const { URL } = require('../global/constants.js');

const admin = require('firebase-admin');
const serviceAccount = require('../path/to/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "itfood-e43fe.appspot.com",
});
const bucket = admin.storage().bucket();

const register = async ({
    phoneNumber,
    password,
    name,
    email,
    gender,
    address
}) => {
    // validation already done
    let existingUser = await userModel.findOne({ phoneNumber }).exec();
    if (!!existingUser) {
        throw new Exception(Exception.USER_EXIST);
    }

    // Insert DB
    if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const newUser = await userModel.create({
            phoneNumber,
            password: hashPassword,
            name,
            email,
            gender
        });
        if (newUser) {
            const existingAddress = await addressModel.create({
                address,
                userId: newUser._id
            });
            if (existingAddress) {
                const existingCart = await cartModel.create({
                    userId: newUser._id
                });
                if (!existingCart) {
                    await addressModel.deleteById(existingAddress._id);
                    await userModel.deleteById(newUser._id);
                    throw new Exception(Exception.CANNOT_REGISTER_USER);
                }
            } else {
                await userModel.deleteById(newUser._id);
                throw new Exception(Exception.CANNOT_REGISTER_USER);
            }
        } else {
            throw new Exception(Exception.CANNOT_REGISTER_USER);
        }
    } else {
        throw new Exception(Exception.ERROR_PASSWORD);
    }
};

const login = async ({
    phoneNumber,
    password
}) => {
    let existingUser = await userModel.findOne({ phoneNumber }).exec();
    if (!!existingUser) {
        let isMatched = await bcrypt.compare(password, existingUser.password);
        if (!!isMatched) {

            // Create a java web token
            let token = jwt.sign({
                data: existingUser
            },
                process.env.JWT_SECRET, {
                expiresIn: '30 days'
            });

            const addresses = await addressModel.find({ userId: existingUser._id });

            return {
                id: existingUser._id,
                phoneNumber: existingUser.phoneNumber,
                name: existingUser.name,
                email: existingUser.email,
                gender: existingUser.gender,
                avatar: existingUser.avatar,
                address: addresses[0].address,
                // token: token
            }

        } else {
            throw new Exception(Exception.WRONG_PHONENUMBER_AND_PASSWORD);
        }
    } else {
        throw new Exception(Exception.WRONG_PHONENUMBER_AND_PASSWORD);
    }
};

const forgotPassword = async ({
    phoneNumber,
    password,
    name,
    email
}) => {
    let existingUser = await userModel.findOne({ phoneNumber }).exec();
    if (!!existingUser) {
        if (existingUser.name !== name || existingUser.email !== email) {
            throw new Exception(Exception.WRONG_USER_INFO);
        } else {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password)) {
                const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

                existingUser.password = hashPassword ?? existingUser.password;
                await existingUser.save();
                return existingUser;
            } else {
                throw new Exception(Exception.ERROR_PASSWORD);
            }
        }
    } else {
        throw new Exception(Exception.WRONG_USER_INFO);
    }
};

// Đăng nhập rồi, tìm bằng id
const resetPassword = async ({
    id,
    password,
    newPassword
}) => {
    let existingUser = await userModel.findById(id);
    if (!!existingUser) {
        let isMatched = await bcrypt.compare(password, existingUser.password);
        if (isMatched) {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(newPassword)) {
                const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS));
                existingUser.password = hashPassword ?? existingUser.password;
                await existingUser.save();
                return existingUser;
            } else {
                throw new Exception(Exception.ERROR_NEW_PASSWORD);
            }
        } else {
            throw new Exception(Exception.WRONG_PHONENUMBER_AND_PASSWORD);
        }
    } else {
        throw new Exception(Exception.WRONG_PHONENUMBER_AND_PASSWORD);
    }
};

const updateUser = async ({
    id,
    name,
    email,
    gender,
    address
}) => {
    let existingUser = await userModel.findById(id);
    if (!!existingUser) {
        existingUser.name = name ?? existingUser.name;
        existingUser.email = email ?? existingUser.email;
        existingUser.gender = gender ?? existingUser.gender;

        const addresses = await addressModel.find({ userId: existingUser._id });
        const existingAddress = await addressModel.findById(addresses[0]._id);
        if (!!existingAddress) {
            existingAddress.address = address ?? existingAddress.address;
            await existingAddress.save();
        } else {
            throw new Exception(Exception.UPDATE_USER_FAILED);
        }
        await existingUser.save();
        return {
            phoneNumber: existingUser.phoneNumber,
            name: existingUser.name,
            email: existingUser.email,
            gender: existingUser.gender,
            avatar: existingUser.avatar,
            address: existingAddress.address
        };
    } else {
        throw new Exception(Exception.UPDATE_USER_FAILED);
    }
};

// const updateFile = async (userId, imagePath) => {
//     let existingUser = await userModel.findById(userId);
//     if (!!existingUser) {
//         if (imagePath) {
//             existingUser.avatar = imagePath ?? existingUser.avatar;
//             await existingUser.save();

//             const addresses = await addressModel.find({ userId: existingUser._id });

//             return {
//                 id: existingUser._id,
//                 phoneNumber: existingUser.phoneNumber,
//                 name: existingUser.name,
//                 email: existingUser.email,
//                 gender: existingUser.gender,
//                 avatar: URL + existingUser.avatar,
//                 address: addresses[0].address,
//             }
//         } else {
//             throw new Exception(Exception.UPDATE_IMAGE_FAILED);
//         }
//     } else {
//         throw new Exception(Exception.UPDATE_IMAGE_FAILED);
//     }
// }

const updateFile = async (userId, imagePath) => {
    let existingUser = await userModel.findById(userId);
    if (!!existingUser) {
        if (imagePath) {
            const fileExtension = imagePath.originalname.split('.').pop();
            const fileName = `${Date.now()}.${fileExtension}`;
            const file = bucket.file(fileName);
            const options = {
                destination: file,
                metadata: {
                    contentType: imagePath.mimetype,
                },
            };
            console.log('1')
            await bucket.upload(imagePath.path, options);
            console.log('2')
            await file.makePublic();
            console.log('3')


            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;


            existingUser.avatar = imageUrl ?? existingUser.avatar;
            await existingUser.save();

            const addresses = await addressModel.find({ userId: existingUser._id });

            return {
                id: existingUser._id,
                phoneNumber: existingUser.phoneNumber,
                name: existingUser.name,
                email: existingUser.email,
                gender: existingUser.gender,
                avatar: existingUser.avatar,
                address: addresses[0].address,
            }
        } else {
            throw new Exception(Exception.UPDATE_IMAGE_FAILED);
        }
    } else {
        throw new Exception(Exception.UPDATE_IMAGE_FAILED);
    }
}


module.exports = { register, login, forgotPassword, resetPassword, updateUser, updateFile };