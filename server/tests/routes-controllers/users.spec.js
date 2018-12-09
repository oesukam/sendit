import Request from 'request';
import bcrypt from 'bcrypt';
import db from '../../src/db';
import { deleteTestUser } from '../queries';
import run from '../../src/index';
import {
  urlPrefixV1,
  userLogin,
  user,
  adminToken,
} from '../data/index';
import User from '../../src/models/User';

const TIMEOUT_SECOND = 30000;
describe('user', () => {
  let server;
  let userToken;
  let userId;
  beforeAll(async (done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_SECOND;
    const password = bcrypt.hashSync('user@user', 10);
    await new User({ ...user, password }).save();
    Request.post(`${urlPrefixV1}/auth/login`,
      { json: true, form: userLogin }, (err, res, body) => {
        if (!err) {
          userToken = body.token;
          userId = body.data.id;
        }
        done();
      });
  });
  afterAll((done) => {
    server.close();
    db.query(deleteTestUser, [])
      .then(() => done())
      .catch(() => done());
  });

  // Fetch users
  describe('fetch users info GET /api/v1/users', () => {
    const data = {};
    beforeAll((done) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_SECOND;
      Request.get(`${urlPrefixV1}/users`,
        {
          json: true,
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.success = body.success;
            data.data = body.data;
            data.token = body.token;
          }
          done();
        });
    });
    it('Status 200', (done) => {
      expect(data.status).toBe(200);
      done();
    });
    it('Body', (done) => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      done();
    });
  });

  // Fetch user info
  describe('fetch user info GET /api/v1/users/<userId>', () => {
    const data = {};
    beforeAll((done) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_SECOND;
      Request.get(`${urlPrefixV1}/users/${userId}`,
        {
          json: true,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.success = body.success;
            data.data = body.data;
            data.token = body.token;
          }
          done();
        });
    });
    it('Status 200', (done) => {
      expect(data.status).toBe(200);
      done();
    });
    it('Body', (done) => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      done();
    });
  });

  // Update user info with wrong password
  describe('update user info with wrong password PUT /api/v1/users/<userId>', () => {
    const data = {};
    beforeAll((done) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_SECOND;
      Request.put(`${urlPrefixV1}/users/${userId}`,
        {
          json: true,
          form: {
            first_name: 'Another name',
            last_name: 'Another last Name',
            password: 'password',
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.success = body.success;
            data.message = body.message;
          }
          done();
        });
    });
    it('Status 401', (done) => {
      expect(data.status).toBe(401);
      done();
    });
    it('Body', (done) => {
      expect(data.success).toBe(false);
      expect(data.message).toBe('Wrong password');
      done();
    });
  });

  // Update user info with correct password
  describe('update user info with correct password PUT /api/v1/users/<userId>', () => {
    const data = {};
    beforeAll((done) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_SECOND;
      Request.put(`${urlPrefixV1}/users/${userId}`,
        {
          json: true,
          form: {
            first_name: 'Another name',
            last_name: 'Another last name',
            password: 'user@user',
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.success = body.success;
            data.data = body.data;
          }
          done();
        });
    });
    it('Status 200', (done) => {
      expect(data.status).toBe(200);
      done();
    });
    it('Body', (done) => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      done();
    });
  });

  // Fetch user parcels
  describe('fetch user info GET /api/v1/users/<userId>/parcels', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(`${urlPrefixV1}/users/${userId}`,
        {
          json: true,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.success = body.success;
            data.data = body.data;
          }
          done();
        });
    });
    it('Status 200', (done) => {
      expect(data.status).toBe(200);
      done();
    });
    it('Body', (done) => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      done();
    });
  });
});
