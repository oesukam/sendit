import express from 'express';
import { celebrate } from 'celebrate';
import dotenv from 'dotenv';
import { parcels } from '../validators/index';
import Parcel from '../models/Parcel';
import User from '../models/User';

dotenv.config();
const router = express.Router();

router.post('/',
  celebrate({ body: parcels.create }),
  (req, res) => {
    const { body } = req;
    let user = new User();
    user = user.findById(body.userId);
    if (!user) {
      return res.status(401).json({ succes: false, msg: 'Unathorized access' });
    }
    const parcel = new Parcel(body);

    parcel.save();

    return res.status(201).json({ succes: true, data: parcel.toObject() });
  });

export default router;
