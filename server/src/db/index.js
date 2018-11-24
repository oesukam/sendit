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
  PG_URL,
} = process.env;

let pool;

if (PG_URL) {
  pool = new Pool({
    connectionString: PG_URL,
  });
} else {
  pool = new Pool({
    user: PG_USER,
    host: PG_HOST,
    database: PG_DATABASE,
    password: PG_PASSWORD,
    port: PG_PORT,
  });
}

logger.info(`Environment: ${NODE_ENV}`);

const createTables = () => new Promise(async (resolve) => {
  await pool.query(usersQuery.createTable);
  await pool.query(parcelsQuery.createTable);
  await pool.query(tokensQuery.createTable);
  resolve(true);
});

const dropTables = () => new Promise(async (resolve) => {
  await pool.query(usersQuery.dropTable);
  await pool.query(parcelsQuery.dropTable);
  await pool.query(tokensQuery.dropTable);
  logger.info('Tables dropped');
  resolve(true);
});

const connect = () => new Promise((resolve) => {
  pool.connect()
    .then(() => {
      logger.info('Postgress connected');
      resolve(true);
    })
    .catch(() => {
      const error = 'Postgress could not connect';
      logger.error(error);
      resolve(false);
    });
});

const db = {
  connect,
  query: (text, params) => pool.query(text, params),
  createTables,
  dropTables,
};

export default db;
