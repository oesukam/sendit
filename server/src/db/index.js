import { Pool } from 'pg';
import dotenv from 'dotenv';
import { logger } from '../helpers';
import { usersQuery, parcelsQuery, tokensQuery } from './queries';

dotenv.config();

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
  port: PG_PORT
});

logger.info(`Environment: ${NODE_ENV}`);
pool.connect()
  .then(() => logger.info('Postgress connected'))
  .catch(() => logger.error('Postgress could not connect'));

const createTables = () => {
  pool.query(usersQuery.createTable);
  pool.query(parcelsQuery.createTable);
  pool.query(tokensQuery.createTable);
};

const dropTables = () => {
  pool.query(usersQuery.dropTable);
  pool.query(parcelsQuery.dropTable);
  pool.query(tokensQuery.dropTable);
};

const db = {
  query: (text, params) => pool.query(text, params),
  createTables,
  dropTables,
};

export default db;
