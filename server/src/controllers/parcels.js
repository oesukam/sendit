import dotenv from 'dotenv';
import Parcel from '../models/Parcel';
import User from '../models/User';
import mail from './mailers';

dotenv.config();

const createParcel = async (req, res) => {
  const { body } = req;
  const { jwtUser } = body;
  const user = new User();
  await user.findById(body.user_id);
  console.log(user.id, body.user_id, 'body', jwtUser.id);
  if (!user.id || user.id !== jwtUser.id) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized Access',
    });
  }
  delete body.jwtUser;
  const parcel = new Parcel({ ...body, present_location: body.city || body.district });

  await parcel.save();

  return res.status(201).json({ success: true, data: parcel.toObject() });
};

// Fetch all parcels
const getAll = async (req, res) => {
  const { search = '', page = 1 } = req.query;
  const parcel = new Parcel();
  const items = await parcel.getAll({ search, page });
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }
  return res.status(200).json({ success: true, data: items });
};

// Fetch a single parcel
const getSingle = async (req, res) => {
  const { id } = req.params;
  const parcel = new Parcel();
  await parcel.findById(id);
  if (!parcel.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, data: parcel.toObject() });
};

const cancelParcel = async (req, res) => {
  const { id } = req.params;
  const parcel = new Parcel();
  await parcel.findById(id);
  if (!parcel.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  if (parcel.status === 'Cancelled') {
    return res.status(204).json({
      success: false,
      message: 'Parcel had already been cancelled',
    });
  }
  parcel.status = 'Cancelled';
  await parcel.save();

  return res.status(200).json({
    success: true,
    message: 'Parcel cancelled successfully',
  });
};

const changeLocation = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const parcel = new Parcel();
  await parcel.findById(id);
  if (!parcel.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  if (parcel.present_location === body.present_location) {
    return res.status(304).json({
      success: false,
      message: 'Parcel location not changed',
    });
  }
  parcel.present_location = body.present_location;
  await parcel.save();

  const user = new User();
  await user.findById(parcel.user_id);

  // Notifying the user via email
  if (user.id) mail.sendParcelLocationChanged(user, parcel.toObject());

  return res.status(200).json({
    success: true,
    message: 'Parcel location changed successfully',
  });
};

const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const parcel = new Parcel();
  await parcel.findById(id);
  if (!parcel) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  if (parcel.status === status) {
    return res.status(304).json({ success: false, message: 'Parcel not changed' });
  }
  parcel.status = status;
  await parcel.save();
  const user = new User();
  await user.findById(parcel.user_id);

  if (user.id) mail.sendParcelStatusChanged(user.toObject(), parcel.toObject());

  return res.status(200).json({
    success: true,
    message: 'Parcel status changed successfully',
  });
};

export default {
  getAll,
  getSingle,
  cancelParcel,
  changeLocation,
  changeStatus,
  createParcel,
};
