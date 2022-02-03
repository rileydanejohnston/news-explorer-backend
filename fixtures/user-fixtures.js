const validSignup = {
  email: 'validEmail@gmail.com',
  password: 'superstrongpassword',
  name: 'validEmail'
};

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

const badNameSignup = {
  email: 'validEmail@gmail.com',
  password: 'superstrongpassword',
  name: 'val'
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

module.exports = {
  validSignup,
  badEmailSignup,
  badPasswordSignup,
  badNameSignup,
  noEmailSignup,
  noPasswordSignup,
  noNameSignup
}