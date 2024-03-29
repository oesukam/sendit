import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import faker from 'faker';

import User from '../models/User';
import mail from './mailers';
import { logger } from '../helpers';

dotenv.config();
const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  let success = false;
  let status = 201;
  let token;
  const { body } = req;

  try {
    const foundUser = await new User().findByEmail(body.email);
    if (foundUser.data) {
      return res.status(status).json({ status, success: false, message: `${body.email} user already exist` });
    }
  } catch (err) {
    status = 400;
    return res.status(status).json({ status, success: false, message: 'Failed, please try again' });
  }
  if (body.jwtToken) {
    delete body.jwtToken;
  }
  const user = new User({ ...body });

  // Confirmation code to be sent to the user by email
  user.confirmed = 'pending';
  user.confirmation_code = faker.random.uuid();
  user.password = await bcrypt.hash(body.password, 10);
  await user.save();

  if (user.id) {
    success = true;
    token = jwt.sign({ id: user.id, user_type: user.user_type }, JWT_SECRET);
    mail.sendConfirmEmail(user.toObject({ withHidden: true }));
  }
  return res.status(status).json({ status, success, token, data: user.toObject() });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let success = false;
  let status = 200;
  const user = new User();
  try {
    await user.findByEmail(email);
    if (!user.id) {
      return res.status(404).json({ success, message: 'User does not exist' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      status = 401;
      return res.status(status).json({
        status,
        success,
        message: 'Email and password don\'t match',
      });
    }
  } catch (err) {
    logger.error(err);
    status = 404;
    return res.status(status).json({ status, success, message: 'User does not exist' });
  }
  success = true;
  const token = await jwt.sign({ id: user.id, user_type: user.user_type }, JWT_SECRET);
  return res.status(status).json({ status, success, token, data: user.toObject() });
};

export default {
  signup,
  login,
};
