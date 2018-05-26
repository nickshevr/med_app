const Sequelize = require('sequelize');
const sequelizeInstance = require('db/adapter');
const { compose } = require('db/schema');
const BASE_FIELDS = require('db/schema/base');

const USER_FIELDS = {
    username: {
        type: Sequelize.STRING,
        defaultValue: () => Date.now().toString(16),
    },
    email: {
        type: Sequelize.STRING,
    },
    hash: {
        type: Sequelize.STRING,
    },
    salt: {
        type: Sequelize.STRING,
    },
};

const User = sequelizeInstance.define('user', compose([USER_FIELDS, BASE_FIELDS]));

module.exports = User;
