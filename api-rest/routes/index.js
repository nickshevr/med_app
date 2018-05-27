const express = require('express');
const AuthRouter = require('api-rest/routes/auth');

const BaseRouter = express.Router();

BaseRouter.use('api/v1', AuthRouter);

module.exports = BaseRouter;
