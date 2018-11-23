import dotenv from 'dotenv';

import Parcel from '../models/Parcel';
import User from '../models/User';
import mail from './mailers';

dotenv.config();

const confirmEmail = (req, res) => {
  let success = false;
  const { userId, confirmationCode } = req.params;
  const user = new User();
  const userData = user.findById(userId);
  if (!userData) {
    return res.status(404).json({ success });
  }
  if (userData.confirmed) {
    return res.status(404).json({
      success,
      message: `${userData.email} has already been confimed`,
    });
  }
  if (confirmationCode !== userData.confirmation_code) {
    return res.status(404).json({
      success,
      message: 'Confirmation code is incorrect',
    });
  }
  userData.confirmed = true;
  userData.confirmation_code = null;
  // Assigns all body fields to User model
  const savedData = userData.save();

  if (savedData) {
    success = true;
    mail.sendEmailConfirmed(userData);
  }

  return res.status(201).json({ success, message: 'Emaile confirmed' });
};

// Fetch list of users
const getAll = async (req, res) => {
  const user = new User();
  const { page = 1, search = '' } = req.params;
  const items = await user.getAll({ page, search });
  res.json({ data: items });
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

const getUserParcels = (req, res) => {
  const { keywords = '', page = 1 } = req.query;
  const { userId } = req.params;
  const parcel = new Parcel();
  const items = parcel.getAllByUser({ keywords, userId, page });
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, data: items });
};

export default {
  confirmEmail,
  getAll,
  getSingle,
  getUserParcels,
};
