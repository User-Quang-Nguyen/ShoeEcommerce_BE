const db = require("../../config/database")
const conn = db.getConnection()
const databaseUtils = require("../utils/database")

const Cart = {
    getCartByUser: (userid, callback) => {
        const query = `SELECT * FROM "cart" WHERE "userid" = $1`;
        const values = [userid];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getCartItemByUser: (cartid, callback) => {
        const query = `SELECT * FROM "cart_shoe" WHERE "cartid" = $1`;
        const values = [cartid];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    addToCart: (userid, callback) => {
        const query = `INSERT INTO "cart" (userid) VALUES ($1) RETURNING id`;
        const values = [userid];
        databaseUtils.insert_uti(conn, callback, query, values);
    },

    addToCartshoe: (formData, cartid, callback) => {
        const query = `INSERT INTO "cart_shoe" (cartid, shoeid, quantity) VALUES ($1, $2, $3)`;
        const values = [cartid, formData.shoeid, formData.quantity];
        databaseUtils.insert_uti(conn, callback, query, values)
    },

    updateQuantity: (quantity, id, callback) => {
        const query = `UPDATE "cart_shoe" SET "quantity" = $1 WHERE "id" = $2`;
        const values = [quantity, id];
        databaseUtils.update_uti(conn, callback, query, values);
    },

    getCartshoeById: (cartshoeid, callback) => {
        const query = `SELECT * FROM "cart_shoe" WHERE "id" = $1`;
        const values = [cartshoeid];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getCartById: (cartid, callback) => {
        const query = `SELECT * FROM "cart" WHERE id = $1`;
        const values = [cartid];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    deleteToCart: (userid, callback) => {
        const query = `DELETE FROM "cart" WHERE "userid" = $1`;
        const values = [userid];
        databaseUtils.delete_uti(conn, callback, query, values);
    },

    deleteToCartshoe: (cartid, callback) => {
        const query = `DELETE FROM "cart_shoe" WHERE "cartid" = $1`;
        const values = [cartid];
        databaseUtils.delete_uti(conn, callback, query, values);
    },

    deleteCartItem: (id, callback) => {
        const query = `DELETE FROM "cart_shoe" WHERE "id" = $1`;
        const values = [id];
        databaseUtils.delete_uti(conn, callback, query, values);
    },

    deleteCartByShoeid: (shoeid, callback) => {
        const query = `DELETE FROM "cart_shoe" WHERE "shoeid" = $1`;
        const values = [shoeid];
        databaseUtils.delete_uti(conn, callback, query, values);
    }
}

module.exports = Cart