import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import logger from 'morgan';
import routes from './routes';
import joiErrors from './middleware/joiErrors';

dotenv.config();
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


app.get('/', (req, res) => {
  res.send('<h1>SendIT - API</h1>');
});

app.use(`${urlPrefixV1}/users`, routes.users);

// Apply Celebrate middleware to handle joi errors
app.use(joiErrors());


const server = app.listen(PORT, () => {
  console.info(`Server listenning on port: ${PORT}...`);
});

export default {
  start: () => server,
  close: () => server.close,
};
