import { Joi } from 'celebrate';

const signup = {
  firstName: Joi.string(),
  lastName: Joi.string(),
  password: Joi.string().min(6),
  email: Joi.string().email().required(),
  gender: Joi.string().required(),
  birthDate: Joi.date(),
  province: Joi.string().required(),
  district: Joi.string().required(),
  city: Joi.string().required(),
};

export default {
  signup
}


