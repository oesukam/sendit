const create = `
CREATE TABLE IF NOT EXISTS
  tokens (
    id UUID PRIMARY KEY,
    user_id UUID,
    token VARCHAR(255),
    active BOOLEAN DEFAULT true,
    device VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;

const drop = 'DROP TABLE IF EXISTS tokens';

const insert = `INSERT INTO tokens (
  user_id, token, device
) VALUES ($1, $2, $2)`;

const updateDevice = 'UPDATE tokens SET device = $2 WHERE token = $1';
const cancelToken = 'UPDATE tokens SET active = false WHERE token = $1';


export default {
  create,
  drop,
  insert,
  updateDevice,
  cancelToken,
};
