const Sequelize = require('sequelize');
const sequelizeInstance = require('db/adapter');
const { compose } = require('db/schema');
const BASE_FIELDS = require('db/schema/base');
const ENTITY_FIELDS = require('db/schema/entity');

const EMPLOYEE_TYPES = {
    DOCTOR: 'doctor',
    MANAGER: 'manager',
};

const EMPLOYEE_TYPE = {
    type: Sequelize.ENUM(EMPLOYEE_TYPES.DOCTOR, EMPLOYEE_TYPES.MANAGER),
};

const Employee = sequelizeInstance.define(
    'employee',
    compose([ENTITY_FIELDS, BASE_FIELDS, EMPLOYEE_TYPE]),
);

module.exports = Employee;
