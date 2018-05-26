const Sequelize = require('sequelize');

const LINKABLE_FIELDS = {
    parentId: Sequelize.INTEGER,
    parentCollection: Sequelize.STRING,
};

module.exports = LINKABLE_FIELDS;
