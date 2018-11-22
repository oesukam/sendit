const columns = `
  id,
  email,
  password,
  user_type AS userType,
  first_name AS firstName,
  last_name AS lastName,
  birth_date AS birthDate,
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
    status VARCHAR(50) DEFAULT 'active',
    user_type VARCHAR(20) NOT NULL,
    confirmed BOOLEAN DEFAULT false,
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
  province,
  district,
  user_type,
  confirmation_code
 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`;
const dropTable = 'DROP TABLE IF EXISTS users';

const queryAll = `SELECT id, ${columns} FROM users LIMIT 25 OFFSET $1`;

const queryByEmail = `SELECT id, ${columns} FROM users WHERE email = $1`;

export default {
  createTable,
  insert,
  dropTable,
  queryAll,
  queryByEmail,
};
