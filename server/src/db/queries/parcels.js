const createTableParcels = `
CREATE TABLE IF NOT EXISTS
  parcels (
    id UUID PRIMARY KEY,
    user_id UUID,
    tracking_number VARCHAR(30),
    from_province VARCHAR(255) NOT NULL,
    from_district VARCHAR(255) NOT NULL,
    to_province VARCHAR(255) NOT NULL,
    to_district VARCHAR(255) NOT NULL,
    present_location VARCHAR(255) NOT NULL DEFAULT 'Waiting Pickup',
    receiver_phone VARCHAR(20) NOT NULL,
    receiver_names VARCHAR(255) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    weight INT,
    price INT,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Waiting Pickup',
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

const dropTableParcels = 'DROP TABLE IF EXISTS parcels';

const insertParcel = `INSERT INTO parcels (
  id,
  user_id,
  tracking_number,
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
  status,
  updated_at,
  created_at
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) 
ON CONFLICT DO NOTHING returning * `;

const updateParcel = `UPDATE parcels SET
  user_id = $2,
  tracking_number = $3,
  from_province = $4,
  from_district = $5,
  to_province = $6,
  to_district = $7,
  present_location = $8,
  receiver_names = $9,
  receiver_phone = $10,
  receiver_address = $11,
  weight = $12,
  price = $13,
  description = $14,
  status = $15,
  updated_at = $16,
  created_at = $17
  WHERE id = $1 `;

const queryAllParcels = 'SELECT * FROM parcels LIMIT 25 OFFSET $1';
const queryAllParcelsByUser = `
  SELECT parcels.*, users.first_name, users.last_name 
  FROM parcels INNER JOIN users ON parcels.user_id = users.id 
  WHERE parcels.user_id = $2 LIMIT 25 OFFSET $1`;

const queryParcelById = 'SELECT * FROM parcels WHERE id = $1';

const queryFirstParcel = 'SELECT * FROM parcels WHERE id = $1 LIMIT 1';

const updateParcelPresentLocation = 'UPDATE parcels SET presentLocation = $2 WHERE id = $1';
const updateParcelStatus = 'UPDATE parcels SET status = $2 WHERE id = $1';
const updateParcelDestination = `UPDATE parcels 
  SET to_province = $2, to_district = $3 WHERE id = $1
`;
const countAllParcels = 'SELECT COUNT(*) FROM parcels';
const countAllUserParcels = 'SELECT COUNT(*) FROM parcels WHERE user_id = $1';
const userParcelCounters = `
  SELECT 
    SUM(1) FILTER (WHERE status = 'Delivered' AND user_id = $1) AS delivered,
    SUM(1) FILTER (WHERE status != 'Delivered' AND user_id = $1) AS in_progress
  from parcels
`;

const parcelCounters = `
  SELECT 
    SUM(1) FILTER (WHERE status = 'Delivered') AS delivered,
    SUM(1) FILTER (WHERE status != 'Delivered') AS in_progress
  from parcels
`;
export default {
  createTableParcels,
  dropTableParcels,
  insertParcel,
  updateParcelPresentLocation,
  updateParcelStatus,
  updateParcelDestination,
  queryAllParcels,
  queryAllParcelsByUser,
  queryParcelById,
  queryFirstParcel,
  updateParcel,
  countAllParcels,
  countAllUserParcels,
  userParcelCounters,
  parcelCounters,
};
