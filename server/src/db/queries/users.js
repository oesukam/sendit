const columns = `
  id,
  email,
  password,
  user_type AS userType,
  first_name AS firstName,
  last_name AS lastName,
  birth_date AS birthDate,
  gender,
  province,
  district,
  status,
  confirmed,
  confirmation_code AS confirmationCode,
  created_at AS createdAt,
  updated_at AS updatedAt
`;
const createTable = `
CREATE TABLE IF NOT EXISTS
  users(
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    province VARCHAR(128) NOT NULL,
    district VARCHAR(128) NOT NULL,
    birth_date DATE,
    gender VARCHAR(10),
    status VARCHAR(50) DEFAULT 'active',
    user_type VARCHAR(20) NOT NULL,
    confirmed VARCHAR(20) DEFAULT 'pending',
    confirmation_code UUID,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
const insert = `INSERT INTO users(
  id,
  email,
  password,
  first_name,
  last_name,
  birth_date,
  gender,
  province,
  district,
  user_type,
  confirmed,
  confirmation_code,
  created_at,
  updated_at
 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
 ON CONFLICT DO NOTHING returning *`;
const dropTable = 'DROP TABLE IF EXISTS users';
const queryById = 'SELECT * FROM users WHERE id = $1';
const queryAll = 'SELECT * FROM users LIMIT 25 OFFSET $1';

const queryByEmail = 'SELECT * FROM users WHERE email = $1';

export default {
  createTable,
  insert,
  dropTable,
  queryAll,
  queryByEmail,
  queryById,
};
