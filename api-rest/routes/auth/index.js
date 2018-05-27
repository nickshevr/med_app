const express = require('express');
const { size } = require('lodash/fp');
const passport = require('auth');
const User = require('db/models/user');
const createError = require('http-errors');

const AuthRouter = express.Router();

const signup = async (req, res, next) => {
    const { password, email } = req.body;

    const isEmailUsed = size(await User.find({ where: { email } }));

    if (isEmailUsed) {
        return next(createError.NotAcceptable('Email is already used'));
    }

    const salt = `${Math.random()}`;
    const hash = User.encryptPassword(password, salt);

    await User.create({
        email,
        hash,
        salt,
    });

    return next();
};

const login = async (req, res, next) => {
    passport.authenticate('local', (error, user) => {
        if (error) return next(error);

        req.logIn(user.dataValues, err => (err ? next(err) : next()));
    })(req, res, next);
};

const responseUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });

        res.json(user.toJSON());
    } catch (e) {
        return next(e);
    }
};

const logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }

        res.clearCookie('sid');
        res.json({ logout: 'success' });
    });
};

AuthRouter.post('/signup', signup, login, responseUser);
AuthRouter.post('/login', login, responseUser);
AuthRouter.get('/logout', logout);
AuthRouter.get('/me', responseUser);

module.exports = AuthRouter;
