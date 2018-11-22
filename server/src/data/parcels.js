import faker from 'faker';
import moment from 'moment';
import db from '../db';
import { parcelsQuery } from '../db/queries';

const initParcels = async () => {
  const now = moment().format();
  await db.query(parcelsQuery.insert, [ // default parcel
    'd6d6a11b-6035-4373-ad76-9dd2556cd5cc', // id
    '97cf377c-5735-4f5d-8645-c8fb4b5c5af3', // user_id
    'Kigali', // from_province
    'Nyarungege', // from_district
    'Northen Province', // to_province
    'Burera', // to_district
    'Nyarungege', // presentLocation
    `${faker.name.firstName()} ${faker.name.lastName()}`, // receiver_names
    '250-783200000', // receiver_phone
    faker.address.streetAddress(), // receiver_address
    faker.random.number(), // weight
    faker.random.number(), // price
    'Description',
    false, // cancelled
    'In Transit', // status
    now,
    now,
  ]);
};

export default initParcels;
