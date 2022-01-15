const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorManager = require('../errors/ErrorManager');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  Users.findById(_id)
    .orFail(new ErrorManager(404, 'User not found'))
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name,
        _id: user._id
       });
    })
    .catch(next);
}

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  // search for email -> return password
  Users.findOne({ email }).select('+password')
    // throw error if email not found
    .orFail(new ErrorManager(404, 'Sign in failed. Email was not found.'))
    .then((user) => {
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          // password didn't match
          if (!matched) {
            return Promise.reject(new ErrorManager(401, 'Sign in failed. Password is incorrect.'));
          }
          return user;
        })
    })
    .then((user) => {
      // create a token with the user's id in there
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'superman-key',
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
        next(new ErrorManager(409, 'Signup failed. Email or username already registered'));
      }
      next();
    });
}