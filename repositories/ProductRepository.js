const { productModel, categoryModel } = require('../models/index.js');
const Exception = require('../exceptions/Exception.js');

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
        if(filteredCategories) {
            return filteredCategories;
        } else {
            throw new Exception(Exception.GET_PRODUCTS_FAILED);
        }
    } else {
        throw new Exception(Exception.CATEGORY_DOES_NOT_EXIST);
    }
};

module.exports = { getProducts }