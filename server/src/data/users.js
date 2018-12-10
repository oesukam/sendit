import bcrypt from 'bcrypt';
import moment from 'moment';
import db from '../db';
import { usersQuery } from '../db/queries';

const initUsers = () => new Promise(async (resolve, reject) => {
  const now = moment().format();
  await db.query(usersQuery.insertUser, [
    '648da554-e42f-40dc-92d3-649e3865fd72', // id
    null, // Avatar URL
    null, // Avatar Public ID
    'admin@email.com', // user email
    bcrypt.hashSync('admin@admin', 10), // password
    'Admin', // first_name
    'Admin', // last_name
    null,
    'Male', // gender
    'Kigali', // province
    'Nyarungege', // district
    'Kigali', // city
    'Telecom House', // address
    'admin', // user_type
    'confirmed', // confirmed
    null, // confirmation_code
    now,
    now,
  ]);

  await db.query(usersQuery.insertUser, [
    '97cf377c-5735-4f5d-8645-c8fb4b5c5af3', // id
    null, // Avatar URL
    null, // Avatar Public ID
    'user@email.com', // user email
    bcrypt.hashSync('user@user', 10), // password
    'User', // first_name
    'User', // last_name
    null,
    'Female', // gender
    'Kigali', // province
    'Nyarungege', // district
    'Kigali', // city
    'Telecom House', // address
    'user', // user_type
    'confirmed', // confirmed
    null, // confirmation_code,
    now,
    now,
  ])
    .then(() => resolve(true))
    .catch(() => reject(new Error('Failed, could not save default users')));
});

export default initUsers;
