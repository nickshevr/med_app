const {map} = require('lodash/fp');
const logger = require('logger');

const { Router } = require('express');
const validate = require('express-validation');
const createError = require('http-errors');

const { createEmptyMiddleware } = require('./common');

const getInstance = model => async (req, res, next) => {
    const { user } = req;
    const { id } = req.params;

    try {
        req.instance = await model.getInstance(user, id).bind(model);
        req.response = req.instance;

        return next();
    } catch (e) {
        logger.error(e);

        return next(createError(500, 'Unlucky'));
    }
};

const getInstances = model => async (req, res, next) => {
    const { user } = req;

    try {
        req.instances = await model.getInstances(user).bind(model);
        req.response = req.instances;

        return next();
    } catch (e) {
        logger.error(e);

        return next(createError(500, 'Unlucky'));
    }
};

const responseData = (req, res, next) => {
    const { response } = req;

    if (!response) {
        return next(createError(404, 'Data not found'));
    }

    return res.json(response);
};


const restify = (
    model,
    middlewares,
    modelInstanceRouter = createEmptyMiddleware(),
    modelRouter = createEmptyMiddleware(),
) => {
    const { apiName, name } = model;
    const modelRestifyRouter = new Router({ mergeParams: true });
    const API_PATH = apiName || name;

    modelRestifyRouter.get(`/${API_PATH}`,
        getInstances(model),
        responseData,
    );

    modelRestifyRouter.post(`/${API_PATH}`,
        async (req, res, next) => {
            const { user, body } = req;

            try {
                req.response = await model.createInstance(user, body);

                return next();
            } catch (e) {
                logger.error(e);

                return next(createError(500, 'Unlucky'));
            }
        },
        responseData,
    );

    modelRestifyRouter.patch(`/${API_PATH}/:id`,
        getInstance(model),
        async (req, res, next) => {
            const { body } = req;

            try {
                req.response = await req.instance.update(body);

                return next();
            } catch (e) {
                logger.error(e);

                return next(createError(500, 'Unlucky'));
            }
        },
        responseData,
    );

    modelRestifyRouter.get(`/${API_PATH}/:id`,
        getInstance(model),
        responseData,
    );

    modelRestifyRouter.use(`/${API_PATH}/:id`,
        getInstance(model),
        modelInstanceRouter,
    );

    modelRestifyRouter.use(`/${API_PATH}`,
        getInstances(model),
        modelRouter,
    );

    return modelRestifyRouter;
};

module.exports = restify;
