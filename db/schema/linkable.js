const Sequelize = require('sequelize');

const LINKABLE_FIELDS = {
    parentId: Sequelize.INTEGER,
};

module.exports = parentCollection => ({
    fields: LINKABLE_FIELDS,
    methods: {
        parentCollectionName: () => parentCollection,
        getChildren: parentId => this.findAll({
            where: { parentId },
        }),
    },
});
