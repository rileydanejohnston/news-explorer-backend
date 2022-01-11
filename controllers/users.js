const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const ErrorManager = require('../errors/ErrorManager');

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => Users.create({ email, password: hash, name }))
    .then((user) =>  {
      res.status(201).send({ email: user.email, name: user.name })
    })
    .catch((err) => {
      // celebrate should catch 400 errors
      if (err.name === 'MongoServerError'){
        next(new ErrorManager(409, 'Signup failed. Email or username already registered'));
      }
      else {
        next(new ErrorManager(500));
      }
    });
}