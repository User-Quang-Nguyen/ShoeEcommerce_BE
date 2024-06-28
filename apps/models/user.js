const db = require('../../config/database');
const conn = db.getConnection()
const hash = require('../utils/hashPassword')
const databaseUtils = require("../utils/database")

const User = {
    register: (user, callback) => {
        hash.hashPassword(user.password)
            .then(result => {
                user.password = result;
                const query = `INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3)`;
                const values = [user.name, user.email, user.password];
                databaseUtils.insert_uti(conn, callback, query, values);
            })
            .catch(err => {
                return callback(err);
            })
    },

    findOne: (email, callback) => {
        const query = `SELECT * FROM "user" WHERE "email" = $1`;
        const values = [email];
        conn.then(client => {
            return client.query(query, values)
                .then(result => {
                    if (result.rows.length > 0) {
                        callback(null, result.rows[0]);
                    } else {
                        callback(null, null);
                    }
                })
                .catch(err => {
                    callback(err);
                });
        })
            .catch(err => {
                callback(err);
            });
    },

    findById: (userid, callback) => {
        const query = `SELECT "id", "name", "email", "phonenumber", "address", "gender", "role", "isdeleted" FROM "user" WHERE "id" = $1`;
        const values = [userid];
        databaseUtils.select_uti(conn, callback, query, values);
    },

    updateInfor: (userid, formData, callback) => {
        const query = `UPDATE "user" SET "name" = $1, "email" = $2, "phonenumber" = $3, "address" = $4, "gender" = $5 WHERE "id" = $6`;
        const values = [formData.name, formData.email, formData.phonenumber, formData.address, formData.gender, userid];
        databaseUtils.update_uti(conn, callback, query, values);
    },

    getAllUser: (callback) => {
        const query = `SELECT "id", "name", "email", "phonenumber", "address", "gender", "role", "createdat", "isdeleted" FROM "user"`;
        databaseUtils.select_uti(conn, callback, query);
    },

    deleteUser: (id, callback) => {
        const query = `UPDATE "user" SET "isdeleted" = true WHERE "id" = $1`;
        const values = [id];
        databaseUtils.update_uti(conn, callback, query, values);
    }
}

module.exports = User