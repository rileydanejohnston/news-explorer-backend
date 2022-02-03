const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { validSignup } = require('../fixtures/user-fixtures');
const User = require('../models/user');
const { MONGO_URL } = process.env;

const request = supertest(app);

// create a test suite for HTTP requests
describe('test API requests', () => {

  beforeAll(() => {
    mongoose.connect(MONGO_URL);
  })

  afterAll(() => {
    mongoose.disconnect();
  })

  afterEach(() => {
    return User.deleteOne({ email: validSignup.email });
  })

  test('successful /signup returns 201 status, email and username', () => {
    // make a request for something
    return request.post('/signup').send(validSignup)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.email).toBe(validSignup.email);
        expect(response.body.name).toBe(validSignup.name);
      });
  })

  /* test('test bad email validation for /signup', () => {
    return
  }) */
})