const { Pool } = require('pg');
const { db: dbConf } = require('config');

module.exports = new Pool({
    host: dbConf.host,
    user: dbConf.user,
    password: dbConf.password,
    database: dbConf.name,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
