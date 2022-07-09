const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const config = require('./config');
const passport = require("./passport");
const usersRouter = require('./api/routes/users');
const sessionRouter = require('./api/routes/session');
const scheduleRouter = require('./api/routes/schedule');
const signUpRouter = require('./api/routes/sign-up');

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
app.use('/v1/sign-up', signUpRouter);

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).send({ message: err.message || "Internal Server Error", status });
});

module.exports = app;
