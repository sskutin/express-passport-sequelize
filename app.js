const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const config = require('./config');
const passport = require("./passport");
const usersRouter = require('./api/routes/users');
const sessionRouter = require('./api/routes/session');
const scheduleRouter = require('./api/routes/schedule');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({ secret: config.session.secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/v1/users', usersRouter);
app.use('/v1/session', sessionRouter);
app.use('/v1/schedule', scheduleRouter);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).send({ message: err.message || "Internal Server Error", status });
});

module.exports = app;
