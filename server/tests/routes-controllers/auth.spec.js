import Request from 'request';
import run from '../../src/index';
import db from '../../src/db';
import { deleteTestUser } from '../queries';
import { urlPrefixV1, user, userLogin } from '../data';
import User from '../../src/models/User';

const TIMEOUT_INTERVAL = 30000;

describe('auth', () => {
  let server;
  beforeAll((done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_INTERVAL;
    db.query(deleteTestUser, [])
      .then(() => done())
      .catch(() => done());
  });
  afterAll((done) => {
    server.close();
    db.query(deleteTestUser, [])
      .then(() => done())
      .catch(() => done());
  });
  describe('create an account POST /api/v1/auth/signup', () => {
    const data = {};
    beforeAll((done) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = TIMEOUT_INTERVAL;
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
    beforeAll(async (done) => {
      await new User({ ...user }).save();
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
