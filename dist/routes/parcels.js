"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = require("../validators/index");

var _Parcel = _interopRequireDefault(require("../models/Parcel"));

var _User = _interopRequireDefault(require("../models/User"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const router = _express.default.Router(); // Create a new parcel


router.post('/', (0, _celebrate.celebrate)({
  body: _index.parcels.create
}), (req, res) => {
  const {
    body
  } = req;
  let user = new _User.default();
  user = user.findById(body.userId);

  if (!user) {
    return res.status(401).json({
      success: false,
      msg: 'Unathorized Access'
    });
  }

  const parcel = new _Parcel.default({ ...body,
    location: body.city || body.district
  });
  parcel.save();
  return res.status(201).json({
    success: true,
    data: parcel.toObject()
  });
}); // Fetch parcels

router.get('/', (req, res) => {
  const {
    keywords = ''
  } = req.query;
  const parcel = new _Parcel.default();
  const items = parcel.getAll({
    keywords
  });

  if (!parcel) {
    return res.status(404).json({
      success: false,
      msg: 'Not found'
    });
  }

  return res.status(200).json({
    success: true,
    data: items
  });
}); // Fetch a single parcel

router.get('/:id', (req, res) => {
  const {
    id
  } = req.params;
  let parcel = new _Parcel.default();
  parcel = parcel.findById(id);

  if (!parcel) {
    return res.status(404).json({
      success: false,
      msg: 'Not found'
    });
  }

  return res.status(200).json({
    success: true,
    data: parcel.toObject()
  });
}); // Cancel a parcel

router.put('/:id/cancel', (0, _celebrate.celebrate)({
  body: _index.parcels.cancel
}), (req, res) => {
  const {
    id
  } = req.params;
  const {
    userId
  } = req.body;
  let parcel = new _Parcel.default();
  parcel = parcel.findById(id);

  if (!parcel) {
    return res.status(404).json({
      success: false,
      msg: 'Not found'
    });
  }

  let user = new _User.default();
  user = user.findById(userId);

  if (!user) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized Access'
    });
  }

  if (parcel.cancelled) {
    return res.status(204).json({
      success: false,
      msg: 'Parcel had already been cancelled'
    });
  }

  parcel.cancelled = true;
  parcel.save();
  return res.status(200).json({
    success: true,
    msg: 'Parcel cancelled successfully'
  });
}); // Change parcel location

router.put('/:id/location', (0, _celebrate.celebrate)({
  body: _index.parcels.changeLocation
}), (0, _middlewares.jwtVerifyToken)(['admin']), (req, res) => {
  const {
    id
  } = req.params;
  const {
    location
  } = req.body;
  let parcel = new _Parcel.default();
  parcel = parcel.findById(id);

  if (!parcel) {
    return res.status(404).json({
      success: false,
      msg: 'Not found'
    });
  }

  parcel.location = location;
  parcel.save();
  return res.status(200).json({
    success: true,
    msg: 'Parcel location changed successfully'
  });
});
var _default = router;
exports.default = _default;