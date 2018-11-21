import express from 'express';
import { celebrate } from 'celebrate';
import dotenv from 'dotenv';
import { parcels } from '../validators/index';
import Parcel from '../models/Parcel';
import User from '../models/User';
import { jwtVerifyToken } from '../middlewares';
import mail from '../controllers/mailers';
import controllers from '../controllers/parcels';

dotenv.config();
const router = express.Router();

// Create a new parcel
router.post('/',
  celebrate({ body: parcels.create }),
  jwtVerifyToken(),
  controllers.createParcel);

// Fetch parcels
router.get('/', jwtVerifyToken(['admin']), controllers.getAll);

// Fetch a single parcel
router.get('/:id', jwtVerifyToken(['user', 'admin']), controllers.getSingle);

// Cancel a parcel
router.put('/:id/cancel',
  celebrate({ body: parcels.cancel }),
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

export default router;
