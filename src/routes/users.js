import express from 'express';
import { celebrate } from 'celebrate';

import { users } from '../validators/index'
const router = express.Router();

// Signup route
router.post('/', celebrate({
    body: users.signup
  }),
  (req, res) => {
    res.json({ success: true, user: {} });
})

// Users route accessible to admins only
router.get('/', (req, res) => {
  res.json({ user: { } });
});

export default router;
