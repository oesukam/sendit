import Request from 'request';

import server from '../../src/server';

const urlPrefixV1 = 'http://localhost:3000/api/v1';

describe('users routes', () => {
  beforeAll(() => {
    server.start();
  });
  afterAll(() => {
    server.close();
  });
  describe('POST /api/v1/users', () => {
    const data = {};
    let user;

    beforeAll((done) => {
      user = {
        firstName: 'Olivier',
        lastName: 'Esuka',
        email: 'username@gmail.com',
        gender: 'Male',
        province: 'Kigali',
        district: 'Nyarungege',
        password: '123456',
      };

      Request.post(`${urlPrefixV1}/users`,
        { form: user }, (err, res, body) => {
          data.status = res.statusCode;
          const bodyJSON = JSON.parse(body);
          if (!err) {
            data.token = bodyJSON.token;
            data.success = bodyJSON.success;
            data.data = bodyJSON.data;
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

  // Login endpoit
  describe('POST /api/v1/users/login', () => {
    const data = {};
    let user;

    beforeAll((done) => {
      user = {
        email: 'username@gmail.com',
        password: '123456',
      };

      Request.post(`${urlPrefixV1}/users`,
        { form: user }, (err, res, body) => {
          data.status = res.statusCode;
          const bodyJSON = JSON.parse(body);
          if (!err) {
            data.token = bodyJSON.token;
            data.success = bodyJSON.success;
          }
          done();
        });
    });
    it('Status 201', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.token).toBeDefined();
    });
  });
});
