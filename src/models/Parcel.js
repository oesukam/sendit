
import BaseModel from './BaseModel';

class Parcel extends BaseModel {
  constructor(args) {
    super(args);
    this.arrayName = 'parcels';
    this.parcelStatus = 'in-transit';
    this.cancelled = false;
  }
}

export default Parcel;
