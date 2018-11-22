
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
            resolve({ user });
          })
          .catch((err) => {
            console.log('ress', 'ooo', err);
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
      const record = [
        this.getUID(),
        this.email,
        this.password,
        this.firstName,
        this.lastName,
        this.birthDate,
        this.province,
        this.district,
        this.userType,
        this.confirmationCode,
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
