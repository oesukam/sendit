"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

const joiErrors = () => (err, req, res, next) => {
  if (!(0, _celebrate.isCelebrate)(err)) return next(err);
  return res.status(400).json({
    success: false,
    errMsg: 'Bad Request',
    errFields: err.details || null
  });
};

var _default = joiErrors;
exports.default = _default;