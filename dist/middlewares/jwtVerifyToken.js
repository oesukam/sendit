"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtVerifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const {
  JWT_SECRET
} = process.env;

const jwtVerifyToken = (userType = ['user']) => (req, res, next) => {
  if (!req.headers) {
    return res.status(401).json({
      succes: false,
      errMsg: 'Unauthorized access'
    });
  }

  const {
    authorization = false
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      succes: false,
      errMsg: 'Unauthorized access'
    });
  }

  const token = authorization.slice(7);

  _jsonwebtoken.default.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).json({
        succes: false,
        errMsg: 'Unauthorized access'
      });
    }

    let user = new _User.default();
    user = await user.findById(decoded.id);

    if (userType.indexOf(user.userType) === -1) {
      return res.status(403).json({
        succes: false,
        errMsg: 'Not allowed'
      });
    }

    req.body.jwtUser = user.toObject();
    next();
  });
};

exports.jwtVerifyToken = jwtVerifyToken;