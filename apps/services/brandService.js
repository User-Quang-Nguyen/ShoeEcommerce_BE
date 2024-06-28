const Brand = require("../models/brand");

function getName(id, callback) {
    Brand.getName(id, (err, result) => {
        if (err) {
            return callback(err);
        }
        callback(null, result);
    })
}

async function getAllBrand(callback) {
    return await new Promise((resolve, reject) => {
        Brand.getAllBrand((err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
}

module.exports = {
    getName,
    getAllBrand,
}