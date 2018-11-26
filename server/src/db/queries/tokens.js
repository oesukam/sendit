const createTableTokens = `
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

const dropTableTokens = 'DROP TABLE IF EXISTS tokens';

const insertToken = `INSERT INTO tokens (
  user_id, token, device
) VALUES ($1, $2, $2)`;

const updateTokenDevice = 'UPDATE tokens SET device = $2 WHERE token = $1';
const updateTokenActive = 'UPDATE tokens SET active = $2 WHERE token = $1';
const queryTokenByToken = 'SELECT * FROM tokens WHERE token = $1';

export default {
  createTableTokens,
  dropTableTokens,
  insertToken,
  queryTokenByToken,
  updateTokenDevice,
  updateTokenActive,
};
