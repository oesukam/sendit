"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseModel = _interopRequireDefault(require("./BaseModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Parcel extends _BaseModel.default {
  constructor(args) {
    super(args);
    this.arrayName = 'parcels';
    this.parcelStatus = 'in-transit';
    this.cancelled = false;
  }

}

var _default = Parcel;
exports.default = _default;