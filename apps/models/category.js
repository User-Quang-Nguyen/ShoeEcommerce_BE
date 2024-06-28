const db = require("../../config/database")
const conn = db.getConnection()
const databaseUtils = require("../utils/database")

const Category = {
    getCategoryByShoeId: (shoeid, callback) => {
        const query = `SELECT "categoryid" FROM "category_shoe" WHERE "shoeid" = $1`;
        const values = [shoeid];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getCategoryName: (id, callback) => {
        const query = `SELECT "name" FROM "category" WHERE "id" = $1`;
        const values = [id];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    insertCategoryShoe: (shoeid, category, callback) => {
        const query = `INSERT INTO "category_shoe" (shoeid, categoryid) VALUES ($1, $2) RETURNING id`;
        const values = [shoeid, category];
        databaseUtils.insert_uti(conn, callback, query, values);
    },

    getAllCategory: (callback) => {
        const query = `SELECT * FROM "category"`;
        databaseUtils.select_uti(conn, callback, query);
    }
}

module.exports = Category;