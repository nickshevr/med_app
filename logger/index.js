const pino = require('pino');
const { logger } = require('config');

const l = pino({
    name: logger.app_id,
    level: logger.log_level,
});

export default l;
