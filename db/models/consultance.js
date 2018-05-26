const sequelizeInstance = require('db/adapter');
const { compose } = require('db/schema');
const BASE_FIELDS = require('db/schema/base');
const ENTITY_FIELDS = require('db/schema/entity');
const TIMELINE_FIELDS = require('db/schema/timeline');

const Consultance = sequelizeInstance.define(
    'consultance',
    compose([ENTITY_FIELDS, BASE_FIELDS, TIMELINE_FIELDS]),
);

module.exports = Consultance;
