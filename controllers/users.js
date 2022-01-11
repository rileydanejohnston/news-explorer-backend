const Users = require('../models/user');

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;

  Users.create({ email, password, name })
    // hash the password
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      res.send({ err: err.message });
    });
}