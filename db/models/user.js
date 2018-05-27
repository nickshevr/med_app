const Sequelize = require('sequelize');
const crypto = require('crypto');
const { omit } = require('lodash/fp');

const sequelizeInstance = require('db/adapter');
const { compose } = require('db/schema');
const BASE_FIELDS = require('db/schema/base');

const USER_FIELDS = {
    email: {
        type: Sequelize.STRING,
        isEmail: true,
    },
    hash: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
    },
    salt: {
        type: Sequelize.STRING,
        notNull: true,
        notEmpty: true,
    },
};

const User = sequelizeInstance.define('user', compose([USER_FIELDS, BASE_FIELDS]));

User.prototype.checkPassword = function (password) {
    return User.encryptPassword(password, this.salt) === this.hash;
};

User.prototype.toJSON = function () {
    return omit(['hash', 'salt'], this.dataValues);
};

User.encryptPassword = (password, salt) => {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

module.exports = User;
