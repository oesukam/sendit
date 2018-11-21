import Parcel from '../../src/models/Parcel';
import { parcelData } from '../data';

describe('user model', () => {
  it('should create an instance of Parcel', () => {
    const parcel = new Parcel();
    expect(parcel.arrayName).toBe('parcels');
    expect(parcel.parcelStatus).toBe('In Transit');
    expect(parcel.cancelled).toBeFalsy();
  });

  it('should add another user to global users\' array', (done) => {
    const parcel = new Parcel({ ...parcelData });
    parcel.save()
      .then((res) => {
        const { parcels = [] } = global;
        expect(parcels[parcels.length - 1].userId).toBe(res.userId);
        expect(res.receiverNames).toBe(parcel.receiverNames);
        expect(res.toObject()).toBeDefined();
        done();
      })
      .catch(() => done());
  });
});
