const jwt = require('jsonwebtoken');
const ErrorManager = require('../errors/ErrorManager');
const { NODE_ENV, JWT_SECRET, JWT_DEV } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorManager(403, 'Authorization failed. Request does not have an authorization header.');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV
    );
  }
  catch(err) {
    console.log(err.name);
    console.log(err.message);
    if (err.name === 'JsonWebTokenError') {
      next(new ErrorManager(403, 'Authorization failed. Invalid authorization credentials.'));
    }
    next(err);
  }

  req.user = payload;
  next();
}