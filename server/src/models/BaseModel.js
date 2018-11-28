import uuid from 'uuid';
import moment from 'moment';
import { logger } from '../helpers';
import { usersQuery, parcelsQuery } from '../db/queries';
import db from '../db';

class BaseModel {
  constructor(args = '') {
    if (args) this.updateFields(args);
    this.uuid = uuid.v4();
  }

  getUID() {
    return this.uuid;
  }

  toObject({ withHidden = false } = {}) {
    const fields = { ...this };
    let hidden;
    delete fields.uuid;
    if (this.hidden !== undefined) {
      hidden = [...fields.hidden];
    }
    if (this.storage !== undefined) {
      delete fields.storage;
    }
    if (this.hidden !== undefined) {
      delete fields.hidden;
    }
    if (this.jwtUser !== undefined) {
      delete fields.jwtUser;
    }
    if (!withHidden && hidden) {
      // Delete all hidden properties before returning the object
      hidden.forEach((value) => {
        if (fields[value] !== undefined) {
          delete fields[value];
        }
      });
    }
    return { ...fields };
  }

  // Filter items by id
  findById(id = '') {
    return new Promise((resolve, reject) => {
      if (!id) return reject(new Error('Failed, please provide the id'));
      let queryById;
      switch (this.storage) {
        case 'users':
          queryById = usersQuery.queryUserById;
          break;
        case 'parcels':
          queryById = parcelsQuery.queryParcelById;
          break;
        default:
          break;
      }
      if (queryById === undefined) {
        return reject(new Error('Failed, model storage not set'));
      }
      try {
        db.query(queryById, [id])
          .then((res) => {
            const row = res.rows[0];
            this.updateFields(row);
            resolve({ data: row });
          })
          .catch((err) => {
            logger.error(err);
            reject(new Error('Failed, could query the user'));
          });
      } catch (err) {
        reject(new Error('Failed, could query the user'));
      }
    });
  }

  // Update given proterties
  updateFields(fields = '') {
    if (fields) {
      const keys = Object.keys(fields);
      keys.forEach((key) => {
        if (fields[key] !== undefined) {
          this[key] = fields[key];
        }
      });
    }
  }

  getFirst() {
    return new Promise((resolve, reject) => {
      if (this.storage === undefined) reject(new Error('Storage not defined'));
      let query;
      switch (this.storage) {
        case 'users':
          query = usersQuery.queryFirstUser;
          break;
        case 'parcels':
          query = parcelsQuery.queryFirstParcel;
          break;
        default:
          break;
      }
      db.query(query)
        .then(res => resolve(res.rows[0]))
        .catch(err => reject(err));
    });
  }

  // Returns all items or an empty array
  getAll({ search = '', page = 1 } = {}) {
    const limit = 25;
    const startAt = (page - 1) * limit;
    return new Promise((resolve, reject) => {
      if (!this.storage) reject(new Error('Failed, storage not set'));
      let query;
      let countQuery;
      switch (this.storage) {
        case 'users':
          query = usersQuery.queryAllUsers;
          countQuery = usersQuery.countAllUsers;
          break;
        case 'parcels':
          query = parcelsQuery.queryAllParcels;
          countQuery = parcelsQuery.countAllParcels;
          break;
        default:
          break;
      }
      db.query(query, [startAt])
        .then(async (res) => {
          const { rows = [] } = res;
          const results = await db.query(countQuery);
          const { count = 0 } = results.rows[0];
          resolve({ total: parseInt(count, 10), page, data: rows });
        })
        .catch(err => reject(err));
    });
  }

  // Updates createdAt and updatedAt date
  updateDate() {
    // Set created at date
    if (!this.created_at) {
      this.created_at = moment().format();
      this.updated_at = this.created_at;
    } else {
      this.created_at = moment().format();
    }
  }
}

export default BaseModel;
