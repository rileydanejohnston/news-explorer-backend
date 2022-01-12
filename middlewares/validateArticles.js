const { Joi, celebrate } = require('celebrate');
const { isURL } = require('validator');

const validateURL = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

module.exports.validateSave = celebrate({
  body: Joi.object().keys({
    article: {
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      url: Joi.string().required().custom(validateURL),
      urlToImg: Joi.string().required().custom(validateURL),
    }
  }),
});