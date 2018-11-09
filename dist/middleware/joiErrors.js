"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _celebrate = require("celebrate");

const joiErrors = () => (err, req, res, next) => {
  if ((0, _celebrate.isCelebrate)(err)) {
    let errFields = null;

    if (err.details) {
      errFields = err.details;
    }

    const data = {
      success: false,
      errMsg: 'Bad Request',
      errFields
    };
    return res.status(400).json(data);
  } // If this isn't a Joi error, send it to the next error handler


  return next(err);
};

var _default = joiErrors;
exports.default = _default;