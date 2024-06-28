const Shoe = require("../models/shoe");
const BrandService = require("../services/brandService");
const CategoryService = require("../services/categoryService");

function getItemsAsync(startIndex, endIndex) {
    return new Promise((resolve, reject) => {
        Shoe.getItems(startIndex, endIndex, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function getItemAsync(id) {
    return new Promise((resolve, reject) => {
        Shoe.getItemById(id, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getNameAsync(id) {
    return new Promise((resolve, reject) => {
        BrandService.getName(id, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

function getItemDetail(id) {
    return new Promise((resolve, reject) => {
        Shoe.getItemDetail(id, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

async function getItems(startIndex, endIndex) {
    try {
        const shoes = await getItemsAsync(startIndex, endIndex);
        const itemsWithBrandNames = await Promise.all(shoes.map(async (shoe) => {
            const brandName = await getNameAsync(shoe.brandid);
            delete shoe.brandid;
            shoe.brandname = brandName[0].name;
            return shoe;
        }));
        return itemsWithBrandNames;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getAllItems() {
    return new Promise((resolve, reject) => {
        Shoe.getAllItems((err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    })
}

async function getAllItemsDetail() {
    try {
        const shoes = await getAllItems();
        console.log(shoes);
        const idList = shoes.map(shoe => shoe.id);
        const items = await Promise.all(idList.map(async (id) => {
            const detail = await getItemById(id);
            return detail[0];
        }))
        return items;
    } catch (error) {
        throw new Error(error.message);
    }
}
async function getItemById(id) {
    try {
        const shoe = await getItemAsync(id);
        const brandName = await getNameAsync(shoe[0].brandid);
        const category = await CategoryService.getCategoryName(id);
        const detail = await getItemDetail(id);
        delete shoe[0].brandid;
        shoe[0].brandname = brandName[0].name;
        shoe[0].category = category;
        shoe[0].detail = detail;
        // json to array
        shoe.forEach(item => {
            item.category = item.category.map(cat => cat.name);
        });
        return shoe;
    } catch (err) {
        console.log(err);
        throw new Error("Có lỗi xảy ra");
    }
}

async function getItemDetailById(id) {
    try {
        const detail = await new Promise((resolve, reject) => {
            Shoe.getItemDetailById(id, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        return detail[0];
    } catch (err) {
        console.log(err);
        throw new Error("Có lỗi xảy ra");
    }
}

async function updateShoe(formData) {
    return new Promise((resolve, reject) => {
        Shoe.updateShoe(formData, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function updateShoeDetail(formData) {
    return new Promise((resolve, reject) => {
        Shoe.updateShoeDetail(formData, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function insertShoe(formData) {
    return await new Promise((resolve, reject) => {
        Shoe.insertShoe(formData, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function insertFullShoe(formData) {
    try {
        const shoe = await insertShoe(formData);
        const shoeid = shoe.rows[0].id;
        const categories = formData.category;
        if (categories && categories.length > 0) {
            categories.forEach(async (category) => {
                await CategoryService.insertCategoryShoe(shoeid, category);
            });
        }
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function insertShoeDetail(formData) {
    return await new Promise((resolve, reject) => {
        Shoe.insertShoeDetail(formData, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

async function fullTextSearch(key, page, limit) {
    return await new Promise((resolve, reject) => {
        Shoe.fullTextSearch(key, page, limit, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

async function countSearchResults(key) {
    return await new Promise((resolve, reject) => {
        Shoe.countSearchResults(key, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    getItems,
    getItemById,
    getItemDetail,
    getItemDetailById,
    updateShoe,
    getAllItemsDetail,
    updateShoeDetail,
    insertFullShoe,
    insertShoeDetail,
    fullTextSearch,
    countSearchResults
}