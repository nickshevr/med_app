const sequelizeInstance = require('db/adapter');
const { compose, applyMethods } = require('db/schema');
const BASE = require('db/schema/base');
const ENTITY = require('db/schema/entity');
const linkablePlugin = require('db/schema/linkable');
const { Message } = require('db/models');

const CHAT_SCHEMA = linkablePlugin('consultance');

const Chat = sequelizeInstance.define(
    'chat',
    compose([ENTITY, BASE, CHAT_SCHEMA]),
);

applyMethods(ENTITY, Chat);

Chat.prototype.getChildrenMessage = () => Message.getChildren(this.id).bind(Message);

module.exports = Chat;
