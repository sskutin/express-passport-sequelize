const passport = require('passport');
const LocalStrategy = require('passport-local');

const userService = require('../services/user-service');

passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
    },
    async (username, password, done) => {
        const user = await userService.getUserByUsernamePassword({ username, password });
        return done(null, user || false);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userService.getUserById(id);
    done(null, user);
});

module.exports = passport;