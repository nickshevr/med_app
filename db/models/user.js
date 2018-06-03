const Sequelize = require('sequelize');
const crypto = require('crypto');
const { omit, isEmpty } = require('lodash/fp');

const sequelizeInstance = require('db/adapter');
const { compose } = require('db/schema');
const BASE = require('db/schema/base');

const { Employee } = require('db/models');

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

const USER_SCHEMA = {
    fields: USER_FIELDS,
};

const User = sequelizeInstance.define('user', compose([USER_SCHEMA, BASE]));

User.prototype.checkPassword = function (password) {
    return User.encryptPassword(password, this.salt) === this.hash;
};

User.prototype.toJSON = function () {
    return omit(['hash', 'salt'], this.dataValues);
};

User.prototype.isEmployee = async function () {
    const employee = await Employee.find({
        userId: this.id,
    });

    return !isEmpty(employee);
};

User.encryptPassword = (password, salt) => {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
};

module.exports = User;
