const db = require("../../config/database")
const conn = db.getConnection()
const databaseUtils = require("../utils/database")

const Revenue = {
    getOrdersToday: (callback) => {
        const query = `SELECT COUNT(*) AS daily_orders FROM "order" WHERE createdat::date = CURRENT_DATE;`;
        databaseUtils.select_uti(conn, callback, query);
    },

    getOrdersThisWeek: (callback) => {
        const query = `SELECT COUNT(*) AS weekly_orders FROM "order" WHERE EXTRACT(YEAR FROM createdat) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(WEEK FROM createdat) = EXTRACT(WEEK FROM CURRENT_DATE);`;
        databaseUtils.select_uti(conn, callback, query);
    },

    getOrdersThisMonth: (callback) => {
        const query = `SELECT COUNT(*) AS monthly_orders FROM "order" WHERE EXTRACT(YEAR FROM createdat) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM createdat) = EXTRACT(MONTH FROM CURRENT_DATE);`;
        databaseUtils.select_uti(conn, callback, query);
    },

    getPending: (callback) => {
        const query = `SELECT COUNT(*) AS pending_orders FROM "order" WHERE status = 0;`;
        databaseUtils.select_uti(conn, callback, query);
    },

    getCanceled: (callback) => {
        const query = `SELECT COUNT(*) AS canceled_orders FROM "order" WHERE status = 1;`;
        databaseUtils.select_uti(conn, callback, query);
    },

    getSuccess: (callback) => {
        const query = `SELECT COUNT(*) AS success_orders FROM "order" WHERE status = 2;`;
        databaseUtils.select_uti(conn, callback, query);
    },

    getDayOnMonth: (year, month, callback) => {
        const query = `SELECT EXTRACT(DAY FROM createdat) AS day,
                    SUM(total) AS revenue FROM "order" 
                    WHERE EXTRACT(YEAR FROM createdat) = $1
                    AND EXTRACT(MONTH FROM createdat) = $2
                    GROUP BY day
                    ORDER BY day;`;
        const values = [year, month];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    getMonthOnYear: (year, callback) => {
        const query = `SELECT EXTRACT(MONTH FROM createdat) AS month,
                    SUM(total) AS revenue
                    FROM "order" WHERE EXTRACT(YEAR FROM createdat) = $1
                    GROUP BY month
                    ORDER BY month;`;
        const values = [year];
        databaseUtils.select_uti(conn, callback, query, values);
    },
}

module.exports = Revenue;