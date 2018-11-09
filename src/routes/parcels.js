import express from 'express';
import { celebrate } from 'celebrate';
import dotenv from 'dotenv';
import { parcels } from '../validators/index';
import Parcel from '../models/Parcel';
import User from '../models/User';

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

// Fetch a single parcel
router.get('/', (req, res) => {
  const parcel = new Parcel();
  const items = parcel.getAll();
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

export default router;
