import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import faker from 'faker';

import Parcel from '../models/Parcel';
import User from '../models/User';
import mail from './mailers';

dotenv.config();
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  let success = false;
  let token;
  const { body } = req;
  const user = new User();

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

const confirmEmail = (req, res) => {
  let success = false;
  const { userId, confirmationCode } = req.params;
  const user = new User();
  const userData = user.findById(userId);
  if (!userData) {
    return res.status(404).json({ success });
  }
  if (userData.confirmed) {
    return res.status(404).json({ success, message: `${userData.email} has already been confimed` });
  }
  if (confirmationCode !== userData.confirmationCode) {
    return res.status(404).json({ success, message: 'Confirmation code is incorrect' });
  }
  userData.confirmed = true;
  userData.confirmationCode = null;
  // Assigns all body fields to User model
  const savedData = userData.save();

  if (savedData) {
    success = true;
    mail.sendEmailConfirmed(userData);
  }

  return res.status(201).json({ success, message: 'Emaile confirmed' });
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
    return res.status(401).json({ success, message: 'Email and password don\'t match' });
  }
  success = true;
  const token = await jwt.sign({ id: user.id, userType: user.userType }, JWT_SECRET);
  return res.status(200).json({ success, token, data: user.toObject() });
};

// Fetch list of users
const getAll = (req, res) => {
  const user = new User();
  const { page = 1 } = req.params;

  res.json({ data: user.getAll({ page }) });
};

// Fetch a single user
const getSingle = (req, res) => {
  const { userId } = req.params;
  const user = new User().findById(userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, data: user.toObject() });
};

const getUserParcels = (req, res) => {
  const { keywords = '' } = req.query;
  const { userId } = req.params;
  const parcel = new Parcel();
  const items = parcel.getAll({ keywords, userId });
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, data: items });
};

export default {
  signup,
  login,
  confirmEmail,
  getAll,
  getSingle,
  getUserParcels,
};
