const Sequelize = require('sequelize');
const sequelizeInstance = require('db/adapter');
const { compose, applyMethods } = require('db/schema');
const BASE = require('db/schema/base');
const ENTITY = require('db/schema/entity');
const linkablePlugin = require('db/schema/linkable');

const DESCRIPTION_SCHEMA = {
    fields: {
        description: Sequelize.STRING,
    },
};

const CONSULTANCE_RESULT_SCHEMA = linkablePlugin('consultance');

const ConsultanceResult = sequelizeInstance.define(
    'consultanceResult',
    compose([ENTITY, BASE, CONSULTANCE_RESULT_SCHEMA, DESCRIPTION_SCHEMA]),
);

applyMethods(ENTITY, ConsultanceResult);

module.exports = ConsultanceResult;
