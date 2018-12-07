import Parcel from '../../src/models/Parcel';
import { parcelData } from '../data';
import db from '../../src/db';
import { deleteTestUser, deleteTestParcels } from '../queries';

describe('parcel model', () => {
  beforeAll((done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    db.query(deleteTestUser, [])
      .then(() => done())
      .catch(() => done());
  });
  afterAll(async (done) => {
    db.query(deleteTestParcels, [])
      .then(() => done())
      .catch(() => done());
  });
  it('should create an instance of Parcel', () => {
    const parcel = new Parcel();
    expect(parcel.storage).toBe('parcels');
    expect(parcel.status).toBe('Waiting Pickup');
    expect(parcel.cancelled).toBeFalsy();
  });

  it('should add a new parcel', (done) => {
    const parcel = new Parcel({ ...parcelData });
    parcel.save()
      .then((res) => {
        expect(res.id).toBeDefined();
        done();
      })
      .catch(() => done());
  });

  it('getUserParcelsCounters() should throw Failed, storage not set', (done) => {
    const parcel = new Parcel({ ...parcelData });
    parcel.storage = null;
    parcel.getUserParcelsCounters()
      .catch((err) => {
        expect(err).toBeDefined();
        done();
      });
  });

  it('getAllUser() should throw Failed, storage not set', (done) => {
    const parcel = new Parcel({ ...parcelData });
    parcel.storage = null;
    parcel.getAllByUser()
      .catch((err) => {
        expect(err).toBeDefined();
        done();
      });
  });
});
