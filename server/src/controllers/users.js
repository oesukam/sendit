import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import Parcel from '../models/Parcel';
import User from '../models/User';
import mail from './mailers';
import { logger } from '../helpers';

dotenv.config();

const confirmEmail = async (req, res) => {
  let success = false;
  const { userId, confirmationCode } = req.params;
  const user = new User();
  await user.findById(userId);
  if (!user.id) {
    return res.status(404).json({ success });
  }
  if (user.confirmed === 'confirmed') {
    return res.status(404).json({
      success,
      message: `${user.email} has already been confimed`,
    });
  }
  if (confirmationCode !== user.confirmation_code) {
    return res.status(404).json({
      success,
      message: 'Confirmation code is incorrect',
    });
  }
  user.confirmed = 'confirmed';
  user.confirmation_code = null;
  user.save()
    .then(() => {
      success = true;
      mail.sendEmailConfirmed(user.toObject({ withHidden: true }));
    })
    .catch(error => logger.error(error));

  return res.status(201).json({ success, message: 'Email confirmed' });
};

// Fetch list of users
const getAll = async (req, res) => {
  const user = new User();
  const { page = 1, search = '' } = req.query;
  const results = await user.getAll({ search, page: parseInt(page, 10) });
  res.json({ success: true, ...results });
};

// Fetch a single user
const getSingle = async (req, res) => {
  const { userId } = req.params;
  const { jwtUser } = req.body;
  if (jwtUser.id !== userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized Access',
    });
  }
  const user = new User();
  await user.findById(userId);
  if (!user.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, data: user.toObject() });
};

// Get User's parcels
const getUserParcels = async (req, res) => {
  const { search = '', page = 1 } = req.query;
  const { userId } = req.params;
  const { jwtUser } = req.body;
  if (jwtUser.id !== userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized Access',
    });
  }
  const parcel = new Parcel();
  const results = await parcel.getAllByUser({ search, page: parseInt(page, 10), userId });
  if (!results.page) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, ...results });
};

const getUserParcelsCounters = async (req, res) => {
  const { userId } = req.params;
  const { jwtUser } = req.body;
  if (jwtUser.id !== userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized Access',
    });
  }
  const parcel = new Parcel();
  const counters = await parcel.getUserParcelsCounters(userId);
  if (!counters) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, counters });
};

// Update a user
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;
  const { jwtUser } = body;
  if (jwtUser.id !== userId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized Access',
    });
  }
  const user = new User();
  await user.findById(userId);
  if (!user.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      success: false,
      message: 'Wrong password',
    });
  }
  user.first_name = body.first_name || user.first_name;
  user.last_name = body.last_name || user.last_name;
  user.birth_date = body.birth_date || user.birth_date;
  user.province = body.province || user.province;
  user.district = body.district || user.district;
  user.city = body.city || user.city;
  user.address = body.address || user.address;

  await user.save();
  return res.status(200).json({ success: true, data: user.toObject() });
};

const uploadUserAvatar = async (req, res) => {
  const { userId } = req.params;
  const { file } = req;
  if (!file) {
    return res.status(400).json({ success: false, message: 'Avatar required' });
  }
  const user = new User();
  await user.findById(userId);
  if (!user.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  user.avatar_url = file.url;
  user.avatar_public_id = file.public_id;
  await user.save();

  return res.status(200).json({
    success: true,
    message: 'Avatar uploaded successfully',
    avatar_url: user.avatar_url,
  });
};

export default {
  confirmEmail,
  getAll,
  getSingle,
  getUserParcels,
  updateUser,
  getUserParcelsCounters,
  uploadUserAvatar,
};
