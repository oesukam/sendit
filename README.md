# SendIT - API

## API endpoints

### Users
- POST /api/v1/users/login -> _Log into an account_
```
  {
    email: user@email.com,
    password: user@user
  }
```
- POST /api/v1/users/ -> _Create a new user_
```
  {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'email@email.com',
    password: 'password',
    gender: 'Female',
    province: 'Kigali',
    district: 'Nyarungege'
  }
```
- GET /api/v1/users/<userId>/confirmEmail/<confirmationCode> -> _Confirms emails after creating an account for new users_


### Parcels

- GET /api/v1/parcels -> _Fetch all parcels_
- POST /api/v1/parcels -> _Creates a new parcel delivery order_
```
  {
    userId: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3',
    fromProvince: 'Kigali',
    fromDistrict: 'Nyarungege',
    toProvince: 'Northen Province',
    toDistrict: 'Burera',
    receiverNames: 'Receiver Names',
    receiverPhone: '250-783200000',
    receiverAddress: faker.address.streetAddress(),
    weight: faker.random.number()
  }
```