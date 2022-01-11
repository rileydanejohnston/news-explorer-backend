const Users = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => Users.create({ email, password: hash, name }))
    .then((user) =>  {
      res.status(201).send({ email: user.email, name: user.name })
    })
    .catch((err) => {
      console.log(`name: ${err.name}`);
      console.log(`message: ${err.message}`);
      res.send({ err: err.message });
    });
}