const Category = require("../models/category")

function getCategoryByShoeId(shoeid) {
    return new Promise((resolve, reject) => {
        Category.getCategoryByShoeId(shoeid, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

function getCategoryNameAsync(id) {
    return new Promise((resolve, reject) => {
        Category.getCategoryName(id, (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        })
    })
}

async function getCategoryName(shoeid) {
    const categoryId = await getCategoryByShoeId(shoeid);
    const listCategory = await Promise.all(categoryId.map(async (id) => {
        return getCategoryNameAsync(id.categoryid);
    }));
    return listCategory;
}

async function insertCategoryShoe(shoeid, category) {
    return await new Promise((resolve, reject) => {
        Category.insertCategoryShoe(shoeid, category, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function getAllCategory(callback) {
    return await new Promise((resolve, reject) => {
        Category.getAllCategory((err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

module.exports = {
    getCategoryName,
    insertCategoryShoe,
    getAllCategory,
}