"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _BaseModel.default {
  constructor(args) {
    super(args);
    this.arrayName = 'users';
    this.userType = 'user'; // Normal user type by default

    this.hidden = ['password', 'confirmed', 'confirmationCode'];
  } // Find user by email


  findByEmail(email = '') {
    if (!email) return null;
    const users = global[this.arrayName] || [];
    if (!email || users.length === 0) return null;
    const user = users.filter(val => val.email === email)[0] || null;
    if (!user) return null;
    this.updateFields(user);
    return this;
  }

}

var _default = User;
exports.default = _default;