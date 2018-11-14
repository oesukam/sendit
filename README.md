# Andela - SendIT (v1.0.7)

[![Build Status](https://travis-ci.org/oesukam/andela-sendit.svg?branch=master)](https://travis-ci.org/oesukam/andela-sendit-api)
[![codecov](https://codecov.io/gh/oesukam/andela-sendit/branch/develop/graph/badge.svg)](https://codecov.io/gh/oesukam/andela-sendit)
[![Maintainability](https://api.codeclimate.com/v1/badges/30bd033f62cd2b12a455/maintainability)](https://codeclimate.com/github/oesukam/andela-sendit/maintainability)

SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories.

## Features

### Required Features:
1. Users can create an account and log in.
2. Users can create a parcel delivery order.
3. Users can change the destination of a parcel delivery order.
4. Users can cancel a parcel delivery order.
5. Users can see the details of a delivery order.
6. Admin can change the status and present location of a parcel delivery order.

### Optional Features: 
1. The application should display a Google Map with Markers showing the pickup location and the destination .
2. The application should display computed travel distance and journey duration between
the pickup location and the destination. Leverage Google Maps [Distance Matrix Service](https://www.google.com/url?q=https://developers.google.com/maps/documentation/javascript/examples/distance-matrix&ust=1540951920000000&usg=AFQjCNEYH17s27tYweNRYehge7Lw0ReUeA&hl=en-GB&source=gmail).
3. The user gets real-time email notification when Admin changes the status of their parcel.
4. The user gets real-time email notification when Admin changes the present location of
their parcel.

## UI
### Web Pages
- [Home Page](https://oesukam.github.io/andela-sendit/UI/index.html)

- [Get A Quote Page](https://oesukam.github.io/andela-sendit/UI/quote.html)

- [Signup Page](https://oesukam.github.io/andela-sendit/UI/signup.html)

- [Login Page](https://oesukam.github.io/andela-sendit/UI/login.html)

- [Profile Page](https://oesukam.github.io/andela-sendit/UI/profile.html)

- [Make An Order Page](https://oesukam.github.io/andela-sendit/UI/make-order.html)

- [Order View Page](https://oesukam.github.io/andela-sendit/UI/order.html)

- [Admin Orders Page](https://oesukam.github.io/andela-sendit/UI/admin-orders.html)

- [Admin Single Order Page](https://oesukam.github.io/andela-sendit/UI/admin-order.html)

![Home Page Screenshot](/images/index-page.png)

### Technologies used for the UI:
- HTML
- CSS
- Javascript (ES6)
- Google Map Javascript API


## SendIT - API
### API endpoints

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
- GET /api/v1/users/**userId**/confirmEmail/**confirmationCode** -> _Confirms emails after creating an account for new users_

- GET /api/v1/users -> _Fetch Users_

### Parcels

- GET /api/v1/parcels/**parcelId** -> _Fetch all parcels_
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

- PUT /api/v1/parcels/**parcelId**/cancel -> _Cancel a parcel_
```
  {
    userId: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3'
  }
```
