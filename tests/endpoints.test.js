const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const { MONGO_URL } = process.env;
const {
  validSignup,
  badEmailSignup,
  badPasswordSignup,
  noEmailSignup,
  noPasswordSignup,
  noNameSignup
 } = require('../fixtures/user-fixtures');

const request = supertest(app);

// create a test suite for HTTP requests
describe('/signup requests', () => {

  beforeAll(() => {
    mongoose.connect(MONGO_URL);
  })

  afterAll(() => {
    return User.deleteOne({ email: validSignup.email });
  })

  afterAll(() => {
    mongoose.disconnect();
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

  test('duplicate email to /signup returns 409 status & email already registered message', () => {
    // make a request for something
    return request.post('/signup').send(validSignup)
      .then((response) => {
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('Signup failed. Email or username already registered');
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

  test('short password to /signup returns 400 status & short password message', () => {
    return request.post('/signup').send(badPasswordSignup)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.validation.body.message).toBe("\"password\" length must be at least 8 characters long");
      });
  })

  test('missing password to /signup returns 400 status & password required message', () => {
    return request.post('/signup').send(noPasswordSignup)
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.validation.body.message).toBe("\"password\" is required");
    });
  })

  test('missing username to /signup returns 400 status & username required message', () => {
    return request.post('/signup').send(noNameSignup)
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.validation.body.message).toBe("\"name\" is required");
    });
  })
})