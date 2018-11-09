"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

const signup = {
  firstName: _celebrate.Joi.string(),
  lastName: _celebrate.Joi.string(),
  password: _celebrate.Joi.string().min(6),
  email: _celebrate.Joi.string().email().required(),
  gender: _celebrate.Joi.string().required().valid('Male', 'Female'),
  birthDate: _celebrate.Joi.date(),
  province: _celebrate.Joi.string().required(),
  district: _celebrate.Joi.string().required(),
  city: _celebrate.Joi.string()
};
const login = {
  email: _celebrate.Joi.string().email().required(),
  password: _celebrate.Joi.string().min(6)
};
var _default = {
  login,
  signup
};
exports.default = _default;