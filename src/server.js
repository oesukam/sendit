import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import logger from 'morgan';
import initData from './data';
import routes from './routes';
import joiErrors from './middleware/joiErrors';

initData(); // Initialise global data arrays
dotenv.config(); // Sets environment's varibles

const urlPrefixV1 = '/api/v1'; // Url prefix to map all urls
const app = express();
const { PORT = 3000, NODE_ENV } = process.env;

// Check for working environment to start logging http request
if (NODE_ENV === 'development') {
  app.use(logger('tiny'));
  console.info('Morgan enabled');
}

app.use(helmet()); // Sets various http headers

/* Apply the body-parser middleware to grab data
  from the request body and create application/json parser
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(`${urlPrefixV1}/users`, routes.users);
app.use(`${urlPrefixV1}/parcels`, routes.parcels);

// Apply Celebrate middleware to handle joi errors
app.use(joiErrors());

app.get('/api/v1/*', (req, res) => {
  res.send('<h1>SendIT - API</h1>');
});

app.get('/*', (req, res) => {
  res.send('<h1>SendIT - API</h1>');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const run = (port = '') => {
  const server = app.listen(port || PORT, () => {
    console.info(`Server listenning on port: ${port || PORT}...`);
  });
  return server;
};

if (require.main === module) {
  run();
}

export default run;
