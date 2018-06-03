const Sequelize = require('sequelize');
const { assign } = require('lodash/fp');

const ENTITY_FIELDS = {
    ownerId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    _createdBy: Sequelize.INTEGER,
    _updatedBy: Sequelize.INTEGER,
};

const ENTITY_METHODS = {
    getUserField: async user => (await user.isEmployee()
        ? 'ownerId'
        : 'userId'
    ),

    buildQuery: user => ({
        where: {
            $or: [{ ownerId: user.id }, { userId: user.id }],
        },
    }),

    getInstances(user) {
        const query = this.buildQuery(user);

        return this.findAll(query);
    },

    getInstance(user, id) {
        const query = assign(this.buildQuery(user), { id })

        return this.find(query);
    },

    async createInstance(user, data) {
        const userField = await this.getUserField(user);

        return this.create({
            [userField]: user.id,
            _createdBy: user.id,
            _updatedBy: user.id,
            ...data,
        });
    },
}

module.exports = {
    fields: ENTITY_FIELDS,
    methods: ENTITY_METHODS,
};
