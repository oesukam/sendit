import Request from 'request';

import db from '../../src/db';
import { deleteTestUser } from '../queries';
import run from '../../src/index';
import { urlPrefixV1, userLogin, user } from '../data/index';
import User from '../../src/models/User';

describe('user', () => {
  let server;
  let userToken;
  let userId;
  beforeAll(async (done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    await new User({ ...user }).save();
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

  // Fetch user info
  describe('fetch user info GET /api/v1/users/<userId>', () => {
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
