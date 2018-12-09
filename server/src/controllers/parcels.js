import dotenv from 'dotenv';
import Parcel from '../models/Parcel';
import User from '../models/User';
import mail from './mailers';

dotenv.config();

const createParcel = async (req, res) => {
  const { body } = req;
  const { jwtUser } = body;
  const pricePerKg = 1000;
  if (!jwtUser.id) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized Access',
    });
  }

  if (jwtUser.confirmed !== 'confirmed') {
    return res.status(401).json({
      success: false,
      message: 'Please confirm your email address',
    });
  }
  delete body.jwtUser;
  body.user_id = jwtUser.id;
  const price = parseFloat(body.weight) * pricePerKg;
  const parcel = new Parcel({
    ...body,
    present_location: body.city || body.district,
    price,
  });

  await parcel.save();
  if (!parcel.id) {
    return res.status(401).json({
      success: false,
      message: 'Parcel could not be saved',
    });
  }
  return res.status(201).json({ success: true, data: parcel.toObject() });
};

// Fetch all parcels
const getAll = async (req, res) => {
  const { search = '', page = 1 } = req.query;
  const parcel = new Parcel();
  const results = await parcel.getAll({ search, page: parseInt(page, 10) });

  return res.status(200).json({ success: true, ...results });
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

  const user = new User();
  await user.findById(parcel.user_id);
  if (user.id) mail.sendParcelStatusChanged(user.toObject(), parcel.toObject());

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
    return res.status(409).json({
      success: false,
      message: 'Parcel location not changed',
    });
  }
  parcel.present_location = body.present_location;
  await parcel.save();

  const user = new User();
  await user.findById(parcel.user_id);

  // Notifying the user via email
  if (user.id) mail.sendParcelLocationChanged(user.toObject(), parcel.toObject());

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
  if (!parcel.id) {
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

const changeDestination = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const parcel = new Parcel();
  await parcel.findById(id);
  if (!parcel.id) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  /*
   * Check if the JWT Token belongs to the owner of the parcel
   */
  const { jwtUser } = body;
  const user = new User();
  await user.findById(parcel.user_id);
  if (!user.id || user.id !== jwtUser.id) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized Access',
    });
  }

  /*
    Checks if the user provided new information that
    are different from the one in the database
  */
  if (
    parcel.to_province === body.to_province
    && parcel.to_district === body.to_district
  ) {
    return res.status(409).json({
      success: false,
      message: 'Parcel destination was not changed',
    });
  }
  /*
    Checks if the parcel was already cancelled or pick up
  */
  if (
    parcel.status === 'Waiting Pickup'
    || parcel.status === 'Cancelled'
  ) {
    return res.status(409).json({
      success: false,
      message: `Can not change parcel in status ${parcel.status}`,
    });
  }
  parcel.to_province = body.to_province;
  parcel.to_district = body.to_district;
  parcel.receiver_names = body.receiver_names;
  parcel.receiver_phone = body.receiver_phone;
  parcel.receiver_address = body.receiver_address;
  await parcel.save();

  mail.sendParcelDestinationChanged(user.toObject(), parcel.toObject());

  return res.status(200).json({
    success: true,
    message: 'Parcel destination changed successfully',
  });
};

const getParcelsCounters = async (req, res) => {
  const parcel = new Parcel();
  const counters = await parcel.getParcelsCounters();
  if (!counters) {
    return res.status(404).json({ success: false, message: 'Not found' });
  }

  return res.status(200).json({ success: true, counters });
};

export default {
  getAll,
  getSingle,
  cancelParcel,
  changeLocation,
  changeStatus,
  createParcel,
  changeDestination,
  getParcelsCounters,
};
