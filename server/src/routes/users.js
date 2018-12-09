import express from 'express';
import dotenv from 'dotenv';
import { celebrate } from 'celebrate';
import { jwtVerifyToken } from '../middlewares';
import controllers from '../controllers/users';
import { users } from '../validators/index';

const router = express.Router();
dotenv.config();

// Confirm email route
router.get('/:userId/confirmEmail/:confirmationCode', controllers.confirmEmail);

// Fetch users route accessible to admins only
router.get('/',
  celebrate({ query: users.userQueryParams }),
  jwtVerifyToken(['admin']),
  controllers.getAll);

// Fetch user info
router.get('/:userId', jwtVerifyToken(['user', 'admin']), controllers.getSingle);

// Fetch user parcels
router.get('/:userId/parcels',
  celebrate({ query: users.userQueryParams }),
  jwtVerifyToken(['user', 'admin']),
  controllers.getUserParcels);

// Update user info
router.put('/:userId',
  celebrate({ body: users.updateUser }),
  jwtVerifyToken(['user', 'admin']),
  controllers.updateUser);

// Fetch user's parcels counters
router.get('/:userId/counters',
  jwtVerifyToken(['user', 'admin']),
  controllers.getUserParcelsCounters);

export default router;
