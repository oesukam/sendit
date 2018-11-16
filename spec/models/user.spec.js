import bcrypt from 'bcrypt';
import User from '../../src/models/User';

describe('user model', () => {
  it('should return user a string as users', () => {
    const user = new User();
    expect(user.arrayName).toBe('users');
  });

  it('should add another user to global users\' array', (done) => {
    const userData = {
      firstName: 'Test',
      lastName: 'Test',
      userType: 'Test',
      email: 'test@email.com',
      password: bcrypt.hashSync('test@test', 10),
      gender: 'Male',
      province: 'Kigali',
      district: 'Nyarungege',
    };
    const user = new User({ ...userData });
    user.save()
      .then((res) => {
        const { users = [] } = global;
        expect(users[users.length - 1].email).toBe(res.email);
        expect(res.email).toBe(userData.email);
        done();
      })
      .catch(() => done());
  });
});
