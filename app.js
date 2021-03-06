require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const ErrorManager = require('./errors/ErrorManager');
const mainRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { centralErrorHandler } = require('./errors/centralErrorHandler');

const { MONGO_URL = 'mongodb://localhost/news-explorer', NODE_ENV } = process.env;

// connect DB
mongoose.connect(MONGO_URL);

// need to determine the port - 3000 is default
const { PORT = 3000 } = process.env;

// need to create app variable
const app = express();

app.use(helmet()); // helmet - security
app.use(express.json()); // parse incoming requests with JSON
app.use(requestLogger);
app.use(cors());
app.options('*', cors());
app.use(limiter);

app.use(mainRouter); // ALL ROUTES

app.use(errorLogger);
app.use(errors()); // celebrate error handler

app.get('*', (req, res, next) => {
  next(new ErrorManager(404, 'Requested resource not found'));
});

// centralized error handling
app.use(centralErrorHandler);

// need to listen on a port
if (NODE_ENV !== 'test') {
  app.listen(PORT);
}

module.exports = app;
