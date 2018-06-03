const { map } = require('lodash/fp');
const { Router } = require('express');

const isAuth = require('middleware/isAuth');
const restify = require('restify');
const { restModles } = require('db/models');

const baseRouter = new Router({ mergeParams: true });

baseRouter.use('/', isAuth);

map(model => baseRouter.use('/', restify(model)), restModles);

module.exports = baseRouter;
