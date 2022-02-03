const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const { MONGO_URL } = process.env;
const {
  validSignup,
  badEmailSignup,
  badPasswordSignup,
  badNameSignup,
  noEmailSignup,
  noPasswordSignup,
  noNameSignup
 } = require('../fixtures/user-fixtures');

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

  test('valid data to /signup returns 201 status & email/username', () => {
    // make a request for something
    return request.post('/signup').send(validSignup)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.email).toBe(validSignup.email);
        expect(response.body.name).toBe(validSignup.name);
      });
  })

  // TESTING JOI/CELEBRATE VALIDATION
  test('invalid email to /signup returns 400 status & invalid email message', () => {
    return request.post('/signup').send(badEmailSignup)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.validation.body.message).toBe("\"email\" must be a valid email");
      });
  })

  test('missing email to /signup returns 400 status & email required message', () => {
    return request.post('/signup').send(noEmailSignup)
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.validation.body.message).toBe("\"email\" is required");
    });
  })

  /* test('test bad email validation for /signup', () => {
    return
  }) */
})