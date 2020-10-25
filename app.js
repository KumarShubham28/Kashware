const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/user');
const passport = require("passport");

const app = express();

app.use(passport.initialize());
app.use(passport.session());
require('./passport/passport')(passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', usersRouter);

module.exports = app;