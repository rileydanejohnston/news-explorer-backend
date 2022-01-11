const Users = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      Users.create({ email, password: hash, name })
      .then((user) => {
        res.status(201).send(user);
      })
    })
    .catch((err) => {
      res.send({ err: err.message });
    });
}