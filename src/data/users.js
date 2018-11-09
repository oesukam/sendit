import bcrypt from 'bcrypt';

// Default admin
const admin = {
  id: '648da554-e42f-40dc-92d3-649e3865fd72',
  firstName: 'Admin',
  lastName: 'Admin',
  userType: 'admin',
  email: 'admin@email.com',
  password: bcrypt.hashSync('admin@admin', 10),
  gender: 'Male',
  province: 'Kigali',
  district: 'Nyarungege',
  confirmed: true,
  confirmationCode: null,
};
// default user
const user = {
  id: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3',
  firstName: 'User',
  lastName: 'User',
  userType: 'user',
  email: 'user@email.com',
  password: bcrypt.hashSync('user@user', 10),
  gender: 'Female',
  province: 'Kigali',
  district: 'Nyarungege',
  confirmed: true,
  confirmationCode: null,
};

const initUsers = () => {
  global.users = [admin, user];
};

export default initUsers;
