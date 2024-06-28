const db = require("../../config/database");
const conn = db.getConnection();
const databaseUtils = require("../utils/database")

const Order = {
    addToOrderTable: (userid, total, callback) => {
        const query = `INSERT INTO "order" (total, userid) VALUES ($1, $2) RETURNING id`;
        const values = [total, userid];
        databaseUtils.insert_uti(conn, callback, query, values);
    },

    addToOrderDetailTable: (orderid, item, callback) => {
        const query = `INSERT INTO "order_detail" (orderid, shoeid, quantity, price) VALUES ($1, $2, $3, $4)`;
        const values = [orderid, item.id, item.quantity, item.price];
        databaseUtils.insert_uti(conn, callback, query, values);
    },

    getOrderByUserId: (userid, callback) => {
        const query = `SELECT * FROM "order" WHERE "userid" = $1`;
        const values = [userid];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getOrderById: (id, callback) => {
        const query = `SELECT * FROM "order" WHERE "id" = $1`;
        const values = [id];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getOrderDetailById: (orderid, callback) => {
        const query = `SELECT * FROM "order_detail" WHERE "orderid" = $1`;
        const values = [orderid];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    updateState: (orderid, status, callback) => {
        const query = `UPDATE "order" SET "status" = $1 WHERE "id" = $2`;
        const values = [status, orderid];
        databaseUtils.update_uti(conn, callback, query, values);
    },
    
    getAllOrder: (callback) => {
        const query = `SELECT * FROM "order"`;
        databaseUtils.select_uti(conn, callback, query);
    },

    setAppTransId: (orderid, transid, callback) => {
        const query = `UPDATE "order" SET "apptransid" = $1 WHERE "id" = $2`;
        const values = [transid, orderid];
        databaseUtils.update_uti(conn, callback, query, values);
    }
}

module.exports = Order;