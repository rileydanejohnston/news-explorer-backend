const validSignup = {
  email: 'validEmail@gmail.com',
  password: 'superstrongpassword',
  name: 'validEmail'
};

const validSignin = {
  email: 'validEmail@gmail.com',
  password: 'superstrongpassword',
}

const wrongEmailSignin = {
  email: 'validEmail1@gmail.com',
  password: 'superstrongpassword',
}

const wrongPasswordSignin = {
  email: 'validEmail@gmail.com',
  password: 'superstrongpassword1',
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

// valid token number for an unknown user
// created a user, took the token, deleted user from DB
const unknownUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBjNmNiMzk4MGY4M2M1NWMwYTAyMDAiLCJpYXQiOjE2NDQ5ODE0MjcsImV4cCI6MTY0NTU4NjIyN30.XsbRy1XDErOb5B4Two3skdxlmqBTwv9abf8Fw4W_g0Y';

module.exports = {
  validSignup,
  validSignin,
  badEmailSignup,
  badPasswordSignup,
  wrongEmailSignin,
  wrongPasswordSignin,
  noEmailSignup,
  noPasswordSignup,
  noNameSignup,
  tokenRegex,
  unknownUserToken
}