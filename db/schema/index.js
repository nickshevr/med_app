const { assign, reduce, mapKeys } = require('lodash/fp');

const compose = reduce((accum, { fields }) => assign(fields, accum), {});

const applyMethods = (schema, model) => {
    mapKeys(key => {
        // eslint-disable-next-line
        model[key] = schema.methods[key];
    }, schema.methods);
};

module.exports = {
    compose,
    applyMethods,
};
