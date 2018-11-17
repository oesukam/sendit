import express from 'express';
import { celebrate } from 'celebrate';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { users } from '../validators/index';
import User from '../models/User';
import Parcel from '../models/Parcel';
import { jwtVerifyToken } from '../middlewares';
import controllers from '../controllers/users';

const router = express.Router();
dotenv.config();

// Signup route
router.post('/', celebrate({
  body: users.signup,
}),
controllers.signup);

// Confirm email route
router.get('/:userId/confirmEmail/:confirmationCode', controllers.confirmEmail);

// Login route
router.post('/login', controllers.login);

// Fetch users route accessible to admins only
router.get('/', jwtVerifyToken(['admin']), controllers.getAll);

// Fetch user info
router.get('/:userId', jwtVerifyToken(['user', 'admin']), controllers.getSingle);

// Fetch user parcels
router.get('/:userId/parcels', jwtVerifyToken(['user']), controllers.getUserParcels);

export default router;
