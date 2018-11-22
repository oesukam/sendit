const create = `
CREATE TABLE IF NOT EXISTS
  parcels (
    id UUID PRIMARY KEY,
    user_id UUID,
    from_province VARCHAR(255) NOT NULL,
    from_district VARCHAR(255) NOT NULL,
    to_province VARCHAR(255) NOT NULL,
    to_district VARCHAR(255) NOT NULL,
    present_location VARCHAR(255) NOT NULL,
    description TEXT,
    receiver_phone VARCHAR(20) NOT NULL,
    receiver_names VARCHAR(255) NOT NULL,
    weight SMALLINT,
    price INT,
    status VARCHAR(20) NOT NULL DEFAULT,
    cancelled BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;

const drop = 'DROP TABLE IF EXISTS parcels';

const insert = `INSERT INTO parcels (
  user_id,
  from_province,
  from_district,
  to_province,
  to_district,
  presentLocation,
  description,
  receiver_phone,
  receiver_names,
  weight,
  price,
  status,
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

const updatePresentLocation = 'UPDATE parcels SET presentLocation = $2 WHERE id = $1';
const updateStatus = 'UPDATE parcels SET status = $2 WHERE id = $1';
const cancel = 'UPDATE parcels SET cancelled = true WHERE id = $1';
const updateDestination = `
  UPDATE parcels SET to_province = $2, to_district = $3 WHERE id = $1
`;


export default {
  create,
  drop,
  insert,
  updatePresentLocation,
  updateStatus,
  updateDestination,
  cancel,
};
