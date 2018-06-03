const Sequelize = require('sequelize');

const RIGHT_TYPES = {
    USER: 0,
    DOCTOR: 1,
    MANAGER: 2,
};

const RIGHT_TYPE = {
    type: Sequelize.ENUM(RIGHT_TYPES.USER, RIGHT_TYPES.DOCTOR, RIGHT_TYPES.MANAGER),
};

module.exports = RIGHT_TYPES;
