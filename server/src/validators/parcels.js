import { Joi } from 'celebrate';

const create = {
  from_province: Joi.string().required().trim(),
  from_district: Joi.string().required().trim(),
  to_province: Joi.string().required().trim(),
  to_district: Joi.string().required().trim(),
  to_city: Joi.string().trim(),
  receiver_phone: Joi.string().required().trim(),
  receiver_names: Joi.string().required().trim(),
  receiver_address: Joi.string().required().trim(),
  weight: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().trim(),
};

const changeLocation = {
  present_location: Joi.string().required().trim(),
};

const changeStatus = {
  status: Joi.string().valid(
    'Waiting Pickup',
    'Pick Up',
    'In Transit',
    'Pending',
    'Delivered',
  ).required(),
};

const changeDestination = {
  to_province: Joi.string().valid(
    'eastern',
    'kigali',
    'northern',
    'southern',
  ).required(),
  to_district: Joi.string().required().trim(),
  receiver_address: Joi.string().required().trim(),
};

const parcelQueryParams = {
  page: Joi.number().min(1),
  search: Joi.string().trim(),
};

export default {
  create,
  changeLocation,
  changeStatus,
  changeDestination,
  parcelQueryParams,
};
