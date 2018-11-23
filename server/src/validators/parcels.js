import { Joi } from 'celebrate';

const create = {
  user_id: Joi.string(),
  from_province: Joi.string().required(),
  from_district: Joi.string().required(),
  to_province: Joi.string().required(),
  to_district: Joi.string().required(),
  to_city: Joi.string(),
  receiver_phone: Joi.string().required(),
  receiver_names: Joi.string().required(),
  receiver_address: Joi.string().required(),
  weight: Joi.number().positive().required(),
  description: Joi.string(),
};

const cancel = {
  user_id: Joi.string(),
};

const changeLocation = {
  present_location: Joi.string().required(),
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
