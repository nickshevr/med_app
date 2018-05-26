const { assign, reduce } = require('lodash/fp');

const compose = reduce((elem, accum) => assign(elem, accum), {});

module.exports = {
    compose,
};
