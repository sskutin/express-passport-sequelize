const express = require('express');
const router = express.Router();

const passport = require('../../passport');
const AuthenticationError = require('../../errors/authentication-error');

const authenticate = passport.authenticate('local', { failureMessage: true });

router.post('/', authenticate, (req, res, next) => {
    res.status(200).end();
});

router.delete('/', (req, res, next) => {
    if (!req.isAuthenticated()) {
        throw new AuthenticationError();
    }

    req.logout((err) => {
        if (err) {
            throw new AuthenticationError(err.message);
        }
    });

    res.status(204).end();
});

module.exports = router;