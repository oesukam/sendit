import express from 'express';
import { celebrate } from 'celebrate';
import dotenv from 'dotenv';
import { users } from '../validators/index';
import controllers from '../controllers/auth';

const router = express.Router();
dotenv.config();

// Signup route
router.post('/signup', celebrate({
  body: users.signup,
}),
controllers.signup);

// Login route
router.post('/login', controllers.login);

export default router;
