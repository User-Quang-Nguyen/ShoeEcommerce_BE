function select_uti(conn, callback, query, values) {
    conn.then(client => {
        return client.query(query, values)
            .then(result => {
                callback(null, result.rows);
            })
            .catch(err => {
                callback(err);
            })
    }).catch(err => {
        callback(err);
    });
}

function insert_uti(conn, callback, query, values) {
    conn.then(client => {
        return client.query(query, values)
            .then(result => {
                // client.release();
                callback(null, result);
            })
            .catch(err => {
                // client.release();
                callback(err)
            })
    }).catch(err => {
        callback(err);
    });
}

function update_uti(conn, callback, query, values) {
    conn.then(client => {
        return client.query(query, values)
            .then(result => {
                // client.release();
                callback(null, result)
            })
            .catch(err => {
                // client.release();
                callback(err);
            })
    }).catch(err => {
        callback(err);
    });
}

function delete_uti(conn, callback, query, values) {
    conn.then(client => {
        return client.query(query, values)
            .then(result => {
                // client.release();
                callback(null, result);
            })
            .catch(err => {
                // client.release();
                callback(err);
            })
    }).catch(err => {
        callback(err);
    });
}

module.exports = {
    select_uti,
    insert_uti,
    update_uti,
    delete_uti
}