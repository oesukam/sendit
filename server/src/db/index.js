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

const createTables = () => {
  pool.query(usersQuery.createTable);
  pool.query(parcelsQuery.createTable);
  pool.query(tokensQuery.createTable);
};

const dropTables = () => {
  pool.query(usersQuery.dropTable);
  pool.query(parcelsQuery.dropTable);
  pool.query(tokensQuery.dropTable);
  logger.info('Tables dropped');
};

const connect = () => new Promise((resolve, reject) => {
  pool.connect()
    .then(() => {
      logger.info('Postgress connected');
      resolve(true);
    })
    .catch(() => {
      const error = 'Postgress could not connect';
      logger.error(error);
      reject(new Error(error));
    });
});

const db = {
  connect,
  query: (text, params) => pool.query(text, params),
  createTables,
  dropTables,
};

export default db;
