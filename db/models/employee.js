const Sequelize = require('sequelize');
const sequelizeInstance = require('db/adapter');
const { compose, applyMethods } = require('db/schema');
const BASE = require('db/schema/base');
const ENTITY = require('db/schema/entity');

const EMPLOYEE_TYPES = {
    DOCTOR: 'doctor',
    MANAGER: 'manager',
};

const EMPLOYEE_SCHEMA = {
    fields: {
        type: {
            type: Sequelize.ENUM(EMPLOYEE_TYPES.DOCTOR, EMPLOYEE_TYPES.MANAGER),
            default: EMPLOYEE_TYPES.DOCTOR,
        },
    },
};

const Employee = sequelizeInstance.define(
    'employee',
    compose([ENTITY, BASE, EMPLOYEE_SCHEMA]),
);

applyMethods(ENTITY, Employee);

module.exports = Employee;
