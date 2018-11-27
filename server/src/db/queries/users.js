const createTableUsers = `
CREATE TABLE IF NOT EXISTS
  users(
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    province VARCHAR(128) NOT NULL,
    district VARCHAR(128) NOT NULL,
    city VARCHAR(128),
    address VARCHAR(255) NOT NULL,
    birth_date DATE,
    gender VARCHAR(10),
    status VARCHAR(50) DEFAULT 'active',
    user_type VARCHAR(20) NOT NULL,
    confirmed VARCHAR(20) DEFAULT 'pending',
    confirmation_code UUID,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;
const insertUser = `INSERT INTO users(
  id,
  email,
  password,
  first_name,
  last_name,
  birth_date,
  gender,
  province,
  district,
  city,
  address,
  user_type,
  confirmed,
  confirmation_code,
  created_at,
  updated_at
 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
 ON CONFLICT DO NOTHING returning *`;
const dropTableUsers = 'DROP TABLE IF EXISTS users';
const queryUserById = 'SELECT * FROM users WHERE id = $1';
const queryFirstUser = 'SELECT * FROM users WHERE id = $1 LIMIT 1';
const queryAllUsers = 'SELECT * FROM users LIMIT 25 OFFSET $1';

const queryUserByEmail = 'SELECT * FROM users WHERE email = $1';

export default {
  createTableUsers,
  insertUser,
  dropTableUsers,
  queryAllUsers,
  queryUserByEmail,
  queryUserById,
  queryFirstUser,
};
