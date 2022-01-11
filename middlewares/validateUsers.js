const { celebrate, Joi } = require('celebrate');
const { isEmail } = require('validator');

const validateEmail = (value, helpers) => {
  if (isEmail(value)) {
    return value;
  }
  return helpers.error('string.email');
}

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30).custom(validateEmail),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30).custom(validateEmail),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});