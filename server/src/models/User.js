
import moment from 'moment';
import BaseModel from './BaseModel';
import db from '../db';
import { usersQuery } from '../db/queries';
import logger from '../helpers/logger';

class User extends BaseModel {
  constructor(args) {
    super(args);
    this.storage = 'users';
    this.userType = 'user'; // Normal user type by default
    this.hidden = ['password', 'confirmationCode'];
  }

  // Find user by email
  findByEmail(email = '') {
    return new Promise((resolve, reject) => {
      try {
        db.query(usersQuery.queryByEmail, [email])
          .then((res) => {
            const user = res.rows[0];
            this.updateFields(user);
            resolve({ data: user });
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

  save() {
    return new Promise((resolve, reject) => {
      const data = this.toObject();
      if (!data) reject(new Error('Field empty'));
      const now = moment().format();
      const record = [
        this.getUID(),
        this.email,
        this.password,
        this.firstName,
        this.lastName,
        this.birthDate,
        this.gender,
        this.province,
        this.district,
        this.userType,
        this.confirmed || false,
        this.confirmationCode,
        this.createdAt || now,
        now,
      ];
      try {
        db.query(usersQuery.insert, record)
          .then((res) => {
            resolve(res.rows[0]);
          })
          .catch((err) => {
            logger.error(err);
            reject(new Error('Failed, could not save'));
          });
      } catch (err) {
        reject(new Error('Failed, could not save'));
      }
    });
  }
}

export default User;
