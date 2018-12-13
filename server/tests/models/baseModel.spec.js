import BaseModel from '../../src/models/BaseModel';
import { parcelData } from '../data';
import db from '../../src/db';
import { deleteTestParcels } from '../queries';

describe('base model', () => {
  beforeAll((done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
    db.query(deleteTestParcels, [])
      .then(() => done())
      .catch(() => done());
  });
  afterAll(async (done) => {
    db.query(deleteTestParcels, [])
      .then(() => done())
      .catch(() => done());
  });

  it('storage should return empty string', (done) => {
    const model = new BaseModel();
    expect(model.storage).toEqual('');
    done();
  });

  it('should return an object', (done) => {
    const model = new BaseModel({ ...parcelData });
    expect(model.toObject()).toBeDefined();
    done();
  });
});
