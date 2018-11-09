"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = _interopRequireDefault(require("./users"));

var _parcels = _interopRequireDefault(require("./parcels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  users: _users.default,
  parcels: _parcels.default
};
exports.default = _default;