const createTableUsers = `
CREATE TABLE IF NOT EXISTS
  users(
    id UUID PRIMARY KEY,
    avatar_url VARCHAR(255),
    avatar_public_id VARCHAR(255),
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
  avatar_url,
  avatar_public_id,
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
 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
 ON CONFLICT DO NOTHING returning *`;

const updateUser = `
  UPDATE users SET
    avatar_url = $2,
    avatar_public_id = $3,
    email = $4,
    password = $5,
    first_name = $6,
    last_name = $7,
    birth_date = $8,
    gender = $9,
    province = $10,
    district = $11,
    city = $12,
    address = $13,
    user_type = $14,
    confirmed = $15,
    confirmation_code = $16,
    created_at = $17,
    updated_at = $18
  WHERE id = $1
`;

const dropTableUsers = 'DROP TABLE IF EXISTS users';
const queryUserById = 'SELECT * FROM users WHERE id = $1';
const queryFirstUser = 'SELECT * FROM users WHERE id = $1 LIMIT 1';
const queryAllUsers = (search) => {
  let query = 'SELECT * FROM users';
  if (search) {
    const keywords = search.split(/\s+/g);
    query += ' WHERE';
    keywords.forEach((val, index) => {
      if (index !== 0) {
        query += ' AND';
      }
      query += `
        (
          first_name ILIKE '%${val}%' OR 
          last_name ILIKE '%${val}%' OR 
          confirmed ILIKE '%${val}%' OR
          gender ILIKE '%${val}%' OR 
          province ILIKE '%${val}%' OR 
          district ILIKE '%${val}%' OR
          city ILIKE '%${val}%' OR 
          user_type ILIKE '%${val}%'
        )
      `;
    });
  }
  return `${query} LIMIT 25 OFFSET $1`;
};

const queryUserByEmail = 'SELECT * FROM users WHERE email = $1';
const countAllUsers = (search) => {
  let query = 'SELECT COUNT(*) FROM users';
  if (search) {
    const keywords = search.split(/\s+/g);
    query += ' WHERE';
    keywords.forEach((val, index) => {
      if (index !== 0) {
        query += ' AND';
      }
      query += `
        (
          first_name ILIKE '%${val}%' OR 
          last_name ILIKE '%${val}%' OR
          confirmed ILIKE '%${val}%' OR 
          gender ILIKE '%${val}%' OR 
          province ILIKE '%${val}%' OR 
          district ILIKE '%${val}%' OR
          city ILIKE '%${val}%' OR 
          user_type ILIKE '%${val}%'
        )
      `;
    });
  }
  return query;
};

export default {
  createTableUsers,
  insertUser,
  dropTableUsers,
  queryAllUsers,
  queryUserByEmail,
  queryUserById,
  queryFirstUser,
  countAllUsers,
  updateUser,
};
