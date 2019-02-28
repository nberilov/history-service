require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const router = require('./api/routes');
const errorHandler = require('./api/utils/error-handler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.use(errorHandler);

module.exports = app;
