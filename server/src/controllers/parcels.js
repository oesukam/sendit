import dotenv from 'dotenv';
import Parcel from '../models/Parcel';
import User from '../models/User';
import mail from './mailers';

dotenv.config();

const createParcel = (req, res) => {
  const { body } = req;
  let user = new User();
  user = user.findById(body.userId);
  if (!user) {
    return res.status(401).json({ success: false, msg: 'Unathorized Access' });
  }
  const parcel = new Parcel({ ...body, location: body.city || body.district });

  parcel.save();

  return res.status(201).json({ success: true, data: parcel.toObject() });
};

// Fetch all parcels
const getAll = (req, res) => {
  const { keywords = '' } = req.query;
  const parcel = new Parcel();
  const items = parcel.getAll({ keywords });
  if (!parcel) {
    return res.status(404).json({ success: false, msg: 'Not found' });
  }
  return res.status(200).json({ success: true, data: items });
};

// Fetch a single parcel
const getSingle = (req, res) => {
  const { id } = req.params;
  let parcel = new Parcel();
  parcel = parcel.findById(id);
  if (!parcel) {
    return res.status(404).json({ success: false, msg: 'Not found' });
  }

  return res.status(200).json({ success: true, data: parcel.toObject() });
};

const cancelParcel = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  let parcel = new Parcel();
  parcel = parcel.findById(id);
  if (!parcel) {
    return res.status(404).json({ success: false, msg: 'Not found' });
  }
  let user = new User();
  user = user.findById(userId);

  if (!user) {
    return res.status(401).json({ success: false, msg: 'Unauthorized Access' });
  }

  if (parcel.cancelled) {
    return res.status(204).json({ success: false, msg: 'Parcel had already been cancelled' });
  }
  parcel.cancelled = true;
  parcel.save();

  return res.status(200).json({ success: true, msg: 'Parcel cancelled successfully' });
};

const changeLocation = (req, res) => {
  const { id } = req.params;
  const { location } = req.body;
  let parcel = new Parcel();
  parcel = parcel.findById(id);
  if (!parcel) {
    return res.status(404).json({ success: false, msg: 'Not found' });
  }

  if (parcel.location === location) {
    return res.status(304).json({ success: false, msg: 'Parcel location not changed' });
  }
  parcel.location = location;
  parcel.save();

  const user = new User().findById(parcel.userId);

  mail.sendParcelLocationChanged(user.toObject(), parcel.toObject());

  return res.status(200).json({ success: true, msg: 'Parcel location changed successfully' });
};

const changeStatus = (req, res) => {
  const { id } = req.params;
  const { parcelStatus } = req.body;
  let parcel = new Parcel();
  parcel = parcel.findById(id);
  if (!parcel) {
    return res.status(404).json({ success: false, msg: 'Not found' });
  }

  if (parcel.parcelStatus === parcelStatus) {
    return res.status(304).json({ success: false, msg: 'Parcel not changed' });
  }
  parcel.parcelStatus = parcelStatus;
  parcel.save();
  const user = new User().findById(parcel.userId);

  mail.sendParcelStatusChanged(user.toObject(), parcel.toObject());

  return res.status(200).json({ success: true, msg: 'Parcel status changed successfully' });
};

export default {
  getAll,
  getSingle,
  cancelParcel,
  changeLocation,
  changeStatus,
  createParcel,
};
