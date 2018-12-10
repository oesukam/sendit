import Request from 'request';
import bcrypt from 'bcrypt';
import run from '../../src/index';
import db from '../../src/db';
import { deleteTestUser, deleteTestParcels } from '../queries';
import User from '../../src/models/User';
import {
  urlPrefixV1,
  parcelData,
  adminToken,
  user,
} from '../data';

describe('parcel', () => {
  let server;
  let parcelId;
  let userToken;

  beforeAll(async (done) => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    const userModel = new User({ ...user });
    userModel.userType = 'admin';
    userModel.confirmed = 'confirmed';
    userModel.password = await bcrypt.hash(user.password, 10);
    await userModel.save();
    Request.post(`${urlPrefixV1}/auth/login`,
      {
        json: true,
        form: {
          email: user.email,
          password: user.password,
        },
      }, (err, res, body) => {
        if (!err) {
          userToken = body.token;
        }
        const parcel = {
          ...parcelData,
          to_district: 'Test',
        };
        delete parcel.cancelled;
        delete parcel.present_location;
        delete parcel.id;
        delete parcel.user_id;

        Request.post(`${urlPrefixV1}/parcels`,
          {
            json: true,
            headers: {
              Authorization: `Bearer ${body.token}`,
            },
            form: parcel,
          }, (e, r, b) => {
            if (!e) {
              parcelId = b.data.id;
            }
            done();
          });
      });
  });

  afterAll((done) => {
    server.close();
    db.query(deleteTestUser, [])
      .then(() => {
        done();
        db.query(deleteTestParcels, [])
          .then(() => done())
          .catch(() => done());
      })
      .catch(() => {
        db.query(deleteTestParcels, [])
          .then(() => done())
          .catch(() => done());
      });
  });
  describe('create an order POST /api/v1/parcels', () => {
    const data = {};
    beforeAll(async (done) => {
      const parcel = {
        ...parcelData,
      };
      delete parcel.cancelled;
      delete parcel.present_location;
      delete parcel.id;
      delete parcel.user_id;

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
            data.success = body.success;
            data.data = body.data;
            parcelId = body.data.id;
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
      Request.put(`${urlPrefixV1}/parcels/${parcelId}/cancel`,
        {
          json: true,
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
      expect(data.message).toBe('Parcel cancelled successfully');
    });
  });

  // Change parcel location
  describe('change a parcel location PUT /api/v1/parcels/<parcelId>/presentLocation', () => {
    const data = {};
    beforeAll((done) => {
      Request.put(`${urlPrefixV1}/parcels/${parcelId}/presentLocation`,
        {
          json: true,
          form: { present_location: 'Gisenyi' },
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
          form: { status: 'Waiting Pickup' },
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

  // Change parcel destination
  describe('change parcel status PUT /api/v1/parcels/<parcelId>/destination', () => {
    const data = {};
    beforeAll((done) => {
      Request.put(`${urlPrefixV1}/parcels/${parcelId}/destination`,
        {
          json: true,
          form: {
            to_province: 'eastern',
            to_district: 'bugesera',
            receiver_address: 'Address',
            receiver_names: 'Olivier',
            receiver_phone: '07832000000',
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }, (err, res, body) => {
          console.log(body)
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
      expect(data.message).toBe('Parcel destination changed successfully');
    });
  });
});
