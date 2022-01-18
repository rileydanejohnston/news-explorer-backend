// ARTICLE ERRORS
const article403 = 'Delete article failed. The article is not yours to delete.';
const article404 = 'Delete article failed. The article was not found or the ID is invalid.';

// USER ERRORS
const getUser404 = 'Get user failed. User not found.';
const signin401 = 'Sign in failed due to invalid credentials. Incorrect email or password.';
const signin409 = 'Signup failed. Email or username already registered';

// AUTH ERRORS
const noHeader403 = 'Authorization failed. Request does not have an authorization header.';
const badCredentials403 = 'Authorization failed. Invalid authorization credentials.';

module.exports = {
  article403,
  article404,
  getUser404,
  signin401,
  signin409,
  noHeader403,
  badCredentials403,
};
