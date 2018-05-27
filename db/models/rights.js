const Sequelize = require('sequelize');
const sequelizeInstance = require('db/adapter');
const { compose } = require('db/schema');
const BASE_FIELDS = require('db/schema/base');
const ENTITY_FIELDS = require('db/schema/entity');

const RIGHT_TYPES = {
    USER: 0,
    DOCTOR: 1,
    MANAGER: 2,
};

const RIGHT_TYPE = {
    type: Sequelize.ENUM(RIGHT_TYPES.USER, RIGHT_TYPES.DOCTOR, RIGHT_TYPES.MANAGER),
};

const Right = sequelizeInstance.define(
    'right',
    compose([ENTITY_FIELDS, BASE_FIELDS, RIGHT_TYPE]),
);

module.exports = Right;
