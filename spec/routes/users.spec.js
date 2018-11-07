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
  describe('POST /users', () => {
    let data = {};
    let user, userData;

    beforeAll((done) => {
      user = {
        firstName: 'Olivier',
        lastName: 'Esuka',
        email: 'oesukam@gmail.com',
        gender: 'Male',
        province: 'Kigali',
        district: 'Nyarungege',
        password: '123456'
      }
      userData = { avatar: null, ...user };
      delete userData.password;

      Request.post(`${urlPrefixV1}/users`, user, (err, res, body) => {
        data.status = res.statusCode
        done();
      });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.body.success).toBe(true);
      expect(data.body.user).toEqual(userData);
      expect(data.body.token).toBeDefined();
    });
  });
});
