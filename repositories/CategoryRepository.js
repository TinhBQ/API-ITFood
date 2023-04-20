const { categoryModel } = require('../models/index.js');
const Exception = require('../exceptions/Exception.js');


const getCategories = async ({
    page,
    size,
    searchString,
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
                        name: {$regex: `.*${searchString}.*`, $options: 'i'}
                    }
                ]
            }
        },
        {
            $skip: (page -1) * size // số phần tử bỏ qua
        },
        {
            $limit: size // Giới hạn phần tử trong size
        }
    ]);
    return filteredCategories;
};

module.exports = { getCategories }