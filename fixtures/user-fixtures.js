const validSignup = {
  email: 'validEmail@gmail.com',
  password: 'superstrongpassword',
  name: 'validEmail'
};

const validSignin = {
  email: 'validEmail@gmail.com',
  password: 'superstrongpassword',
}

const badEmailSignup = {
  email: 'validEmailgmail.com',
  password: 'superstrongpassword',
  name: 'validEmail'
}
const badPasswordSignup = {
  email: 'validEmail@gmail.com',
  password: 'sup',
  name: 'validEmail'
}

const noEmailSignup = {
  password: 'superstrongpassword',
  name: 'validEmail'
}
const noPasswordSignup = {
  email: 'validEmail@gmail.com',
  name: 'validEmail'
}

const noNameSignup = {
  email: 'validEmail@gmail.com',
  password: 'superstrongpassword',
}

// . matches any character that's not a line terminator
// {150, } means 150 digits, etc
// g is the global flag, finds all matches in the text, not the first
const tokenRegex = /.{150,}/g;

module.exports = {
  validSignup,
  validSignin,
  badEmailSignup,
  badPasswordSignup,
  noEmailSignup,
  noPasswordSignup,
  noNameSignup,
  tokenRegex,
}