import Request from 'request';
import faker from 'faker';

import User from '../../src/models/User';
import run from '../../src/server';

const urlPrefixV1 = 'http://localhost:5000/api/v1';

// Creating a new parce;
describe('parcel', () => {
  let server;
  beforeAll(() => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });
  afterAll(() => {
    server.close();
  });
  describe('create an order POST /api/v1/parcels', () => {
    const data = {};
    beforeAll((done) => {
      let user = new User();
      user = user.findByEmail('user@email.com');
      const parcel = {
        userId: user.id,
        fromProvince: 'Kigali',
        fromDistrict: 'Nyarungege',
        toProvince: 'Northen Province',
        toDistrict: 'Burera',
        receiverNames: `${faker.name.firstName()} ${faker.name.lastName()}`,
        receiverPhone: '250-783200000',
        receiverAddress: faker.lorem.sentence(),
        weight: faker.random.number(),
      };

      Request.post(`${urlPrefixV1}/parcels`,
        { json: true, form: parcel }, (err, res, body) => {
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
    });
  });

  // Login endpoint
  describe('log into an account POST /api/v1/parcels/<parcelId>', () => {
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
    xit('Status 200', () => {
      expect(data.status).toBe(200);
    });
    xit('Body', () => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.token).toBeDefined();
    });
  });
});
