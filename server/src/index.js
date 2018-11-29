import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
import routes from './routes';
import joiErrors from './middlewares/joiErrors';
import { error404 } from './middlewares/responseErrors';
import { welcomeMessage } from './htmlMessage/index';
import db from './db';
import * as data from './data';
import { logger } from './helpers';


dotenv.config(); // Sets environment's varibles

db.connect()
  .then(async () => {
    if (process.argv[2] === 'migrate') {
      await db.createTables();
      await data.initUsers();
      await data.initParcels();
      logger.info('Migrated');
    }
  });

const urlPrefixV1 = '/api/v1'; // Url prefix to map all urls
const app = express();
const { PORT = 3000, NODE_ENV } = process.env;
const swaggerDocument = YAML.load('server/src/docs/api_swagger.yml');

// Check for working environment to start logging http request
if (NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(helmet()); // Sets various http headers
app.use(cors());

/* Apply the body-parser middleware to grab data
  from the request body and create application/json parser
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', express.static('ui/dist'));


app.use(`${urlPrefixV1}/auth`, routes.auth);
app.use(`${urlPrefixV1}/users`, routes.users);
app.use(`${urlPrefixV1}/parcels`, routes.parcels);

app.get(`${urlPrefixV1}`, (req, res) => {
  res.send(welcomeMessage);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Apply Celebrate middleware to handle joi errors
app.use(joiErrors());

// catch 404 and forward to error handler
app.use(error404);

const run = (port = '') => {
  const server = app.listen(port || PORT, () => {
    logger.info(`\nServer listenning on port: ${port || PORT}...`);
  });
  return server;
};

if (require.main === module) {
  run();
}

export default run;
