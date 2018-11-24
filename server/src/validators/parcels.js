import { Joi } from 'celebrate';

const create = {
  user_id: Joi.string().required().trim(),
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

const cancel = {
  user_id: Joi.string().trim(),
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


export default {
  create,
  cancel,
  changeLocation,
  changeStatus,
};
