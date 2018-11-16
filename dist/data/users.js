"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initUsers = () => {
  global.users = [{
    // Default admin
    id: '648da554-e42f-40dc-92d3-649e3865fd72',
    firstName: 'Admin',
    lastName: 'Admin',
    userType: 'admin',
    email: 'admin@email.com',
    password: _bcrypt.default.hashSync('admin@admin', 10),
    gender: 'Male',
    province: 'Kigali',
    district: 'Nyarungege',
    confirmed: true,
    confirmationCode: null
  }, {
    // default user
    id: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3',
    firstName: 'User',
    lastName: 'User',
    userType: 'user',
    email: 'user@email.com',
    password: _bcrypt.default.hashSync('user@user', 10),
    gender: 'Female',
    province: 'Kigali',
    district: 'Nyarungege',
    confirmed: true,
    confirmationCode: null
  }];
};

var _default = initUsers;
exports.default = _default;