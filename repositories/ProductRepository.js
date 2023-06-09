const { productModel, categoryModel, userModel } = require('../models/index.js');
const Exception = require('../exceptions/Exception.js');
const admin = require('firebase-admin');

const getProducts = async ({
    categoryId,
    page,
    size,
    searchString
}) => {

    let existingCategory = await categoryModel.findById(categoryId);
    if (!!existingCategory) {
        // aggregate data for all students
        page = parseInt(page);
        size = parseInt(size);

        const filteredCategories = await productModel.aggregate([
            {
                $match: {
                    $and: [
                        {
                            categoryId: existingCategory._id,
                        },
                        {
                            $or: [
                                {
                                    name: { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                                {
                                    description: { $regex: `.*${searchString}.*`, $options: 'i' }
                                },
                            ]
                        }
                    ]
                }
            },
            {
                $skip: (page - 1) * size // số phần tử bỏ qua
            },
            {
                $limit: size // Giới hạn phần tử trong size
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    quantity: 1,
                    image: 1,
                    categoryId: 1
                }
            }
        ]);
        if (filteredCategories) {
            return filteredCategories;
        } else {
            throw new Exception(Exception.GET_PRODUCTS_FAILED);
        }
    } else {
        throw new Exception(Exception.CATEGORY_DOES_NOT_EXIST);
    }
};

const getAllProducts = async ({
    page,
    size,
    searchString
}) => {
    const filteredCategories = await productModel.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: `.*${searchString}.*`, $options: 'i' }
                    },
                    {
                        description: { $regex: `.*${searchString}.*`, $options: 'i' }
                    },
                ]
            }
        },
        {
            $skip: (page - 1) * size // số phần tử bỏ qua
        },
        {
            $limit: size // Giới hạn phần tử trong size
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                price: 1,
                quantity: 1,
                image: 1,
                categoryId: 1
            }
        }
    ]);
    if (filteredCategories) {
        return filteredCategories;
    } else {
        throw new Exception(Exception.GET_PRODUCTS_FAILED);
    }
};

const getProductsBestseller = async ({

}) => {
    const filteredCategories = await productModel.find({}, {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        quantity: 1,
        image: 1,
        categoryId: 1
    }).sort({ sold: -1 }).limit(10);
    if (filteredCategories) {
        return filteredCategories;
    } else {
        throw new Exception(Exception.GET_PRODUCTS_FAILED);
    }
};

const addProduct = async (userId, name, description, price, quantity, categoryId, image) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.ADD_PRODUCT_FAILED);
    }

    let existingCategory = await categoryModel.findById(categoryId);
    if (!existingCategory) {
        throw new Exception(Exception.ADD_PRODUCT_FAILED);
    }


    const bucket = admin.storage().bucket();

    const fileExtension = image.originalname.split('.').pop();
    const fileName = `${Date.now()}.${fileExtension}`;
    const file = bucket.file(fileName);
    const options = {
        destination: file,
        metadata: {
            contentType: image.mimetype,
        },
    };
    console.log('1')
    await bucket.upload(image.path, options);
    console.log('2')
    await file.makePublic();
    console.log('3')


    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    console.log(imageUrl)

    let existingProduct = await productModel.create({
        name,
        description,
        price,
        quantity,
        categoryId: existingCategory._id,
        image: imageUrl
    });

    if (!existingProduct) {
        throw new Exception(Exception.ADD_PRODUCT_FAILED);
    }
    return {
        id: existingProduct._id,
        name: existingProduct.name,
        description: existingProduct.description,
        price: existingProduct.price,
        quantity: existingProduct.quantity,
        image: existingProduct.image,
        categoryId: existingProduct.categoryId
    }
}

const updateProduct = async (userId, productId, name, description, price, quantity, image) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.UPDATE_PRODUCT_FAILED);
    }

    const existingProduct = await productModel.findById(productId);
    if (!existingProduct) {
        throw new Exception(Exception.UPDATE_PRODUCT_FAILED);
    }


    let imageUrl;
    if (image) {
        const bucket = admin.storage().bucket();

        const fileExtension = image.originalname.split('.').pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        const file = bucket.file(fileName);
        const options = {
            destination: file,
            metadata: {
                contentType: image.mimetype,
            },
        };
        await bucket.upload(image.path, options);
        await file.makePublic();
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        existingProduct.image = imageUrl ?? existingProduct.image;
    }

    existingProduct.name = name ?? existingProduct.name;
    existingProduct.description = description ?? existingProduct.description;
    existingProduct.price = price ?? existingProduct.price;
    existingProduct.quantity = quantity ?? existingProduct.quantity;
    existingProduct.name = name ?? existingProduct.name;

    await existingProduct.save();

    return {
        id: existingProduct._id,
        name: existingProduct.name,
        description: existingProduct.description,
        price: existingProduct.price,
        quantity: existingProduct.quantity,
        image: existingProduct.image
    }
};

const deleteProduct = async ({
    userId,
    productId
}) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.UPDATE_PRODUCT_FAILED);
    }

    let existingProduct = await productModel.deleteOne({ _id: productId });
    if (!existingProduct) {
        throw new Exception(Exception.UPDATE_PRODUCT_FAILED);
    }
};

module.exports = { getProducts, getProductsBestseller, addProduct, updateProduct, deleteProduct, getAllProducts }