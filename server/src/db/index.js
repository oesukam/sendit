import { Pool } from 'pg';
import { logger } from '../helpers';
import { userQuery, parcelQuery } from './queries';

const {
  NODE_ENV,
  PG_USER,
  PG_HOST,
  PG_PASSWORD,
  PG_DATABASE,
  PG_PORT,
} = process.env;

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
});

logger.info(`Environment: ${NODE_ENV}`);
pool.connect()
  .then(() => logger.info('Postgress connected'))
  .catch(() => logger.error('Postgress could not connect'));

const createTables = () => {
  pool.query(userQuery.create);
  pool.query(parcelQuery.create);
};

const dropTables = () => {
  pool.query(userQuery.drop);
  pool.query(parcelQuery.drop);
};

const db = {
  query: (text, params) => pool.query(text, params),
  createTables,
  dropTables,
};

export default db;
