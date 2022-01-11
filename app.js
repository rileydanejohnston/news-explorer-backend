const express = require('express');
const mongoose = require('mongoose');
const { signup } = require('./controllers/users');

// connect DB
mongoose.connect('mongodb://localhost:27017/news-explorer');

// need to determine the port - 3000 is default
const { PORT = 3000 } = process.env;

// need to create app variable
const app = express();

// parse incoming requests with JSON
app.use(express.json());

app.post('/signup', signup);

// need to listen on a port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});