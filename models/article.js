const mongoose = require('mongoose');
const { isURL } = require('validator');
const Users = require('./user');

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [isURL, 'Invalid URL'],
  },
  image: {
    type: String,
    required: true,
    validate: [isURL, 'Invalid URL'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Users,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
