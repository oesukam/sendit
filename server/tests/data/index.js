import faker from 'faker';
import bcrypt from 'bcrypt';

const urlPrefixV1 = 'http://localhost:5000/api/v1';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3Y2YzNzdjLTU3MzUtNGY1ZC04NjQ1LWM4ZmI0YjVjNWFmMyIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU0MjcxNDU4Mn0.RHfGtWgETscndD2i7DULuy8onw2r2SgHi8IvmWUOP-g';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGRhNTU0LWU0MmYtNDBkYy05MmQzLTY0OWUzODY1ZmQ3MiIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE1NDI3ODE0OTF9.Pn2fPex5lDkjymZYH2inB13fGoTqoGyJw83_V_fCrE8';
const user = {
  first_name: 'Olivier',
  last_name: 'Esuka',
  email: 'oesukam@gmail.com',
  gender: 'Male',
  province: 'Kigali',
  district: 'Nyarungege',
  password: '123456',
};
const userLogin = {
  email: 'user@email.com',
  password: 'user@user',
};

const userLoginAdmin = {
  email: 'admin@email.com',
  password: 'admin@admin',
};

const userMail = {
  id: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3',
  email: 'oesukam@gmail.com',
  first_name: 'Olivier',
  last_name: 'Esuka',
  gender: 'Male',
  province: 'Kigali',
  district: 'Burera',
};

const parcelData = {
  user_id: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3',
  from_province: 'Kigali',
  from_district: 'Nyarungege',
  to_province: 'Northen Province',
  to_district: 'Test',
  receiver_names: `${faker.name.firstName()} ${faker.name.lastName()}`,
  receiver_phone: '250-783200000',
  receiver_address: faker.address.streetAddress(),
  weight: faker.random.number(),
  price: faker.random.number(),
  present_location: 'Nyarungege',
};
const userData = {
  first_name: 'Test',
  last_name: 'Test',
  user_type: 'Test',
  email: 'test@email.com',
  password: bcrypt.hashSync('test@test', 10),
  gender: 'Male',
  province: 'Kigali',
  district: 'Nyarungege',
};

export {
  urlPrefixV1,
  user,
  userLogin,
  userLoginAdmin,
  parcelData,
  userData,
  userToken,
  adminToken,
  userMail,
};
