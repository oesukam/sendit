import express from 'express';
import dotenv from 'dotenv';
import { celebrate } from 'celebrate';
import multer from 'multer';

import { jwtVerifyToken } from '../middlewares';
import controllers from '../controllers/users';
import { users } from '../validators/index';
import storage from '../helpers/cloudinary';

const router = express.Router();
dotenv.config();
const fileParser = multer({ storage });

// Confirm email route
router.get('/:userId/confirm_email/:confirmationCode', controllers.confirmEmail);

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

// Upload user's avatar
router.put('/:userId/avatar',
  jwtVerifyToken(['user', 'admin']),
  fileParser.single('avatar'),
  controllers.uploadUserAvatar);

export default router;
