const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { signup } = require('./controllers/users');
const { validateSignup } = require('./middlewares/validateUsers');

// connect DB
mongoose.connect('mongodb://localhost:27017/news-explorer');

// need to determine the port - 3000 is default
const { PORT = 3000 } = process.env;

// need to create app variable
const app = express();

// parse incoming requests with JSON
app.use(express.json());

app.post('/signup', validateSignup, signup);

// error handlers
app.use(errors());

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