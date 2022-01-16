// ARTICLE ERRORS
const article403 = 'Delete article failed. The article is not yours to delete.';
const article404 = 'Delete article failed. The article was not found or the ID is invalid.';

// USER ERRORS
const getUser404 = 'Get user failed. User not found.';
const signin401 = 'Sign in failed. Password is incorrect.';
const signin404 = 'Sign in failed. Email was not found.';
const signin409 = 'Signup failed. Email or username already registered';

module.exports = {
  article403,
  article404,
  getUser404,
  signin401,
  signin404,
  signin409,
}