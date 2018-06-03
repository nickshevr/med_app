const express = require('express');
const {
    server: serverConf,
    db: dbConf,
    bodyParser: bodyParsertConf,
    auth: authConfig,
} = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const logger = require('logger');
const sequalizeInstace = require('db/adapter');
const pgPool = require('db/pool');
const passport = require('auth');

const AuthRouter = require('api-rest/routes/auth');
const RestRouter = require('api-rest/routes/model');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json(bodyParsertConf.json));
app.use(bodyParser.urlencoded(bodyParsertConf.urlencoded));

app.use(session({
    store: new pgSession({
        pool: pgPool,
        tableName : 'sessions',
    }),
    secret: authConfig.secret,
    resave: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/', AuthRouter);
app.use('/api/v1/', RestRouter);
app.use((req, res) => {
    res.status(404).json({ error: 404, message: 'route not found' });
});

app.use((err, req, res, next) => {
    const errStatus = err.status ? err.status : err.statusCode;

    const response = {
        statusCode: errStatus,
        name: err.name,
        message: err.message,
    };

    if (req.query.stack !== undefined) {
        response.stack = err.stack;
    }

    return res.status(err.status || err.statusCode || 500).send(response);
});

sequalizeInstace.sync(process.env.NODE_ENV === 'test' ? {} : { force: true })
    .then(() => {
        app.listen(serverConf.port, serverConf.host, () => {
            logger.info(`[Server]: Start server on port: ${serverConf.port}`);
            logger.info(`under environment: ${process.env.NODE_ENV || 'default'}`);
            logger.info(`used db: ${dbConf.name}`);
        });
    })
    .catch(err => logger.error(err));

module.exports = app;
