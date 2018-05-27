const { Router } = require('express');
const validate = require('express-validation');
const createError = require('http-errors');
const validator = require('api/middleware/reqParamsValidator');
const models = require('db/models');

const restify = (model, middlewares) => {
    const { API_PATH } = model;
    const modelRestifyRouter = new Router({ mergeParams: true });

    modelRestifyRouter.get(`${API_PATH}`, async (req, res, next) => {
        const { user } = user;
    });


    return modelRestifyRouter;
}
