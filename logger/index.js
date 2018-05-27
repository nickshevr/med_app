const pino = require('pino');
const { logger } = require('config');

const l = pino({
    name: logger.app_id,
});

module.exports = l;
