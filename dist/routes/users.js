"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _celebrate = require("celebrate");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _faker = _interopRequireDefault(require("faker"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = require("../validators/index");

var _User = _interopRequireDefault(require("../models/User"));

var _mail = _interopRequireDefault(require("../controllers/mail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

_dotenv.default.config();

const {
  JWT_SECRET
} = process.env; // Signup route

router.post('/', (0, _celebrate.celebrate)({
  body: _index.users.signup
}), async (req, res) => {
  let success = false;
  let token;
  const {
    body
  } = req;
  const user = new _User.default(); // Confirmation code to be sent to the user by email

  user.confirmed = false;
  user.confirmationCode = _faker.default.random.uuid(); // Assigns all body fields to User model

  const fields = Object.keys(body);
  fields.forEach(field => {
    if (body[field] !== undefined) {
      // Check if the field is password in order to hash the string
      user[field] = body[field];
    }
  });
  user.password = await _bcrypt.default.hash(body.password, 10);
  const saved = user.save();

  if (saved) {
    success = true;
    token = _jsonwebtoken.default.sign({
      id: user.id,
      userType: user.userType
    }, JWT_SECRET);

    _mail.default.sendConfirmEmail(user);
  }

  return res.status(201).json({
    token,
    success,
    data: user.toObject()
  });
}); // Confirm email route

router.get('/:userId/confirmEmail/:confirmationCode', (req, res) => {
  let success = false;
  const {
    userId,
    confirmationCode
  } = req.params;
  const user = new _User.default();
  const userData = user.findById(userId);

  if (!userData) {
    return res.status(404).json({
      success
    });
  }

  if (userData.confirmed) {
    return res.status(404).json({
      success,
      msg: `${userData.email} has already been confimed`
    });
  }

  if (confirmationCode !== userData.confirmationCode) {
    return res.status(404).json({
      success,
      msg: 'Confirmation code is incorrect'
    });
  }

  userData.confirmed = true;
  userData.confirmationCode = null; // Assigns all body fields to User model

  const savedData = userData.save();

  if (savedData) {
    success = true;

    _mail.default.sendEmailConfirmed(userData);
  }

  return res.status(201).json({
    success,
    msg: 'Emaile confirmed'
  });
}); // Login route

router.post('/login', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  let success = false;
  const user = new _User.default();
  const userData = await user.findByEmail(email);

  if (!userData) {
    return res.status(404).json({
      success,
      msg: 'User does not exist'
    });
  }

  const validPassword = await _bcrypt.default.compare(password, userData.password);

  if (!validPassword) {
    return res.status(401).json({
      success,
      msg: 'Email and password don\'t match'
    });
  }

  success = true;
  const token = await _jsonwebtoken.default.sign({
    id: user.id,
    userType: user.userType
  }, JWT_SECRET);
  return res.status(200).json({
    success,
    token,
    data: user.toObject()
  });
}); // Users route accessible to admins only

router.get('/', (req, res) => {
  const user = new _User.default();
  const {
    page = 1
  } = req.params;
  res.json({
    data: user.getAll({
      page
    })
  });
});
var _default = router;
exports.default = _default;