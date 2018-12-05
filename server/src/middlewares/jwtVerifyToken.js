import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();
const { JWT_SECRET } = process.env;

export const jwtVerifyToken = (userType = ['user']) => (req, res, next) => {
  if (!req.headers) {
    return res.status(401).json({ succes: false, message: 'Unauthorized access' });
  }
  const { authorization = false } = req.headers;
  if (!authorization) {
    return res.status(401).json({ succes: false, message: 'Unauthorized access' });
  }
  const token = authorization.slice(7);
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({ succes: false, message: 'Unauthorized access' });
    }
    const user = new User();
    await user.findById(decoded.id);
    if (userType.length === 0) next();
    if (userType.indexOf(user.user_type) === -1) {
      return res.status(403).json({ succes: false, message: 'Not allowed' });
    }
    if (!user.id) {
      return res.status(401).json({ succes: false, message: 'Unauthorized access' });
    }
    req.body.jwtUser = user.toObject();
    next();
  });
};
