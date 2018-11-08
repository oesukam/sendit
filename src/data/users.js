import faker from 'faker';
import bcrypt from 'bcrypt';

// Default admin
const admin = {
  id: faker.random.uuid(),
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
  id: faker.random.uuid(),
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
