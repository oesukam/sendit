import BaseModel from '../../src/models/BaseModel';
import { parcelData } from '../data';
import db from '../../src/db';
import { deleteTestUser, deleteTestParcels } from '../queries';

describe('base model', () => {
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

  it('storage should return empty string', () => {
    const model = new BaseModel();
    expect(model.storage).toEqual(undefined);
  });

  it('save() should return undefined', (done) => {
    const model = new BaseModel({ ...parcelData });
    model.save()
      .catch((err) => {
        expect(err).toBeDefined();
        done();
      });
  });

  it('save() should return an object', (done) => {
    const model = new BaseModel({ ...parcelData });
    model.storage = 'parcels';
    model.save()
      .then((res) => {
        expect(res).toBeDefined();
        expect(res.id).toBeDefined();
        expect(res.from_district).toBeDefined();
        expect(res.from_province).toBeDefined();
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });


  it('should return an object', (done) => {
    const model = new BaseModel({ ...parcelData });
    expect(model.toObject()).toBeDefined();
    done();
  });
});
