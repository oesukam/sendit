import Request from 'request';

import run from '../../src/index';

import { urlPrefixV1, user, userLogin } from '../data';

describe('auth', () => {
  let server;
  beforeAll(() => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });
  afterAll(() => {
    server.close();
  });
  describe('create an account POST /api/v1/auth/signup', () => {
    const data = {};
    beforeAll((done) => {
      Request.post(`${urlPrefixV1}/auth/signup`,
        { json: true, form: user }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.token = body.token;
            data.success = body.success;
            data.data = body.data;
          }
          done();
        });
    });
    it('Status 201', (done) => {
      expect(data.status).toBe(201);
      done();
    });
    it('Body', (done) => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.token).toBeDefined();
      done();
    });
  });

  // Login endpoint
  describe('log into an account POST /api/v1/auth/login', () => {
    const data = {};
    beforeAll((done) => {
      // Login the new user
      Request.post(`${urlPrefixV1}/auth/login`,
        { json: true, form: userLogin }, (err, res, body) => {
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
      expect(data.token).toBeDefined();
      done();
    });
  });
});
