const sequalizeInstace = require('./adapter');
const logger = require('logger');

sequalizeInstace.sync({ force: true })
    .then(res => {
        sequalizeInstace.close();
    })
    .catch(err => logger.error(err));
