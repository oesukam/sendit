import { Joi } from 'celebrate';

const signup = {
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().required().trim(),
  password: Joi.string().min(6),
  email: Joi.string().email().required().trim(),
  gender: Joi.string().required().valid('Male', 'Female'),
  birth_date: Joi.date(),
  province: Joi.string().required().trim(),
  district: Joi.string().required().trim(),
  city: Joi.string().trim(),
};

const login = {
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).required().trim(),
};

export default {
  login,
  signup,
};
