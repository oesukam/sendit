import BaseModel from '../../src/models/BaseModel';
import { parcelData } from '../data';

describe('base model', () => {
  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });
  it('storage should return empty string', () => {
    const model = new BaseModel();
    expect(model.storage).toEqual('');
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
        expect(res.fromDistrict).toBeDefined();
        expect(res.fromProvince).toBeDefined();
        done();
      });
  });

  it('should return null', (done) => {
    const model = new BaseModel({ ...parcelData });
    expect(model.getFirst()).toEqual(null);
    done();
  });

  it('should return an object', (done) => {
    const model = new BaseModel({ ...parcelData });
    expect(model.toObject()).toBeDefined();
    done();
  });
});
