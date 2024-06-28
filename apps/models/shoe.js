const db = require('../../config/database')
const conn = db.getConnection()
const databaseUtils = require("../utils/database")

const Shoe = {
    getItems: (start, end, callback) => {
        const query = `SELECT * FROM "shoe" WHERE "id" BETWEEN $1 and $2 AND "isdeleted" = false;`;
        const values = [start, end];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getItemById: (id, callback) => {
        const query = `SELECT * FROM "shoe" WHERE "id" = $1;`;
        const values = [id];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getItemDetail: (id, callback) => {
        const query = `SELECT * FROM "shoe_detail" WHERE "shoeid" = $1`;
        const values = [id];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getItemDetailById: (id, callback) => {
        const query = `SELECT * FROM "shoe_detail" WHERE "id" = $1`;
        const values = [id];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    updateQuantity: (quantity, id, callback) => {
        const query = `UPDATE "shoe_detail" SET "quantity" = $1 WHERE "id" = $2`;
        const values = [quantity, id];
        databaseUtils.update_uti(conn, callback, query, values);
    },

    insertShoe: (formData, callback) => {
        const query = `INSERT INTO "shoe" (name, description, price, image, brandid) 
                       VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        const values = [formData.name, formData.description, formData.price, formData.image, formData.brandid];
        databaseUtils.insert_uti(conn, callback, query, values);
    },

    updateShoe: (formData, callback) => {
        const { shoeid, name, image, description, price } = formData;
        const query = `UPDATE "shoe" SET "name" = $1, "image" = $2, "description" = $3, "price" = $4 WHERE "id" = $5`;
        const values = [name, image, description, price, shoeid];
        databaseUtils.update_uti(conn, callback, query, values);
    },

    deleteShoe: (id, callback) => {
        const query = `UPDATE "shoe" SET "isdeleted" = true WHERE "id" = $1;`;
        const values = [id];
        databaseUtils.update_uti(conn, callback, query, values);
    },

    getAllItems: (callback) => {
        const query = `SELECT * FROM "shoe"`;
        databaseUtils.select_uti(conn, callback, query);
    },

    updateShoeDetail: (formData, callback) => {
        const { id, color, size, quantity } = formData;
        const query = `UPDATE "shoe_detail" SET "color" = $2, "size" = $3, "quantity" = $4 WHERE "id" = $1`;
        const values = [id, color, size, quantity];
        databaseUtils.update_uti(conn, callback, query, values);
    },

    insertShoeDetail: (formData, callback) => {
        const query = `INSERT INTO "shoe_detail" (shoeid, color, size, quantity) VALUES ($1, $2, $3, $4) RETURNING id`;
        const values = [formData.shoeid, formData.color, formData.size, formData.quantity];
        databaseUtils.insert_uti(conn, callback, query, values);
    },

    fullTextSearch: (key, page, limit, callback) => {
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM shoe 
            WHERE to_tsvector('english', name || ' ' || description) @@ to_tsquery($1) 
            AND isdeleted = false
            LIMIT $2 OFFSET $3;
        `;
        const values = [key, limit, offset];
        databaseUtils.select_uti(conn, callback, query, values);
    },
    countSearchResults: (key, callback) => {
        const query = `
            SELECT COUNT(*) FROM shoe 
            WHERE to_tsvector('english', name || ' ' || description) @@ to_tsquery($1)
            AND isdeleted = false;
        `;
        const values = [key];
        databaseUtils.select_uti(conn, callback, query, values);
    }
}

module.exports = Shoe;