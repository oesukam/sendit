import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import faker from 'faker';

import User from '../models/User';
import mail from './mailers';

dotenv.config();
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  let success = false;
  let token;
  const { body } = req;
  const user = new User();

  try {
    const foundUser = await user.findByEmail(body.email);
    if (foundUser.user) {
      return res.status(200).json({
        success: false,
        message: `${body.email} user already exist`,
      });
    }
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: 'Failed, please try again',
    });
  }

  // Confirmation code to be sent to the user by email
  user.confirmed = false;
  user.confirmationCode = faker.random.uuid();

  // Assigns all body fields to User model
  const fields = Object.keys(body);
  fields.forEach((field) => {
    if (body[field] !== undefined) {
      // Check if the field is password in order to hash the string
      user[field] = body[field];
    }
  });
  user.password = await bcrypt.hash(body.password, 10);
  const saved = user.save();

  if (saved) {
    success = true;
    token = jwt.sign({ id: user.id, userType: user.userType }, JWT_SECRET);

    mail.sendConfirmEmail(user);
  }

  return res.status(201).json({ success, token, data: user.toObject() });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let success = false;
  const user = new User();
  const userData = await user.findByEmail(email);
  if (!userData) {
    return res.status(404).json({ success, message: 'User does not exist' });
  }
  const validPassword = await bcrypt.compare(password, userData.password);
  if (!validPassword) {
    return res.status(401).json({
      success,
      message: 'Email and password don\'t match',
    });
  }
  success = true;
  const token = await jwt.sign({
    id: user.id,
    userType:
    user.userType,
  }, JWT_SECRET);
  return res.status(200).json({ success, token, data: user.toObject() });
};

export default {
  signup,
  login,
};
