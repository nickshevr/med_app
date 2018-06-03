const User = require('./user');
const Employee = require('./employee');
const Right = require('./rights');
const Consultance = require('./consultance');
const Message = require('./message');
const Chat = require('./chat');
const ConsultanceResult = require('./consultanceResult');
const sequelizeInstance = require('db/adapter');

module.exports = {
    User,
    Employee,
    Right,
    Consultance,
    ConsultanceResult,
    Message,
    Chat,
    restModles: [Employee, Right, Consultance, ConsultanceResult],
    resolveModelByName: modelName => sequelizeInstance.models(modelName),
};
