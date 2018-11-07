import express from 'express';
import { celebrate } from 'celebrate';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import { users } from '../validators/index';
import User from '../models/User';

const router = express.Router();

// Signup route
router.post('/', celebrate({
  body: users.signup,
}),
(req, res) => {
  let success = false;
  const { JWT_SECRET } = process.env;
  let token;
  const { body } = req;
  const user = new User();

  // Confirmation code to be sent to the user by email
  user.confirmed = false;
  user.confirmationCode = faker.random.uuid();

  // Assigns all body fields to User model
  const fields = Object.keys(body);
  fields.forEach((field) => {
    if (body[field]) {
      // Check if the field is password in order to hash the string
      if (field === 'password') {
        user.password = bcrypt.hashSync(body.password, 10);
      }
      user[field] = body[field];
    }
  });
  const userData = user.save();

  if (userData) {
    success = true;
    token = jwt.sign({ id: userData.id, userType: userData.userType }, JWT_SECRET);
  }

  // Delete password from the returned object
  delete userData.password;

  res.status(201).json({ success, data: userData, token });
});

// Users route accessible to admins only
router.get('/', (req, res) => {
  res.json({ user: { } });
});

export default router;
