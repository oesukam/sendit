"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _faker = _interopRequireDefault(require("faker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// default parcel
const parcel = {
  id: 'd6d6a11b-6035-4373-ad76-9dd2556cd5cc',
  userId: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3',
  fromProvince: 'Kigali',
  fromDistrict: 'Nyarungege',
  toProvince: 'Northen Province',
  toDistrict: 'Burera',
  receiverNames: `${_faker.default.name.firstName()} ${_faker.default.name.lastName()}`,
  receiverPhone: '250-783200000',
  receiverAddress: _faker.default.address.streetAddress(),
  weight: _faker.default.random.number(),
  cancelled: false,
  location: 'Nyarungege',
  parcelStatus: 'in-transit'
};

const initParcels = () => {
  global.parcels = [parcel];
};

var _default = initParcels;
exports.default = _default;