const createError = require('http-errors');

module.exports = (req, res, next) => {
    if (req.user) {
        return next();
    }

    return next(createError(403, 'You are not auth'));
};
