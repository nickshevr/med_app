const sequelizeInstance = require('db/adapter');
const { compose, applyMethods } = require('db/schema');
const BASE = require('db/schema/base');
const ENTITY = require('db/schema/entity');
const linkablePlugin = require('db/schema/linkable');

const MESSAGE_SCHEMA = linkablePlugin('chat');

const Message = sequelizeInstance.define(
    'message',
    compose([ENTITY, BASE, MESSAGE_SCHEMA]),
);

applyMethods(ENTITY, Message);

module.exports = Message;
