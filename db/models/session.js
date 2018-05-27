const Sequelize = require('sequelize');
const sequelizeInstance = require('db/adapter');

const Session = sequelizeInstance.define('session', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    sess: Sequelize.JSON,
    expire: Sequelize.DATEONLY,
}, {
    timestamps: false,
    createdAt: false,
});

module.exports = Session;
