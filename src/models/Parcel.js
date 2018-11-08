
import BaseModel from './BaseModel';

class Parcel extends BaseModel {
  constructor(args) {
    super(args);
    this.arrayName = 'parcels';
    this.orderStatus = 'in-transit';
  }
}

export default Parcel;
