"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

const create = {
  userId: _celebrate.Joi.string(),
  fromProvince: _celebrate.Joi.string().required(),
  fromDistrict: _celebrate.Joi.string().required(),
  toProvince: _celebrate.Joi.string().required(),
  toDistrict: _celebrate.Joi.string().required(),
  toCity: _celebrate.Joi.string(),
  receiverPhone: _celebrate.Joi.string().required(),
  receiverNames: _celebrate.Joi.string().required(),
  receiverAddress: _celebrate.Joi.string().required(),
  weight: _celebrate.Joi.number().positive().required()
};
const cancel = {
  userId: _celebrate.Joi.string()
};
var _default = {
  create,
  cancel
};
exports.default = _default;