const deleteTestUser = `
  DELETE FROM users WHERE email = 'username@gmail.com' 
  OR email = 'oesukam@gmail.com' returning *
`;

const deleteTestParcels = `
  DELETE FROM parcels 
  WHERE to_district = 'Test'
`;

export {
  deleteTestUser,
  deleteTestParcels,
};
