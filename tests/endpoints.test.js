const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const { MONGO_URL } = process.env;
const {
  getUser404,
  signin401,
  signin409,
  noHeader403,
  badCredentials403
} = require('../constants/errors');
const {
  validSignup,
  validSignin,
  badEmailSignup,
  wrongEmailSignin,
  wrongPasswordSignin,
  badPasswordSignup,
  noEmailSignup,
  noPasswordSignup,
  noNameSignup,
  tokenRegex,
  badToken
 } = require('../fixtures/user-fixtures');

const request = supertest(app);

beforeAll(() => {
  mongoose.connect(MONGO_URL);
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  mongoose.disconnect();
})

describe('/signup requests', () => {
  beforeEach(() => {
    return User.deleteMany({});
  })

  test('valid data to /signup returns 201 status & email/username', () => {
    return request.post('/signup').send(validSignup)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.email).toBe(validSignup.email);
        expect(response.body.name).toBe(validSignup.name);
      });
  })

  test('duplicate email to /signup returns 409 status & email already registered message', async () => {
    // create user
    const response = await request.post('/signup').send(validSignup);
    expect(response.status).toBe(201);

    // try creating duplicate user
    const duplicateResponse = await request.post('/signup').send(validSignup);
    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body.message).toBe(signin409);
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
  beforeEach(async () => {
    // must use request.post for password hash
    // User.create() won't hash the password
    // clear db before each test, if we clear after and the test fails, the db won't clear
    await User.deleteMany({});
    await request.post('/signup').send(validSignup);
  })

  test('valid request to /signin returns 200 status & token', () => {
    return request.post('/signin').send(validSignin)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.hasOwnProperty('token')).toBeTruthy();
        expect(response.body.token).toMatch(tokenRegex);
      })
  })

  // TESTING JOI/CELEBRATE VALIDATION
  test('invalid email to /signin returns 400 status & invalid email message', () => {
    return request.post('/signin').send(badEmailSignup)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.validation.body.message).toBe("\"email\" must be a valid email");
      });
  })

  test('missing email to /signin returns 400 status & email required message', () => {
    return request.post('/signin').send(noEmailSignup)
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.validation.body.message).toBe("\"email\" is required");
    });
  })

  test('wrong email to /signin returns 401 status & email incorrect message', () => {
    return request.post('/signin').send(wrongEmailSignin)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(signin401);
      })
  })

  test('short password to /signin returns 400 status & short password message', () => {
    return request.post('/signin').send(badPasswordSignup)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body.validation.body.message).toBe("\"password\" length must be at least 8 characters long");
      });
  })

  test('missing password to /signin returns 400 status & password required message', () => {
    return request.post('/signin').send(noPasswordSignup)
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body.validation.body.message).toBe("\"password\" is required");
    });
  })

  test('wrong password to /signin returns 401 status & password incorrect message', () => {
    return request.post('/signin').send(wrongPasswordSignin)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(signin401);
      })
  })
})

describe('/getCurrentUser request', () => {
  let response = null;
  let token = null;

  // clear DB
  // signup
  // signin
  // extract token
  beforeAll(async () => {
    await User.deleteMany({});
    await request.post('/signup').send(validSignup);

    response = await request.post('/signin').send(validSignin);
    token = response.body.token;
  });

  test('valid request to /users/me returns 200 status & object with email and username', () => {
    return request.get('/users/me').set('authorization', 'Bearer ' + token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.email).toBe(validSignup.email);
        expect(response.body.name).toBe(validSignup.name);
      })
  })

  test('request to /users/me with valid token for a user that doesn\'t exist returns 404 status & user not found message (created a user for a valid token number then deleted user from DB)', () => {
    return request.get('/users/me').set('authorization', 'Bearer ' + badToken)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(getUser404);
      })
  })

  test('request to /users/me without an authorization header returns 403 status and no header error message', () => {
    return request.get('/users/me').set('auth', 'Bearer ' + token)
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body.message).toBe(noHeader403);
      })
  })

  test('request to /users/me without the word `bearer` in the header returns 403 status and no header error message', () => {
    return request.get('/users/me').set('authorization', token)
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body.message).toBe(noHeader403);
      })
  })

  test('request to /users/me with an invalid token # returns 403 status and bad credentials message', () => {
    return request.get('/users/me').set('authorization', 'Bearer 5')
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body.message).toBe(badCredentials403);
      })
  })
})