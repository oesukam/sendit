import faker from 'faker';
import bcrypt from 'bcrypt';

// Default admin
const user = {
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
const initUsers = () => {
  global.users = [user];
};

export default initUsers;
