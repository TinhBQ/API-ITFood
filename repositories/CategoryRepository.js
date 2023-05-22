const { categoryModel, userModel, productModel } = require('../models/index.js');
const Exception = require('../exceptions/Exception.js');
const admin = require('firebase-admin');

const getCategories = async ({
    page,
    size,
    searchString
}) => {
    // aggregate data for all students
    page = parseInt(page);
    size = parseInt(size);

    // searchString? name, email, address contains searchString
    const filteredCategories = await categoryModel.aggregate([
        {
            $match: {
                $or: [
                    {
                        name: { $regex: `.*${searchString}.*`, $options: 'i' }
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
                name: 1,
                image: 1
            }
        }
    ]);

    if (filteredCategories) {
        return filteredCategories;
    } else {
        throw new Exception(Exception.GET_CATEGOIES_FAILED);
    }
};

const getCategoriesCount = async () => {
    const count = await categoryModel.count();
    return {
        result: count
    }
}

const addCategory = async (userId, name, image) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.ADD_CATEGORY_FAILED);
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
    await bucket.upload(image.path, options);
    await file.makePublic();
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

    let existingCategory = await categoryModel.create({
        name,
        image: imageUrl
    });

    if (!existingCategory) {
        throw new Exception(Exception.ADD_CATEGORY_FAILED);
    }

    return {
        id: existingCategory._id,
        name: existingCategory.name,
        image: existingCategory.image
    }
};

const updateCategory = async (userId, categoryId, name, image) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.UPDATE_CATEGORY_FAILED);
    }

    let existingCategory = await categoryModel.findById(categoryId);
    if (!existingCategory) {
        throw new Exception(Exception.UPDATE_CATEGORY_FAILED);
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
        existingCategory.image = imageUrl ?? existingCategory.image;
    }

    existingCategory.name = name ?? existingCategory.name;
    await existingCategory.save();

    return {
        id: existingCategory._id,
        name: existingCategory.name,
        image: existingCategory.image
    }
};

const deleteCategory = async ({
    userId,
    categoryId
}) => {
    let existingUser = await userModel.findById(userId);
    if (!existingUser) {
        throw new Exception(Exception.DELETE_CATEGORY_FAILED);
    }

    let existingCategory = await categoryModel.findById(categoryId);
    if (!existingCategory) {
        throw new Exception(Exception.DELETE_CATEGORY_FAILED);
    }

    let existingProduct = await productModel.deleteMany({categoryId: categoryId});
    // if (!existingProduct) {
    //     throw new Exception(Exception.DELETE_CATEGORY_FAILED);
    // }

    await categoryModel.deleteOne({_id: categoryId});
}

module.exports = { getCategories, getCategoriesCount, addCategory, updateCategory, deleteCategory }