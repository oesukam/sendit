import faker from 'faker';
import Parcel from '../../src/models/Parcel';

fdescribe('user model', () => {
  it('should return user a string as users', () => {
    const parcel = new Parcel();
    expect(parcel.arrayName).toBe('parcels');
  });

  it('should add another user to global users\' array', (done) => {
    const parcelData = {
      userId: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3',
      fromProvince: 'Kigali',
      fromDistrict: 'Nyarungege',
      toProvince: 'Northen Province',
      toDistrict: 'Burera',
      receiverNames: `${faker.name.firstName()} ${faker.name.lastName()}`,
      receiverPhone: '250-783200000',
      receiverAddress: faker.address.streetAddress(),
      weight: faker.random.number(),
      cancelled: false,
      location: 'Nyarungege',
    };
    const parcel = new Parcel({ ...parcelData });
    parcel.save()
      .then((res) => {
        const { parcels = [] } = global;
        expect(parcels[parcels.length - 1].userId).toBe(res.userId);
        expect(res.receiverNames).toBe(parcel.receiverNames);
        done();
      })
      .catch(() => done());
  });
});
