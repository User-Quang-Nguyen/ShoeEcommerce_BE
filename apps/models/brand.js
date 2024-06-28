const db = require("../../config/database");
const conn = db.getConnection();
const databaseUtils = require("../utils/database")

const Brand = {
    getName: (id, callback) => {
        const query = `SELECT "name" FROM "brand" WHERE "id" = $1;`;
        const values = [id];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getAllBrand: (callback) => {
        const query = `SELECT * FROM "brand";`;
        databaseUtils.select_uti(conn, callback, query);
    }
}

module.exports = Brand;