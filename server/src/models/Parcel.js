
import moment from 'moment';
import BaseModel from './BaseModel';
import { parcelsQuery } from '../db/queries';
import db from '../db';
import { logger } from '../helpers';

class Parcel extends BaseModel {
  constructor(args) {
    super(args);
    this.storage = 'parcels';
    this.status = 'In Transit';
    this.cancelled = false;
  }

  save() {
    return new Promise((resolve, reject) => {
      const data = this.toObject();
      if (!data) reject(new Error('Field empty'));
      const now = moment().format();
      let query;
      if (this.id) {
        query = parcelsQuery.updateParcel;
      } else {
        query = parcelsQuery.insertParcel;
      }
      const record = [
        this.id || this.getUID(),
        this.user_id,
        'RW-KI',
        this.from_province,
        this.from_district,
        this.to_province,
        this.to_district,
        this.present_location || this.to_district,
        this.receiver_names,
        this.receiver_phone,
        this.receiver_address,
        this.weight,
        this.price,
        this.description,
        this.status || 'In Transit',
        this.created_at || now,
        now,
      ];
      try {
        db.query(query, record)
          .then((res) => {
            const row = res.rows[0];
            this.updateFields(row);
            resolve(row);
          })
          .catch((err) => {
            console.log(err);
            logger.error(err);
            reject(new Error('Failed, could not save'));
          });
      } catch (err) {
        reject(new Error('Failed, could not save'));
      }
    });
  }

  // Returns all items or an empty array
  getAllByUser({ search = '', page = 1, userId = '' } = {}) {
    const limit = 25;
    const startAt = (page - 1) * limit;
    return new Promise((resolve, reject) => {
      if (!this.storage) reject(new Error('Failed, storage not set'));
      db.query(parcelsQuery.queryAllParcelsByUser, [startAt, userId])
        .then((res) => {
          const { rows = [] } = res;
          resolve(rows);
        })
        .catch(err => reject(err));
    });
  }
}

export default Parcel;
