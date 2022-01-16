const jwt = require('jsonwebtoken');
const ErrorManager = require('../errors/ErrorManager');

const { NODE_ENV, JWT_SECRET, JWT_DEV } = process.env;
const {
  noHeader403,
  badCredentials403,
} = require('../constants/errors');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorManager(403, noHeader403);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV,
    );
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(new ErrorManager(403, badCredentials403));
    }
    next(err);
  }

  req.user = payload;
  next();
};
