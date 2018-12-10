import express from 'express';
import { celebrate } from 'celebrate';
import dotenv from 'dotenv';
import { parcels } from '../validators/index';
import { jwtVerifyToken } from '../middlewares';
import controllers from '../controllers/parcels';

dotenv.config();
const router = express.Router();

// Create a new parcel
router.post('/',
  celebrate({ body: parcels.create }),
  jwtVerifyToken(),
  controllers.createParcel);

// Fetch parcels
router.get('/',
  celebrate({ query: parcels.parcelQueryParams }),
  jwtVerifyToken(['admin']),
  controllers.getAll);

// Fetch parcels' counters
router.get('/counters',
  jwtVerifyToken(['admin']),
  controllers.getParcelsCounters);

// Fetch a single parcel
router.get('/:id', jwtVerifyToken(['user', 'admin']), controllers.getSingle);

// Cancel a parcel
router.put('/:id/cancel',
  jwtVerifyToken(['user', 'admin']),
  controllers.cancelParcel);

// Change parcel location
router.put('/:id/presentLocation',
  celebrate({ body: parcels.changeLocation }),
  jwtVerifyToken(['admin']),
  controllers.changeLocation);

// Change parcel status
router.put('/:id/status',
  celebrate({ body: parcels.changeStatus }),
  jwtVerifyToken(['admin']),
  controllers.changeStatus);

// Change parcel destination
router.put('/:id/destination',
  celebrate({ body: parcels.changeDestination }),
  jwtVerifyToken(['user', 'admin']),
  controllers.changeDestination);

export default router;
