const Sequelize = require('sequelize');

const ENTITY_FIELDS = {
    ownerId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    _createdBy: Sequelize.INTEGER,
    _updatedBy: Sequelize.INTEGER,
};

module.exports = ENTITY_FIELDS;
