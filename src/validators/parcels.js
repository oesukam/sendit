import { Joi } from 'celebrate';

const create = {
  userId: Joi.string(),
  fromProvince: Joi.string().required(),
  fromDistrict: Joi.string().required(),
  toProvince: Joi.string().required(),
  toDistrict: Joi.string().required(),
  toCity: Joi.string(),
  receiverPhone: Joi.string().required(),
  receiverNames: Joi.string().required(),
  receiverAddress: Joi.string().required(),
  weight: Joi.number().positive().required(),
};


export default {
  create,
};
