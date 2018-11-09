# SendIT  Heroku - API (V1.0.1)

## API endpoints

### Users
- POST /api/v1/users/login -> _Log into an account_
[Login](https://andela-sendit-api.herokuapp.com/api/v1/users/login)
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

- GET /api/v1/parcels/<parcelId> -> _Fetch all parcels_
[Get a Parcel](https://andela-sendit-api.herokuapp.com/api/v1/parcels/d6d6a11b-6035-4373-ad76-9dd2556cd5cc)
- GET /api/v1/parcels -> _Fetch all parcels_
[Parcels](https://andela-sendit-api.herokuapp.com/api/v1/parcels/)
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
- PUT /api/v1/parcels/<parcelId> -> _Cancel a parcel_
```
  {
    userId: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3'
  }
```