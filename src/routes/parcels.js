import express from 'express';
import { celebrate } from 'celebrate';
import dotenv from 'dotenv';
import { parcels } from '../validators/index';
import Parcel from '../models/Parcel';
import User from '../models/User';
import { jwtVerifyToken } from '../middlewares';
import mail from '../controllers/mail';

dotenv.config();
const router = express.Router();

// Create a new parcel
router.post('/',
  celebrate({ body: parcels.create }),
  (req, res) => {
    const { body } = req;
    let user = new User();
    user = user.findById(body.userId);
    if (!user) {
      return res.status(401).json({ success: false, msg: 'Unathorized Access' });
    }
    const parcel = new Parcel({ ...body, location: body.city || body.district });

    parcel.save();

    return res.status(201).json({ success: true, data: parcel.toObject() });
  });

// Fetch parcels
router.get('/', (req, res) => {
  const { keywords = '' } = req.query;
  const parcel = new Parcel();
  const items = parcel.getAll({ keywords });
  if (!parcel) {
    return res.status(404).json({ success: false, msg: 'Not found' });
  }

  return res.status(200).json({ success: true, data: items });
});

// Fetch a single parcel
router.get('/:id', (req, res) => {
  const { id } = req.params;
  let parcel = new Parcel();
  parcel = parcel.findById(id);
  if (!parcel) {
    return res.status(404).json({ success: false, msg: 'Not found' });
  }

  return res.status(200).json({ success: true, data: parcel.toObject() });
});

// Cancel a parcel
router.put('/:id/cancel',
  celebrate({ body: parcels.cancel }),
  (req, res) => {
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
  });

// Change parcel location
router.put('/:id/location',
  celebrate({ body: parcels.changeLocation }),
  jwtVerifyToken(['admin']),
  (req, res) => {
    const { id } = req.params;
    const { location } = req.body;
    let parcel = new Parcel();
    parcel = parcel.findById(id);
    if (!parcel) {
      return res.status(404).json({ success: false, msg: 'Not found' });
    }

    parcel.location = location;
    parcel.save();

    return res.status(200).json({ success: true, msg: 'Parcel location changed successfully' });
  });

// Change parcel location
router.put('/:id/status',
  celebrate({ body: parcels.changeStatus }),
  jwtVerifyToken(['admin']),
  (req, res) => {
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
  });

export default router;
