const Sequelize = require('sequelize');
const sequelizeInstance = require('db/adapter');
const { compose } = require('db/schema');
const BASE_FIELDS = require('db/schema/base');
const ENTITY_FIELDS = require('db/schema/entity');
const LINKABLE_FIELDS = require('db/schema/linkable');

const DESCRIPTION_SCHEMA = {
    description: Sequelize.STRING,
};

const Employee = sequelizeInstance.define(
    'consultanceResult',
    compose([ENTITY_FIELDS, BASE_FIELDS, LINKABLE_FIELDS, DESCRIPTION_SCHEMA]),
);

module.exports = Employee;
