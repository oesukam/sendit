import dotenv from 'dotenv';
import * as data from '../data';
import db from './index';
import { logger } from '../helpers';

dotenv.config(); // Sets environment's varibles

const exitNode = () => {
  setTimeout(() => {
    process.exit(0); // Exit with success
  }, 1000);
};

try {
  db.connect()
    .then(async () => {
      if (process.argv[2] === 'drop') {
        await db.dropTables();
        exitNode();
      } else {
        await db.createTables();
        await data.initUsers();
        await data.parcels();
        logger.info('Migrated');
        exitNode();
      }
    })
    .catch((err) => {
      logger.error(err);
      exitNode();
    });
} catch (err) {
  logger.error(err);
  exitNode();
}
