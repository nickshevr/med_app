const Sequelize = require('sequelize');
const { db } = require('config');

module.exports = new Sequelize(
    db.name,
    db.user,
    db.password,
    {
        host: db.host,
        dialect: 'postgres',

        pool: {
            max: 5,
            min: 0,
            idle: 1000,
        },
    },
);
