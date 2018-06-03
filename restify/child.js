const { Router } = require('express');
const createError = require('http-errors');
const logger = require('logger');

const createChildRouter = (parentModel, childModel) => {
    const childRouter = new Router({ mergeParams: true });

    childRouter.get(`/${childModel}`,
        async (req, res, next) => {
            try {
                const child = await req.instance[`getChildren${childModel.name}s`];

                return res.json(child);
            } catch (e) {
                logger.error(e);

                return next(createError(500, 'Child error'));
            }
        },
    );

    return childRouter;
};

module.exports = createChildRouter;
