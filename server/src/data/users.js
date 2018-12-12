import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../db';
import { usersQuery } from '../db/queries';

const initUsers = () => new Promise(async (resolve, reject) => {
  const now = moment().format();
  await db.query(usersQuery.insertUser, [
    '648da554-e42f-40dc-92d3-649e3865fd72', null, null, // id, avatar_url, avatar_public_id
    'admin@email.com', bcrypt.hashSync('admin@admin', 10), // email, password
    'Admin', 'Admin', null, // first_name, last_name
    'Male', // gender
    'Kigali', 'Nyarungege', 'Kigali', // province, district, city
    'Telecom House', // address
    'admin', 'confirmed', null, // user_type, confirmed, confirmation_code
    now, now, // created_at, updated_at
  ]);

  await db.query(usersQuery.insertUser, [
    '97cf377c-5735-4f5d-8645-c8fb4b5c5af3', null, null, // id, avatar_url, avatar_public_id
    'user@email.com', bcrypt.hashSync('user@user', 10), // email, password
    'User', 'User', null, // first_name, last_name
    'Female', // gender
    'Kigali', 'Nyarungege', 'Kigali', // province, district, city
    'Telecom House', // address
    'user', 'confirmed', null, // user_type, confirmed, confirmation_code,
    now, now, // created_at, updated_at
  ])
    .then(() => resolve(true))
    .catch(() => reject(new Error('Failed, could not save default users')));
});

export default initUsers;
