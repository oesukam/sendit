const columns = `
  user_id AS userId,
  from_province AS fromProvince,
  from_district AS fromDistrict,
  to_province AS toProvince,
  to_district AS toDistrict,
  presentLocation AS presentLocation,
  receiver_phone AS receiverPhone,
  receiver_names AS receiverNames,
  weight,
  price,
  status,
  description,
  updated_at AS updatedAt,
  created_at AS createdAt
 `;
const createTable = `
CREATE TABLE IF NOT EXISTS
  parcels (
    id UUID PRIMARY KEY,
    user_id UUID,
    from_province VARCHAR(255) NOT NULL,
    from_district VARCHAR(255) NOT NULL,
    to_province VARCHAR(255) NOT NULL,
    to_district VARCHAR(255) NOT NULL,
    present_location VARCHAR(255) NOT NULL,
    receiver_phone VARCHAR(20) NOT NULL,
    receiver_names VARCHAR(255) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    weight INT,
    price INT,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'In Transit',
    cancelled BOOLEAN DEFAULT false,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

const dropTable = 'DROP TABLE IF EXISTS parcels';

const insert = `INSERT INTO parcels (
  id,
  user_id,
  from_province,
  from_district,
  to_province,
  to_district,
  present_location,
  receiver_names,
  receiver_phone,
  receiver_address,
  weight,
  price,
  description,
  cancelled,
  status,
  updated_at,
  created_at
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
ON CONFLICT DO NOTHING returning * `;

const queryAll = `SELECT
  ${columns} FROM parcels LIMIT 25 OFFSET $1
`;

const queryById = `SELECT id, ${columns} FROM parcels WHERE id = $1`;

const queryFirst = `SELECT id, ${columns} FROM parcels WHERE id = $1 LIMIT 1`;

const updatePresentLocation = 'UPDATE parcels SET presentLocation = $2 WHERE id = $1';
const updateStatus = 'UPDATE parcels SET status = $2 WHERE id = $1';
const updateCancel = 'UPDATE parcels SET cancelled = $2 WHERE id = $1';
const updateDestination = `
  UPDATE parcels SET to_province = $2, to_district = $3 WHERE id = $1
`;

export default {
  createTable,
  dropTable,
  insert,
  updatePresentLocation,
  updateStatus,
  updateDestination,
  updateCancel,
  queryAll,
  queryById,
  queryFirst,
};
