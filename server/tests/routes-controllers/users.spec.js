import Request from 'request';

import run from '../../src/index';
import { urlPrefixV1, userLogin } from '../data/index';

describe('user', () => {
  let server;
  let userToken;
  let userId;
  beforeAll((done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    Request.post(`${urlPrefixV1}/auth/login`,
      { json: true, form: userLogin }, (err, res, body) => {
        if (!err) {
          userToken = body.token;
          userId = body.id;
        }
        done();
      });
  });
  afterAll(() => {
    server.close();
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
