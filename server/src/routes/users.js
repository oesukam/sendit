import express from 'express';
import dotenv from 'dotenv';
import { jwtVerifyToken } from '../middlewares';
import controllers from '../controllers/users';

const router = express.Router();
dotenv.config();

// Confirm email route
router.get('/:userId/confirmEmail/:confirmationCode', controllers.confirmEmail);

// Fetch users route accessible to admins only
router.get('/', jwtVerifyToken(['admin']), controllers.getAll);

// Fetch user info
router.get('/:userId', jwtVerifyToken(['user', 'admin']), controllers.getSingle);

// Fetch user parcels
router.get('/:userId/parcels', jwtVerifyToken(['user']), controllers.getUserParcels);

// Fetch user info
router.put('/:userId', jwtVerifyToken(['user']), controllers.updateUser);

export default router;
