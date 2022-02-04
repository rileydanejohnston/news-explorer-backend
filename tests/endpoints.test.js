const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const { MONGO_URL } = process.env;
const {
  validSignup,
  validSignin,
  badEmailSignup,
  badPasswordSignup,
  noEmailSignup,
  noPasswordSignup,
  noNameSignup,
  tokenRegex
 } = require('../fixtures/user-fixtures');

const request = supertest(app);

beforeAll(() => {
  mongoose.connect(MONGO_URL);
})
afterAll(() => {
  mongoose.disconnect();
})

describe('/signup requests', () => {

  afterAll(() => {
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

describe('/signin requests', () => {

  beforeAll(() => {
    // must use request.post for hash
    // User.create() won't hash the password
    return request.post('/signup').send(validSignup);
  })

  afterAll(() => {
    return User.deleteOne({ email: validSignup.email });
  })


  test('valid request to /signin returns 200 status & token', () => {
    return request.post('/signin').send(validSignin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.hasOwnProperty('token')).toBeTruthy();
        expect(response.body.token).toMatch(tokenRegex);
      })
  })
})