const passport = require('passport');
const { Strategy } = require('passport-local');
const createError = require('http-errors');

const User = require('db/models/user');

passport.use(
    new Strategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return done(createError.NotFound('Unregistered Email'), false);
            }

            if (!user.checkPassword(password)) {
                return done(createError.NotAcceptable('Wrong password'), false);
            }

            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    try {
        const user = User.findOne({ where: { id } });

        return done(null, user);
    } catch (e) {
        return done(e);
    }
});
