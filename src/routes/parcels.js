import express from 'express';
import { celebrate } from 'celebrate';
import dotenv from 'dotenv';
import { parcels } from '../validators/index';
import Parcel from '../models/Parcel';

dotenv.config();
const router = express.Router();

router.post('/',
  celebrate({ body: parcels.create }),
  (req, res) => {
    const { body } = req;
    const parcel = new Parcel(body);

    parcel.save();

    return res.status(201).json({ succes: true, data: parcel.toObject() });
  });
