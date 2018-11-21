import Request from 'request';
import faker from 'faker';

import User from '../../src/models/User';
import run from '../../src/index';
import {
  urlPrefixV1,
  parcelData,
  userToken,
  adminToken,
} from '../data';
import Parcel from '../../src/models/Parcel';

// Creating a new parce;
describe('parcel', () => {
  let server;
  let parcelId;
  let parcelUserId;

  beforeAll((done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    done();
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
        ...parcelData,
      };
      delete parcel.cancelled;
      delete parcel.presentLocation;
      delete parcel.id;

      Request.post(`${urlPrefixV1}/parcels`,
        {
          json: true,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          form: parcel,
        }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.token = body.token;
            data.success = body.success;
            data.data = body.data;
            parcelId = body.data.id;
            parcelUserId = body.data.userId;
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

  // Fetch parcels
  describe('fetch parcels GET /api/v1/parcels', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(`${urlPrefixV1}/parcels`,
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
          }
          done();
        });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(typeof data.data).toBe('object');
    });
  });

  // Fetch a single parcel
  describe('fetch single parcel GET /api/v1/parcels/<parcelId>', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(`${urlPrefixV1}/parcels/${parcelId}`,
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
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
    });
  });

  // Cancel a parcel
  describe('cancel a parcel PUT /api/v1/parcels/<parcelId>/cancel', () => {
    const data = {};
    beforeAll((done) => {
      const parcel = new Parcel().getFirst();
      Request.put(`${urlPrefixV1}/parcels/${parcel.id}/cancel`,
        {
          json: true,
          form: { userId: parcel.userId },
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
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('Parcel cancelled successfully');
    });
  });

  // Change parcel location
  describe('change a parcel location PUT /api/v1/parcels/<parcelId>/presentLocation', () => {
    const data = {};
    beforeAll((done) => {
      const parcel = new Parcel().getFirst();
      Request.put(`${urlPrefixV1}/parcels/${parcel.id}/presentLocation`,
        {
          json: true,
          form: { presentLocation: 'Gisenyi' },
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('Parcel location changed successfully');
    });
  });

  // Change parcel status
  describe('change parcel status PUT /api/v1/parcels/<parcelId>/status', () => {
    const data = {};
    beforeAll((done) => {
      Request.put(`${urlPrefixV1}/parcels/${parcelId}/status`,
        {
          json: true,
          form: { parcelStatus: 'Pick Up' },
          headers: {
            Authorization: `Bearer ${adminToken}`,
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
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('Parcel status changed successfully');
    });
  });
});
