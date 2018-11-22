
import BaseModel from './BaseModel';

class Parcel extends BaseModel {
  constructor(args) {
    super(args);
    this.storage = 'parcels';
    this.parcelStatus = 'In Transit';
    this.cancelled = false;
  }
}

export default Parcel;
