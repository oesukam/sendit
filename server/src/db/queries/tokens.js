const columns = `
  user_id AS userId,
  token,
  device,
  active,
  updated_at AS updatedAt,
  created_at AS createdAt
`;
const createTable = `
CREATE TABLE IF NOT EXISTS
  tokens (
    id UUID PRIMARY KEY,
    user_id UUID,
    token VARCHAR(255),
    active BOOLEAN DEFAULT true,
    device VARCHAR(20),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

const dropTable = 'DROP TABLE IF EXISTS tokens';

const insert = `INSERT INTO tokens (
  user_id, token, device
) VALUES ($1, $2, $2)`;

const updateDevice = 'UPDATE tokens SET device = $2 WHERE token = $1';
const updateActive = 'UPDATE tokens SET active = $2 WHERE token = $1';
const queryByToken = `SELECT ${columns} FROM tokens WHERE token = $1`;

export default {
  createTable,
  dropTable,
  insert,
  queryByToken,
  updateDevice,
  updateActive,
};
