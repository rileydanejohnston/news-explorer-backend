const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorManager = require('../errors/ErrorManager');
const { NODE_ENV, JWT_SECRET, JWT_DEV } = process.env;
const {
  getUser404,
  signin401,
  signin404,
  signin409,
} = require('../constants/errors');

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  Users.findById(_id)
    .orFail(new ErrorManager(404, getUser404))
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name
       });
    })
    .catch(next);
}

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  // search for email -> return password
  Users.findOne({ email }).select('+password')
    // throw error if email not found
    .orFail(new ErrorManager(404, signin404))
    .then((user) => {
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // password didn't match
          if (!matched) {
            return Promise.reject(new ErrorManager(401, signin401));
          }
          return user;
        })
    })
    .then((user) => {
      // create a token with the user's id in there
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV,
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch((next));
}

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
        next(new ErrorManager(409, signin409));
      }
      next();
    });
}