const Sequelize = require('sequelize');

const TIMELINE_FIELDS = {
    time_start: Sequelize.DATE,
    time_end: Sequelize.DATE,
};

module.exports = {
    fields: TIMELINE_FIELDS,
    methods: {},
};
