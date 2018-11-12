import Request from 'request';

import run from '../../src/server';

const urlPrefixV1 = 'http://localhost:5000/api/v1';

describe('user', () => {
  let server;
  beforeAll(() => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });
  afterAll(() => {
    server.close();
  });
  describe('create an account POST /api/v1/users', () => {
    const data = {};
    beforeAll((done) => {
      const user = {
        firstName: 'Olivier',
        lastName: 'Esuka',
        email: 'username@gmail.com',
        gender: 'Male',
        province: 'Kigali',
        district: 'Nyarungege',
        password: '123456',
      };

      Request.post(`${urlPrefixV1}/users`,
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
    it('Status 201', () => {
      expect(data.status).toBe(201);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.token).toBeDefined();
    });
  });

  // Login endpoint
  describe('log into an account POST /api/v1/users/login', () => {
    const data = {};
    beforeAll((done) => {
      const userLogin = {
        email: 'username@gmail.com',
        password: '123456',
      };
      // Login the new user
      Request.post(`${urlPrefixV1}/users/login`,
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
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.token).toBeDefined();
    });
  });
});
