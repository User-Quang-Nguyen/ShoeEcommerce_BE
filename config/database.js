const { Pool } = require('pg');
const config = require('config');

const pool = new Pool({
    user: config.get('postgres.user'),
    host: config.get('postgres.host'),
    database: config.get('postgres.database'),
    password: config.get('postgres.password'),
    port: config.get('postgres.port')
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
    process.exit(-1);
});

async function getConnection() {
    const connect = await pool.connect();
    return connect;
}

module.exports = {
    getConnection: getConnection
};