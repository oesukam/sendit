import dotenv from 'dotenv';

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
  const { page = 1, search = '' } = req.params;
  const results = await user.getAll({ page: parseInt(page, 10), search });
  res.json({ success: true, ...results });
};

// Fetch a single user
const getSingle = async (req, res) => {
  const { userId } = req.params;
  const user = new User();
  await user.findById(userId);
  if (!user.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, data: user.toObject() });
};

const getUserParcels = async (req, res) => {
  const { keywords = '', page = 1 } = req.query;
  const { userId } = req.params;
  const parcel = new Parcel();
  const results = await parcel.getAllByUser({ keywords, userId, page: parseInt(page, 10) });
  if (!results.page) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, ...results });
};

// Update a user
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;
  const user = new User();
  await user.findById(userId);
  if (!user.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  if (body.jwtUser) {
    delete body.jwtUser;
  }
  if (Object.keys(body).length === 0) {
    return res.status(204).json({ success: false, message: 'User not updated' });
  }
  user.first_name = body.first_name || user.first_name;
  user.last_name = body.last_name || user.last_name;
  user.province = body.province || user.province;
  user.district = body.district || user.district;
  user.city = body.city || user.city;
  user.address = body.address || user.address;

  await user.save();
  return res.status(200).json({ success: true, data: user.toObject() });
};

export default {
  confirmEmail,
  getAll,
  getSingle,
  getUserParcels,
  updateUser,
};
