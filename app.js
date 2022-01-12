require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { signup, signin } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  validateSignup,
  validateSignin,
} = require('./middlewares/validateUsers');

// connect DB
mongoose.connect('mongodb://localhost:27017/news-explorer');

// need to determine the port - 3000 is default
const { PORT = 3000 } = process.env;

// need to create app variable
const app = express();

app.use(helmet());        // helmet - security
app.use(express.json());  // parse incoming requests with JSON
app.use(requestLogger);

app.post('/signup', validateSignup, signup);
app.post('/signin', validateSignin, signin);

app.use(errorLogger);
app.use(errors());        // celebrate error handler

// centralized error handling
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occured on the server'
        : message,
    });
});

// need to listen on a port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});