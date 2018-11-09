"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = _interopRequireDefault(require("./users"));

var _parcels = _interopRequireDefault(require("./parcels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initData = () => {
  (0, _users.default)(); // Initialises global users array

  (0, _parcels.default)();
};

var _default = initData;
exports.default = _default;