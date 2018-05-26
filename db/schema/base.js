const Sequelize = require('sequelize');

const BASE_FIELDS = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
};

module.exports = BASE_FIELDS;
