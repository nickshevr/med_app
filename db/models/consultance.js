const sequelizeInstance = require('db/adapter');
const { compose, applyMethods } = require('db/schema');
const BASE = require('db/schema/base');
const ENTITY = require('db/schema/entity');
const TIMELINE = require('db/schema/timeline');
const { Chat, ConsultanceResult } = require('db/models');

const Consultance = sequelizeInstance.define(
    'consultance',
    compose([ENTITY, BASE, TIMELINE]),
);

applyMethods(ENTITY, Consultance);

Consultance.prototype.getChildrenConsultanceResult = () =>
    ConsultanceResult.getChildren(this.id).bind(ConsultanceResult);

Consultance.prototype.getChildrenChat = () =>
    Chat.getChildren(this.id).bind(Chat);

module.exports = Consultance;
