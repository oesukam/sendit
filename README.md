# SendIT

SendIT is a courier service that helps users deliver parcels to different destinations. SendIT provides courier quotes based on weight categories. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Here are the environment prerequisites for the web app

```
- NodeJS
- Postgress
```

### Installing

- Start your postgress server
- Create a postgress database with any name but make sure to use the same name in the .env file for the PG_DATABASE variable
- Clone the repository
- Copy .env.example to .env then correct change the corresponding variables
- Run `npm install` to install node packages
- Run `npm run dev` to start the web app 


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

### Endpoints
Using Postman to access these endpoints
Please find the API documentation on [https://andela-sendit-api.herokuapp.com/api-docs](https://andela-sendit-api.herokuapp.com/api-docs)

| Endpoint                   | Methods   | Functionalities        |
| ---------------------------|-----------|------------------------|
| /api/v1/auth/login         | POST      | Login registered user  |
| /api/v1/auth/signup        | POST      | Register a new User    |
| /api/v1/users    | GET | Fetch all parcels  |
| /api/v1/users/`<userId>`     | GET, PUT | Get and update user info  |
| /api/v1/users/`<userId>`/confirm_email/`<confirmationCode>`        | GET      | Confirm user email    |
| /api/v1/users/`<userID>`/parcels         | GET      | Get particular user parcels  |
| /api/v1/users/`<userID>`/counters         | GET      | Get particular user parcels' counters  |
| /api/v1/users/`<userID>`/avatar         | PUT      | Update user's avatar  |
| /api/v1/parcels       | GET      | Fetch all parcels    |
| /api/v1/parcels       | POST      | A a new parcel    |
| /api/v1/parcels/`<userId>`/cancel       | PUT      | Update a parcel    |
| /api/v1/parcels/`<userId>`/status       | PUT      | Update a parcel status    |
| /api/v1/parcels/`<userId>`/presentLocation       | PUT      | Update a parcel current location    |
| /api/v1/parcels/`<userId>`/destination       | PUT      | Update a parcel destination    |

## Deployment

For deployment, the .env file or the running environment should have the following variable

- URL=http://localhost:3000
- FRONT_URL=https://oesukam.github.io
- PORT=3000
- NODE_ENV=production
- JWT_SECRET=
- MAILGUN_USER=
- MAILGUN_PASSWORD=
- DATABASE_URL=
- PG_HOST=localhost
- PG_USER=oem
- PG_DATABASE=sendit
- PG_PASSWORD=secretpassword
- PG_PORT=

## Built With

* HTML
* Javascript
* CSS
* NodeJS / Express
* Postgress


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/oesukam/andela-sendit/tags). 

## Authors

* **Olivier Esuka** - *Personal Website* - [My Website](https://oesukam.me/)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Omolabake Lemboye
* Deo Kamara
* Bryan Manuele [Fermi Dirak](https://medium.com/@bryanmanuele/how-i-implemented-my-own-spa-routing-system-in-vanilla-js-49942e3c4573)
